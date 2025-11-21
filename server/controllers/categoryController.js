const db = require('../config/db');
const slugify = require('slugify');

exports.getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories');
        res.json({ categories });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (categories.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.json(categories[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name, slug } = req.body;
    const newSlug = slug || slugify(name, { lower: true, strict: true });
    try {
        const [result] = await db.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, newSlug]);
        res.status(201).json({ message: 'Category created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { name, slug } = req.body;
    const newSlug = slug || slugify(name, { lower: true, strict: true });
    try {
        await db.query('UPDATE categories SET name = ?, slug = ? WHERE id = ?', [name, newSlug, req.params.id]);
        res.json({ message: 'Category updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
