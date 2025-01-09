import dynamic from 'next/dynamic'

import { Suspense } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { ISheetsRepository } from '@/model/sheets-repository/sheetsRepository';
import { createApiSheetsRepository } from '@/services/serviceSheets';
import MetricSheets from '@/components/sheets/MetricsSheets';
import { SheetsBarChart } from '@/components/sheets/SheetsBarChart';
import MetricSkeleton from '@/components/skeletons/SkeletomMetric';
import BarChartSkeleton from '@/components/skeletons/BarChartSkeleton';
import FiltersSearchSheets from '@/components/sheets/FiltersSearchSheets';
import { Divider } from '@nextui-org/react';

//import FormAddLecture from '@/components/forms/FormLecture';



type CustomSearchParams = { date: string, page: string, per_page: string }

export default function Page({ searchParams }: {
    searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {
    const repositorySheets: ISheetsRepository = createApiSheetsRepository();
    const currentDate = now(getLocalTimeZone())

    // Si no existe el parámetro 'year' o 'month' en los searchParams, usa los valores actuales
    const date = searchParams.date || currentDate.toAbsoluteString();

    const parsedDate = new Date(date);
    // Extraer el mes (recuerda que `getMonth()` devuelve los meses en base 0, es decir, enero es 0)
    const month = parsedDate.getMonth() + 1; // Sumar 1 para que los meses vayan de 1 a 12
    const year = parsedDate.getFullYear();

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

            <Suspense key={`metric-${month}`} fallback={<MetricSkeleton />}>
                <MetricSheets params={date} />
            </Suspense>
            <Suspense key={`barchart-${year}`} fallback={<BarChartSkeleton />}>
                <FetchAndRenderAmountdMonthsByYear repository={repositorySheets} selectedDate={date} />
            </Suspense>
        </div>
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


