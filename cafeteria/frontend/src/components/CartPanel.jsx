import React from "react";

export default function CartPanel({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="card mt-4">
      <div className="card-header">Carrito</div>
      <div className="card-body">
        {cart.length === 0 ? (
          <p className="text-muted">Carrito vacío</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.name} x {item.quantity}
                  <button className="btn btn-sm btn-danger" onClick={() => onRemove(item.id)}>×</button>
                </li>
              ))}
            </ul>
            <p><strong>Total: S/. {total}</strong></p>
            <button className="btn btn-primary" onClick={onCheckout}>Registrar Venta</button>
          </>
        )}
      </div>
    </div>
  );
}

