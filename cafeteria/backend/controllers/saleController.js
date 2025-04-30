const pool = require('../config/db');

exports.createSale = async (req, res) => {
  const { items } = req.body;
  let connection;
  try {
    if (!items || items.length === 0) throw new Error('No hay productos en la venta');

    connection = await pool.getConnection();
    await connection.beginTransaction();

    let total = 0;
    const ventaItems = [];

    for (const item of items) {
      const [product] = await connection.query('SELECT name, price, stock FROM products WHERE id = ?', [item.product_id]);
      if (!product[0]) throw new Error(`Producto no encontrado`);
      if (product[0].stock < item.quantity) throw new Error(`Stock insuficiente para ${product[0].name}`);
      total += product[0].price * item.quantity;
      ventaItems.push({ ...item, name: product[0].name, price: product[0].price });
    }

    const [saleResult] = await connection.query('INSERT INTO sales (total) VALUES (?)', [total]);
    const saleId = saleResult.insertId;

    for (const item of ventaItems) {
      await connection.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [saleId, item.product_id, item.quantity, item.price]
      );
      await connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    const [[{ created_at }]] = await connection.query('SELECT created_at FROM sales WHERE id = ?', [saleId]);
    await connection.commit();
    res.status(201).json({ id: saleId, total, created_at, items: ventaItems });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('[ERROR EN VENTA]:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) connection.release();
  }
};
