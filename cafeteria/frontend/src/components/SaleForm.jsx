import { useEffect, useState } from 'react';
import { getProducts, createSale } from '../services/apiService';

function SaleForm({ onSaleCompleted }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const load = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addToCart = (product) => {
    const quantity = parseInt(prompt('Cantidad:', 1));
    if (!quantity || quantity < 1) return;
    setCart([...cart, { ...product, quantity }]);
  };

  const handleSale = async () => {
    const items = cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));
    await createSale(items);
    alert('Venta registrada');
    setCart([]);
    onSaleCompleted(); // para recargar productos si se modifica stock
  };

  return (
    <div>
      <h2>Registrar Venta</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - S/. {p.price} (Stock: {p.stock})
            <button onClick={() => addToCart(p)}>Agregar</button>
          </li>
        ))}
      </ul>
      <h3>Carrito:</h3>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>{item.name} x {item.quantity}</li>
        ))}
      </ul>
      {cart.length > 0 && <button onClick={handleSale}>Confirmar Venta</button>}
    </div>
  );
}

export default SaleForm;
