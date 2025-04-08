import dynamic from 'next/dynamic'

import { Suspense } from "react";
import TableSheets from '@/components/sheets/TableSheets';
import { ISheetsRepository } from '@/model/sheets-repository/sheetsRepository';
import { createApiSheetsRepository } from '@/services/serviceSheets';
import SkeletonCustom from '@/components/skeletons/skeleton';
import { ITEMS_PER_PAGE, TIME_ZONE } from '@/model/Definitions';
import PaginationControls from '@/components/table/PaginationControlsx';
import Search from '@/components/forms/Search';
import FiltersSearchSheets from '@/components/sheets/FiltersSearchSheets';
import { Divider } from '@nextui-org/react';
import { PageProps } from '@/modules/types';
import { coordinatesCache } from '@/modules/searchParams';
import MonthYearSelector from '@/components/filters-table/MonthYearSelector';
import { now } from '@internationalized/date';
import SelectStatus from '@/components/filters-table/selectStatus';
//import FormAddLecture from '@/components/forms/FormLecture';


const FormModal = dynamic(() =>
    import('@/components/modal/FormModal').then((mod) => mod.default)
)
const FormAddSheet = dynamic(() =>
    import('@/components/forms/FormSheet').then((mod) => mod.default)
)

export default async function Page({ searchParams }: PageProps) {

    const { date, query, page, per_page, year, status, month } = coordinatesCache.parse(searchParams)
    const repositorySheets: ISheetsRepository = createApiSheetsRepository();
    // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales
    // mocked, skipped and limited in the real app
    const currentMonth = month == null ? now(TIME_ZONE).month : month;

    return (
        <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>
            <FormModal>
                <FormAddSheet></FormAddSheet>
            </FormModal>
            <div className='flex flex-row gap-2 justify-between'>
                <div>
                    <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Planillas</h1>
                </div>
                <div>
                    <MonthYearSelector />
                </div>
            </div>
            <Divider />

            <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between mb-3'>

                <div className='sm:w-80 w-full'>
                    <Search placeholder='Buscar por nombre...' />
                </div>

                <div className='sm:w-80 w-full'>
                    <SelectStatus options={[
                        { label: 'Pagado', value: 'pagada' },
                        { label: 'Pendiente', value: 'pendiente' }
                    ]} />
                </div>

                <div className='sm:w-80 w-full'>
                    <FiltersSearchSheets />
                </div>



            </div>


            <Suspense key={`table-${page}-${query}`} fallback={<SkeletonCustom />}>
                <TableSheets repository={repositorySheets}
                    page={page}
                    per_page={per_page}
                    date={date}
                    query={query}
                    year={year}
                    month={currentMonth}
                    status={status} />


            </Suspense>

            <Suspense fallback={<div>cargando</div>}>
                <FechtRenderPaginationControls
                    repository={repositorySheets}
                    selectedDate={date}
                    page={Number(page)}
                    per_page={Number(per_page)}
                    query={query}
                    year={year}
                    month={currentMonth}
                    status={status} />
            </Suspense>
        </div>
    )
}


async function FechtRenderPaginationControls({ repository, selectedDate, page, per_page, query, year, month, status }: { repository: ISheetsRepository, selectedDate: string, page: number, per_page: number, query: string, year: number, month: number, status: string }) {

    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)

    const data = await repository.getCounterSheets(
        selectedDate,
        query,
        year,
        month,
        status
    )
    return (
        data.success &&
        <PaginationControls
            total={data.data.total_planillas}
            hasNextPage={end < data.data.total_planillas}
            hasPrevPage={start > 0} />
    )
}
