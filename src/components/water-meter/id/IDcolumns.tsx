'use client';

import { WaterMeter, WaterMeterById } from "@/model/types";
import { Chip, ChipProps } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";

const statusColorMap: Record<string, ChipProps["color"]> = {
  'Activo': "success",
  'Inactivo': "warning",
  '1': 'primary',
  '2': 'default',
};

export const IDcolumns: ColumnDef<WaterMeterById, any>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Fecha",
    accessorKey: "fecha",
   
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
