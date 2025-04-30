const pool = require('../config/db');

// Crear venta con control de stock y retorno detallado
exports.createSale = async (req, res) => {
  const { items } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    let total = 0;
    const ventaItems = [];

    for (const item of items) {
      const [product] = await connection.query('SELECT name, price, stock FROM products WHERE id = ?', [item.product_id]);
      if (!product[0]) throw new Error(`Producto ID ${item.product_id} no encontrado`);
      if (product[0].stock < item.quantity) throw new Error(`Stock insuficiente para ${product[0].name}`);
      total += product[0].price * item.quantity;

      ventaItems.push({
        product_id: item.product_id,
        name: product[0].name,
        quantity: item.quantity,
        price: product[0].price
      });
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
    res.status(500).json({ error: error.message || 'Error al registrar la venta' });
  } finally {
    if (connection) connection.release();
  }
};

// Historial de ventas detallado agrupado por venta
exports.getSales = async (req, res) => {
  try {
    const [sales] = await pool.query(`
      SELECT s.id, s.total, s.created_at, si.product_id, si.quantity, si.price, p.name
      FROM sales s
      LEFT JOIN sale_items si ON s.id = si.sale_id
      LEFT JOIN products p ON si.product_id = p.id
      ORDER BY s.created_at DESC
    `);

    const salesMap = sales.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          total: row.total,
          created_at: row.created_at,
          items: [],
        };
      }
      if (row.product_id) {
        acc[row.id].items.push({
          product_id: row.product_id,
          name: row.name,
          quantity: row.quantity,
          price: row.price,
        });
      }
      return acc;
    }, {});

    res.json(Object.values(salesMap));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de ventas' });
  }
};

// Productos más vendidos del sistema
exports.getTopProducts = async (req, res) => {
  try {
    const [topProducts] = await pool.query(`
      SELECT p.id, p.name, SUM(si.quantity) AS total_sold
      FROM sale_items si
      JOIN products p ON si.product_id = p.id
      GROUP BY p.id, p.name
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos más vendidos' });
  }
};
