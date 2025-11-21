const db = require('./config/db');
const slugify = require('slugify');

const categories = [
    'Phân tích ngành',
    'Khuyến nghị cổ phiếu',
    'Vĩ mô các ngành',
    'Đầu tư BĐS 2025 – 2026',
    'Tìm đối tác',
    'Nghiệp vụ tại VPS'
];

const seedCategories = async () => {
    try {
        console.log('Seeding categories...');

        for (const name of categories) {
            const slug = slugify(name, { lower: true, strict: true });

            // Check if exists
            const [existing] = await db.query('SELECT id FROM categories WHERE slug = ?', [slug]);
            if (existing.length === 0) {
                await db.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, slug]);
                console.log(`Inserted: ${name}`);
            } else {
                console.log(`Skipped (exists): ${name}`);
            }
        }

        console.log('Category seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedCategories();
