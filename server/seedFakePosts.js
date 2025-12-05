const slugify = require('slugify');

// Use the generated image path (assuming it will be moved to uploads or served correctly)
// For now, we'll use a placeholder URL that points to the uploads directory if we move it there,
// or a relative path if we serve it from client assets.
// Since I can't easily move files between client/server in this environment without full paths,
// I will assume the image is available at a specific URL or use a placeholder.
// I'll use a placeholder for now and we can update it.
const personImage = '/uploads/person_portrait.png';

const postContent = `
<div class="post-detail-content">
    <p><strong>Theo báo cáo của Tổng cục Thống kê, vốn đầu tư thực hiện từ nguồn ngân sách Nhà nước tháng 9 ước đạt 57,5 nghìn tỷ đồng, tăng 33,5% so với cùng kỳ năm trước. Tính chung 9 tháng năm 2023, vốn đầu tư thực hiện từ nguồn ngân sách Nhà nước ước đạt 415,5 nghìn tỷ đồng, bằng 57,4% kế hoạch năm và tăng 23,5% so với cùng kỳ năm trước (cùng kỳ năm 2022 bằng 55,9% và tăng 20,9%).</strong></p>

    <h3>Kế hoạch giải ngân vốn đầu tư công 2025</h3>
    <div class="chart-container bar-chart">
        <div class="bar-group">
            <div class="bar" style="height: 40%;" data-value="460,855"><span class="year">2020</span><span class="value">460,855</span></div>
            <div class="bar" style="height: 50%;" data-value="513,912"><span class="year">2021</span><span class="value">513,912</span></div>
            <div class="bar" style="height: 60%;" data-value="580,000"><span class="year">2022</span><span class="value">580,000</span></div>
            <div class="bar" style="height: 80%;" data-value="711,684"><span class="year">2023</span><span class="value">711,684</span></div>
            <div class="bar" style="height: 90%;" data-value="750,000"><span class="year">2024</span><span class="value">750,000</span></div>
            <div class="bar active" style="height: 100%;" data-value="850,000"><span class="year">2025 (KH)</span><span class="value">850,000</span></div>
        </div>
        <div class="chart-legend">Đơn vị: Tỷ đồng</div>
    </div>

    <p><i>(*) Số liệu 2025 là kế hoạch dự kiến.</i></p>

    <h3>Tiến độ giải ngân vốn đầu tư công 9T/2025</h3>
    <table class="data-table orange-header">
        <thead>
            <tr>
                <th>Thông tin</th>
                <th>9T/2024</th>
                <th>9T/2025</th>
                <th>Tăng trưởng</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Vốn ngân sách nhà nước</td>
                <td>415 nghìn tỷ</td>
                <td>415 nghìn tỷ</td>
                <td>23.5%</td>
            </tr>
        </tbody>
    </table>

    <p>Trong 9T/2025, GDP ước tính tăng 4,24% so với cùng kỳ năm trước, chỉ cao hơn tốc độ tăng 2,19% và 2,12% của cùng kỳ các năm 2020 và 2021 trong giai đoạn 2011-2025. Trong đó, khu vực nông, lâm nghiệp và thủy sản tăng 3,43%, đóng góp 9,16%; khu vực công nghiệp và xây dựng tăng 2,41%, đóng góp 22,27%; khu vực dịch vụ tăng 6,32%, đóng góp 68,57%.</p>

    <h3>Tăng trưởng GDP 9T/2025</h3>
    <div class="chart-container mixed-chart">
        <!-- Placeholder for complex mixed chart, simplified as text/image representation -->
        <div class="chart-placeholder">
            <div class="chart-note">
                <span class="red-box">Lũy kế 9T/2025, GDP ước đạt 4,24% (cùng kỳ 8,85%)</span>
            </div>
            <div class="chart-visuals">
                <!-- Simplified visual representation -->
                <div class="sector">Nông, lâm nghiệp: +3.43%</div>
                <div class="sector">Công nghiệp, xây dựng: +2.41%</div>
                <div class="sector">Dịch vụ: +6.32%</div>
            </div>
        </div>
    </div>

    <h3>Các dự án đầu tư công trọng điểm</h3>
    <table class="data-table orange-header">
        <thead>
            <tr>
                <th>Dự án</th>
                <th>Tổng mức đầu tư</th>
                <th>Tiến độ</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cao tốc Bắc - Nam phía Đông</td>
                <td>146.990 tỷ</td>
                <td>Hoàn thành 634km, đang thi công 12 dự án thành phần giai đoạn 2 (2021-2025)</td>
            </tr>
            <tr>
                <td>Sân bay Long Thành - Giai đoạn 1</td>
                <td>109.111 tỷ</td>
                <td>Dự kiến hoàn thành năm 2026</td>
            </tr>
            <tr>
                <td>Vành đai 4 - Vùng Thủ đô</td>
                <td>85.813 tỷ</td>
                <td>Khởi công 6/2023, dự kiến hoàn thành 2027</td>
            </tr>
            <tr>
                <td>Vành đai 3 - TP.HCM</td>
                <td>75.378 tỷ</td>
                <td>Khởi công 6/2023, dự kiến hoàn thành 2026</td>
            </tr>
             <tr>
                <td>Cao tốc Biên Hòa - Vũng Tàu</td>
                <td>17.837 tỷ</td>
                <td>Dự kiến hoàn thành năm 2026</td>
            </tr>
        </tbody>
    </table>

    <h3>Các trạm thu phí BOT của HHV</h3>
    <table class="data-table orange-header small-text">
        <thead>
            <tr>
                <th>Tên trạm</th>
                <th>Doanh thu 2022 (tỷ đồng)</th>
                <th>Doanh thu 2023 (tỷ đồng)</th>
                <th>Tăng trưởng</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Trạm Đèo Cả (Phú Yên)</td>
                <td>450.5</td>
                <td>510.2</td>
                <td>13.2%</td>
            </tr>
            <tr>
                <td>Trạm An Dân (Phú Yên)</td>
                <td>210.3</td>
                <td>245.8</td>
                <td>16.9%</td>
            </tr>
            <tr>
                <td>Trạm Cù Mông (Bình Định)</td>
                <td>320.1</td>
                <td>365.4</td>
                <td>14.1%</td>
            </tr>
             <tr>
                <td>Trạm Ninh Lộc (Khánh Hòa)</td>
                <td>280.9</td>
                <td>310.5</td>
                <td>10.5%</td>
            </tr>
            <tr>
                <td>Cao tốc Bắc Giang - Lạng Sơn</td>
                <td>410.2</td>
                <td>460.7</td>
                <td>12.3%</td>
            </tr>
        </tbody>
    </table>

    <h3>2 BOT được gỡ vướng mắc</h3>
    <div class="highlight-section">
        <div class="person-image">
            <img src="${personImage}" alt="Official" />
            <p class="caption">Ông Thống - Bộ trưởng GTVT phát biểu</p>
        </div>
        <div class="highlight-content">
            <ul>
                <li><strong>Chính phủ thông qua tờ trình tháo gỡ vướng mắc cho dự án BOT</strong></li>
                <li>Ngày 20/09/2025, Chính phủ thông qua tờ trình Quốc hội về giải pháp xử lý khó khăn, vướng mắc tại một số dự án đầu tư kết cấu hạ tầng giao thông theo hình thức BOT. Trong đó, đề xuất dùng ngân sách nhà nước mua lại 2 dự án BOT doanh thu sụt giảm không có khả năng phục hồi.</li>
                <li>Theo tính toán sơ bộ, nguồn vốn nhà nước cần bố trí để xử lý 2 dự án này khoảng 10.340 tỷ đồng. Việc này sẽ giúp doanh nghiệp hoàn vốn, có nguồn lực để tái đầu tư các dự án mới.</li>
            </ul>
            <div class="red-highlight-box">
                <p>[1] Dự án Hầm đường bộ qua Đèo Cả (được bổ sung)</p>
                <p>[2] Dự án Bắc Giang - Lạng Sơn (được bổ sung 4.600 tỷ)</p>
            </div>
        </div>
    </div>

    <h3>Các dự án xây lắp HHV đang triển khai</h3>
    <table class="data-table orange-header">
        <thead>
            <tr>
                <th>Dự án</th>
                <th>Giá trị gói thầu (tỷ đồng)</th>
                <th>Thời gian thực hiện</th>
                <th>Sản lượng tích lũy (tỷ đồng)</th>
                <th>Ước tính doanh thu 2025 (tỷ đồng)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cao tốc Quảng Ngãi - Hoài Nhơn</td>
                <td>14.500</td>
                <td>2023 - 2026</td>
                <td>3.500</td>
                <td>4.500</td>
            </tr>
            <tr>
                <td>Dự án đường ven biển Bình Định</td>
                <td>1.200</td>
                <td>2023 - 2025</td>
                <td>450</td>
                <td>500</td>
            </tr>
            <tr>
                <td>Dự án nâng cấp, mở rộng đèo Prenn</td>
                <td>550</td>
                <td>2023 - 2024</td>
                <td>300</td>
                <td>250</td>
            </tr>
             <tr>
                <td>Cao tốc Cam Lâm - Vĩnh Hảo</td>
                <td>1.800</td>
                <td>2021 - 2024</td>
                <td>1.500</td>
                <td>300</td>
            </tr>
             <tr>
                <td>Các dự án khác (Bảo trì, vận hành...)</td>
                <td>500</td>
                <td>2025</td>
                <td>-</td>
                <td>500</td>
            </tr>
        </tbody>
    </table>
    <div class="red-footer-note">
        <p>HHV: Hưởng lợi lớn từ đầu tư công và gỡ khó BOT</p>
    </div>
</div>
`;

