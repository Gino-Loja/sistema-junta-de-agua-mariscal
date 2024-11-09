import dynamic from 'next/dynamic'
import MeasurementTable from "@/components/measurement/MeasurementTable";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";

import SkeletonCustom from '@/components/skeletons/skeleton';
import PaginationControls from '@/components/table/PaginationControlsx';
import { ITEMS_PER_PAGE } from '@/model/Definitions';
import FiltersSearchSheets from '@/components/sheets/FiltersSearchSheets';
import Search from '@/components/forms/Search';
import { Divider } from '@nextui-org/react';
//import FormAddLecture from '@/components/forms/FormLecture';

type CustomSearchParams = { date: string, page: string, per_page: string, query: string }


const FormModal = dynamic(() =>
  import('@/components/modal/FormModal').then((mod) => mod.default)
)
const FormAddLecture = dynamic(() =>
  import('@/components/forms/FormLecture').then((mod) => mod.default)
)



export default async function Page({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {


  const repositoryLectures: ILecturesRepository = createApiLecturesRepository();

  const currentDate = now(getLocalTimeZone())
  // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales
  const date = searchParams.date || currentDate.toAbsoluteString();

  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? ITEMS_PER_PAGE
  const query = searchParams['query'] ?? ''
  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)

  return (
    <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

      <FormModal>
        <FormAddLecture></FormAddLecture>
      </FormModal>
      <div className='flex flex-row gap-2 justify-between'>
        <div>
          <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Lecturas</h1>
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
      <Suspense key={page + per_page + query} fallback={<SkeletonCustom />}>
        <MeasurementTable repository={repositoryLectures} page={page} per_page={per_page} date={date} query={query}></MeasurementTable>
      </Suspense>

      <Suspense fallback={<div>cargando</div>}>
        <FechtRenderPaginationControls repository={repositoryLectures} selectedDate={date} start={start} end={end} query={query} />
      </Suspense>

    </div>
  )
}

async function FechtRenderPaginationControls({ repository, selectedDate, start, end, query }: { repository: ILecturesRepository, selectedDate: string, start: number, end: number, query: string }) {
  const data = await repository.getCounterLectures(selectedDate, query)
  return (
    data.success &&
    <PaginationControls
      total={data.data.total_lectures}
      hasNextPage={end < data.data.total_lectures}
      hasPrevPage={start > 0} />
  )
}

