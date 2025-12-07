import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="site-footer">
            <div className="footer-container">
                <div className="footer-grid">

                    {/* Column 1: Services */}
                    <div className="footer-col">
                        <h3>Dịch vụ</h3>
                        <ul>
                            <li><a href="#">Tư vấn đầu tư</a></li>
                            <li><a href="#">Đào tạo đầu tư</a></li>
                            <li><a href="#">Phân tích vĩ mô</a></li>
                            <li><a href="#">Phân tích báo cáo tài chính doanh nghiệp</a></li>
                            <li><a href="#">Phân tích kỹ thuật</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Company */}
                    <div className="footer-col">
                        <h3>Công ty</h3>
                        <ul>
                            <li><a href="#">Về chúng tôi</a></li>
                            <li><a href="#">Blogs</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Term of use */}
                    <div className="footer-col">
                        <h3>Điều khoản sử dụng</h3>
                        <ul>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Điều khoản sử dụng</a></li>
                        </ul>
                    </div>

                    {/* Column 4: ZOOZOOSTUDIO */}
                    <div className="footer-col">
                        <h3>CHỨNG KHOÁN BỀN VỮNG</h3>
                        <div className="social-icons">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-instagram"></i></a>
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                            <a href="#"><i className="fa fa-youtube-play"></i></a>
                        </div>
                        <div className="contact-info">
                            <p>chungkhoanbenvung.com@gmail.com</p>
                            <p>sale.chungkhoanbenvung@gmail.com</p>
                            <p>Zalo: 0395.888.619</p>
                            <p>LK VA03A Khu đô thị Hoàng Thành Villas, Đại Mỗ, Hà Nội</p>

                        </div>
                    </div>
                </div>

                <div className="copyright">
                    <span>Copyright 2025 © CHUNGKHOANBENVUNG</span>
                    {/* Keeping the Back to Top link but styling it to fit */}
                    <a href="#top" className="back-to-top">Lên đầu trang ↑</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
