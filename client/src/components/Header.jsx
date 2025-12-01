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
        <header id="site-header" role="banner">
            <div className="container clear">
                <div className="site-branding">
                    <h1 id="logo" className="site-title" itemProp="headline">
                        <Link to="/">Đầu Tư Bền Vững</Link>
                    </h1>
                    <div className="site-description">Đi tìm cổ phiếu LEADER</div>
                </div>
            </div>
            <div className="primary-navigation">
                <a href="#" id="pull" className="toggle-mobile-menu">Menu</a>
                <div className="container clear">
                    <nav id="navigation" className="primary-navigation mobile-menu-wrapper" role="navigation">
                        <ul id="menu-vi-mo" className="menu clearfix toggle-menu">
                            <li className={`menu-item ${isActive('/') ? 'current-menu-item' : ''}`}><Link to="/">Trang chủ</Link></li>
                            {categories.map(cat => (
                                <li key={cat.id} className={`menu-item ${isActive(`/category/${cat.slug}`) ? 'current-menu-item' : ''}`}>
                                    <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
