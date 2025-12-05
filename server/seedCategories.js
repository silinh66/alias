const db = require('./config/db');
const slugify = require('slugify');

const categories = [
    'Bài học đầu tư',
    'Bài học đầu tư',
    'Bất động sản KCN',
    'Chiến lược đầu tư',
    'Cổ phiếu chất riêng',
    'Khuyến nghị cổ phiếu',
    'Năng lượng',
    'Ngành bảo hiểm',
    'Ngành bất động sản',
    'Ngành cao su',
    'Ngành chứng khoán',
    'Ngành dầu khí',
    'Ngành dệt may',
    'Ngành ngân hàng',
    'Ngành phân đạm',
    'Ngành thép',
    'Ngành vận tải – cảng biển',
    'Ngành xây dựng – VLXĐ',
    'Nghiệp vụ tại VPS',
    'Phân tích cơ bản',
    'Phân tích ngành',
    'Thủy sản',
    'Tìm đối tác',
    'Vĩ mô các ngành'
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
