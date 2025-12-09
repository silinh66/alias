import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Sidebar from '../components/Sidebar';

import { API_URL } from '../config';

import { Helmet } from 'react-helmet-async';

const PostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/posts/${slug}`);
                setPost(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (!post) return <div>Post not found</div>;

    const metaDescription = post.excerpt ? post.excerpt.substring(0, 160) : '';
    const metaImage = post.thumbnail_url && post.thumbnail_url.startsWith('http') ? post.thumbnail_url : `${API_URL}${post.thumbnail_url}`;

    return (
        <div id="page" className="single-page">
            <Helmet>
                <title>{post.title} - Chứng khoán bền vững</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={metaImage} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="article" />
            </Helmet>
            <div id="content" className="article">
                <article className="post single-post">
                    <h1 className="title single-title">{post.title}</h1>
                    <div className="post-meta" style={{ marginBottom: '20px', color: '#666', fontSize: '14px', fontStyle: 'italic' }}>
                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="post-content">
                        {parse(post.content || '', {
                            replace: (domNode) => {
                                if (domNode.name === 'img') {
                                    const props = { ...domNode.attribs, loading: 'lazy', decoding: 'async' };
                                    return <img {...props} />;
                                }
                            }
                        })}
                    </div>

                    <div className="post-footer" style={{ marginTop: '0', paddingTop: '0' }}>
                        {/* <div className="post-stats" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#666', fontSize: '14px' }}>
                            <i className="fa fa-bar-chart" style={{ marginRight: '8px' }}></i>
                            <span>Lượt xem: {post.views ? post.views.toLocaleString('vi-VN') : 0}</span>
                        </div> */}

                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <div className="related-posts">
                                <h3 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: 'rgb(0, 32, 64)', borderBottom: 'none' }}>Bài phân tích khác</h3>
                                <div className="related-posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                                    {post.relatedPosts.map(related => (
                                        <div key={related.id} className="related-post-item">
                                            <a href={`/post/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="related-thumbnail" style={{ height: '180px', overflow: 'hidden', marginBottom: '10px' }}>
                                                    <img
                                                        src={related.thumbnail_url && related.thumbnail_url.startsWith('http') ? related.thumbnail_url : `${API_URL}${related.thumbnail_url}`}
                                                        alt={related.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                                    />
                                                </div>
                                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0', lineHeight: '1.4' }}>{related.title}</h4>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {post.pdf_url && (
                        <div style={{ marginTop: '30px', height: '100vh' }}>
                            <iframe
                                src={`${post.pdf_url.startsWith('http') ? post.pdf_url : API_URL + post.pdf_url}#toolbar=0&navpanes=0&view=FitH`}
                                width="100%"
                                height="100%"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                            >
                                This browser does not support PDFs. Please download the PDF to view it: <a href={post.pdf_url}>Download PDF</a>
                            </iframe>
                        </div>
                    )}
                </article>
            </div>
            <Sidebar />
        </div>
    );
};

export default PostDetail;
