const db = require('./config/db');
const slugify = require('slugify');

const cleanAndReseed = async () => {
    try {
        console.log('Cleaning dummy data...');
        // Delete posts that start with "Bài viết mẫu"
        await db.query('DELETE FROM posts WHERE title LIKE "Bài viết mẫu%"');
        console.log('Deleted previous dummy posts.');

        console.log('Seeding new dummy data with older dates...');
        const [categories] = await db.query('SELECT id, name FROM categories');

        // Date in the past (e.g., 2022)
        const pastDate = new Date('2022-01-01');

        for (const cat of categories) {
            // Skip "Uncategorized" if that's where original posts are, or just add to all.
            // User wants "other pages" to have fake data.
            // If we add to all, but set date to past, Home page (sorted by newest) will show original posts first (assuming they have newer dates).
            // Original posts from seedContent.js don't specify date, so they get CURRENT_TIMESTAMP.
            // So if we insert dummy posts with 2022 date, they will be at the bottom.

            console.log(`Generating posts for category: ${cat.name}`);
            for (let i = 1; i <= 30; i++) {
                const title = `Bài viết mẫu ${i} - ${cat.name}`;
                const slug = slugify(title, { lower: true, strict: true });
                const excerpt = `Đây là đoạn trích mẫu cho bài viết số ${i} thuộc danh mục ${cat.name}. Nội dung này được tạo tự động.`;
                const content = `<p>${excerpt}</p><p>Lorem ipsum...</p>`;
                const thumbnail_url = 'https://alias.vn/wp-content/uploads/2022/07/cropped-banner_2-1.png';

                const [existing] = await db.query('SELECT id FROM posts WHERE slug = ?', [slug]);
                if (existing.length === 0) {
                    await db.query(
                        'INSERT INTO posts (title, slug, excerpt, content, thumbnail_url, category_id, author_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [title, slug, excerpt, content, thumbnail_url, cat.id, 1, pastDate]
                    );
                }
            }
        }

        console.log('Reseeding complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

cleanAndReseed();
