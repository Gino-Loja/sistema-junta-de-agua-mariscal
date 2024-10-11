'use client'

import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react"
import { ChevronDownIcon } from "../icons/ChevronUpIcon"
import { capitalize } from "@/utils/uppercaseletter"
import { Table } from "@tanstack/react-table"
import { use, useState } from "react"

export interface TableCustomFilterProps<T> {
    table: Table<T>;
    columnsFilter: string[]
    columnItem: string
}

export default function DataTableFilterCustom<T>({ table, columnsFilter, columnItem }: TableCustomFilterProps<T>) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleCheckboxChange = (column: string, isSelected: boolean) => {
        let updatedFilters: string[];

        if (isSelected) {
            // Si está seleccionado, lo añadimos al array
            updatedFilters = [...selectedFilters, column];
        } else {
            // Si se deselecciona, lo removemos del array
            updatedFilters = selectedFilters.filter((filter) => filter !== column);
        }

        // Actualizamos el estado local y también el filtro en la tabla
        setSelectedFilters(updatedFilters);
        table.getColumn(columnItem)?.setFilterValue(updatedFilters);
    };

    return (
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        endContent={<ChevronDownIcon className="text-small" />}
                        size="sm"
                        variant="flat"
                    >
                        {columnItem}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectionMode="none"
                >
                    <DropdownSection>
                        {columnsFilter.map((column, id) => (
                            <DropdownItem
                                key={id}
                            >
                                <Checkbox
                                    size="sm"
                                    isSelected={selectedFilters.includes(column)} color="default"
                                    onChange={(e) => {
                                        // e.target.checked ?
                                        //     table.getColumn(columnItem)?.setFilterValue(column)
                                        //     : table.getColumn(columnItem)?.setFilterValue("")
                                        handleCheckboxChange(column, e.target.checked);

                                    }}
                                    className="capitalize" >
                                    {capitalize(column)}
                                </Checkbox>

                            </DropdownItem>

                        ))}

                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
    )
}