const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());    

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'mydaportfolio',
  password: process.env.PGPASSWORD || 'tgr2003',
  port: process.env.PGPORT || 5432,
});


app.post('/messages', async (req, res) => {
    const {username, email, phone, message} = req.body;
    try{
        const result = await pool.query('INSERT INTO messages (username, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, phone, message]);
        res.status(201).json(result.rows[0]);
    }catch (error) {
        console.error('Error inserting message:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});