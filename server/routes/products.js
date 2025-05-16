const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, price, description, image_url } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const newProduct = await pool.query(
            'INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, image_url]
        );

        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (product.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/search/:keyword', async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await pool.query(
            "SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1",
            [`%${keyword}%`]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/contextual-search', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const allProducts = await pool.query('SELECT * FROM products');
        const products = allProducts.rows;

        const keywords = processSearchQuery(query);

        if (keywords.length === 0) {
            return res.json(products);
        }

        const scoredProducts = products.map(product => ({
            ...product,
            relevanceScore: calculateRelevance(product, keywords)
        }));

        const sortedProducts = scoredProducts.sort((a, b) => b.relevanceScore - a.relevanceScore);
        
        const results = sortedProducts.filter(product => product.relevanceScore > 0);

        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;