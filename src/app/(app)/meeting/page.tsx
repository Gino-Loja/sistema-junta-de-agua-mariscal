'use server';
import FiltersGroup from "@/components/filters-table/filtersGroup";
import MonthYearSelector from "@/components/filters-table/MonthYearSelector";
import SelectStatus from "@/components/filters-table/selectStatus";
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
import { Card } from "@nextui-org/react";
import { Suspense } from "react";

export default async function Page({ searchParams }: PageProps) {

    const { date, query, page, per_page, year, status } = coordinatesCache.parse(searchParams)
    const repositoryMeeting = createApiMeetingRepository();
    const countStatus = await repositoryMeeting.getTotalMeetingByStatus(year);


    if (!countStatus.success) {
        return <div className="bg-red-500">{countStatus.error}</div>
    }

    const totalMeetingCount = countStatus.data.reduce((acc, item) => acc + item.total, 0)


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <DrawerCustom tittle="Registro de sesion" >
                <FormMeeting></FormMeeting>
            </DrawerCustom>
            <FormModalDelete>
                <FormDelete funtionDelete={repositoryMeeting.deleteMeeting}></FormDelete>
            </FormModalDelete>


            <div className="flex flex-col sm:gap-4 pb-4">



                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-6">
                    <div className=" grid flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start   gap-4 lg:col-span-2 lg:gap-8">
                                <div className="border rounded-lg shadow  p-6">



                                    <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                        <div className="col-span-2">
                                            <h2 className="text-lg font-semibold mb-1">Detalles de Reuniones</h2>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Detalles del estado de las Reuniones registradas por mes
                                            </p>
                                        </div>
                                        <div className="col-start-3">
                                            <MonthYearSelector viewMonth={false} />

                                        </div>
                                    </div>


                                    <Suspense key={year} fallback={<StatusSkeleton />}>
                                        <div className="grid lg:grid-cols-2 gap-6">
                                            <StatusSection year={year} repositoryMeeting={repositoryMeeting}></StatusSection>
                                        </div>

                                    </Suspense>
                                </div>
                                {/* Stock section */}
                                <div className="border rounded-lg p-6 shadow overflow-hidden">
                                    <h2 className="text-lg font-semibold mb-1">Multas registradas</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Lista de deudores de Reuniones por mes
                                    </p>
                                    <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between mb-3'>

                                        <div className='sm:w-80 w-full'>
                                            <Search placeholder='Buscar por nombre...' />
                                        </div>
                                        <div>
                                            <FiltersGroup
                                                statusComponentx={
                                                    <SelectStatus options={[
                                                        {
                                                            label: 'Pagado',
                                                            value: 'pagado'
                                                        },
                                                        {
                                                            label: 'Pendiente',
                                                            value: 'pendiente'
                                                        }
                                                    ]
                                                    } />
                                                }
                                                dateComponentx={
                                                    <FiltersSearchSheets />
                                                }
                                            />
                                        </div>



                                    </div>
                                    <div className="overflow-hidden">
                                        <Suspense key={query + page + per_page + year} fallback={<div>Loading...</div>}>
                                            <TableMeeting
                                                page={page}
                                                per_page={per_page}
                                                date={date}
                                                query={query}
                                                year={year}
                                                status={status}
                                            ></TableMeeting>
                                        </Suspense>
                                    </div>
                                    <Suspense key={year} fallback={<PaginationControlsSkeleton />}>
                                        <FechtRenderPaginationControls repository={repositoryMeeting} selectedDate={date} query={query} year={year} page={page} per_page={per_page} />
                                    </Suspense>
                                </div>
                                {/* Product Category section */}

                            </div>
                            <div className="grid auto-rows-max items-start  gap-4 lg:gap-8">
                                {/* Product Status section */}
                                <div className="border rounded-lg shadow p-6">
                                    <h2 className="text-lg font-semibold mb-4">Total de usuarios multados</h2>
                                    <div className="grid gap-3">
                                        <Card
                                            radius="sm"
                                            shadow="none"
                                            className="border-1 shadow-sm border-transparent dark:border-default-200
           
                                                        hover:shadow-md rounded-md p-6 pl-8 relative overflow-hidden"
                                        >
                                            <div className={`absolute left-0 top-0 bottom-0 w-2 bg-default`}></div>
                                            <div>
                                                <div className="space-y-3">
                                                    <h4 className={`text-3xl lg:text-4xl font-bold`}>{totalMeetingCount}</h4>
                                                    <p className="text-sm text-gray-500 "> Numero total de Multas</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                                {/* Product Images section */}
                                <Suspense key={year} fallback={
                                    <div className="h-44 bg-default-100 rounded-lg p-6 animate-pulse">
                                        <div className="h-6 bg-default-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-8 bg-default-200 rounded w-1/2"></div>
                                        <div className="h-8 bg-default-200 rounded w-1/2"></div>
                                        <div className="h-8 bg-default-200 rounded w-1/2"></div>


                                    </div>
                                }>
                                    {totalAmount(repositoryMeeting, year)}
                                </Suspense>
                                {/* Archive Product section */}

                            </div>
                        </div>

                    </div>
                </main>
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
        <div className="border rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Total Recaudado en el Año </h2>
            <div className="grid gap-3">
                <Card
                    radius="sm"
                    shadow="none"
                    className="border-1 shadow-sm border-transparent dark:border-default-200
           
                                                        hover:shadow-md rounded-md p-6 pl-8 relative overflow-hidden"
                >
                    <div className={`absolute left-0 top-0 bottom-0 w-2 bg-green-500`}></div>
                    <div>
                        <div className="space-y-3">
                            <h4 className={`text-3xl lg:text-4xl font-bold`}>$ {data.data}</h4>
                            <p className="text-sm text-gray-500 ">dinero de multas pagadas</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )

}

async function StatusSection({ year, repositoryMeeting }: { year: number, repositoryMeeting: IMeetingRepository }) {
    const status = await repositoryMeeting.getTotalMeetingByStatus(year);

    if (!status.success) {
        return <div className="bg-red-500">{status.error}</div>;
    }

    return (
        <>
            {status.data.map((item, index) => (
                <Card
                    key={index}
                    radius="sm"
                    shadow="none"
                    className="border-1 shadow-sm border-transparent dark:border-default-200 hover:shadow-md rounded-md p-6 pl-8 relative overflow-hidden"
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