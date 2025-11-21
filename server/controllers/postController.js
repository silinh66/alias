const db = require('../config/db');

exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const categorySlug = req.query.category_slug;

        let query = 'SELECT p.*, c.name as category_name, u.username as author_name FROM posts p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN users u ON p.author_id = u.id';
        let countQuery = 'SELECT COUNT(*) as count FROM posts p LEFT JOIN categories c ON p.category_id = c.id';
        const params = [];
        const countParams = [];

        if (categorySlug) {
            query += ' WHERE c.slug = ?';
            countQuery += ' WHERE c.slug = ?';
            params.push(categorySlug);
            countParams.push(categorySlug);
        }

        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [posts] = await db.query(query, params);
        const [countResult] = await db.query(countQuery, countParams);
        const totalPosts = countResult[0].count;

        res.json({
            posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostBySlug = async (req, res) => {
    try {
        const [posts] = await db.query(
            'SELECT p.*, c.name as category_name, u.username as author_name FROM posts p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN users u ON p.author_id = u.id WHERE p.slug = ?',
            [req.params.slug]
        );

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Increment views
        await db.query('UPDATE posts SET views = views + 1 WHERE id = ?', [posts[0].id]);

        res.json(posts[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    const { title, slug, excerpt, content, thumbnail_url, category_id } = req.body;
    const author_id = req.userId;

    try {
        const [result] = await db.query(
            'INSERT INTO posts (title, slug, excerpt, content, thumbnail_url, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, slug, excerpt, content, thumbnail_url, category_id, author_id]
        );
        res.status(201).json({ id: result.insertId, message: 'Post created' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePost = async (req, res) => {
    const { title, slug, excerpt, content, thumbnail_url, category_id } = req.body;
    const { id } = req.params;

    try {
        await db.query(
            'UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, thumbnail_url = ?, category_id = ? WHERE id = ?',
            [title, slug, excerpt, content, thumbnail_url, category_id, id]
        );
        res.json({ message: 'Post updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
