import dynamic from 'next/dynamic'
import TableLectures from "@/components/lecturas/TableLectures";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { createApiLecturesRepository } from "@/services/serviceLectures";
import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import MetricLectures from "@/components/lecturas/MetricsLectures";
import { LectureBarChart } from "@/components/lecturas/LectureBarChart";
import MetricSkeleton from '@/components/skeletons/SkeletomMetric';
import { SkeletonCustom } from '@/components/skeletons/skeleton';
//import FormAddLecture from '@/components/forms/FormLecture';

type CustomSearchParams = { date: string }



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

  //console.log(date)
  return (
    <div>

      <FormModal>
        <FormAddLecture></FormAddLecture>
      </FormModal>

      <Suspense key={date} fallback={<MetricSkeleton />}>
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