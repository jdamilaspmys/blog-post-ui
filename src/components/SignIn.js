// src/Components/SignIn.js
import React, { useState } from 'react';
import apis from '../api';
import { useAuth } from '../AuthContext';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    setApiError(null)
    setApiSuccess(null)
    e.preventDefault();
    try {
      const response = await apis.signIn({ email, password })
      const userData = response.data;
      const { token, ...restUserDate } = userData;
      signIn(restUserDate);
      Cookies.set('token', token);
      setApiSuccess('Sign In Success !')
      clearFormFields()
      navigate('/');
    } catch (error) {
      setApiError("Invalid email or password. Please try again."); 
    }
  };

  const clearFormFields = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} className="border p-4">
          <h2 className="text-center mb-4">Sign In</h2>

          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={handleEmailChange} required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <div className="password-input">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="eye-icon" onClick={handleShowPassword}>
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="d-block mx-auto">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
