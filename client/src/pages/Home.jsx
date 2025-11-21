import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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
                let url = `http://localhost:5000/api/posts?page=${page}&limit=10`;
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

    return (
        <div id="page" className="home-page">
            <div id="content" className="article">
                {slug && <h1 style={{ marginBottom: '20px', fontSize: '24px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Category: {slug}</h1>}
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
                    <div className="nav-links">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} style={{ marginRight: '5px' }}>Previous</button>
                        <span className="page-numbers current">{page} of {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} style={{ marginLeft: '5px' }}>Next</button>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    );
};

export default Home;
