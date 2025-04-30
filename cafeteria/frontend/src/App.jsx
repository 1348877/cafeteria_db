import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import CartPanel from './components/CartPanel';
import Voucher from './components/Voucher';
import SalesHistory from './components/SalesHistory';

export default function App() {
  const [cart, setCart] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleAdd = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const sale = {
      created_at: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
      })),
      total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    };

    const res = await fetch('http://localhost:3000/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sale),
    });

    if (res.ok) {
      alert('Venta registrada');
      setVoucher(sale);      // Mostrar comprobante
      setCart([]);           // Limpiar carrito
      setRefresh(!refresh);  // Forzar recarga de historial
    } else {
      alert('Error al registrar venta');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">POS Cafetería</h1>

      <div className="row">
        <div className="col-md-6">
          <ProductList onAdd={handleAdd} />
          <AddProductForm onAdded={() => setRefresh(!refresh)} />
        </div>
        <div className="col-md-6">
          <CartPanel
            cart={cart}
            onRemove={handleRemove}
            onCheckout={handleCheckout}
          />
          <SalesHistory key={refresh} />
        </div>
      </div>

      <Voucher sale={voucher} onClose={() => setVoucher(null)} />
    </div>
  );
}
