'use client'
import { Chip, ChipProps } from "@nextui-org/react";
import CustomTable from "../table/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import React from "react";
import { Actions } from "../table/actions";
import AlertSuccess from "../modal/AlertSuccess";
import { useAlertSuccess, useUserStore } from "@/lib/store";
import { Lectures } from "@/model/types";
import FiltersSearchLectures from "./FiltersSearchLectures";

//const FiltersSearchLectures = dynamic(() => import('./FiltersSearchLectures'))
export default function TableLectures({ lecturas }: { lecturas: Lectures[] }) {

  const statusColorMap: Record<string, ChipProps["color"]> = {
    'true': "success",
    'false': "warning",
    '1': 'primary',
    '2': 'default',
  };
  const { isOpen, message, closeAlert } = useAlertSuccess();
  const { type } = useUserStore();

  const columns = useMemo<ColumnDef<Lectures, any>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },

      {
        header: "Id Usuario",
        accessorKey: "usuario_id",
      },
      {
        header: "Nombre",
        accessorKey: "nombre",
      },

      // {
      //   header: "Estado",
      //   accessorKey: "estado",
      //   sortable: true,
      //   cell: (info) => {
      //     return (
      //       <Chip className="capitalize" color={statusColorMap[info.getValue()]} size="sm" variant="flat">
      //         {info.getValue() ? "Activo" : "Inactivo"}
      //       </Chip>
      //     );
      //   },
      // },
      // {

      //   header: "Sector",
      //   accessorKey: "sector_id",
      //   sortable: true,
      //   filterFn: "arrIncludesSome",
      //   cell: (info) => {
      //     return (
      //       <Chip className="capitalize" color={statusColorMap[info.getValue()]} size="sm" variant="flat">
      //         {info.getValue() == "1" ? "Mariscal Sucre" : "Nueva Ecuador"}
      //       </Chip>
      //     );
      //   },
      // },


      {
        header: "Numero Serie",
        accessorKey: "numero_serie",

      },
      {
        header: "Lectura Anterior",
        accessorKey: "lectura_anterior",
        cell: (info) => {
          return (
            <Chip className="capitalize" color={info.getValue() == null ? "default" : "success"} size="sm" variant="flat">
              {info.getValue() == null ? "Sin registro" : info.getValue()}
            </Chip>
          );
        }
      },
      {
        header: "Lectura Actual",
        accessorKey: "lectura_actual",
        cell: (info) => {
          return (
            <Chip className="capitalize" color={info.getValue() == null ? "default" : "success"} size="sm" variant="flat">
              {info.getValue() == null ? "Sin registro" : info.getValue()}
            </Chip>
          );
        }
      },

      {
        header: "Consumo",
        accessorKey: "consumo",
        cell: (info) => {
          return (
            <Chip className="capitalize" color={info.getValue() == null ? "default" : "success"} size="sm" variant="flat">
              {info.getValue() == null ? "Sin registro" : info.getValue()}
            </Chip>
          );
        }
      },
      {
        header: "Exceso",
        accessorKey: "exceso",
        cell: (info) => {
          return (
            <Chip className="capitalize" color={info.getValue() == null ? "default" : info.getValue() > 0 ? "success" : "warning"} size="sm" variant="flat">
              {info.getValue() == null ? "Sin registro" : info.getValue()}
            </Chip>
          );
        }
      },

      {
        header: "Acciones",
        cell: (info) => {
          return (
            // <Actions data={info.row.original}></Actions>
            <div className="flex justify-end">Acciones </div>

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

  return (

    <div>
      <CustomTable
        columns={columns}
        data={lecturas}
        labelName="Lecturas"
      >
        <FiltersSearchLectures />
      </CustomTable>
      {isOpen && <AlertSuccess message={message} title={type} close={closeAlert}></AlertSuccess>}
    </div>


  )
}