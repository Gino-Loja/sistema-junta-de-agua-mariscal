import { Lectures, Months, QueryResultError, Years } from "../types";

export interface ILecturesRepository {
    getLecturesByYearsAndMonths: (date: string) => Promise<QueryResultError<Lectures[]>>;
    getComsumedMetersByMonths: (date: string) => Promise<QueryResultError<{exceso: number | null, consumo: number | null}>>;
    getALLMonthsLecturesByYear: (year: string) => Promise<QueryResultError<Months[]>>;
    getConsumedBySector: (date: string) => Promise<QueryResultError<{ sector: string, consumo: number }[]>>;

}

