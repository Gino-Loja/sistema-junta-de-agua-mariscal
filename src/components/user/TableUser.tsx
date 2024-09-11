
'use client'

import { Chip, ChipProps } from "@nextui-org/react";
import CustomTable from "../table/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/model/User";
import React from "react";
import { IUserRepository } from "@/model/user-repository/UserRepository";
import { createApiUserRepository } from "@/services/serviceUser";
import { SkeletonCustom } from "../skeletons/skeleton";
import { Actions } from "../table/actions";

export default function TableUser() {
  const repositoryUser: IUserRepository = createApiUserRepository();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    'true': "success",
    'false': "warning",
    '1': 'primary',
    '2': 'default',
  };

  const [users, setUsers] = React.useState<User[]>([])
  useEffect(() => {
    setIsLoading(true);
    repositoryUser.getListAllUser()
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Error desconocido");
        setIsLoading(false);
      });
  }, []);

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
           <Actions></Actions>
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

  if (isLoading) {
    return <SkeletonCustom />
  }

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
    </div>


  )
}