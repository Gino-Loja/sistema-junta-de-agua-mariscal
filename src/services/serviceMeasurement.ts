import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { getLecturesByYearsAndMonths, getALLMonthsLecturesByYear, getComsumedMetersByMonths, getConsumedBySector, getComsumedMonthsByYear, createLecture, updateLecture, getLecturesPagination, getCounterLectures } from "@/lib/MeasurementAction";
export function createApiLecturesRepository(): ILecturesRepository {
    return {
        getLecturesByYearsAndMonths,
        getALLMonthsLecturesByYear,
        getComsumedMetersByMonths,
        getConsumedBySector,
        getComsumedMonthsByYear,
        createLecture,
        updateLecture,
        getLecturesPagination,getCounterLectures
    };
}
