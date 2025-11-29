import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Admin Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#333', color: '#fff', border: 'none' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
