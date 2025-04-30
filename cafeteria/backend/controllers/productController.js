const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    // Traemos solo los campos que usamos en el frontend
    const [products] = await pool.query(`
      SELECT 
        id,
        name,
        description,
        price,
        stock
      FROM products
    `);
    res.json(products);
  } catch (error) {
    console.error('[ERROR al obtener productos]:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  } catch (error) {
    console.error('[ERROR al crear producto]:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};
