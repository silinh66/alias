import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Sidebar from '../components/Sidebar';

const PostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/${slug}`);
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
        <div id="page" class="single-page">
            <div id="content" class="article">
                <article class="post single-post">
                    <h1 class="title single-title">{post.title}</h1>
                    <div class="post-content">
                        {parse(post.content)}
                    </div>
                </article>
            </div>
            <Sidebar />
        </div>
    );
};

export default PostDetail;
