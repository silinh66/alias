import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const PostEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                setCategories(res.data.categories);
                if (res.data.categories.length > 0 && !categoryId) {
                    setCategoryId(res.data.categories[0].id);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();

        if (isEdit) {
            const fetchPost = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/api/posts');
                    const post = res.data.posts.find(p => p.id === parseInt(id));
                    if (post) {
                        setTitle(post.title);
                        setSlug(post.slug);
                        setExcerpt(post.excerpt);
                        setContent(post.content);
                        setThumbnailUrl(post.thumbnail_url);
                        setCategoryId(post.category_id);
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchPost();
        }
    }, [id, isEdit]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            setThumbnailUrl(res.data.url);
        } catch (err) {
            console.error(err);
            alert('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = { title, slug, excerpt, content, thumbnail_url: thumbnailUrl, category_id: categoryId };

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/posts/${id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/posts', data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to save post');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{isEdit ? 'Edit Post' : 'Create Post'}</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Slug</label>
                    <input type="text" value={slug} onChange={e => setSlug(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Category</label>
                    <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Thumbnail</label>
                    <input type="file" onChange={handleImageUpload} />
                    {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" style={{ width: '100px', marginTop: '10px' }} />}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Excerpt</label>
                    <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} style={{ width: '100%', height: '100px', padding: '8px' }}></textarea>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Content</label>
                    <ReactQuill value={content} onChange={setContent} />
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: '#fff', border: 'none' }}>Save</button>
            </form>
        </div>
    );
};

export default PostEditor;
