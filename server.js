const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 AS ok');
        res.json({ status: 'success', message: 'SERVER AND DB OK', data: rows[0] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message, data: null });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT ${process.env.PORT}`);
});