'use client'
import dynamic from 'next/dynamic'
import { Button, Chip, Tooltip } from "@nextui-org/react";
import CustomTable from "../table/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import React from "react";
import { useAlertSuccess, useUserStore } from "@/lib/store";
import { AddIcon } from '../icons/add-icon';
import { Sheets } from '@/model/types';
import FiltersSearchSheets from './FiltersSearchSheets';
import { CustomActions } from '../modal/Actions';

export default function TableSheets({ sheets }: { sheets: Sheets[] }) {
  const { openModal, setData, setType } = useUserStore();

  const columns = useMemo<ColumnDef<Sheets, any>[]>(
    () => [
      {
        header: "Codigo_Medidor",
        accessorKey: "medidor_id",
      },
      // {
      //   header: "Numero de Lectura",
      //   accessorKey: "id_lectura",
      // },
      {
        header: "Nombre",
        accessorKey: "nombre",
      },
      {
        header: "Fecha de Emisión",
        accessorFn: (row) => row.fecha_emision ? row.fecha_emision.toLocaleDateString() : null,  // Verifica si 'fecha' no es null
        accessorKey: "fecha_emision",
      },
      {
        header: "Consumo (m³)",
        accessorKey: "consumo",
        cell: (info) => {
          return (
            <Chip className="capitalize" color={info.getValue() == null ? "default" : "success"}
              size={info.getValue() == null ? "sm" : "md"}

              radius="sm"
              variant="bordered">
              {info.getValue() == null ? "SR" : info.getValue()}
            </Chip>
          );
        }
      },
      {
        header: "Exceso (m³)",
        accessorKey: "exceso",
        cell: (info) => {
          return (
            <Chip className="capitalize"
              color={info.getValue() == null ? "default" : info.getValue() > 0 ? "warning" : "success"}
              size={info.getValue() == null ? "sm" : "md"}

              radius="sm"
              variant="bordered">
              {info.getValue() == null ? "SR" : info.getValue()}
            </Chip>
          );
        }
      },

      {
        header: "Tarifa base",
        accessorKey: "total_consumo",
        accessorFn: (row) => row.total_consumo.toFixed(2) + "$",  // Verifica si 'fecha' no es null

      },
      {
        header: "Valor de Exceso",
        accessorKey: "total_exceso",
        accessorFn: (row) => {
          return row.total_exceso.toFixed(2) + "$"
        },  // Verifica si 'fecha' no es null
      },
      {
        header: "Total a pagar",
        accessorKey: "total_pagar",
        accessorFn: (row) => row.total_pagar.toFixed(2) + "$"
      },
      {
        header: "Cancelado",
        accessorKey: "valor_abonado",
        accessorFn: (row) => row.valor_abonado.toFixed(2) + "$",  // Verifica si 'fecha' no es null

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
            { name: "Ver planillas", key: "delete" }]
          return (
            <CustomActions data={info.row.original} items={items}></CustomActions>
          );
        },

      },
    ],
    [],
  );


  return (

    <div>
      <CustomTable
        columns={columns}
        data={sheets}
        labelName="Planillas"
        children={
          <Tooltip content="Agregar lecturas">
            <Button radius="full" onPress={() => {
              setType("create")
              setData(null)
              openModal()
            }} isIconOnly about="agregar" color="primary" aria-label="Like">
              <AddIcon />
            </Button>
          </Tooltip>}

        childrenFilterForCalendarTable={<FiltersSearchSheets />}




      >



      </CustomTable>
    </div>
  )
}