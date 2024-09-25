'use client'
import React, { Children, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Skeleton,
  Input,
  Divider,
  Tooltip,

} from "@nextui-org/react";
import {
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
  getFilteredRowModel,

} from "@tanstack/react-table";
import { ChevronDownIcon } from "../icons/ChevronUpIcon";
import { capitalize } from "@/utils/uppercaseletter";
import { TableCustomProps } from "./ICustomTable";
import type { Selection } from "@nextui-org/react";
import DataTableFilterCustom from "./DataTableFilterCustom";
import { AddIcon } from "../icons/add-icon";
import { useUserStore } from "@/lib/store";



export default function TableCustom<T>({ data, columns, labelName, filtersConfig, children }: TableCustomProps<T>) {

  const { openModal, setData, setType } = useUserStore();
  
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>('all');

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      pagination,
      columnVisibility,
      columnFilters,
    },
    

  });

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            placeholder="Buscar por nombre..."
            isClearable
            value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}

            onChange={(event) =>
              table.getColumn("nombre")?.setFilterValue(event.target.value)
            }
            onClear={() => (table.getColumn("nombre")?.setFilterValue(""))}
            className="max-w-sm"
          />
          <div className="flex flex-row gap-6  items-center">
            {filtersConfig && filtersConfig.length > 0 && (
              <>
                {filtersConfig.map((filter, index) => (


                  <DataTableFilterCustom
                    key={index}
                    table={table}
                    columnsFilter={filter.columnsFilter}
                    columnItem={filter.columnItem}
                  />
                ))}
              </>
            )}
            <Dropdown >
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu

                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
                disallowEmptySelection
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                <DropdownSection>
                  {table.getAllLeafColumns().map((column) => (
                    <DropdownItem
                      key={column.id}
                      onPress={(key) => {
                        if (selectedKeys !== "all") {
                          // selectedKeys es un Set<Key> en este punto
                          column.toggleVisibility(selectedKeys.has(column.id))
                        }
                      }}

                    >
                      {capitalize(column.id)}
                    </DropdownItem>
                  ))}
                </DropdownSection>

              </DropdownMenu>
            </Dropdown>
            {children}
          </div>
          <Tooltip content="Agrega un nuevo usuario">
            <Button radius="full" onPress={() => {
              setType("create")
              setData(null)
              openModal()
            }} isIconOnly about="agregar" color="primary" aria-label="Like">
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
        <Divider className="my-1" />
      </div>
    );
  }, [
    columnVisibility,
    columnFilters,
    selectedKeys
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
          {table.getRowCount().toLocaleString()} Rows
        </span>
        <Pagination
          isCompact

          showControls
          showShadow
          color="primary"
          page={pagination.pageIndex + 1}
          total={table.getPageCount()}
          onChange={(value) => setPagination({ ...pagination, pageIndex: value - 1 })}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={!table.getCanPreviousPage()} size="sm" variant="flat" onPress={() => table.previousPage()}>
            Previous
          </Button>
          <Button isDisabled={!table.getCanNextPage()} size="sm" variant="flat" onPress={() => table.nextPage()}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [pagination]);
  //console.log(table.getState().columnFilters)
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de {labelName}</h1>
      {
        table.getVisibleLeafColumns().length === 0 ? (
          <div className="text-red-500 font-medium">No hay columnas visibles

            <Button onClick={() => table.resetColumnVisibility()} size="sm" variant="flat" color="primary">reseter</Button>
          </div>) :
          <Table aria-label="Tabla de usuarios"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
          >
            <TableHeader   >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableHeader key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableColumn colSpan={header.colSpan} key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableColumn>
                    )
                  })}
                </TableHeader>
              ))}
            </TableHeader>
            <TableBody
              //isLoading={isLoading}
              //isLoading={isLoading}
              // isLoading={loading}
              // loadingContent={<Skeleton className="h-24 rounded-lg bg-secondary">
              //   <div className="h-24 rounded-lg bg-secondary"> dasdadasdasdasdas</div>
              //   <div className="h-24 rounded-lg bg-secondary">asdsadasdsadasdsadsad</div><div className="h-24 rounded-lg bg-secondary"></div>
              // </Skeleton>}
              emptyContent={"No rows to display."}>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>


      }

    </div>
  );
}

