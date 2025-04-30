import React, { useEffect, useState } from "react";

export default function ProductList({ onAdd }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="row mt-4">
      {products.map(p => (
        <div className="col-3 mb-3" key={p.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
              <p><strong>S/. {p.price}</strong></p>
              <button className="btn btn-success" onClick={() => onAdd(p)}>Agregar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
