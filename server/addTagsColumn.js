const db = require('./config/db');

const addTagsColumn = async () => {
    try {
        console.log('Checking for tags column...');
        const [columns] = await db.query("SHOW COLUMNS FROM posts LIKE 'tags'");

        if (columns.length === 0) {
            console.log('Adding tags column...');
            await db.query("ALTER TABLE posts ADD COLUMN tags TEXT");
            console.log('Tags column added successfully.');
        } else {
            console.log('Tags column already exists.');
        }
    } catch (error) {
        console.error('Error adding tags column:', error);
    } finally {
        process.exit(0);
    }
};

addTagsColumn();
