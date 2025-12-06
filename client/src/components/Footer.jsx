import React from 'react';

const Footer = () => {
    return (
        <footer id="site-footer" style={{ backgroundColor: 'rgb(0, 32, 64)', color: '#fff', padding: '60px 0 20px', fontSize: '14px' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>

                    {/* Column 1: Services */}
                    <div className="footer-col">
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Dịch vụ</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Tư vấn đầu tư</a></li>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Đào tạo đầu tư</a></li>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Phân tích vĩ mô</a></li>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Phân tích báo cáo tài chính doanh nghiệp</a></li>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Phân tích kỹ thuật</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Company */}
                    <div className="footer-col">
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Công ty</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Về chúng tôi</a></li>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Blogs</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Term of use */}
                    <div className="footer-col">
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Điều khoản sử dụng</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Chính sách bảo mật</a></li>
                            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Điều khoản sử dụng</a></li>
                        </ul>
                    </div>

                    {/* Column 4: ZOOZOOSTUDIO */}
                    <div className="footer-col">
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>CHỨNG KHOÁN BỀN VỮNG</h3>
                        <div className="social-icons" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                            <a href="#" style={{ color: '#fff', fontSize: '20px' }}><i className="fa fa-facebook"></i></a>
                            <a href="#" style={{ color: '#fff', fontSize: '20px' }}><i className="fa fa-instagram"></i></a>
                            <a href="#" style={{ color: '#fff', fontSize: '20px' }}><i className="fa fa-linkedin"></i></a>
                            <a href="#" style={{ color: '#fff', fontSize: '20px' }}><i className="fa fa-youtube-play"></i></a>
                        </div>
                        <div className="contact-info" style={{ color: '#ccc', lineHeight: '1.8' }}>
                            <p style={{ margin: '0 0 10px' }}>chungkhoanbenvung.com@gmail.com</p>
                            <p style={{ margin: '0 0 10px' }}>sale.chungkhoanbenvung@gmail.com</p>
                            <p style={{ margin: '0 0 10px' }}>Zalo: 0395.888.619</p>
                            <p style={{ margin: '0 0 10px' }}>LK VA03A Khu đô thị Hoàng Thành Villas, Đại Mỗ, Hà Nội</p>

                        </div>
                    </div>
                </div>

                <div className="copyright" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#999', fontSize: '13px' }}>
                    <span>Copyright 2025 © CHUNGKHOANBENVUNG</span>
                    {/* Keeping the Back to Top link but styling it to fit */}
                    <a href="#top" style={{ color: '#999', textDecoration: 'none' }}>Lên đầu trang ↑</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
