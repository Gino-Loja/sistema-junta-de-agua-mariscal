'use client'
import { CustomActions } from "../modal/Actions";
import { ColumnDef } from "@tanstack/react-table";
import { Lectures } from "@/model/types";
import { Chip } from "@nextui-org/react";

export const columns: ColumnDef<Lectures, any>[] = 
    [
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
            accessorFn: (row) => row.fecha ? row.fecha.toLocaleDateString() : null,
              // Verifica si 'fecha' no es null
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
    ]