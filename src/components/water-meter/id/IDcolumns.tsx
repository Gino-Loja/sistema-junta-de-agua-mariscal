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

export const IDcolumns: ColumnDef<{
  id: number,
  fecha: Date,
  consumo: number,
  lectura_anterior: number,
  lectura_actual: number,
  exceso: number,
  medidor_id: number
}, any>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Fecha",
    accessorKey: "fecha",
    accessorFn: (row) => row.fecha ? row.fecha.toLocaleDateString() : null,
  },
  {
    header: "Lectura Anterior",
    accessorKey: "lectura_anterior",
  },
  {
    header: "Lectura Actual",
    accessorKey: "lectura_actual",
  },
  {
    header: "Consumo",
    accessorKey: "consumo",
  },
  {
    header: "Exceso",
    accessorKey: "exceso",
  },
  
];
