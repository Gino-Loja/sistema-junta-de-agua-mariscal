'use server';
import FiltersGroup from "@/components/filters-table/filtersGroup";
import SelectStatus from "@/components/filters-table/selectStatus";
import YearSelector from "@/components/filters-table/YearSelector";
import { FormDelete } from "@/components/forms/form-delete";
import Search from "@/components/forms/Search";
import DrawerCustom from "@/components/modal/drawer-custom";
import FormModalDelete from "@/components/modal/form-modal-delete";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import PaginationControlsSkeleton from "@/components/skeletons/PaginationControlsSkeleton";
import StatusSkeleton from "@/components/skeletons/StatusSkeleton";
import PaginationControls from "@/components/table/PaginationControlsx";
import { createApiMeetingRepository } from "@/modules/meeting/service/service-meeting";
import FormMeeting from "@/modules/meeting/ui/form-meeting";
import TableMeeting from "@/modules/meeting/ui/table-meeting";
import { IMeetingRepository } from "@/modules/meeting/utils/model";
import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";
import { Alert, Card } from "@nextui-org/react";
import { Suspense } from "react";

export default async function Page({ searchParams }: PageProps) {

    const { date, query, page, per_page, year, status } = coordinatesCache.parse(searchParams)
    const repositoryMeeting = createApiMeetingRepository();
    const countStatus = await repositoryMeeting.getTotalMeetingByStatus(year);


    if (!countStatus.success) {
        return <div className="bg-red-500">{countStatus.error}</div>
    }
    //0702074519
    const totalMeetingCount = countStatus.data.reduce((acc, item) => acc + item.total, 0)


    return (
        <div className="flex min-h-screen w-full bg-muted/40 ">
            <DrawerCustom tittle="Registro de sesion" >
                <FormMeeting></FormMeeting>
            </DrawerCustom>
            <FormModalDelete>
                <FormDelete funtionDelete={repositoryMeeting.deleteMeeting}></FormDelete>
            </FormModalDelete>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start m-6 w-full">
                {/* Sección de encabezado */}

                <div className="col-span-1 md:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div className="md:col-span-2 order-1 md:order-none">

                            <h1 className="text-2xl font-bold shrink p-1 max-w-42 border-divider rounded-xl">Resumen Reuniones</h1>
                            <p className="text-sm text-gray-500 mb-4">Detalles del estado de las Reuniones registradas en el año</p>
                        </div>
                        <div className="md:col-start-3 order-2 md:order-none">
                            <YearSelector />
                        </div>
                    </div>
                </div>

                {/* Contenido principal responsivo */}
                <div className="col-span-1 md:col-span-3 order-3 md:order-none">
                    <Suspense key={year} fallback={<StatusSkeleton />}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
                            <StatusSection year={year} repositoryMeeting={repositoryMeeting} />
                        </div>
                    </Suspense>
                </div>

                {/* Columna derecha adaptativa */}
                <div className="col-span-1 flex flex-col gap-4 md:gap-6 order-4 md:order-none">
                    <Card className="p-4 md:p-6 border shadow-sm rounded-md relative">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-default"></div>
                        <h4 className="text-2xl md:text-3xl font-bold">{totalMeetingCount}</h4>
                        <p className="text-sm text-gray-500">Número total de Multas</p>
                    </Card>

                    <Suspense key={year} fallback={
                        <div className="h-32 md:h-44 bg-default-100 rounded-lg p-4 md:p-6 animate-pulse">
                            <div className="h-5 md:h-6 bg-default-200 rounded w-3/4 mb-3 md:mb-4"></div>
                            <div className="h-7 md:h-8 bg-default-200 rounded w-1/2"></div>
                        </div>
                    }>
                        {totalAmount(repositoryMeeting, year)}
                    </Suspense>
                </div>

                {/* Tabla de reuniones responsiva */}
                <div className="col-span-1 md:col-span-4 mt-4 md:mt-6 order-5">
                    <div className="border rounded-lg p-4 md:p-6 shadow">
                        <h2 className="text-lg font-semibold mb-1">Multas registradas</h2>
                        <p className="text-sm text-gray-500 mb-4">Lista de deudores de Reuniones del año</p>

                        <div className="flex flex-col sm:flex-row gap-2 justify-between mb-3">
                            <div className="w-full sm:w-64 lg:w-80">
                                <Search placeholder='Buscar por nombre...' />
                            </div>
                            <FiltersGroup>
                                <>
                                    <SelectStatus options={[
                                        { label: 'Pagado', value: 'pagado' },
                                        { label: 'Pendiente', value: 'pendiente' }
                                    ]} />

                                    <FiltersSearchSheets />
                                </>

                            </FiltersGroup>


                        </div>

                        <div className="overflow-x-auto">
                            <Suspense key={query + page + per_page + year} fallback={<div>Cargando...</div>}>
                                <TableMeeting
                                    page={page}
                                    per_page={per_page}
                                    date={date}
                                    query={query}
                                    year={year}
                                    status={status}
                                />
                            </Suspense>
                        </div>

                        <Suspense key={year} fallback={<PaginationControlsSkeleton />}>
                            <FechtRenderPaginationControls
                                repository={repositoryMeeting}
                                selectedDate={date}
                                query={query}
                                year={year}
                                page={page}
                                per_page={per_page}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
    )
}

