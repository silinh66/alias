const db = require('./config/db');
const slugify = require('slugify');

const seedRelatedPosts = async () => {
    try {
        console.log('Seeding related posts...');

        const relatedPosts = [
            {
                title: 'Dung Quất GĐ 2 bán cho ai ?',
                image: '/uploads/related_1.jpg' // Placeholder
            },
            {
                title: 'HAX – Mảng buôn xe MG đem lại trái ngọt.',
                image: '/uploads/related_2.jpg' // Placeholder
            },
            {
                title: 'CEO – Ẩn mình chờ thời.',
                image: '/uploads/related_3.jpg' // Placeholder
            }
        ];

        // Ensure category exists (we know it does from previous steps, but good to be safe)
        const categoryName = 'Khuyến nghị cổ phiếu';
        const categorySlug = slugify(categoryName, { lower: true, strict: true, locale: 'vi' });
        let [rows] = await db.execute('SELECT id FROM categories WHERE slug = ?', [categorySlug]);
        let categoryId;

        if (rows.length > 0) {
            categoryId = rows[0].id;
        } else {
            const [result] = await db.execute('INSERT INTO categories (name, slug) VALUES (?, ?)', [categoryName, categorySlug]);
            categoryId = result.insertId;
        }

        for (const post of relatedPosts) {
            const slug = slugify(post.title, { lower: true, strict: true, locale: 'vi' });

            // Check if exists
            const [existing] = await db.execute('SELECT id FROM posts WHERE slug = ?', [slug]);

            if (existing.length === 0) {
                await db.execute(
                    'INSERT INTO posts (title, slug, content, excerpt, category_id, thumbnail_url, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                    [post.title, slug, 'Nội dung bài viết liên quan...', 'Tóm tắt bài viết liên quan...', categoryId, post.image]
                );
                console.log(`Created related post: ${post.title}`);
            } else {
                console.log(`Related post already exists: ${post.title}`);
            }
        }

        console.log('Related posts seeded successfully.');

    } catch (error) {
        console.error('Error seeding related posts:', error);
    } finally {
        process.exit(0);
    }
};

seedRelatedPosts();
