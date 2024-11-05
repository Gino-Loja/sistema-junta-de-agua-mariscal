'use client';

import { User } from "@/model/User";
import { Chip, ChipProps } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "./actions";

const statusColorMap: Record<string, ChipProps["color"]> = {
  'true': "success",
  'false': "warning",
  '1': 'primary',
  '2': 'default',
};

export const columns: ColumnDef<User, any>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Cedula",
    accessorKey: "cedula",
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: (info) => {
      return (
        <Chip className="capitalize" color={statusColorMap[info.getValue()]} size="sm" variant="flat">
          {info.getValue() ? "Activo" : "Inactivo"}
        </Chip>
      );
    },
  },
  {
    header: "Sector",
    accessorKey: "sector_id",
    cell: (info) => {
      return (
        <Chip className="capitalize" color={statusColorMap[info.getValue()]} size="sm" variant="flat">
          {info.getValue() == "1" ? "Mariscal Sucre" : "Nueva Ecuador"}
        </Chip>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    
  },
  {
    header: "Teléfono",
    accessorKey: "telefono",
    
  },
  {
    header: "Tipo",
    accessorKey: "tipo",
    
  },
  {
    header: "Direccion",
    accessorKey: "direccion",
    
  },
  {
    header: "Acciones",
    cell: (info) => {
      return (
        <Actions data={info.row.original}></Actions>
      );
    },
  },
];
