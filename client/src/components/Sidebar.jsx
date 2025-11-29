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
                                        <h2 className="wp-block-heading">Danh mục</h2>
                                        <ul className="wp-block-categories-list wp-block-categories">
                                            {categories.map(cat => (
                                                <li key={cat.id} className="cat-item">
                                                    <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="block-2" className="widget widget_block widget_search">
                        <form role="search" method="get" action="/" className="wp-block-search__button-outside wp-block-search__text-button wp-block-search">
                            <label className="wp-block-search__label" htmlFor="wp-block-search__input-1">Tìm kiếm</label>
                            <div className="wp-block-search__inside-wrapper ">
                                <input className="wp-block-search__input" id="wp-block-search__input-1" placeholder="" type="search" name="s" required="" />
                                <button aria-label="Tìm kiếm" className="wp-block-search__button wp-element-button" type="submit">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                    <div id="block-21" className="widget widget_block">
                        <h2 className="wp-block-heading">Liên hệ tư vấn</h2>
                    </div>
                    <div id="block-34" className="widget widget_block widget_text">
                        <p>Zalo/call: 0974432893.<br />Nhóm zalo tư vấn<a href="https://zalo.me/g/0974432893">: <strong><mark style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} className="has-inline-color has-vivid-purple-color">https://zalo.me/g/0974432893</mark></strong></a></p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
