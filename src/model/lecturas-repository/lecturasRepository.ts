import { Lectures, LecturesDto, MeasurementMacro, Months, QueryResultError, Years } from "../types";

export interface ILecturesRepository {
    getLecturesByYearsAndMonths: (date: string) => Promise<QueryResultError<Lectures[]>>;
    getComsumedMetersByMonths: (month: number, year: number) => Promise<QueryResultError<{ exceso: number | null, consumo: number | null }>>;
    getALLMonthsLecturesByYear: (year: string) => Promise<QueryResultError<Months[]>>;
    getConsumedBySector: (year: number, month: number) => Promise<QueryResultError<{ sector: string, consumo: number }[]>>;
    getComsumedMonthsByYear: (year: number) => Promise<QueryResultError<{ mes: string, consumo_total: number, exceso_total: number }[]>>;

    createLecture: (data: LecturesDto) => Promise<QueryResultError<boolean>>;
    updateLecture: (data: LecturesDto, id: number) => Promise<QueryResultError<boolean>>;
    getLecturesPagination: ( currentPage: number, itemsPerPage: number, query: string, year: number, month: number, sector: string) => Promise<QueryResultError<Lectures[]>>;
    getCounterLectures: ( query: string, sector: string, mes: number, year: number) => Promise<QueryResultError<{ total_lectures: number }>>;
    getMeasurementMacro: (currentPage: number, itemsPerPage: number, from: string, to: string, month: number, year: number) => Promise<QueryResultError<MeasurementMacro[]>>;
    insertMeasurementMacro: (date: Date, lectura: number) => Promise<QueryResultError<boolean>>;
    updateMeasurementMacro: (date: Date, lectura: number, id: number) => Promise<QueryResultError<boolean>>;
    deleteMeasurementMacro: (id: number) => Promise<QueryResultError<boolean>>;
    getMeasurementMacroAreaChart: ( from: string, to: string,  month: number, year: number) => Promise<QueryResultError<{ fecha: Date, consumo: number }[]>>;
    getCounterMeasurementMacro: (date: string) => Promise<QueryResultError<{ total: number }>>;


}

