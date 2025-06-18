import GastosSection from "@components/Dashboard/GastosSection";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto">
        <h1 className="text-3xl font-medium text-gray-800 mb-8"> Bienvenido a tu billetera virtual </h1>
          <GastosSection />
      </div>
    </div>
  );
}

