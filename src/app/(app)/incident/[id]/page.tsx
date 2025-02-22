'use client';
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { MapPin, User, Calendar, DollarSign, ChevronLeft } from "lucide-react";
import { useIncidentStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";


// este es el tipo de datos que se espera recibir
// type Incident = {
//   id: number;           // Identificador único del incidente
//   usuario_id: number ;    // Relación con la tabla de usuarios
//   nombre_usuario: string ; // Nombre del usuario que generó el incidente
//   fecha: Date;          // Fecha del incidente
//   costo: number;       // Costo asociado al incidente (opcional)
//   sector_id: number;     // Relación con la tabla de sectores
//   nombre_sector: string; // Nombre del sector al que pertenece el incidente
//   foto: string;    // Foto almacenada en formato binario (opcional)
//   descripcion: string; // Descripción del incidente (opcional)
// };
export default function Page() {
  const { incident } = useIncidentStore()

  if (!incident) {
    return (
      <Card className="max-w-[400px]">
        <CardBody>
          <p>No incident data available.</p>
        </CardBody>
      </Card>
    )
  }
  const hexToDataUrl = (hex: string) => {


    return hex.startsWith('data:image/png;base64,')
      ? hex
      : `data:image/png;base64,${hex}`;

  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex items-center gap-4 pt-8">
        <Link href={'/incident'}>

          <Chip variant="light" color="primary" >
            <div className="flex items-center ">

              <ChevronLeft className="h-4 w-4" />
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Regresar
              </h1>
            </div>
          </Chip>

        </Link>

      </div>
      <div className="p-6 flex items-center justify-center">


        <Card className="w-full max-w-3xl  shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative h-[400px] w-full overflow-hidden">
            <Image
              src={hexToDataUrl(incident.foto) || "/placeholder.svg"}
              alt="Incidente"
              width={400}
              height={400}
              className="w-full h-full object-center p-6 transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 left-4  backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Incidente #{incident.id}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-lg font-medium">{incident.nombre_usuario}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {incident.fecha.toLocaleDateString()}
                </span>
              </div>
            </div>

            <Divider />

            <div className="flex flex-wrap gap-3">
              <Chip variant="flat" color="primary" className="px-3 py-1 ">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {incident.nombre_sector}
                </div>

              </Chip>
              {incident.costo && (
                <Chip variant="flat" color="success" className="px-3 py-1 flex ">

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {incident.costo.toFixed(2)}
                  </div>

                </Chip>
              )}
            </div>

            <div className="h-24 rounded-md border p-4">
              <p className="text-gray-600 leading-relaxed">
                {incident.descripcion}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>


  )
}

