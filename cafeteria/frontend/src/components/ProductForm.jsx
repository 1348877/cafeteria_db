import { useState } from 'react';
import { addProduct } from '../services/apiService';

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    setForm({ name: '', description: '', price: '', stock: '' });
    onProductAdded(); // Para refrescar la lista
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Agregar Producto</h2>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
      <input name="price" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={handleChange} required />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default ProductForm;
