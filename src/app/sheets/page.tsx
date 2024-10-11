import dynamic from 'next/dynamic'

import { createApiLecturesRepository } from "@/services/serviceLectures";
import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import TableSheets from '@/components/sheets/TableSheets';
import { ISheetsRepository } from '@/model/sheets-repository/sheetsRepository';
import { createApiSheetsRepository } from '@/services/serviceSheets';
import MetricSheets from '@/components/sheets/MetricsSheets';
import { SheetsBarChart } from '@/components/sheets/SheetsBarChart';
import MetricSkeleton from '@/components/skeletons/SkeletomMetric';
import { SkeletonCustom } from '@/components/skeletons/skeleton';
//import FormAddLecture from '@/components/forms/FormLecture';

type CustomSearchParams = { date: string }


const FormModal = dynamic(() =>
    import('@/components/modal/FormModal').then((mod) => mod.default)
)
const FormAddSheet = dynamic(() =>
    import('@/components/forms/FormSheet').then((mod) => mod.default)
)



export default async function Page({ searchParams }: {
    searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {
    const repositorySheets: ISheetsRepository = createApiSheetsRepository();
    const currentDate = now(getLocalTimeZone())
    // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales
    const date = searchParams.date || currentDate.toAbsoluteString();

    //console.log(date)
    return (
        <div>
            <FormModal>
                <FormAddSheet></FormAddSheet>
            </FormModal>

            <Suspense key={date} fallback={<MetricSkeleton />}>
                <MetricSheets params={date}></MetricSheets>
            </Suspense>

            <Suspense key={date + Math.random.toString()} fallback={<div>cargando....</div>}>
                <FetchAndRenderAmountdMonthsByYear repository={repositorySheets} selectedDate={date}></FetchAndRenderAmountdMonthsByYear>
            </Suspense>

            <Suspense fallback={<SkeletonCustom />}>
                {/* {FetchAndRenderAllLectures({ repository: repositoryLectures, selectedDate: date })} */}
                <FetchAndRenderAllLectures repository={repositorySheets} selectedDate={date}></FetchAndRenderAllLectures>
            </Suspense>
        </div>
    )
}

async function FetchAndRenderAllLectures({ repository, selectedDate }: { repository: ISheetsRepository, selectedDate: string }) {

    const sheets = await repository.getSheetsByYearsAndMonths(selectedDate)
    //console.log(lectures)
    //console.log(sheets)
    return (
        sheets.success && <TableSheets sheets={sheets.data}>
        </TableSheets>
    )
}

async function FetchAndRenderAmountdMonthsByYear({ repository, selectedDate }: { repository: ISheetsRepository, selectedDate: string }) {
    const consumedByYear = await repository.getAmountMonthsByYear(selectedDate)
    //console.log(consumedByYear)
    return (
        consumedByYear.success && <SheetsBarChart data={consumedByYear.data}>
        </SheetsBarChart>
    )
}