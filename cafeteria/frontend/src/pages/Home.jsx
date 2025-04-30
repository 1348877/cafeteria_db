import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Sistema POS</h1>
      <Link to="/venta" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Ir al Punto de Venta
      </Link>
    </div>
  );
}
