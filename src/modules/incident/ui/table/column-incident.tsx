'use client'
import { ColumnDef } from "@tanstack/react-table"
import ActionsMenuIncident from "./actions-menu-incident"
import { Incident } from "../../types"
import { RenderImageIncident } from "./render-image-incident"

export const columns: ColumnDef<Incident>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.id}</span>
  },
  {
    header: "Nombre",
    accessorKey: "nombre_usuario",
    cell: ({ row }) => <span className="font-medium">{row.original.nombre_usuario}</span>
  },
  {
    header: "Fecha",
    accessorKey: "fecha",
    cell: ({ row }) => row.original.fecha
  },
  {
    header: "Sector",
    accessorKey: "nombre_sector",
    cell: ({ row }) => <span className="text-primary">{row.original.nombre_sector}</span>
  },
  {
    header: "Descripción",
    accessorKey: "descripcion",
    cell: ({ row }) => <span className="max-w-[200px] truncate">{row.original.descripcion}</span>
  },
  {
    header: "Costo",
    accessorKey: "costo",
    cell: ({ row }) => new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(row.original.costo!)
  },

  {

    header: "Foto",

    cell: ({ row }) => (
      <div className="flex justify-center">
        <RenderImageIncident id={row.original.id} />
      </div>
    )
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionsMenuIncident data={row.original} />
      </div>
    )
  }
]