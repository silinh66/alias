import React from 'react';

const Sidebar = () => {
    return (
        <aside id="secondary" className="sidebar c-4-12" role="complementary">
            <div id="sidebars" className="sidebar">
                <div className="sidebar_list">
                    <div id="block-6" className="widget widget_block">
                        <div className="wp-block-group">
                            <div className="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
                                <div className="wp-block-group">
                                    <div className="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
                                        <h2 className="wp-block-heading">Phân tích ngành</h2>
                                        <ul className="wp-block-categories-list wp-block-categories">
                                            <li className="cat-item"><a href="#">Bất động sản KCN</a></li>
                                            <li className="cat-item"><a href="#">Ngành ngân hàng</a></li>
                                            <li className="cat-item"><a href="#">Ngành thép</a></li>
                                            {/* Add more categories */}
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
                                <input className="wp-block-search__input" id="wp-block-search__input-1" placeholder="" value="" type="search" name="s" required="" />
                                <button aria-label="Tìm kiếm" className="wp-block-search__button wp-element-button" type="submit">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                    <div id="block-21" className="widget widget_block">
                        <h2 className="wp-block-heading">Liên hệ tư vấn</h2>
                    </div>
                    <div id="block-34" className="widget widget_block widget_text">
                        <p>Zalo/call: 0366.282.656 hoặc 0345.666.656.<br />Nhóm zalo tư vấn<a href="https://zalo.me/g/ukgnds502">: <strong><mark style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} className="has-inline-color has-vivid-purple-color">https://zalo.me/g/ukgnds502</mark></strong></a></p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
