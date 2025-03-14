
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { Suspense } from "react";
import MeasurementMetric from "@/components/measurement/MeasurementMetrics";
import { MeasurementBarChart } from "@/components/measurement/MeasurementBarChart";
import MetricSkeleton from '@/components/skeletons/SkeletomMetric';
import BarChartSkeleton from '@/components/skeletons/BarChartSkeleton';

import { Divider } from "@nextui-org/react";
import MonthYearSelector from "@/components/filters-table/MonthYearSelector";
import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";

type CustomSearchParams = { date: string, page: string, per_page: string }


export default async function Page({ searchParams }: PageProps) {
  const { date, year, month } = coordinatesCache.parse(searchParams)
  

  const repositoryLectures: ILecturesRepository = createApiLecturesRepository();

  return (
    <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

      <div className='flex flex-row gap-2 justify-between'>
        <div>
          <h1 className="text-2xl font-bold shrink p-1 max-w-36 border-divider rounded-xl">Resumen</h1>
        </div>

        <div className="w-full sm:w-80 min-w-[200px]">
          <MonthYearSelector />
        </div>
      </div>
      <Divider />
      <Suspense key={month} fallback={<MetricSkeleton />}>
        <MeasurementMetric year={year} month={month}></MeasurementMetric>
      </Suspense>
      <Suspense key={month + 1} fallback={<BarChartSkeleton />}>
        <FetchAndRenderComsumedMonthsByYear repository={repositoryLectures} year={year}></FetchAndRenderComsumedMonthsByYear>
      </Suspense>

    </div>
  )
}




async function FetchAndRenderComsumedMonthsByYear({ repository, year }: { repository: ILecturesRepository, year: number }) {
  const consumedByYear = await repository.getComsumedMonthsByYear(year)
  return (
    consumedByYear.success && <MeasurementBarChart data={consumedByYear.data}>
    </MeasurementBarChart>
  )
}

