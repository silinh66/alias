import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../config';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/categories`);
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const isActive = (path) => {
        if (path === '/' && currentPath === '/') return true;
        if (path !== '/' && currentPath.startsWith(path)) return true;
        return false;
    };

    return (
        <header className="site-header">
            <div className="top-bar">
                <div className="container">
                    <nav className="main-nav">
                        <ul>
                            <li>
                                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Trang chủ</Link>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link
                                        to={`/category/${cat.slug}`}
                                        className={`nav-link ${isActive(`/category/${cat.slug}`) ? 'active' : ''}`}
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Hero Section - Always visible or only on Home? Template has it big. Let's keep it global for now or check requirement. 
                User said "change layout to match image". Image has big header. Let's put it here. */}
            <div className="hero-section">
                <div className="container">
                    <div className="site-branding">
                        <h1 className="site-title">Chứng khoán bền vững</h1>
                        <div className="site-description">Đi tìm cổ phiếu LEADER</div>
                    </div>
                </div>
            </div>

            {/* Intro Section - Only on Home Page? The image shows "So in case you were wondering..." red bar. 
                Let's add it conditionally for Home page in Home.jsx or here? 
                Better in Home.jsx to keep Header clean, or here if it's part of the "template header".
                The image shows it right below the hero. Let's put it in Home.jsx for better control. */}
        </header>
    );
};

export default Header;
