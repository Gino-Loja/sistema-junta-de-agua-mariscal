import { Lectures, LecturesDto, MeasurementMacro, Months, QueryResultError, Years } from "../types";

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
    getMeasurementMacro: (date:string, currentPage: number, itemsPerPage: number) => Promise<QueryResultError<MeasurementMacro[]>>;
    insertMeasurementMacro: (date:Date, lectura:number) => Promise<QueryResultError<boolean>>;
    updateMeasurementMacro: (date:Date, lectura:number, id:number) => Promise<QueryResultError<boolean>>;
    deleteMeasurementMacro: (id:number) => Promise<QueryResultError<boolean>>;
    getMeasurementMacroAreaChart: (date:string) => Promise<QueryResultError<{ fecha: Date, consumo: number }[]>>;
    getCounterMeasurementMacro:     (date:string) => Promise<QueryResultError<{ total:number }>>;

    
}

