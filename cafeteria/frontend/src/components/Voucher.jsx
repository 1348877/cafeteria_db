import React from "react";

export default function Voucher({ sale, onClose }) {
  if (!sale) return null;

  const ventaDate = new Date(sale.created_at).toLocaleString();
  const total = sale.total.toFixed(2);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h5 className="mb-3">Comprobante de Venta</h5>
        <p><strong>Fecha:</strong> {ventaDate}</p>
        <ul className="list-group mb-3">
          {sale.items.map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <span>{item.name} x {item.quantity}</span>
              <span>S/. {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="fw-bold">Total: S/. {total}</p>
        <button className="btn btn-primary w-100" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
