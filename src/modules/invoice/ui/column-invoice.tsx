'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Chip } from "@nextui-org/react";
import { Invoice } from "../types";
import ActionInvoice from "./table/action-invoice";


export const columns: ColumnDef<Invoice, any>[] =  [
      
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
        header: "Fecha de emision",
        accessorFn: (row) => row.fecha_emision ? row.fecha_emision.toLocaleDateString() : null,  // Verifica si 'fecha' no es null
        accessorKey: "fecha_emision",
      },
      {
        header: "Clave de acceso",
        accessorKey: "clave_acceso",
      },
      {
        header: "Estado",
        accessorKey: "estado",
        cell: (info) => {
          return (
            <Chip className="capitalize"
              color={"success"}
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
          
          return (
            // <CustomActions data={info.row.original} items={items}></CustomActions>
            <ActionInvoice data={info.row.original}></ActionInvoice>
          );
        },

      },
    ]
    