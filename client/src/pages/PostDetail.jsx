import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Sidebar from '../components/Sidebar';

import { API_URL } from '../config';

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

    return (
        <div id="page" className="single-page">
            <div id="content" className="article">
                <article className="post single-post">
                    <h1 className="title single-title">{post.title}</h1>
                    <div className="post-content">
                        {parse(post.content)}
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
