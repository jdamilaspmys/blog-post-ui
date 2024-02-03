import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Button, Alert, Form } from 'react-bootstrap';
import apis from '../api';
import { useAuth } from '../AuthContext';

const PostDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apis.getPostById(id);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        setApiError('Failed to fetch post details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {

    setApiSuccess(null)
    setApiError(null)
    e.preventDefault();

    try {
      
      await apis.updatePost(id, { title, content });

      setApiSuccess('Post Update Success!');

    } catch (error) {

      setApiError('Failed to update the post. Please try again later.');
    }
  };

  const handleDelete = async () => {
    try {
      await apis.deletePost(id);
      setApiSuccess('Post Delete Success!');
      navigate('/');
    } catch (error) {
      setApiError('Failed to delete the post. Please try again later.');
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !post) {
    return <Alert variant="danger">Error: {error || 'Post not found'}</Alert>;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}

          {user && user._id === post.author?._id && editable ? (
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" value={title} onChange={handleTitleChange} required />
              </Form.Group>
              <Form.Group controlId="formContent">
                <Form.Label>Content:</Form.Label>
                <Form.Control as="textarea" value={content} onChange={handleContentChange} required />
              </Form.Group>
              <div>
                <Button variant="primary" type="submit">
                  Update Post
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete Post
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Author: {post.author?.name}</Card.Subtitle>
              <Card.Text>{content}</Card.Text>
              {user && user._id === post.author?._id && (
                <>
                <Button variant="primary" onClick={() => setEditable(true)}>
                  Edit Post
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete Post
                </Button>
                </>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetail;
