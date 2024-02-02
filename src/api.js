// src/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});


const getAuthorizationHeaders = () => {
  const token = Cookies.get('token');
  return { headers : { Authorization : `Bearer ${token}` } }
}

// Posts API
export const getPosts = () => api.get('/posts');
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const createPost = (payload) => api.post('/posts', payload, {...getAuthorizationHeaders()})
export const updatePost = (postId, payload) => api.put(`/posts/${postId}`, payload)
export const deletePost = (postId) => api.delete(`/posts/${postId}`)

// User API
export const signIn = (payload) => api.post('/users/sign-in', payload)
export const signUp = (payload) => api.post('/users/sign-up', payload)

const apis = {
  getPosts,
  getPostById,
  createPost, 
  updatePost,
  deletePost,
  signIn,
  signUp
};

export default apis;
