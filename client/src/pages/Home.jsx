import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


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

    return (
        <div className="home-page">
            {/* Intro Section - Red Bar from Template */}
            {!slug && (
                <div className="intro-section">
                    <div className="container">
                        <h2>So in case you were wondering what this is all about ...</h2>
                        <p className="intro-text">
                            Chứng khoán bền vững là nơi chia sẻ kiến thức, kinh nghiệm đầu tư và tìm kiếm những cổ phiếu LEADER trên thị trường.
                        </p>
                        <a href="#main-content" className="btn-primary">Khám phá ngay</a>
                    </div>
                </div>
            )}

            <div id="main-content" className="main-content-wrapper">
                <div className="container">
                    <div className="section-header">
                        <h2>{slug ? `Danh mục: ${slug}` : 'Bài viết mới nhất'}</h2>
                        <p>Cập nhật những thông tin thị trường mới nhất</p>
                    </div>

                    {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
                        <div className="posts-grid">
                            {posts.map(post => (
                                <article key={post.id} className="post-card">
                                    <Link to={`/post/${post.slug}`} className="post-thumbnail" style={{
                                        backgroundImage: `url(${post.thumbnail_url?.startsWith('http') ? post.thumbnail_url : API_URL + post.thumbnail_url})`
                                    }}></Link>
                                    <div className="post-content">
                                        <div className="post-meta">
                                            {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                        </div>
                                        <h3 className="post-title">
                                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <div className="post-excerpt">
                                            {post.excerpt}
                                        </div>
                                        <Link to={`/post/${post.slug}`} className="btn-small">Xem chi tiết</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="pagination">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                        <span className="current">{page} of {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
