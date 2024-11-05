import { Lectures, LecturesDto, Months, QueryResultError, Years } from "../types";

export interface ILecturesRepository {
    getLecturesByYearsAndMonths: (date: string) => Promise<QueryResultError<Lectures[]>>;
    getComsumedMetersByMonths: (date: string) => Promise<QueryResultError<{ exceso: number | null, consumo: number | null }>>;
    getALLMonthsLecturesByYear: (year: string) => Promise<QueryResultError<Months[]>>;
    getConsumedBySector: (date: string) => Promise<QueryResultError<{ sector: string, consumo: number }[]>>;
    getComsumedMonthsByYear: (date: string) => Promise<QueryResultError<{ mes: string, consumo_total: number, exceso_total: number }[]>>;

    createLecture: (data: LecturesDto) => Promise<QueryResultError<boolean>>;
    updateLecture: (data: LecturesDto, id: number) => Promise<QueryResultError<boolean>>;
    getLecturesPagination: (date: string, currentPage: number, itemsPerPage: number, query:string) => Promise<QueryResultError<Lectures[]>>;
    getCounterLectures: (date:string, query:string) => Promise<QueryResultError<{ total_lectures: number }>>;
}

