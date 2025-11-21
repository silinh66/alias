const db = require('./config/db');

const checkPosts = async () => {
    try {
        const [posts] = await db.query('SELECT id, title, thumbnail_url, created_at FROM posts ORDER BY created_at DESC LIMIT 10');
        console.log(posts);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkPosts();
