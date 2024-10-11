import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { getLecturesByYearsAndMonths, getALLMonthsLecturesByYear, getComsumedMetersByMonths, getConsumedBySector, getComsumedMonthsByYear, createLecture, updateLecture } from "@/lib/lecturesAction";
export function createApiLecturesRepository(): ILecturesRepository {
    return {
        getLecturesByYearsAndMonths,
        getALLMonthsLecturesByYear,
        getComsumedMetersByMonths,
        getConsumedBySector,
        getComsumedMonthsByYear,
        createLecture,
        updateLecture,
    };
}
