// src/components/SignUp.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useAuth } from '../AuthContext';
import api from '../api'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null)
    setApiSuccess(null)
    try {
      const response = await api.signUp({ email, name, password });
      const userData = response.data;
      const { token, ...restUserDate } = userData;
      signUp(restUserDate);
      Cookies.set('token', token);
      setApiSuccess('Sign Up Success !')
      clearFormFields()
      navigate('/');
    } catch (error) {
      setApiError(error.response.data); 
    }
  };

  const clearFormFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} className="border p-4">
          <h2 className="text-center mb-4">Sign Up</h2>

          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={handleNameChange} required />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              />
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
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
