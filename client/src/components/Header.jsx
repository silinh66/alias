import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../config';
import stockGirlImg from './stock_girl.png';
const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [categories, setCategories] = useState([]);

    const industryAnalysisCategories = [
        'Bất động sản KCN',
        'Năng lượng',
        'Ngành bảo hiểm',
        'Ngành bất động sản',
        'Ngành cao su',
        'Ngành chứng khoán',
        'Ngành dầu khí',
        'Ngành dệt may',
        'Ngành ngân hàng',
        'Ngành phân đạm',
        'Ngành thép',
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

    const CategoryLink = ({ category }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <Link
                to={`/category/${category.slug}`}
                style={{
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: isHovered ? '#2c4a6b' : 'transparent',
                    transition: 'background-color 0.3s',
                    borderRadius: '0px',
                    whiteSpace: 'nowrap'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {category.name}
            </Link>
        );
    };

    const DropdownMenu = ({ title, items }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <button
                    style={{
                        backgroundColor: isOpen ? '#2c4a6b' : 'transparent',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    {title} <span style={{ fontSize: '10px' }}>▼</span>
                </button>
                {isOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        minWidth: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px 0',
                        borderRadius: '8px', // Added border radius
                        overflow: 'hidden' // Ensure content respects border radius
                    }}>
                        {items.sort(() => Math.random() - 0.5).map(item => (
                            <Link
                                key={item.id}
                                to={`/category/${item.slug}`}
                                style={{
                                    color: '#333',
                                    textDecoration: 'none',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    display: 'block',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const groupedCategories = categories.filter(c => industryAnalysisCategories.includes(c.name));

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
        <header id="new-header" style={{ fontFamily: 'sans-serif' }}>
            {/* Top Navigation Bar */}
            <div className="top-nav" style={{ backgroundColor: '#002040', color: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo">
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <div style={{ border: '1px solid #fff', padding: '5px 10px', marginRight: '10px' }}>CKBV</div>
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', lineHeight: '1.2' }}>
                            <span>CHỨNG KHOÁN BỀN VỮNG</span>
                        </div>
                    </Link>
                </div>
                <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <DropdownMenu title="Phân tích ngành" items={groupedCategories} />
                    {otherCategories.map(category => (
                        <CategoryLink key={category.id} category={category} />
                    ))}
                    {/* <button style={{ backgroundColor: '#2c4a6b', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginLeft: '15px' }}>
                        Programmes and courses
                    </button> */}
                    {/* <div className="icons" style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '18px' }}>
                        <span style={{ cursor: 'pointer' }}>🔍</span>
                    </div> */}
                </div>
            </div>

            {/* Hero Section */}
            <div className="hero-section" style={{ backgroundColor: '#002040', color: '#fff', padding: '60px 40px', display: 'flex', gap: '60px', alignItems: 'center' }}>
                <div className="hero-image" style={{ flex: '0 0 400px', marginLeft: '120px' }}>
                    <img
                        src={stockGirlImg}
                        alt="Student working on laptop"
                        style={{
                            width: '340px', borderRadius: '4px', display: 'block',
                            height: '320px',
                            //reverse image
                            transform: 'rotateY(180deg)',

                        }}
                    />
                </div>
                <div className="hero-content" style={{ flex: '1', maxWidth: '600px' }}>
                    <div className="breadcrumbs" style={{ marginBottom: '10px', marginTop: '40px', fontSize: '14px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" alt="Zalo hỗ trợ" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                        Zalo hỗ trợ: 0395.888.619
                    </div>
                    <div className="subheading" style={{ fontSize: '16px', color: '#8faecb', marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="Youtube" style={{ width: '20px', height: '15px', marginRight: '5px' }} />Youtube: Chứng khoán bền vững
                    </div>
                    <h1 style={{ fontSize: '40px', fontWeight: 'bold', margin: '0 0 30px 0', fontFamily: 'times new roman', color: '#fff' }}>
                        CHỨNG KHOÁN BỀN VỮNG
                    </h1>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#d0e0f0' }}>
                        "Mọi người được ngồi dưới bóng râm ngày hôm nay là bởi có người đã trồng cây rất lâu trước đó" - Warren Buffett
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
