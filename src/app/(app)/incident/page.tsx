import { CircleChartCard } from "@/components/Bar-chart";
import { FormDelete } from "@/components/forms/form-delete";
import Search from "@/components/forms/Search";
import SelectParams from "@/components/forms/SelectParams";
import DrawerCustom from "@/components/modal/drawer-custom";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import { createApiIncidentRepository } from "@/modules/incident/service/service-incident";
import { FormIncident } from "@/modules/incident/ui/form-incident";
import TableIncident from "@/modules/incident/ui/table/table-incident";
import { IServiceIncidentRepository } from "@/modules/incident/utils/model";
import { coordinatesCache } from "@/modules/searchParams";
import { CircleChartProps, PageProps } from "@/modules/types";
import { Card } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const FormModal = dynamic(() =>
    import('@/components/modal/FormModal').then((mod) => mod.default)
)
export default async function Page({ searchParams }: PageProps) {
    const { date, query, page, per_page, sector } = coordinatesCache.parse(searchParams)
    const repository = createApiIncidentRepository();
    const sectors = await repository.getSectors();
    // const getTotalAmountCostIncidetByYear = await repository.getTotalAmountCostIncidetByYear(date);
    // const getTotalIncidentByYear = await repository.getTotalIncidentByYear(date);
    // const getTotalIncidentBySector = await repository.getTotalIncidentBySector(date);


    if (!sectors.success) {
        return <div>Error al obtener los sectores</div>
    }


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <DrawerCustom size="5xl" tittle="Registro de Incidente" >
                <FormIncident sectors={sectors.data}></FormIncident>
            </DrawerCustom>

            <FormModal>
                <FormDelete funtionDelete={repository.deleteIncident}></FormDelete>
            </FormModal>



            <div className="flex flex-col sm:gap-4 pb-4">
                <div className="flex items-center gap-4 px-4">

                </div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className=" grid flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 lg:gap-8">
                            <div className="grid auto-rows-max items-start   gap-4 lg:col-span-2 lg:gap-8">
                                <div className="border rounded-lg shadow  p-6">
                                    <h2 className="text-lg font-semibold mb-1">Resumen de Incidentes</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Detalles de los incidentes registrados
                                    </p>
                                    <div className="grid lg:grid-cols-3 gap-6">
                                        <CardGetTotalAmountCostIncidetByYear repository={repository} date={date}></CardGetTotalAmountCostIncidetByYear>
                                        <CardGetTotalIncidentByYear repository={repository} date={date}></CardGetTotalIncidentByYear>
                                        <CardGetTotalIncidentBySector repository={repository} date={date}></CardGetTotalIncidentBySector>
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

                                        <div className='hidden sm:block'>
                                            <FiltersSearchSheets />
                                        </div>

                                    </div>
                                    <div className="overflow-hidden">
                                        <Suspense key={1} fallback={<div>Loading...</div>}>
                                            <TableIncident page={page} per_page={per_page} date={date} query={query} sector={sector}></TableIncident>
                                        </Suspense>
                                    </div>
                                    <Suspense fallback={<div>cargando</div>}>
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

async function CardGetTotalAmountCostIncidetByYear({ repository, date }: { repository: IServiceIncidentRepository, date: string }) {
    const getTotalAmountCostIncidetByYear = await repository.getTotalAmountCostIncidetByYear(date);
    if (!getTotalAmountCostIncidetByYear.success) {
        return <div>Error al obtener los datos</div>
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
                    <h4 className={`text-3xl lg:text-4xl font-bold`}>{'$' + getTotalAmountCostIncidetByYear.data.toFixed(2)}</h4>
                    <p className="text-sm text-gray-500 "> Resumen del total de Gastos en el Año</p>
                </div>
            </div>
        </Card>
    )

}

async function CardGetTotalIncidentByYear({ repository, date }: { repository: IServiceIncidentRepository, date: string }) {
    const getTotalIncidentByYear = await repository.getTotalIncidentByYear(date);
    if (!getTotalIncidentByYear.success) {
        return <div>Error al obtener los datos</div>
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
                    <h4 className={`text-3xl lg:text-4xl font-bold`}>{getTotalIncidentByYear.data}</h4>
                    <p className="text-sm text-gray-500 "> Resumen del total de Incidentes en el Año</p>
                </div>
            </div>
        </Card>
    )
}

async function CardGetTotalIncidentBySector({ repository, date }: { repository: IServiceIncidentRepository, date: string }) {
    const getTotalIncidentBySector = await repository.getTotalIncidentBySector(date);
    if (!getTotalIncidentBySector.success) {
        return <div>Error al obtener los datos</div>

    }

    const data: CircleChartProps =
    {
        title: "Incidentes por Sector",
        categories: ["Mariscal Sucre", "Nueva Ecuador"],
        color: "primary",
        chartData: getTotalIncidentBySector.data,
    }

    return (
        <div>
            <CircleChartCard
                {...data}

            ></CircleChartCard>
        </div>
    )
}