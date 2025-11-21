import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PostEditor from './pages/admin/PostEditor';
import CategoryList from './pages/admin/CategoryList';
import CategoryEditor from './pages/admin/CategoryEditor';

function App() {
  return (
    <Router>
      <div class="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create" element={<PostEditor />} />
          <Route path="/admin/edit/:id" element={<PostEditor />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/categories/create" element={<CategoryEditor />} />
          <Route path="/admin/categories/edit/:id" element={<CategoryEditor />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
