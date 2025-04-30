import React, { useState } from 'react';

export default function AddProductForm({ onAdded }) {
  const [f, setF] = useState({name:'',description:'',price:'',stock:''});
  const ch = e=>setF({...f,[e.target.name]:e.target.value});

  const sb = async e=>{
    e.preventDefault();
    const r = await fetch('http://localhost:3000/api/products',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body: JSON.stringify(f)
    });
    if(r.ok){ alert('Agregado'); setF({name:'',description:'',price:'',stock:''}); onAdded();}
    else alert('Error');
  };

  return (
    <form onSubmit={sb}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input name="name" value={f.name} onChange={ch} className="form-control" required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input name="description" value={f.description} onChange={ch} className="form-control"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input name="price" type="number" step="0.01" value={f.price} onChange={ch} className="form-control" required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input name="stock" type="number" value={f.stock} onChange={ch} className="form-control" required/>
      </div>
      <button type="submit" className="btn btn-primary">Agregar Producto</button>
    </form>
  );
}
