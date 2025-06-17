import GastosList from "../components/GastosList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-medium text-gray-800 mb-8"> Bienvenido a tu billetera virtual </h1>

        {/* Sección de gastos */}
        <section className="mb-12">
          <GastosList />
        </section>

        {/* Aquí podrías agregar más secciones: Resumen, Categorías, Gráficos, etc */}
        {/* <section>...</section> */}
      </div>
    </div>
  );
}

