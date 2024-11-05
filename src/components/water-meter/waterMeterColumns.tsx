'use client';

import { WaterMeter } from "@/model/types";
import { Chip, ChipProps } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";

const statusColorMap: Record<string, ChipProps["color"]> = {
  'Activo': "success",
  'Inactivo': "warning",
  '1': 'primary',
  '2': 'default',
};

export const columns: ColumnDef<WaterMeter, any>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Id Usuario",
    accessorKey: "usuario_id",
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: (info) => {
      return (
        <Chip className="capitalize" color={statusColorMap[info.getValue()]} size="sm" variant="flat">
          {info.getValue() }
        </Chip>
      );
    },
  },{
    header: "Tipo",
    accessorKey: "tipo",
  },

  {
    header: "Numero de serie",
    accessorKey: "numero_serie",
  },
  {
    header: "Detalle",
    accessorKey: "detalle",
  },
  {
    header: "Fecha Instalacion",
    accessorKey: "fecha_instalacion",
    accessorFn: (row) => row.fecha_instalacion ? row.fecha_instalacion.toLocaleDateString() : null,

  },
  {
    header: "Acciones",
    cell: (info) => {
      return (
        <div>...</div>
      );
    },
  },
];
