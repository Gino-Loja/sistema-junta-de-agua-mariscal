'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Chip } from "@nextui-org/react";
import { MeasurementMacro } from "@/model/types";
import { CustomActions } from "@/components/modal/Actions";
import { ActionsMenuMeasurement } from "./action-menu-measurement";


export const columns: ColumnDef<MeasurementMacro, any>[] =
    [
        {
            header: "ID",
            accessorKey: "id",
        },

        {
            header: "Fecha de lectura",
            accessorKey: "fecha",
            accessorFn: (row) => {
                // Verifica si 'fecha' no es null y formatea fecha y hora
                return row.fecha
                    ? `${row.fecha.toLocaleDateString()} ${row.fecha.toLocaleTimeString()}`
                    : null;
            },
            cell: (info) => {
                return (
                    <Chip
                        className="capitalize"
                        size={'md'}
                        color="primary"
                        radius="sm"
                        variant="dot"

                    >
                        {info.getValue()}
                    </Chip>
                );
            }
        },


        {
            header: "Lectura (m3)",
            accessorKey: "lectura",
            cell: (info) => {
                return (
                    <Chip className="capitalize"
                        size={'md'}

                        color="warning"


                        radius="sm"
                        variant="faded">
                        {info.getValue()}
                    </Chip>
                );
            }
        },
        {
            header: "Consumo (m3)",
            accessorKey: "consumo",

            cell: (info) => {
                return (
                    <Chip className="capitalize" color={info.getValue() == null ? "default" : "success"}
                        size={'md'}

                        radius="sm"
                        variant="faded">
                        {info.getValue()}
                    </Chip>
                );
            }
        },

        {
            header: "Acciones",
            cell: (info) => {



                return (

                    <ActionsMenuMeasurement data={info.row.original}></ActionsMenuMeasurement>
                );
            },

        },
    ]