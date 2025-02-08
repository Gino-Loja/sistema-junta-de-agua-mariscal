import { QueryResultError, Sector } from "@/model/types";

export interface IServiceDashboardRepository {

    getSectors: () => Promise<QueryResultError<{ value: string, label: string }[]>>;
    getTotalInvoice: (date:string) => Promise<QueryResultError<number>>;
    getTotalIncident: (date: string) => Promise<QueryResultError<number>>;
    getTotalSheets: (date:string) => Promise<QueryResultError<number>>;
    getTotalWaterMeter: (date:string) => Promise<QueryResultError<number>>;
    getTotalUser: () => Promise<QueryResultError<number>>;
    getAmountInvoice : (date:string) => Promise<QueryResultError<number>>;
    getAmountIncident : (date:string) => Promise<QueryResultError<number>>;
    getAmountSheets : (date:string) => Promise<QueryResultError<number>>;
    getRate: () => Promise<QueryResultError<Rate>>;
    
}

