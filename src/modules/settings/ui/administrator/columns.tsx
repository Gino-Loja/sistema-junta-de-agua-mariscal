'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Administrators } from "../../types";
import { Chip } from "@nextui-org/react";
import { ActionsColumnAdministrator } from "./action-column-administrator";


export const columns: ColumnDef<Administrators, any>[] = [

  {
    header: "Nombre",
    accessorKey: "nombres"
  },
  {
    header: "Email",
    accessorKey: "email"
  },  
  {
    header: "Fecha de emision",
    accessorFn: (row) => row.fecha_creacion,  // Verifica si 'fecha' no es null
    accessorKey: "fecha_creacion",
  },
  {
    header: "Rol",
    accessorKey: "rol",
  },
  {
    header: "usuario",
    accessorKey: "usuario",
  },
  {
    header: "celular",
    accessorKey: "celular",
  },

  {
    header: "Estado",
    accessorKey: "estado",
    cell: (info) => {
      return (
        <Chip className="capitalize"
          color={info.getValue() == null ? "default" : info.getValue() == "inactivo" ? "danger" : "success"}
          size={'sm'}
          radius="sm"
          variant="bordered">
          {info.getValue()}
        </Chip>
      );
    }
  },
  {
    header: "Acciones",
    cell: (info) => {
      const items =
        [{ name: "Editar", key: "update" },
        { name: "Eliminar", key: "delete" }]
      return (
        // <CustomActions data={info.row.original} items={items}></CustomActions>
        <ActionsColumnAdministrator data={info.row.original}></ActionsColumnAdministrator>
      );
    },

  },



]
