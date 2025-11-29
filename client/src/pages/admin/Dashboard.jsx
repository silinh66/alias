import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/posts`);
                setPosts(res.data.posts);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPosts();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/admin/create" style={{ display: 'inline-block', marginRight: '10px', padding: '10px', background: 'green', color: '#fff', textDecoration: 'none' }}>Create New Post</Link>
                <Link to="/admin/categories" style={{ display: 'inline-block', padding: '10px', background: '#333', color: '#fff', textDecoration: 'none' }}>Manage Categories</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Title</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{post.id}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{post.title}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <Link to={`/admin/edit/${post.id}`} style={{ marginRight: '10px' }}>Edit</Link>
                                <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
