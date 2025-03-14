import MonthYearSelector from "@/components/filters-table/MonthYearSelector";
import Search from "@/components/forms/Search";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import SkeletonCustom from "@/components/skeletons/skeleton";
import PaginationControls from "@/components/table/PaginationControlsx";
import { createApiServiceInvoiceRepository } from "@/modules/invoice/service/service-invoice";
import TableInvoice from "@/modules/invoice/ui/table/table-invoice";
import { IInvoiceRepository } from "@/modules/invoice/utils/model";
import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";
import { Divider } from "@nextui-org/react";
import { Suspense } from "react";

export default function Page({ searchParams }: PageProps) {

    const { date, query, page, per_page, month, year } = coordinatesCache.parse(searchParams)
    const repositoryInvoice = createApiServiceInvoiceRepository();
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)
    return (

        <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

            <div className='flex flex-row gap-2 justify-between'>
                <div>
                    <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Facturas emitidas</h1>
                </div>
            </div>
            <Divider />

            <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between'>

                <div className='sm:w-80 w-full'>
                    <Search placeholder='Buscar por nombre...' />
                </div>

                <div >
                    <FiltersSearchSheets />
                </div>
                <div>
                    <MonthYearSelector/>
                </div>

            </div>


            <Suspense key={`table-${page}-${query}`} fallback={<SkeletonCustom />}>
                <TableInvoice
                    page={page}
                    per_page={per_page}
                    date={date}
                    query={query}
                    month={month}
                    year={year}

                />
            </Suspense>

            <Suspense fallback={<div>cargando</div>}>
                <FechtRenderPaginationControls 
                repository={repositoryInvoice}
                 selectedDate={date} 
                 start={start} 
                 end={end} 
                 query={query} 
                 month={month}
                 year={year}
                 />
            </Suspense>
        </div>


    )
}

async function FechtRenderPaginationControls({ repository, selectedDate, start, end, query, month, year }: { repository: IInvoiceRepository, selectedDate: string, start: number, end: number, query: string, month: number, year: number }) {
    const data = await repository.getCounterInvoiceByDate(selectedDate, query,month, year);


    return (
        data.success &&
        <PaginationControls
            total={data.data.total}
            hasNextPage={end < data.data.total}
            hasPrevPage={start > 0} />
    )
}