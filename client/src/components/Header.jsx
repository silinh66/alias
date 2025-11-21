import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        if (path === '/' && currentPath === '/') return true;
        if (path !== '/' && currentPath.startsWith(path)) return true;
        return false;
    };

    return (
        <header id="site-header" role="banner">
            <div class="container clear">
                <div class="site-branding">
                    <h1 id="logo" class="site-title" itemprop="headline">
                        <Link to="/">Alias</Link>
                    </h1>
                    <div class="site-description">Đi tìm cổ phiếu LEADER</div>
                </div>
            </div>
            <div class="primary-navigation">
                <a href="#" id="pull" class="toggle-mobile-menu">Menu</a>
                <div class="container clear">
                    <nav id="navigation" class="primary-navigation mobile-menu-wrapper" role="navigation">
                        <ul id="menu-vi-mo" class="menu clearfix toggle-menu">
                            <li className={`menu-item ${isActive('/') ? 'current-menu-item' : ''}`}><Link to="/">Trang chủ</Link></li>
                            <li className={`menu-item menu-item-has-children ${isActive('/category/phan-tich-nganh') || isActive('/category/nganh-ngan-hang') || isActive('/category/nganh-bat-dong-san') ? 'current-menu-item' : ''}`}>
                                <Link to="/category/phan-tich-nganh">Phân tích ngành</Link>
                                <ul class="sub-menu toggle-submenu">
                                    <li className={`menu-item ${isActive('/category/nganh-ngan-hang') ? 'current-menu-item' : ''}`}><Link to="/category/nganh-ngan-hang">Ngành ngân hàng</Link></li>
                                    <li className={`menu-item ${isActive('/category/nganh-bat-dong-san') ? 'current-menu-item' : ''}`}><Link to="/category/nganh-bat-dong-san">Ngành bất động sản</Link></li>
                                </ul>
                                <span class="toggle-caret"><i class="feather-icon icon-plus"></i></span>
                            </li>
                            <li className={`menu-item ${isActive('/category/khuyen-nghi-co-phieu') ? 'current-menu-item' : ''}`}><Link to="/category/khuyen-nghi-co-phieu">Khuyến nghị cổ phiếu</Link></li>
                            <li className={`menu-item ${isActive('/category/vi-mo-cac-nganh') ? 'current-menu-item' : ''}`}><Link to="/category/vi-mo-cac-nganh">Vĩ mô các ngành</Link></li>
                            <li className={`menu-item ${isActive('/category/dau-tu-bds-2025-2026') ? 'current-menu-item' : ''}`}><Link to="/category/dau-tu-bds-2025-2026">Đầu tư BĐS 2025 – 2026</Link></li>
                            <li className={`menu-item ${isActive('/category/tim-doi-tac') ? 'current-menu-item' : ''}`}><Link to="/category/tim-doi-tac">Tìm đối tác</Link></li>
                            <li className={`menu-item ${isActive('/category/nghiep-vu-tai-vps') ? 'current-menu-item' : ''}`}><Link to="/category/nghiep-vu-tai-vps">Nghiệp vụ tại VPS</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
