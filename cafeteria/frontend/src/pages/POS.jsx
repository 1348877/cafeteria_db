import { useState } from 'react';
import ProductList from '../components/ProductList';
import CartPanel from '../components/CartPanel';
import AddProductForm from '../components/AddProductForm'; // Importante para agregar productos
import Voucher from '../components/Voucher'; // Para mostrar el comprobante de venta

export default function POS() {
  const [cart, setCart] = useState([]);       // Estado para el carrito
  const [saleResult, setSaleResult] = useState(null);  // Para mostrar el ticket de venta

  // Función para agregar productos al carrito
  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para eliminar productos del carrito
  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Función para realizar la venta
  const handleCheckout = async () => {
    const items = cart.map(p => ({ product_id: p.id, quantity: p.quantity }));

    const res = await fetch('http://localhost:3000/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });

    const data = await res.json();
    if (res.ok) {
      setSaleResult({ ...data, items: cart });
      setCart([]);
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Punto de Venta</h2>

      {/* Formulario para agregar productos */}
      <AddProductForm onAdded={() => window.location.reload()} />

      {/* Listado de productos */}
      <ProductList onAdd={handleAddToCart} />

      {/* Carrito de compra y resumen */}
      <CartPanel cart={cart} onRemove={handleRemove} onCheckout={handleCheckout} />

      {/* Mostrar ticket de venta después de realizar la compra */}
      {saleResult && <Voucher sale={saleResult} onClose={() => setSaleResult(null)} />}
    </div>
  );
}
