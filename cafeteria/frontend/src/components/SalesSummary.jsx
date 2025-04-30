// src/components/SalesSummary.jsx
import React, { useEffect, useState } from 'react';

export default function SalesSummary() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch('http://localhost:3000/api/sales/summary');
      const data = await res.json();
      setSummary(data);
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Resumen Diario de Ventas</h2>
      <ul>
        {summary.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>: {item.total_sold} vendidos — S/. {item.total_revenue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
