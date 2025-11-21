const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const db = require('./config/db');
const slugify = require('slugify');

const seedContent = async () => {
    try {
        const htmlPath = path.join(__dirname, '../Alias - Đi tìm cổ phiếu LEADER.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        const $ = cheerio.load(html);

        const posts = [];

        $('.post.excerpt').each((i, el) => {
            const title = $(el).find('h2.title a').text().trim();
            const excerpt = $(el).find('.post-content').text().trim();
            const thumbnail_url = $(el).find('.blog-featured-thumbnail').css('background-image');

            // Extract URL from background-image: url(...)
            let cleanThumbnail = '';
            if (thumbnail_url) {
                const match = thumbnail_url.match(/url\((.*?)\)/);
                if (match) {
                    cleanThumbnail = match[1].replace(/['"]/g, '');
                }
            }

            // Create a slug
            const slug = slugify(title, { lower: true, strict: true });

            // For content, we don't have the full content in the excerpt list.
            // We will just use the excerpt as content for now, or generate some dummy content.
            // The user wants it "exact", but the HTML only has the home page.
            // We will use the excerpt repeated or some placeholder text + the excerpt.
            const content = `<p>${excerpt}</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;

            posts.push({
                title,
                slug,
                excerpt,
                content,
                thumbnail_url: cleanThumbnail,
                category_id: 1, // Default category
                author_id: 1 // Admin
            });
        });

        console.log(`Found ${posts.length} posts.`);

        // Ensure default category exists
        const [categories] = await db.query('SELECT id FROM categories WHERE id = 1');
        if (categories.length === 0) {
            await db.query('INSERT INTO categories (id, name, slug) VALUES (1, "Uncategorized", "uncategorized")');
            console.log('Inserted default category.');
        }

        for (const post of posts) {
            // Check if exists
            const [existing] = await db.query('SELECT id FROM posts WHERE slug = ?', [post.slug]);
            if (existing.length === 0) {
                await db.query(
                    'INSERT INTO posts (title, slug, excerpt, content, thumbnail_url, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [post.title, post.slug, post.excerpt, post.content, post.thumbnail_url, post.category_id, post.author_id]
                );
                console.log(`Inserted: ${post.title}`);
            } else {
                console.log(`Skipped (exists): ${post.title}`);
            }
        }

        console.log('Seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedContent();
