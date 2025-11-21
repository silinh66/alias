const db = require('./config/db');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        const username = 'admin';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length > 0) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        await db.query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', [
            username,
            hashedPassword,
            'admin'
        ]);

        console.log('Admin user created successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
