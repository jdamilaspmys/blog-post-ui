// src/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});


const getAuthorizationHeaders = () => {
  const token = Cookies.get('token');
  return { headers : { Authorization : `Bearer ${token}` } }
}

// Posts API
export const getPosts = () => api.get('/posts');
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const createPost = (payload) => api.post('/posts', payload, {...getAuthorizationHeaders()})
export const updatePost = (postId, payload) => api.put(`/posts/${postId}`, payload, { ...getAuthorizationHeaders()})
export const deletePost = (postId) => api.delete(`/posts/${postId}`, {...getAuthorizationHeaders()})

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
