import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';



const App = () => {
  
  return (
    <Router>
      <>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create" element={<ProtectedRoute element={<PostForm />} />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Content>
        <Footer />
      </>
    </Router>
  );
};

export default App;
