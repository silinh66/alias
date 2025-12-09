import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../config';
import stockGirlImg from './stock_girl.png';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [categories, setCategories] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const industryAnalysisCategories = [
        'Ngành chứng khoán',
        'Ngành bất động sản',
        'Ngành ngân hàng',
        'Ngành Bán lẻ',
        'Ngành thép',
        'Ngành dầu khí',
        'Bất động sản KCN',
        'Năng lượng',
        'Ngành bảo hiểm',
        'Ngành cao su',
        'Ngành dệt may',
        'Ngành phân đạm',
        'Ngành vận tải – cảng biển',
        'Ngành xây dựng – VLXĐ',
        'Thủy sản'
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/categories`);
                console.log('Categories API response:', res.data);
                if (res.data && Array.isArray(res.data.categories)) {
                    setCategories(res.data.categories);
                } else {
                    console.error('Categories response format invalid:', res.data);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const CategoryLink = ({ category }) => {
        return (
            <Link
                to={`/category/${category.slug}`}
                className={`category-link ${currentPath === `/category/${category.slug}` ? 'active' : ''}`}
            >
                {category.name}
            </Link>
        );
    };

    const DropdownMenu = ({ title, items }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div
                className="dropdown-container"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <button className={`dropdown-button ${isOpen ? 'active' : ''}`}>
                    {title} <span className="dropdown-arrow">▼</span>
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        {items.map(item => (
                            <Link
                                key={item.id}
                                to={`/category/${item.slug}`}
                                className="dropdown-item"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const groupedCategories = categories
        .filter(c => industryAnalysisCategories.includes(c.name))
        .sort((a, b) => {
            return industryAnalysisCategories.indexOf(a.name) - industryAnalysisCategories.indexOf(b.name);
        });

    const topLevelCategoryNames = [
        'Khuyến nghị cổ phiếu',
        'Vĩ mô các ngành',
        'Tìm đối tác',
        'Mở tài khoản chứng khoán'
    ];

    const otherCategories = topLevelCategoryNames
        .map(name => categories.find(c => c.name === name))
        .filter(Boolean); // Remove undefined if category not found

    return (
        <header id="new-header">
            {/* Top Navigation Bar */}
            <div className="top-nav">
                <div className="logo">
                    <Link to="/" onClick={closeMobileMenu}>
                        <div className="logo-box">CKBV</div>
                        <div className="logo-text">
                            <span>CHỨNG KHOÁN BỀN VỮNG</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="nav-actions">
                    <DropdownMenu title="Phân tích ngành" items={groupedCategories} />
                    {otherCategories.map(category => (
                        <CategoryLink key={category.id} category={category} />
                    ))}
                </div>

                {/* Mobile Hamburger Button */}
                <button className="hamburger-btn" onClick={toggleMobileMenu}>
                    ☰
                </button>
            </div>

            {/* Mobile Menu Overlay & Drawer */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>
            <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <button className="close-btn" onClick={closeMobileMenu}>×</button>
                </div>
                <div className="mobile-nav-links">
                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-header">
                            Phân tích ngành
                        </div>
                        <div className="mobile-dropdown-content">
                            {groupedCategories.map(item => (
                                <Link
                                    key={item.id}
                                    to={`/category/${item.slug}`}
                                    className="mobile-nav-link"
                                    onClick={closeMobileMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {otherCategories.map(category => (
                        <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-image">
                    <img
                        src={stockGirlImg}
                        alt="Student working on laptop"
                    />
                </div>
                <div className="hero-content">
                    <div className="breadcrumbs">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" alt="Zalo hỗ trợ" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                        Zalo hỗ trợ: 0395.888.619
                    </div>
                    <div className="subheading">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="Youtube" style={{ width: '20px', height: '15px', marginRight: '5px' }} />Youtube: Chứng khoán bền vững
                    </div>
                    <h1 className="main-heading">
                        CHỨNG KHOÁN BỀN VỮNG
                    </h1>
                    <p className="hero-description">
                        "Mọi người được ngồi dưới bóng râm ngày hôm nay là bởi có người đã trồng cây rất lâu trước đó" - Warren Buffett
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
