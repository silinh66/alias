import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import { API_URL } from '../config';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { slug } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                let url = `${API_URL}/api/posts?page=${page}&limit=10`;
                if (slug) {
                    url += `&category_slug=${slug}`;
                }
                const res = await axios.get(url);
                setPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, slug]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (slug) {
            const fetchCategory = async () => {
                try {
                    const res = await axios.get(`${API_URL}/api/categories`);
                    if (res.data && res.data.categories) {
                        const cat = res.data.categories.find(c => c.slug === slug);
                        if (cat) setCategoryName(cat.name);
                    }
                } catch (err) {
                    console.error('Error fetching category name:', err);
                }
            };
            fetchCategory();
        } else {
            setCategoryName('');
        }
    }, [slug]);

    return (
        <div id="page" className="home-page">
            <div id="content" className="article">
                {slug && (
                    <div style={{
                        backgroundColor: '#6284a3',
                        color: 'white',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        marginBottom: '30px',
                        textAlign: 'center'
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: 'bold',
                            border: 'none',
                            padding: 0,
                            color: 'white',
                            textTransform: 'uppercase'
                        }}>
                            {categoryName || (posts.length > 0 ? posts[0].category_name : slug)}
                        </h1>
                    </div>
                )}
                {loading ? <p>Loading...</p> : (
                    posts.map(post => (
                        <article key={post.id} className="post excerpt">
                            <div className="post-blogs-container-thumbnails">
                                <div className="featured-thumbnail-container">
                                    <Link to={`/post/${post.slug}`} title={post.title} id="featured-thumbnail">
                                        <div className="blog-featured-thumbnail" style={{ backgroundImage: `url(${post.thumbnail_url})` }}></div>
                                    </Link>
                                </div>
                                <div className="thumbnail-post-content">
                                    <h2 className="title">
                                        <Link to={`/post/${post.slug}`} title={post.title} rel="bookmark">{post.title}</Link>
                                    </h2>
                                    <span className="entry-meta">
                                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                    <div className="post-thumbnail">
                                        {post.thumbnail_url && (
                                            <Link to={`/post/${post.slug}`}>
                                                <img src={post.thumbnail_url.startsWith('http') ? post.thumbnail_url : API_URL + post.thumbnail_url} alt={post.title} />
                                            </Link>
                                        )}
                                    </div>
                                    <div className="post-content">
                                        {post.excerpt}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                )}
                <div className="navigation pagination" role="navigation">
                    <h2 className="screen-reader-text">Posts navigation</h2>
                    <div className="nav-links" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            style={{
                                backgroundColor: page === 1 ? '#ccc' : '#6284a3',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: page === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                transition: 'background-color 0.3s',
                                minWidth: '80px'
                            }}
                        >
                            Trước
                        </button>
                        <span
                            className="page-numbers current"
                            style={{
                                backgroundColor: '#fff',
                                color: '#6284a3',
                                padding: '10px 15px',
                                borderRadius: '5px',
                                fontSize: '14px',
                                border: '1px solid #6284a3',
                                fontWeight: 'bold'
                            }}
                        >
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            style={{
                                backgroundColor: page === totalPages ? '#ccc' : '#6284a3',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                transition: 'background-color 0.3s',
                                minWidth: '80px'
                            }}
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>);
};

export default Home;