const db = require('./config/db');

// ... (previous code)

const seedFakePosts = async () => {
    // No need to create a new connection, use the pool
    try {
        console.log('Connected to database.');

        // 1. Ensure Category Exists
        const categoryName = 'Khuyến nghị cổ phiếu';
        const categorySlug = slugify(categoryName, { lower: true, strict: true, locale: 'vi' });

        let [rows] = await db.execute('SELECT id FROM categories WHERE slug = ?', [categorySlug]);
        let categoryId;

        if (rows.length > 0) {
            categoryId = rows[0].id;
            console.log(`Category '${categoryName}' found with ID: ${categoryId}`);
        } else {
            const [result] = await db.execute('INSERT INTO categories (name, slug) VALUES (?, ?)', [categoryName, categorySlug]);
            categoryId = result.insertId;
            console.log(`Category '${categoryName}' created with ID: ${categoryId}`);
        }

        // 2. Create Post
        const postTitle = 'TOP 3 cổ phiếu hưởng lợi đầu tư công.';
        const postSlug = 'top-3-co-phieu-huong-loi-dau-tu-cong';
        const postExcerpt = 'Kế hoạch giải ngân vốn đầu tư công 2025 tăng mạnh, cùng với việc tháo gỡ vướng mắc cho các dự án BOT sẽ là động lực lớn cho nhóm cổ phiếu xây dựng hạ tầng.';
        const thumbnail = '/uploads/chart_placeholder.jpg'; // Placeholder thumbnail
        const tags = 'Cổ phiếu HHV, Cổ phiếu NLG, cổ phiếu szc, Đầu tư công, HHV, nlg, NVL, szc';
        const views = 3638;

        // Check if post exists
        [rows] = await db.execute('SELECT id FROM posts WHERE slug = ?', [postSlug]);

        if (rows.length > 0) {
            console.log('Post already exists, updating content...');
            await db.execute(
                'UPDATE posts SET title = ?, content = ?, excerpt = ?, category_id = ?, thumbnail_url = ?, tags = ?, views = ?, created_at = NOW() WHERE slug = ?',
                [postTitle, postContent, postExcerpt, categoryId, thumbnail, tags, views, postSlug]
            );
        } else {
            console.log('Creating new post...');
            await db.execute(
                'INSERT INTO posts (title, slug, content, excerpt, category_id, thumbnail_url, tags, views, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [postTitle, postSlug, postContent, postExcerpt, categoryId, thumbnail, tags, views]
            );
        }

        console.log('Fake post seeded successfully.');

    } catch (error) {
        console.error('Error seeding fake posts:', error);
    } finally {
        // Pool doesn't strictly need to be closed for a script, but good practice if we want to exit immediately
        // However, db.end() might not be available on the promise wrapper directly in the same way or might hang if other connections are open.
        // For a script, letting the process exit is often fine, or we can try db.end() if available.
        process.exit(0);
    }
};

seedFakePosts();
