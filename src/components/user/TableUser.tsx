'use client'
import { Button, Chip, ChipProps, Tooltip } from "@nextui-org/react";
import CustomTable from "../table/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { User } from "@/model/User";
import React from "react";
import { Actions } from "./actions";
import {  useUserStore } from "@/lib/store";
import { AddIcon } from "../icons/add-icon";


export default function TableUser({ users }: { users: User[] }) {
  const { openModal, setData, setType } = useUserStore();

  const statusColorMap: Record<string, ChipProps["color"]> = {
    'true': "success",
    'false': "warning",
    '1': 'primary',
    '2': 'default',
  };
 

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
        }
        children={<Tooltip content="Agrega un nuevo usuario">
          <Button radius="full" onPress={() => {
            setType("create")
            setData(null)
            openModal()
          }} isIconOnly about="agregar" color="primary" aria-label="Like">
            <AddIcon />
          </Button>
        </Tooltip>}
      >


      </CustomTable>

    </div>


  )
}