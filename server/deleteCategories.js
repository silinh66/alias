const db = require('./config/db');

const categoriesToDelete = [
    'Cập nhật kết quả kinh doanh',
    'Đầu tư BĐS 2025 – 2026'
];

const deleteCategories = async () => {
    try {
        console.log('Deleting categories...');
        for (const name of categoriesToDelete) {
            await db.query('DELETE FROM categories WHERE name = ?', [name]);
            console.log(`Deleted: ${name}`);
        }
        console.log('Deletion complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

deleteCategories();
