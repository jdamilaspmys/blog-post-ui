import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import apis from '../api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apis.getPostById(id);
        setPost(response.data);
      } catch (error) {
        setError('Failed to fetch post details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !post) {
    return <p>Error: {error || 'Post not found'}</p>;
  }

  return (
    <Container>
    <Card>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Author: {post.author?.name}</Card.Subtitle>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default PostDetail;
