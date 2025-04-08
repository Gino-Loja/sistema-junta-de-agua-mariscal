import dynamic from 'next/dynamic'

import { Suspense } from "react";
import { now } from "@internationalized/date";
import { ISheetsRepository } from '@/model/sheets-repository/sheetsRepository';
import { createApiSheetsRepository } from '@/services/serviceSheets';
import MetricSheets from '@/components/sheets/MetricsSheets';
import { SheetsBarChart } from '@/components/sheets/SheetsBarChart';
import MetricSkeleton from '@/components/skeletons/SkeletomMetric';
import BarChartSkeleton from '@/components/skeletons/BarChartSkeleton';
import { Divider } from '@nextui-org/react';
import { TIME_ZONE } from '@/model/Definitions';
import { PageProps } from '@/modules/types';
import { coordinatesCache } from '@/modules/searchParams';
import MonthYearSelector from '@/components/filters-table/MonthYearSelector';
import MonthSelector from '@/components/filters-table/MonthSelector';
import YearSelector from '@/components/filters-table/YearSelector';

//import FormAddLecture from '@/components/forms/FormLecture';

export default async function Page({ searchParams }: PageProps) {
    const { month, year } = coordinatesCache.parse(searchParams)
    const repositorySheets: ISheetsRepository = createApiSheetsRepository();
    const currentMonth = month == null ? now(TIME_ZONE).month : month;



    return (
        <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

            <div className='flex flex-col sm:flex-row gap-2 justify-between items-center'>
                <h1 className="text-2xl font-bold p-1 border-divider rounded-xl shrink-0">Resumen Planillas</h1>
                <div className='min-w-48'>
                    <MonthYearSelector />

                </div>



            </div>
            <Divider />

            <Suspense key={`metric-${currentMonth}`} fallback={<MetricSkeleton />}>
                <MetricSheets year={year} month={currentMonth} />
            </Suspense>
            <Suspense key={`barchart-${year}`} fallback={<BarChartSkeleton />}>
                <FetchAndRenderAmountdMonthsByYear repository={repositorySheets} year={year} />
            </Suspense>
        </div>
    )
}



async function FetchAndRenderAmountdMonthsByYear({ repository, year }: { repository: ISheetsRepository, year: number }) {
    const consumedByYear = await repository.getAmountMonthsByYear(year)
    //console.log(consumedByYear)
    return (
        consumedByYear.success && <SheetsBarChart data={consumedByYear.data}>
        </SheetsBarChart>
    )
}


