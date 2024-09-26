import TableLectures from "@/components/lecturas/TableLectures";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { createApiLecturesRepository } from "@/services/serviceLectures";
import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import MetricLectures from "@/components/lecturas/MetricsLectures";
//import dynamic from 'next/dynamic'
import { SkeletonCustom } from "@/components/skeletons/skeleton";
import { SkeletonMetricUser } from "@/components/skeletons/SkeletonsMetricUser";
import { LectureBarChart } from "@/components/lecturas/LectureBarChart";

type CustomSearchParams = { date: string }

//const SkeletonCustom = dynamic(() => import('../../components/skeletons/skeleton').then((mod) => mod.SkeletonCustom))

export default async function Page({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {
  const repositoryLectures: ILecturesRepository = createApiLecturesRepository();
  const currentDate = now(getLocalTimeZone())
  // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales
  const date = searchParams.date || currentDate.toAbsoluteString();
  return (
    <div>
      <Suspense key={date} fallback={<SkeletonMetricUser />}>
        <MetricLectures params={date}></MetricLectures>
      </Suspense>

      <Suspense key={date + Math.random.toString()} fallback={<div>cargando....</div>}>
        <FetchAndRenderComsumedMonthsByYear repository={repositoryLectures} selectedDate={date}></FetchAndRenderComsumedMonthsByYear>
      </Suspense>
      <Suspense fallback={<SkeletonCustom />}>
        {/* {FetchAndRenderAllLectures({ repository: repositoryLectures, selectedDate: date })} */}
        <FetchAndRenderAllLectures repository={repositoryLectures} selectedDate={date}></FetchAndRenderAllLectures>
      </Suspense>
    </div>
  )
}

async function FetchAndRenderAllLectures({ repository, selectedDate }: { repository: ILecturesRepository, selectedDate: string }) {

  //const month = searchParams.month || currentMonth;
  //console.log(date)
  const lectures = await repository.getLecturesByYearsAndMonths(selectedDate)
  //console.log(lectures)
  return (
    lectures.success && <TableLectures lecturas={lectures.data}>
    </TableLectures>
  )
}



async function FetchAndRenderComsumedMonthsByYear({ repository, selectedDate }: { repository: ILecturesRepository, selectedDate: string }) {
  const consumedByYear = await repository.getComsumedMonthsByYear(selectedDate)
  //console.log(consumedByYear)
  return (
    consumedByYear.success && <LectureBarChart data={consumedByYear.data}>
    </LectureBarChart>
  )
}