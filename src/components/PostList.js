// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './PostList.css'; 



import apis from '../api'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await apis.getPosts();
          setPosts(response.data);
        } catch (error) {
          setError('Failed to fetch post list. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !posts.length) {
    return <p>Error: {error || 'Posts not found'}</p>;
  }

  return (
    <Container>
        {posts.map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`} className="post-link">
            <Card className="post-item">
              <Card.Body>
                <Card.Title className="post-title">{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted post-author">Author: {post.author?.name}</Card.Subtitle>
                <Card.Text className="post-summary">{post.content.slice(0, 100)}...</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </Container>
    )
};

export default PostList;
