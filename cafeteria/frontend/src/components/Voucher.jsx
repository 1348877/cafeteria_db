import React from 'react';

export default function Voucher({ sale, onClose }) {
  if (!sale) return null;

  const total = sale.total?.toFixed(2) ?? '0.00';
  const saleDate = sale.created_at
    ? new Date(sale.created_at).toLocaleString()
    : 'Fecha no disponible';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 d-flex align-items-center justify-content-center">
      <div className="bg-white p-4 rounded shadow" style={{ width: '400px' }}>
        <h2 className="mb-3">Comprobante de Venta</h2>
        <p className="mb-2"><strong>Fecha:</strong> {saleDate}</p>
        <ul className="list-group mb-3">
          {sale.items && sale.items.length > 0 ? (
            sale.items.map((item, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between">
                <span>{item.name} x {item.quantity}</span>
                <span>S/. {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">Sin productos</li>
          )}
        </ul>
        <p className="fw-bold mb-3">Total: S/. {total}</p>
        <button className="btn btn-primary w-100" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
