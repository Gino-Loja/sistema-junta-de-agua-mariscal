'use client'
import { ColumnDef } from "@tanstack/react-table";
import { SectorsTable } from "@/modules/settings/types";
import { ActionsColumnSectors } from "./action-column-sectors";


export const columns: ColumnDef<SectorsTable, any>[] = [

  {
    header: "Nombre",
    accessorKey: "nombre"
  },
  {
    header: "Descripcion",
    accessorKey: "descripcion"
  },

  {
    header: "Acciones",

    cell: ({ row }) => {
      return (
        <ActionsColumnSectors
          data={row.original}
        ></ActionsColumnSectors>
      );
    },
  }


]

