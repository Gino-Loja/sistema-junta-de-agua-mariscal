
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import MeasurementMetric from "@/components/measurement/MeasurementMetrics";
import { MeasurementBarChart } from "@/components/measurement/MeasurementBarChart";
import MetricSkeleton from '@/components/skeletons/SkeletomMetric';
import BarChartSkeleton from '@/components/skeletons/BarChartSkeleton';
import { ITEMS_PER_PAGE } from '@/model/Definitions';
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import { Divider } from "@nextui-org/react";

type CustomSearchParams = { date: string, page: string, per_page: string }


export default async function Page({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {
  const repositoryLectures: ILecturesRepository = createApiLecturesRepository();
  const currentDate = now(getLocalTimeZone())
  const date = searchParams.date || currentDate.toAbsoluteString();

  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? ITEMS_PER_PAGE
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)
  const parsedDate = new Date(date);

  const month = parsedDate.getMonth() + 1; // Sumar 1 para que los meses vayan de 1 a 12
  return (
    <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

      <div className='flex flex-row gap-2 justify-between'>
        <div>
          <h1 className="text-2xl font-bold shrink p-1 max-w-36 border-divider rounded-xl">Resumen</h1>
        </div>

        <div>
          <FiltersSearchSheets />
        </div>
      </div>
      <Divider />
      <Suspense key={month} fallback={<MetricSkeleton />}>
        <MeasurementMetric params={date}></MeasurementMetric>
      </Suspense>
      <Suspense key={month + 1} fallback={<BarChartSkeleton />}>
        <FetchAndRenderComsumedMonthsByYear repository={repositoryLectures} selectedDate={date}></FetchAndRenderComsumedMonthsByYear>
      </Suspense>

    </div>
  )
}




async function FetchAndRenderComsumedMonthsByYear({ repository, selectedDate }: { repository: ILecturesRepository, selectedDate: string }) {
  const consumedByYear = await repository.getComsumedMonthsByYear(selectedDate)
  return (
    consumedByYear.success && <MeasurementBarChart data={consumedByYear.data}>
    </MeasurementBarChart>
  )
}

