import React, { useState, useEffect } from 'react';

export default function ProductList({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(r=>r.json()).then(setProducts);
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar…"
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />
      <ul className="list-group mb-3">
        {filtered.map(p=>(
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.name}</strong><br/>
              <small>Stock: {p.stock}</small>
            </div>
            <button
              className="btn btn-sm btn-success"
              disabled={p.stock<1}
              onClick={()=>onAdd(p)}
            >Agregar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
