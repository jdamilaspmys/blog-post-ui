import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apis from '../api';

const PostForm = () => {
  
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(false)
    setApiSuccess(false)
    try {
      const newPost = {
        title,
        content
      };

      const response = await apis.createPost(newPost);
      setApiSuccess('Post Create Success!')
      navigate(`/posts/${response.data?._id}`);
    } catch (error) {
      setApiError('Post Create Failed!. Try Again')
    }
  };

  return (
    <Container>
    <Card>
      <Card.Body>
        <Card.Title>Create Post</Card.Title>

        {apiError && <Alert variant="danger">{apiError}</Alert>}
        {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} required />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content:</Form.Label>
            <Form.Control as="textarea" value={content} onChange={handleContentChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default PostForm;
