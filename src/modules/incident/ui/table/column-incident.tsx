'use client'
import { ColumnDef } from "@tanstack/react-table";
import ActionsMenuIncident from "./actions-menu-incident";
import Image from "next/image";


export const columns: ColumnDef<Incident, any>[] = [

  {
    header: "id",
    accessorKey: "id",
  },
  // {
  //   header: "Numero de factura",
  //   accessorKey: "numero_factura",
  // },
  {
    header: "Nombre",
    accessorKey: "nombre_usuario"
  }
  ,

  {
    header: "Fecha",
    accessorFn: (row) => row.fecha ? row.fecha.toLocaleDateString() : null,  // Verifica si 'fecha' no es null
    accessorKey: "fecha",
  },
  {
    header: "Sector",
    accessorKey: "nombre_sector"
  },
  {
    header: "Descripcion",
    accessorKey: "descripcion"
  },
  //   {
  //     header: "Foto",
  //     accessorKey: "foto"
  //   },
  {
    header: "Costo",
    accessorKey: "costo"
  },
  {

    header: "Foto",
    accessorKey: "foto",
  
    cell: (info) => {

      const formattedImageData = info.getValue().startsWith('data:image/')
        ? info.getValue()
        : `data:image/png;base64,${info.getValue()}`;

      return (
        <div className="flex justify-end items-center gap-2">
          <Image width={100} height={100} src={formattedImageData} alt="Foto" className="w-24 h-24" />
        </div>
      );
    },
  },

  {
    header: "Acciones",
    cell: (info) => {
      return (
        <div className="flex justify-end items-center gap-2">
          <ActionsMenuIncident data={info.row.original} />
        </div>
      );
    },

  },




]
