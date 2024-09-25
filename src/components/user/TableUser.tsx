'use client'
import { Chip, ChipProps } from "@nextui-org/react";
import CustomTable from "../table/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import {  useMemo } from "react";
import { User } from "@/model/User";
import React from "react";
import { Actions } from "../table/actions";
import AlertSuccess from "../modal/AlertSuccess";
import { useAlertSuccess, useUserStore } from "@/lib/store";


export default function TableUser({users}: {users: User[]}) {
 
  const statusColorMap: Record<string, ChipProps["color"]> = {
    'true': "success",
    'false': "warning",
    '1': 'primary',
    '2': 'default',
  };
  const {isOpen, message, closeAlert} = useAlertSuccess();
  const {type} = useUserStore();

  const columns = useMemo<ColumnDef<User, any>[]>(
    () => [

      {
        header: "ID",
        accessorKey: "id",
        sortable: true,
      },
      {
        header: "Nombre",
        accessorKey: "nombre",
        sortable: true,
      },
      {
        header: "Cedula",
        accessorKey: "cedula",
        sortable: true,
      },
      {
        header: "Estado",
        accessorKey: "estado",
        sortable: true,
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
        sortable: true,
        filterFn: "arrIncludesSome",
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
        sortable: true,
      },
      {
        header: "Teléfono",
        accessorKey: "telefono",
        sortable: true,
      },
      {
        header: "Tipo",
        accessorKey: "tipo",
        sortable: true,
      },

      {
        header: "Direccion",
        accessorKey: "direccion",
        sortable: true,
      },
      {
        header: "Acciones",
        cell: (info) => {
          return (
            <Actions data={info.row.original}></Actions>
          );
        },

      },

    ],
    [],
  );

  const filtersConfig = [

    {
      columnItem: "sector_id",       // Filtrado para la columna "sector_id"
      columnsFilter: ["1", "2"],// Valores de filtrado para "sector_id"
      alias: ["Mariscal Sucre", "Nueva Ecuador"]
    }
  ];

  // if (isLoading) {
  //   return <SkeletonCustom />
  // }

  return (

    <div>


      <CustomTable
        columns={columns}
        data={users}
        labelName="Usuarios"
        filtersConfig={
          filtersConfig
        }>
      </CustomTable>

      { isOpen && <AlertSuccess message={message} title={type} close={closeAlert}></AlertSuccess>}
    </div>


  )
}