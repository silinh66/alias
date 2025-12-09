import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { API_URL } from '../config';

const Sidebar = () => {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
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

    return (
        <aside id="secondary" className="sidebar c-4-12" role="complementary">
            <div id="sidebars" className="sidebar">
                <div className="sidebar_list">
                    <div id="block-6" className="widget widget_block">
                        <div className="wp-block-group">
                            <div className="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
                                <div className="wp-block-group">
                                    <div className="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
                                        <h2 className="wp-block-heading" style={{ color: 'rgb(0, 32, 64)', textTransform: 'uppercase' }}>Phân tích ngành</h2>
                                        <ul className="wp-block-categories-list wp-block-categories">
                                            {categories
                                                .filter(cat => ![
                                                    'Phân tích ngành',
                                                    'Khuyến nghị cổ phiếu',
                                                    'Vĩ mô các ngành',
                                                    'Nghiệp vụ tại VPS',
                                                    'Tìm đối tác',
                                                    'Cổ phiếu chất riêng',
                                                    'Chiến lược đầu tư',
                                                    'Phân tích cơ bản',
                                                    'Bài học đầu tư',
                                                    'Mở tài khoản chứng khoán'
                                                ].includes(cat.name))
                                                .sort((a, b) => {
                                                    const priorityOrder = [
                                                        'Ngành chứng khoán',
                                                        'Ngành bất động sản',
                                                        'Ngành ngân hàng',
                                                        'Ngành Bán lẻ',
                                                        'Ngành thép',
                                                        'Ngành dầu khí'
                                                    ];
                                                    const indexA = priorityOrder.indexOf(a.name);
                                                    const indexB = priorityOrder.indexOf(b.name);

                                                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                                                    if (indexA !== -1) return -1;
                                                    if (indexB !== -1) return 1;
                                                    return a.name.localeCompare(b.name);
                                                })
                                                .map(cat => (
                                                    <li key={cat.id} className="cat-item">
                                                        <Link to={`/category/${cat.slug}`} style={{ textTransform: 'uppercase' }}>{cat.name}</Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
