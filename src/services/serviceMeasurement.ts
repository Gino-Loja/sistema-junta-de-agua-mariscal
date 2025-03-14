import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { getLecturesByYearsAndMonths, getALLMonthsLecturesByYear,
     getComsumedMetersByMonths, getConsumedBySector, getComsumedMonthsByYear,
      createLecture, updateLecture, getLecturesPagination, getCounterLectures,
       getMeasurementMacro, insertMeasurementMacro, updateMeasurementMacro, 
       deleteMeasurementMacro, getMeasurementMacroAreaChart, getCounterMeasurementMacro } from "@/lib/MeasurementAction";
export function createApiLecturesRepository(): ILecturesRepository {
    return {
        getLecturesByYearsAndMonths,
        getALLMonthsLecturesByYear,
        getComsumedMetersByMonths,
        getConsumedBySector,
        getComsumedMonthsByYear,
        createLecture,
        updateLecture,
        getLecturesPagination,
        getCounterLectures,
        getMeasurementMacro,
        insertMeasurementMacro,
        updateMeasurementMacro,
        deleteMeasurementMacro,
        getMeasurementMacroAreaChart,
        getCounterMeasurementMacro
    };
}
