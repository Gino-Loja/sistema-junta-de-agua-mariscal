import {  MonthlyRevenue, QueryResultError, RevenueBySector, SheetDto, Sheets } from "../types";

export interface ISheetsRepository {
    getSheetsByYearsAndMonths: (date: string) => Promise<QueryResultError<Sheets[]>>;
    getCalculateMonthlyRevenue: (date: string) => Promise<QueryResultError<MonthlyRevenue>>;
    getRevenueBySector: (date: string) => Promise<QueryResultError<RevenueBySector[]>>;
    percentageRevenueByStatus: (date: string) => Promise<QueryResultError<{ porcentaje_planilla_pagadas: number }>>;
    getAmountMonthsByYear: (date: string) => Promise<QueryResultError<{ mes: Date, sector_nombre: string, total_recaudado: number }[]>>;
    getSheetsPagination: (date: string, currentPage: number, itemsPerPage: number, query:string) => Promise<QueryResultError<Sheets[]>>;
    getCounterSheets: (date: string, query:string) => Promise<QueryResultError<{ total_planillas: number }>>;
    updateSheet: (data: SheetDto) => Promise<QueryResultError<boolean>>;
}

