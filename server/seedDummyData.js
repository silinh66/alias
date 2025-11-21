const db = require('./config/db');
const slugify = require('slugify');

const seedDummyData = async () => {
    try {
        console.log('Seeding dummy data...');

        const [categories] = await db.query('SELECT id, name FROM categories');

        for (const cat of categories) {
            console.log(`Generating posts for category: ${cat.name}`);
            for (let i = 1; i <= 30; i++) {
                const title = `Bài viết mẫu ${i} - ${cat.name}`;
                const slug = slugify(title, { lower: true, strict: true });
                const excerpt = `Đây là đoạn trích mẫu cho bài viết số ${i} thuộc danh mục ${cat.name}. Nội dung này được tạo tự động để kiểm tra chức năng phân trang và lọc.`;
                const content = `<p>${excerpt}</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`;
                const thumbnail_url = 'https://alias.vn/wp-content/uploads/2022/07/cropped-banner_2-1.png'; // Placeholder image

                // Check if exists to avoid duplicates if run multiple times
                const [existing] = await db.query('SELECT id FROM posts WHERE slug = ?', [slug]);
                if (existing.length === 0) {
                    await db.query(
                        'INSERT INTO posts (title, slug, excerpt, content, thumbnail_url, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [title, slug, excerpt, content, thumbnail_url, cat.id, 1] // Assuming admin id 1
                    );
                }
            }
        }

        console.log('Dummy data seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDummyData();
