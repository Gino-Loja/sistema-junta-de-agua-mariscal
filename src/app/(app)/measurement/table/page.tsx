import dynamic from 'next/dynamic'
import MeasurementTable from "@/components/measurement/MeasurementTable";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { Suspense } from "react";

import SkeletonCustom from '@/components/skeletons/skeleton';
import PaginationControls from '@/components/table/PaginationControlsx';
import Search from '@/components/forms/Search';
import { Divider } from '@nextui-org/react';
import { PageProps } from '@/modules/types';
import { coordinatesCache } from '@/modules/searchParams';
import MonthYearSelector from '@/components/filters-table/MonthYearSelector';
import { getSectors } from '@/modules/incident/utils/use-media-query';
import SelectParams from '@/components/filters-table/SelectParams';
import LoadingIcon from '@/components/icons/loading-icon';
//import FormAddLecture from '@/components/forms/FormLecture';



const FormModal = dynamic(() =>
  import('@/components/modal/FormModal').then((mod) => mod.default)
)
const FormAddLecture = dynamic(() =>
  import('@/components/forms/FormLecture').then((mod) => mod.default)
)



export default async function Page({ searchParams }: PageProps) {


  const repositoryLectures: ILecturesRepository = createApiLecturesRepository();
  const { date, query, page, per_page, year, month, sector } = coordinatesCache.parse(searchParams)
  // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales


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

      <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center">

        <div className='w-80'>
          <Search placeholder='Buscar por nombre...' />
        </div>

        <div className="w-full sm:w-80 min-w-[200px]">
          <Suspense fallback={<LoadingIcon />}>
            <GetSectorSelector />
          </Suspense>
        </div>

        <div className="w-full sm:w-80 min-w-[200px]">
          <MonthYearSelector />
        </div>
      </div>

      <Suspense key={page + per_page + query + year + month} fallback={<SkeletonCustom />}>
        <MeasurementTable
          repository={repositoryLectures}
          page={page} per_page={per_page}
          date={date} month={month}
          year={year} query={query}
          sector={sector}
        ></MeasurementTable>
      </Suspense>

      <Suspense key={page + per_page + query + year + month} fallback={<LoadingIcon />}>
        <FechtRenderPaginationControls
          repository={repositoryLectures}
          page={page}
          per_page={per_page}
          month={month}
          year={year}
          sector={sector}
          query={query} />
      </Suspense>

    </div>
  )
}

async function FechtRenderPaginationControls({ repository, query, month, year, sector, page, per_page }:
  { repository: ILecturesRepository, query: string, month: number, year: number, sector: string, page: string, per_page: string }) {
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)
  const data = await repository.getCounterLectures(query, sector, month, year)
  return (
    data.success &&
    <PaginationControls
      total={data.data.total_lectures}
      hasNextPage={end < data.data.total_lectures}
      hasPrevPage={start > 0} />
  )
}

async function GetSectorSelector() {
  const sector = await getSectors();
  return (
    sector.success &&
    <SelectParams options={sector.data} />
  )
}
