'use client'
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,

  DropdownItem,
  DropdownSection,
  Input,
  Divider,

} from "@nextui-org/react";
import {
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
  getFilteredRowModel,
  PaginationState,

} from "@tanstack/react-table";
import { ChevronDownIcon } from "../icons/ChevronUpIcon";
import { capitalize } from "@/utils/uppercaseletter";
import { TableCustomProps } from "./ICustomTable";
import type { Selection } from "@nextui-org/react";
import DataTableFilterCustom from "./DataTableFilterCustom";





export default function TableCustom<T>({ data, columns, per_page, filtersConfig, childrenFilterForCalendarTable, children }: TableCustomProps<T>) {

  const memoColumns = useMemo(() => columns, []);

  // useEffect(() => {
  //   window.scrollTo(0, document.documentElement.scrollHeight);
  // }, [data]);
  //console.log(data)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>('all');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: per_page,
  })

  const table = useReactTable({
    data: data,
    columns: memoColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 md:grid-cols-2  xl:grid-cols-2 sm:grid-cols-2 gap-2">

          {/* <div>
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
          </div> */}

          <div className="flex flex-row gap-6 content-center">
            <div>
              <Dropdown >
                {/* className="hidden sm:flex" */}
                <DropdownTrigger >
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
            </div>
            <div>
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
            </div>


          </div>



          <div className="flex justify-between">

            <div>
              {childrenFilterForCalendarTable}
            </div>

            {children}


          </div>
        </div>
       
      </div>
    );
  }, [
    columnVisibility,
    columnFilters,
    selectedKeys
  ]);


  //console.log(table.getState().columnFilters)
  return (
    <div >
      {
        table.getVisibleLeafColumns().length === 0 ? (
          <div className="text-red-500 font-medium">No hay columnas visibles

            <Button onClick={() => table.resetColumnVisibility()} size="sm" variant="flat" color="primary">reseter</Button>
          </div>) :
          <Table aria-label="Tabla de usuarios"
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
            color={'primary'}
            selectionMode="single" 
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

