import React, { useState } from "react";
import ProductList from "./components/ProductList";
import CartPanel from "./components/CartPanel";
import AddProductForm from "./components/AddProductForm";
import Voucher from "./components/Voucher";

function App() {
  const [cart, setCart] = useState([]);
  const [saleResult, setSaleResult] = useState(null);

  const handleAdd = (product) => {
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      setCart(cart.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemove = id => setCart(cart.filter(p => p.id !== id));

  const handleCheckout = async () => {
    const items = cart.map(p => ({ product_id: p.id, quantity: p.quantity }));
    const res = await fetch('http://localhost:3000/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (res.ok) {
      setSaleResult(data);
      setCart([]);
    } else {
      alert(data.error || 'Error al registrar venta');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-3">POS Cafetería</h1>
      <AddProductForm onAdded={() => window.location.reload()} />
      <ProductList onAdd={handleAdd} />
      <CartPanel cart={cart} onRemove={handleRemove} onCheckout={handleCheckout} />
      {saleResult && <Voucher sale={saleResult} onClose={() => setSaleResult(null)} />}
    </div>
  );
}

export default App;
