const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRoutes);

// Test DB Connection
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1');
        res.json({ status: 'ok', db: 'connected' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

const fs = require('fs');

// ... (imports)

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Inject OG tags for post details
app.get('/post/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const [posts] = await db.query('SELECT * FROM posts WHERE slug = ?', [slug]);

        const filePath = path.resolve(__dirname, '../client/dist/index.html');
        let html = fs.readFileSync(filePath, 'utf8');

        if (posts.length > 0) {
            const post = posts[0];
            const title = `${post.title} - Chứng khoán bền vững`;
            const description = post.excerpt ? post.excerpt.substring(0, 160) : '';
            const image = post.thumbnail_url && post.thumbnail_url.startsWith('http')
                ? post.thumbnail_url
                : `${process.env.API_URL || 'https://chungkhoanbenvung.com'}${post.thumbnail_url}`;

            // Replace placeholder or inject tags
            html = html.replace('<title>Chứng khoán bền vững</title>', `<title>${title}</title>`);
            html = html.replace('</head>', `
                <meta property="og:title" content="${title}" />
                <meta property="og:description" content="${description}" />
                <meta property="og:image" content="${image}" />
                <meta property="og:url" content="https://chungkhoanbenvung.com/post/${slug}" />
                <meta property="og:type" content="article" />
                </head>`);
        }

        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Catch-all route to serve index.html
// Catch-all route to serve index.html
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
