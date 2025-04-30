import React, { useState } from "react";

export default function AddProductForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ name: "", description: "", price: "", stock: "" });
    if (onAdded) onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="row">
        <div className="col">
          <input name="name" placeholder="Nombre" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="description" placeholder="Descripción" className="form-control" value={form.description} onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="price" type="number" step="0.01" placeholder="Precio" className="form-control" value={form.price} onChange={handleChange} required />
        </div>
        <div className="col">
          <input name="stock" type="number" placeholder="Stock" className="form-control" value={form.stock} onChange={handleChange} required />
        </div>
        <div className="col">
          <button className="btn btn-success w-100" type="submit">Añadir</button>
        </div>
      </div>
    </form>
  );
}
