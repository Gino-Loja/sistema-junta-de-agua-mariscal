import { QueryResultError, Sector } from "@/model/types";

export interface IServiceDashboardRepository {

    getSectors: () => Promise<QueryResultError<{ value: string, label: string }[]>>;
    getTotalInvoice: (date: number | null) => Promise<QueryResultError<number>>;
    getTotalIncident: (date: number | null) => Promise<QueryResultError<number>>;
    getTotalSheets: (date: number | null) => Promise<QueryResultError<number>>;
    getTotalWaterMeter: (date: number | null) => Promise<QueryResultError<number>>;
    getTotalUser: () => Promise<QueryResultError<number>>;
    getAmountInvoice : (date: number | null) => Promise<QueryResultError<number>>;
    getAmountIncident : (date: number | null) => Promise<QueryResultError<number>>;
    getAmountSheets : (date: number | null) => Promise<QueryResultError<number>>;
    getRate: () => Promise<QueryResultError<Rate>>;
    
}

