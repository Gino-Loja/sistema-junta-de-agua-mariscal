'use client'
import dynamic from 'next/dynamic'
import { Button, Chip, Tooltip } from "@nextui-org/react";
import CustomTable from "../table/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import React from "react";
//import AlertSuccess from "../modal/AlertSuccess";
import { useAlertSuccess, useUserStore } from "@/lib/store";
import { Lectures } from "@/model/types";
import FiltersSearchLectures from "./FiltersSearchLectures";
import { AddIcon } from '../icons/add-icon';
//import { CustomActions } from "./Actions";

const CustomActions = dynamic(() => import('../modal/Actions').then((mod) => mod.CustomActions))
const AlertSuccess = dynamic(() => import('../modal/AlertSuccess').then((mod) => mod.default))
//const FiltersSearchLectures = dynamic(() => import('./FiltersSearchLectures'))
export default function TableLectures({ lecturas }: { lecturas: Lectures[] }) {
  const { openModal, setData, setType } = useUserStore();
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

      
      {
        header: "Numero Serie",
        accessorKey: "numero_serie",

      },
      {
        header: "Codigo de Medidor",
        accessorKey: "medidor_id",

      },
      {
        header: "Fecha de lectura",
        accessorKey: "fecha",
        accessorFn: (row) => row.fecha ? row.fecha.toLocaleDateString() : null,  // Verifica si 'fecha' no es null
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
        header: "Lectura Anterior",
        accessorKey: "lectura_anterior",
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
        header: "Lectura Actual",
        accessorKey: "lectura_actual",
        cell: (info) => {
          return (
            <Chip className="capitalize"
              color={info.getValue() == null ? "default" : "success"}
              size={info.getValue() == null ? "sm" : "md"}

              radius="sm"
              variant="bordered">
              {info.getValue() == null ? "SR" : info.getValue()}
            </Chip>
          );
        }
      },
      {
        header: "Consumo",
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
        header: "Exceso",
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
        header: "Acciones",
        cell: (info) => {

          const items = info.row.original.id != null
            ? [{ name: "Editar", key: "update" }, { name: "Ver consumo", key: "delete" }]
            : [{ name: "Añadir lectura", key: "create" }];

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
        data={lecturas}
        labelName="Lecturas"
        childrenFilterForCalendarTable={  <FiltersSearchLectures />}
        children={<Tooltip content="Agregar lecturas">
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
      {isOpen && <AlertSuccess message={message} title={type} close={closeAlert}></AlertSuccess>}
    </div>


  )
}