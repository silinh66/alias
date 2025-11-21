import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                setCategories(res.data.categories);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Category Management</h1>
            <Link to="/admin/dashboard" style={{ display: 'inline-block', marginBottom: '20px', marginRight: '10px', padding: '10px', background: '#333', color: '#fff', textDecoration: 'none' }}>Back to Dashboard</Link>
            <Link to="/admin/categories/create" style={{ display: 'inline-block', marginBottom: '20px', padding: '10px', background: 'green', color: '#fff', textDecoration: 'none' }}>Create New Category</Link>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Slug</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat.id}>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{cat.id}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{cat.name}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{cat.slug}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <Link to={`/admin/categories/edit/${cat.id}`} style={{ marginRight: '10px' }}>Edit</Link>
                                <button onClick={() => handleDelete(cat.id)} style={{ color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
