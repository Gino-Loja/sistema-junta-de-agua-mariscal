import { CircleChartCard } from "@/components/Bar-chart";
import MonthYearSelector from "@/components/filters-table/MonthYearSelector";
import WeekSelector from "@/components/filters-table/weekSelector";
import { FormDelete } from "@/components/forms/form-delete";
import FormMacro from "@/components/forms/form-macro";
import LoadingIcon from "@/components/icons/loading-icon";
import { MacroMeasurementAreaChart } from "@/components/measurement/macro/area-chart-macro";
import MeasurementMacroTable from "@/components/measurement/macro/macro-measurement-table";
import FormModalDelete from "@/components/modal/form-modal-delete";

import SkeletonCustom from "@/components/skeletons/skeleton";
import PaginationControls from "@/components/table/PaginationControlsx";
import { TIME_ZONE } from "@/model/Definitions";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";

import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { now } from "@internationalized/date";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const FormModal = dynamic(() =>
    import('@/components/modal/FormModal').then((mod) => mod.default)
)
export default async function Page({ searchParams }: PageProps) {
    const { date, query, page, per_page, from, to, month, year } = coordinatesCache.parse(searchParams)
    const safeMonth = month ?? now(TIME_ZONE).month;
    
    const repository = createApiLecturesRepository();



    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">


            <FormModal>

                <FormMacro></FormMacro>

            </FormModal>

            <FormModalDelete>

                <FormDelete funtionDelete={repository.deleteMeasurementMacro}></FormDelete>

            </FormModalDelete>

            <div className="flex flex-col sm:gap-4 pb-4">
                <div className="flex items-center gap-4 px-4">

                </div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className=" grid flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                                <CardAreaChartMeasurementMacro repository={repository}

                                    from={from}
                                    to={to}
                                    year={year}
                                    month={safeMonth}
                                ></CardAreaChartMeasurementMacro>
                                {/* Stock section */}
                                <div className="border rounded-lg p-6 shadow overflow-hidden">
                                    <h2 className="text-lg font-semibold mb-1">Lecturas Macro Medidor</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Lista de Lecturas registradas
                                    </p>
                                    <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between mb-3'>

                                        <div className="w-full sm:w-80 min-w-[200px]">
                                            <MonthYearSelector />
                                        </div>
                                        <div className=''>
                                            <WeekSelector />
                                        </div>
                                        <div className=''>

                                        </div>

                                    </div>
                                    <div className="overflow-hidden">
                                        <Suspense key={1} fallback={<SkeletonCustom />}>
                                            <MeasurementMacroTable repository={repository}
                                                page={page}
                                                per_page={per_page}
                                                date={date}
                                                from={from}
                                                to={to}
                                                month={safeMonth}
                                                year={year}

                                            ></MeasurementMacroTable>
                                        </Suspense>
                                    </div>
                                    <Suspense fallback={<LoadingIcon />}>
                                        <FechtRenderPaginationControls repository={repository}
                                            year={year}
                                            month={safeMonth}
                                            from={from}
                                            to={to}
                                            page={page}
                                            per_page={per_page}
                                         />
                                    </Suspense>
                                </div>
                                {/* Product Category section */}

                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

async function CardAreaChartMeasurementMacro({ repository, from, to, month, year }: { repository: ILecturesRepository, from: string, to: string, month: number, year: number }) {
    const getTotalAmountCostIncidetByYear = await repository.getMeasurementMacroAreaChart(from, to, month, year);
    if (!getTotalAmountCostIncidetByYear.success) {
        return <div>Error al obtener los datos</div>
    }

    return (

        <MacroMeasurementAreaChart data={getTotalAmountCostIncidetByYear.data}></MacroMeasurementAreaChart>
    )

}


async function FechtRenderPaginationControls({ repository, year, month, from, to, page, per_page }: { repository: ILecturesRepository, year: number, month: number, from: string, to: string, page: string, per_page: string }) {
    const data = await repository.getCounterMeasurementMacro(month, year,from, to);
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)
    return (
        data.success &&
        <PaginationControls
            total={data.data.total}
            hasNextPage={end < data.data.total}
            hasPrevPage={start > 0} />
    )
}

