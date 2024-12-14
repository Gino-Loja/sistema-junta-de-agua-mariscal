'use server';
import Search from "@/components/forms/Search";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import PaginationControls from "@/components/table/PaginationControlsx";
import { createApiMeetingRepository } from "@/modules/meeting/service/service-meeting";
import FormMeeting from "@/modules/meeting/ui/form-meeting";
import TableMeeting from "@/modules/meeting/ui/table-meeting";
import { IMeetingRepository } from "@/modules/meeting/utils/model";
import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";
import { Suspense } from "react";




export default async function Page({ searchParams }: PageProps) {

    const { date, query, page, per_page } = coordinatesCache.parse(searchParams)
    const repositoryMeeting = createApiMeetingRepository();
    const status = await repositoryMeeting.getTotalMeetingByStatus();
    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page)

    if (!status.success) {
        return <div>Error</div>
    }

    const totalMeetingCount = status.data.reduce((acc, item) => acc + item.total, 0)
    totalAmount(repositoryMeeting, date)

    //console.log(date, query, page, per_page)

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <FormMeeting></FormMeeting>

            <div className="flex flex-col sm:gap-4 pb-4">
                <div className="flex items-center gap-4 px-4">

                </div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className=" grid flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start   gap-4 lg:col-span-2 lg:gap-8">
                                <div className="border rounded-lg shadow  p-6">
                                    <h2 className="text-lg font-semibold mb-1">Detalles de Reuniones</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Detalles del estado de las Reuniones registradas
                                    </p>
                                    <div className="grid lg:grid-cols-2 gap-6">
                                        {
                                            status.data.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border shadow-sm rounded p-6 pl-8 relative overflow-hidden"
                                                    >
                                                        {/* Vertical line */}
                                                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.estado === 'pagado' ? 'bg-success' : 'bg-danger'}`}></div>
                                                        <h1 className="text-2xl font-bold mb-4">Reuniones {item.estado == "pendiente" ? "Pendientes" : "Pagadas"}</h1>
                                                        <div>
                                                            <div className="space-y-3">
                                                                <h4 className={`text-3xl lg:text-4xl font-bold`}>{item.total}</h4>
                                                                <p className="text-sm text-gray-500 "> Resumen del total de Reuniones {item.estado == "pendiente" ? "Pendientes" : "Pagadas"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }


                                    </div>
                                </div>
                                {/* Stock section */}
                                <div className="border rounded-lg p-6 shadow overflow-hidden">
                                    <h2 className="text-lg font-semibold mb-1">Multas registradas</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Lista de deudores de Reuniones
                                    </p>
                                    <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between mb-3'>

                                        <div className='sm:w-80 w-full'>
                                            <Search placeholder='Buscar por nombre...' />
                                        </div>

                                        <div className='hidden sm:block'>
                                            <FiltersSearchSheets />
                                        </div>

                                    </div>
                                    <div className="overflow-hidden">
                                        <Suspense key={query + page + per_page} fallback={<div>Loading...</div>}>
                                            <TableMeeting page={page} per_page={per_page} date={date} query={query}></TableMeeting>
                                        </Suspense>
                                    </div>
                                    <Suspense fallback={<div>cargando</div>}>
                                        <FechtRenderPaginationControls repository={repositoryMeeting} selectedDate={date} start={start} end={end} query={query} />
                                    </Suspense>
                                </div>
                                {/* Product Category section */}

                            </div>
                            <div className="grid auto-rows-max items-start  gap-4 lg:gap-8">
                                {/* Product Status section */}
                                <div className="border rounded-lg shadow p-6">
                                    <h2 className="text-lg font-semibold mb-4">Total de usuarios multados</h2>
                                    <div className="grid gap-3">
                                        <div

                                            className="border shadow-sm rounded p-6 pl-8 relative overflow-hidden"
                                        >
                                            <div className={`absolute left-0 top-0 bottom-0 w-2 bg-default`}></div>
                                            <div>
                                                <div className="space-y-3">
                                                    <h4 className={`text-3xl lg:text-4xl font-bold`}>{totalMeetingCount}</h4>
                                                    <p className="text-sm text-gray-500 "> Numero total de Multas</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Product Images section */}
                                <Suspense fallback={<div>cargando</div>}>
                                    {totalAmount(repositoryMeeting, date)}
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

async function FechtRenderPaginationControls({ repository, selectedDate, start, end, query }: { repository: IMeetingRepository, selectedDate: string, start: number, end: number, query: string }) {
    const data = await repository.getCounterMeetingByDate(selectedDate, query)
    return (
        data.success &&
        <PaginationControls
            total={data.data.total}
            hasNextPage={end < data.data.total}
            hasPrevPage={start > 0} />
    )
}

async function totalAmount(repository:IMeetingRepository, date: string) {

    const data = await repository.getTotalAmount(date)

    if (!data.success) {
        return <div>Error</div>
    }

    return (
        <div className="border rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Total Recaudado</h2>
        <div className="grid gap-3">
            <div

                className="border shadow-sm rounded p-6 pl-8 relative overflow-hidden"
            >
                <div className={`absolute left-0 top-0 bottom-0 w-2 bg-default`}></div>
                <div>
                    <div className="space-y-3">
                        <h4 className={`text-3xl lg:text-4xl font-bold`}>{data.data}</h4>
                        <p className="text-sm text-gray-500 "> Numero total de Multas</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
    
}
