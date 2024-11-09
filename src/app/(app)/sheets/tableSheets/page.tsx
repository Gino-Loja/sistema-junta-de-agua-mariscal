import dynamic from 'next/dynamic'

import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import TableSheets from '@/components/sheets/TableSheets';
import { ISheetsRepository } from '@/model/sheets-repository/sheetsRepository';
import { createApiSheetsRepository } from '@/services/serviceSheets';
import SkeletonCustom from '@/components/skeletons/skeleton';
import { ITEMS_PER_PAGE } from '@/model/Definitions';
import PaginationControls from '@/components/table/PaginationControlsx';
import Search from '@/components/forms/Search';
import FiltersSearchSheets from '@/components/sheets/FiltersSearchSheets';
import { Divider } from '@nextui-org/react';
//import FormAddLecture from '@/components/forms/FormLecture';


const FormModal = dynamic(() =>
    import('@/components/modal/FormModal').then((mod) => mod.default)
)
const FormAddSheet = dynamic(() =>
    import('@/components/forms/FormSheet').then((mod) => mod.default)
)
type CustomSearchParams = { date: string, page: string, per_page: string, query: string }

export default function Page({ searchParams }: {
    searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {
    const repositorySheets: ISheetsRepository = createApiSheetsRepository();
    const currentDate = now(getLocalTimeZone())

    // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales
    const date = searchParams.date || currentDate.toAbsoluteString();
    const page = searchParams['page'] ?? '1'
    const query = searchParams['query'] ?? ''
    const per_page = searchParams['per_page'] ?? ITEMS_PER_PAGE
    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)


    //console.log('Mes:', month);
    //console.log(Number(page) * Number(per_page))
    return (
        <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>
            <FormModal>
                <FormAddSheet></FormAddSheet>
            </FormModal>
            <div className='flex flex-row gap-2 justify-between'>
                <div>
                    <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Planillas</h1>
                </div>
            </div>
            <Divider />

            <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between'>

                <div className='sm:w-80 w-full'>
                    <Search placeholder='Buscar por nombre...' />
                </div>

                <div className='hidden sm:block'>
                    <FiltersSearchSheets />
                </div>

            </div>


            <Suspense key={`table-${page}-${query}`} fallback={<SkeletonCustom />}>
                <TableSheets repository={repositorySheets}
                    page={page}
                    per_page={per_page}
                    date={date}
                    query={query}
                />
            </Suspense>

            <Suspense fallback={<div>cargando</div>}>
                <FechtRenderPaginationControls repository={repositorySheets} selectedDate={date} start={start} end={end} query={query} />
            </Suspense>
        </div>
    )
}


async function FechtRenderPaginationControls({ repository, selectedDate, start, end, query }: { repository: ISheetsRepository, selectedDate: string, start: number, end: number, query:string }) {
    const data = await repository.getCounterSheets(selectedDate, query)
    return (
        data.success &&
        <PaginationControls
            total={data.data.total_planillas}
            hasNextPage={end < data.data.total_planillas}
            hasPrevPage={start > 0} />
    )
}
