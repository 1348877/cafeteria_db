import React from 'react';

export default function CartPanel({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);

  return (
    <div className="card mb-3">
      <div className="card-header">Carrito</div>
      <div className="card-body">
        {cart.length === 0
          ? <p className="text-muted">Vacío</p>
          : <>
              <ul className="list-group mb-3">
                {cart.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    {item.name} x {item.quantity}
                    <button className="btn btn-sm btn-danger" onClick={() => onRemove(item.id)}>×</button>
                  </li>
                ))}
              </ul>
              <p><strong>Total: S/. {total}</strong></p>
              <button className="btn btn-success" onClick={onCheckout}>Registrar Venta</button>
            </>
        }
      </div>
    </div>
  );
}
