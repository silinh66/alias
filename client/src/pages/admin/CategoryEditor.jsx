import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchCategory = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/categories/${id}`);
                    setName(res.data.name);
                    setSlug(res.data.slug);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchCategory();
        }
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = { name, slug };

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/categories/${id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/categories', data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/admin/categories');
        } catch (err) {
            console.error(err);
            alert('Failed to save category');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>{isEdit ? 'Edit Category' : 'Create Category'}</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Slug</label>
                    <input type="text" value={slug} onChange={e => setSlug(e.target.value)} style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: '#fff', border: 'none' }}>Save</button>
            </form>
        </div>
    );
};

export default CategoryEditor;
