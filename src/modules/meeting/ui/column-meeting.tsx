'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Chip } from "@nextui-org/react";
import { Meeting } from "../types";
import ActionMeeting from "./action-meeting";


export const columns: ColumnDef<Meeting, any>[] =  [
      
      // {
      //   header: "Numero de Lectura",
      //   accessorKey: "id_lectura",
      // },

      {
        header: "id",
        accessorKey: "Id",
      },
      {
        header: "Nombre",
        accessorKey: "nombre_usuario",
      },
      {
        header: "Fecha de sesion",
        accessorFn: (row) => row.fecha ? row.fecha.toLocaleDateString() : null,  // Verifica si 'fecha' no es null
        accessorKey: "fecha_emision",
      },
      {
        header: "Motivo",
        accessorKey: "motivo",
      },
      {
        header: "Estado",
        accessorKey: "estado",
        cell: (info) => {
          return (
            <Chip className="capitalize"
              color={info.getValue() == null ? "default" : info.getValue() == "pendiente" ? "danger" : "success"}
              size={'sm'}

              radius="sm"
              variant="bordered">
              {info.getValue() == null ? "SR" : info.getValue()}
            </Chip>
          );
        }
      },
      {
        header: "Acciones",
        cell: (info) => {
          const items =
            [{ name: "Pagar", key: "update" },
            { name: "Ver planillas", key: "Link" }]
          return (
            // <CustomActions data={info.row.original} items={items}></CustomActions>
            <ActionMeeting data={info.row.original}></ActionMeeting>
          );
        },

      },
    ]
    