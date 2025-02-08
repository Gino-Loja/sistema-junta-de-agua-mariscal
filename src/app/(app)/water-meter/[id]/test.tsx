
'use client'
import { Chip } from '@nextui-org/react';
import { ChevronLeft, Activity, Droplet, Calendar, Hash } from 'lucide-react';

export default function Test() {
  const id = 1;
  
  const data = [{
    id: 1,
    fecha_instalacion: new Date(),
    numero_serie: '123456789',
    usuario_id: 1,
    nombre: 'Nombre del medidor',
    detalle: 'Detalle del medidor',
    estado: 'Activo',
    tipo: 'Tipo del medidor',
    cedula: '123456789',
  }];

  const matchedMedidor = data.find((item) => item.id === Number(id));

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <header className="border-b bg-white shadow-sm">
          <div className="flex items-center gap-4 px-6 py-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Regresar</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Consumption Details */}
              <section className="bg-white rounded-xl shadow-card hover:shadow-hover transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Detalles del consumo</h2>
                <p className="text-gray-500 mb-6">Consumo y exceso del medidor seleccionado</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    {/* Placeholder for consumption details */}
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    {/* Placeholder for excess details */}
                  </div>
                </div>
              </section>

              {/* Readings Table */}
              <section className="bg-white rounded-xl shadow-card hover:shadow-hover transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Lecturas registradas</h2>
                <p className="text-gray-500 mb-6">Lista de las lecturas registradas en el medidor seleccionado</p>
                <div className="overflow-hidden rounded-lg border">
                  {/* Table placeholder */}
                </div>
              </section>

              {/* Assignment Section */}
              <section className="bg-white rounded-xl shadow-card hover:shadow-hover transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Asignado</h2>
                <Chip 
                  className="text-lg font-semibold p-6 w-full justify-center"
                  color="primary"
                  variant="dot"
                  radius="lg"
                >
                  {matchedMedidor?.nombre}
                </Chip>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <section className="bg-white rounded-xl shadow-card hover:shadow-hover transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Estado del medidor</h2>
                <Chip 
                  className="text-lg font-semibold p-6 w-full justify-center"
                  variant="flat"
                  radius="lg"
                  color={matchedMedidor?.estado === "Activo" ? "success" : "danger"}
                >
                  <Activity className="mr-2 h-5 w-5" />
                  {matchedMedidor?.estado}
                </Chip>
              </section>

              {/* Details Card */}
              <section className="bg-white rounded-xl shadow-card hover:shadow-hover transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Detalles</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Serie</p>
                      <p className="font-medium">{matchedMedidor?.numero_serie}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha de instalación</p>
                      <p className="font-medium">{matchedMedidor?.fecha_instalacion.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Type Card */}
              <section className="bg-white rounded-xl shadow-card hover:shadow-hover transition-shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Tipo del Medidor</h2>
                <Chip 
                  className="text-lg font-semibold p-6 w-full justify-center"
                  color="warning"
                  variant="solid"
                  radius="lg"
                >
                  <Droplet className="mr-2 h-5 w-5" />
                  {matchedMedidor?.tipo}
                </Chip>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}




