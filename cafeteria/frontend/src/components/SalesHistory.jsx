import React, { useEffect, useState } from 'react';

export default function SalesHistory() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/sales')
      .then(r => r.json())
      .then(data => {
        const today = new Date().toDateString();
        setSales(
          data.filter(s => new Date(s.created_at).toDateString() === today)
        );
      });
  }, []);

  return (
    <div>
      {sales.length === 0 ? (
        <p>No hay ventas hoy.</p>
      ) : (
        sales.map((s) => (
          <div key={s.id} className="card mb-3">
            <div className="card-header">Venta #{s.id}</div>
            <div className="card-body">
              <p className="text-muted">
                {new Date(s.created_at).toLocaleString()}
              </p>
              <ul className="list-group mb-2">
                {(s.items || []).map((i, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {i.name} x {i.quantity}
                    <span>
                      S/. {Number(i.price * i.quantity || 0).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                <strong>
                  Total: S/. {Number(s.total || 0).toFixed(2)}
                </strong>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
