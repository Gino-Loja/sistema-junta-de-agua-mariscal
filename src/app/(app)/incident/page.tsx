'use server'
import { CircleChartCard } from "@/components/Bar-chart";
import MonthYearSelector from "@/components/filters-table/MonthYearSelector";
import SelectParams from "@/components/filters-table/SelectParams";
import { FormDelete } from "@/components/forms/form-delete";
import Search from "@/components/forms/Search";
import DrawerCustom from "@/components/modal/drawer-custom";
import FormModalDelete from "@/components/modal/form-modal-delete";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import PaginationControls from "@/components/table/PaginationControlsx";
import { createApiIncidentRepository } from "@/modules/incident/service/service-incident";
import { FormIncident } from "@/modules/incident/ui/form-incident";
import TableIncident from "@/modules/incident/ui/table/table-incident";
import { IServiceIncidentRepository } from "@/modules/incident/utils/model";
import { coordinatesCache } from "@/modules/searchParams";
import { CircleChartProps, PageProps } from "@/modules/types";
import { Alert, Card } from "@nextui-org/react";
import { Suspense } from "react";


export default async function Page({ searchParams }: PageProps) {
    const { date, query, page, per_page, sector, month, year } = coordinatesCache.parse(searchParams)
    const repository = createApiIncidentRepository();
    const sectors = await repository.getSectors();

    if (!sectors.success) {
        return <Alert color={'danger'} title={`! ${sectors.error}`} />
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 mt-4">

            <DrawerCustom size="5xl" tittle="Registro de Incidente" >
                <FormIncident sectors={sectors.data}></FormIncident>
            </DrawerCustom>

            <FormModalDelete>
                <FormDelete funtionDelete={repository.deleteIncident}></FormDelete>
            </FormModalDelete>

            <div className="flex flex-col sm:gap-4 pb-4">
                <div className="flex justify-between gap-4 px-6">
                    <h1 className="text-2xl font-bold shrink  max-w-42 border-divider rounded-xl">Resumen de Incidentes  </h1>
                    <div>
                        <MonthYearSelector />
                    </div>
                </div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className=" grid flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 lg:gap-8">
                            <div className="grid auto-rows-max items-start   gap-4 lg:col-span-2 lg:gap-8">
                                <div className="border rounded-lg shadow  p-6">
                                    <h2 className="text-lg font-semibold mb-1">Detalles de los incidentes registrados</h2>
                                    <div className="grid 
                                        grid-cols-1         /* Para pantallas pequeñas: 1 columna */
                                        md:grid-cols-2      /* A partir de md: 2 columnas */
                                        md:grid-rows-2      /* A partir de md: 2 filas */
                                        gap-4 md:gap-6 
                                        w-full">

                                        {/* Tarjeta 1 - Costo total */}
                                        <div className="md:row-start-1 md:col-start-1">
                                            <CardGetTotalAmountCostIncidetByYear
                                                repository={repository}
                                                year={year}
                                                month={month}
                                            />
                                        </div>

                                        {/* Tarjeta 2 - Incidentes por año */}
                                        <div className="md:row-start-2 md:col-start-1">
                                            <CardGetTotalIncidentByYear
                                                repository={repository}
                                                year={year}
                                                month={month}
                                            />
                                        </div>

                                        {/* Tarjeta 3 - Incidentes por sector */}
                                        <div className="md:row-span-2 md:col-start-2">
                                            <CardGetTotalIncidentBySector
                                                repository={repository}
                                                year={year}
                                                month={month}
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* Stock section */}
                                <div className="border rounded-lg p-6 shadow overflow-hidden">
                                    <h2 className="text-lg font-semibold mb-1">Incidentes registrados</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Lista de Incidentes registrados
                                    </p>
                                    <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between mb-3'>

                                        <div className='sm:w-80 w-full'>
                                            <Search placeholder='Buscar por nombre...' />
                                        </div>
                                        <div className='sm:w-80 w-full'>
                                            <SelectParams options={[...sectors.data, { label: 'Todos', value: '' }]} ></SelectParams>
                                        </div>

                                        <div className=''>
                                            <FiltersSearchSheets />
                                        </div>

                                    </div>
                                    <div className="overflow-hidden">
                                        <Suspense key={1} fallback={<div>Loading...</div>}>
                                            <TableIncident
                                                page={page}
                                                per_page={per_page}
                                                query={query}
                                                date={date}
                                                sector={sector}
                                                month={month}
                                                year={year}></TableIncident>
                                        </Suspense>
                                    </div>
                                    <Suspense fallback={<div>cargando</div>}>
                                        <FechtRenderPaginationControls
                                            repository={repository}
                                            selectedDate={date}
                                            page={page}
                                            per_page={per_page}
                                            query={query}
                                            month={month}
                                            year={year}
                                            sectorId={sector}
                                        />
                                    </Suspense>
                                </div>
                                {/* Product Category section */}

                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

async function CardGetTotalAmountCostIncidetByYear({ repository, year, month }: { repository: IServiceIncidentRepository, year: number, month: number | null }) {
    const getTotalAmountCostIncidetByYear = await repository.getTotalAmountCostIncidetByYear(year, month);
    if (!getTotalAmountCostIncidetByYear.success) {
        return <Alert color={'danger'} title={`!${getTotalAmountCostIncidetByYear.error}`} />
    }

    return (
        <Card
            radius="sm"
            shadow="none"
            className="border-1 shadow-sm border-transparent dark:border-default-200
           
               hover:shadow-md rounded-md p-6 pl-8 relative overflow-hidden"
        >
            {/* Vertical line */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 bg-red-500 `}></div>
            <h1 className="text-2xl font-bold mb-4">Total de gastos en el Año</h1>
            <div>
                <div className="space-y-3">
                    <h4 className={`text-3xl font-bold`}>{'$' + getTotalAmountCostIncidetByYear.data.toFixed(2)}</h4>
                    <p className="text-sm text-gray-500 "> Resumen del total de Gastos en el Año</p>
                </div>
            </div>
        </Card>
    )

}

async function CardGetTotalIncidentByYear({ repository, year, month }: { repository: IServiceIncidentRepository, year: number, month: number | null }) {
    const getTotalIncidentByYear = await repository.getTotalIncidentByYear(year, month);
    if (!getTotalIncidentByYear.success) {
        return <Alert color={'danger'} title={`!${getTotalIncidentByYear.error}`} />
    }

    return (
        <Card
            radius="sm"
            shadow="none"
            className="border-1 shadow-sm border-transparent dark:border-default-200
           
            hover:shadow-md rounded-md p-6 pl-8 relative overflow-hidden"
        >
            {/* Vertical line */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 bg-green-500 `}></div>
            <h1 className="text-2xl font-bold mb-4">Total de Incidentes en el Año</h1>
            <div>
                <div className="space-y-3">
                    <h4 className={`text-3xl font-bold`}>{getTotalIncidentByYear.data}</h4>
                    <p className="text-sm text-gray-500 "> Resumen del total de Incidentes en el Año</p>
                </div>
            </div>
        </Card>
    )
}

async function CardGetTotalIncidentBySector({ repository, year, month }: { repository: IServiceIncidentRepository, year: number, month: number | null }) {
    const getTotalIncidentBySector = await repository.getTotalIncidentBySector(year, month);
    if (!getTotalIncidentBySector.success) {
        return <Alert color={'danger'} title={`!${getTotalIncidentBySector.error}`} />

    }

    const data: CircleChartProps =
    {
        title: "Incidentes por Sector",
        categories: ["Mariscal Sucre", "Nueva Ecuador"],
        color: "primary",
        chartData: getTotalIncidentBySector.data,
    }

    return (
        <CircleChartCard
            {...data}
        ></CircleChartCard>
    )
}

async function FechtRenderPaginationControls({ repository, selectedDate, page, per_page, query, month, year, sectorId }: { repository: IServiceIncidentRepository, selectedDate: string, page: string, per_page: string, query: string, month: number | null, year: number, sectorId: string }) {
    const data = await repository.getCounterIncidentPagination(selectedDate,query,sectorId, year, month);
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)

    return (
        data.success &&
        <PaginationControls
            total={data.data}
            hasNextPage={end < data.data}
            hasPrevPage={start > 0} />
    )
}