async function FechtRenderPaginationControls({ repository, selectedDate, query, year, page, per_page }: { repository: IMeetingRepository, selectedDate: string, query: string, year: number, page: string, per_page: string }) {
    const data = await repository.getCounterMeetingByDate(selectedDate, query, year)
    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page)
    return (
        data.success &&
        <PaginationControls
            total={data.data.total}
            hasNextPage={end < data.data.total}
            hasPrevPage={start > 0} />
    )
}

async function totalAmount(repository: IMeetingRepository, year: number) {

    const data = await repository.getTotalAmount(year)

    if (!data.success) {
        return <div>Error</div>
    }

    return (

        <Card
            radius="sm"
            shadow="none"
            className="p-4 md:p-6 border shadow-sm rounded-md relative"
        >
            <div className={`absolute left-0 top-0 bottom-0 w-2 bg-green-500`}></div>
            <h4 className="text-2xl md:text-3xl font-bold">${data.data ? data.data.toFixed(2) : 0.00}</h4>
            <p className="text-sm text-gray-500">Número total de Multas</p>
        </Card>

    )

}

async function StatusSection({ year, repositoryMeeting }: { year: number, repositoryMeeting: IMeetingRepository }) {
    const status = await repositoryMeeting.getTotalMeetingByStatus(year);

    if (!status.success) {
        return <Alert color='danger' variant={'faded'}
            title={`${status.error}`} />
    }

    if (status.data.length === 0) {
        return <div className="flex flex-col items-center justify-center">
            <Alert color='warning' variant={'faded'}
                title={`No Existen Multas registradas`} />
        </div>

    }





    return (
        <>
            {status.data.map((item, index) => (
                <Card
                    key={index}
                    radius="sm"
                    shadow="none"
                    className="border-1 shadow-sm border-transparent dark:border-default-200 hover:shadow-md rounded-md p-6 pl-8 relative overflow-hidden lg:h-56"
                >
                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.estado === 'pagado' ? 'bg-success' : 'bg-danger'}`}></div>
                    <h1 className="text-2xl font-bold mb-4">Reuniones {item.estado == "pendiente" ? "Pendientes por pagar" : "Pagadas"}</h1>
                    <div className="space-y-3">
                        <h4 className={`text-3xl lg:text-4xl font-bold`}>{item.total}</h4>
                        <p className="text-sm text-gray-500">Resumen del total de Reuniones {item.estado == "pendiente" ? "Pendientes" : "Pagadas"}</p>
                    </div>
                </Card>
            ))}
        </>
    );
}