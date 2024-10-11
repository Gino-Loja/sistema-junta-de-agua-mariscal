import {  MonthlyRevenue, QueryResultError, RevenueBySector, Sheets } from "../types";

export interface ISheetsRepository {
    getSheetsByYearsAndMonths: (date: string) => Promise<QueryResultError<Sheets[]>>;
    getCalculateMonthlyRevenue: (date: string) => Promise<QueryResultError<MonthlyRevenue>>;
    getRevenueBySector: (date: string) => Promise<QueryResultError<RevenueBySector[]>>;
    percentageRevenueByStatus: (date: string) => Promise<QueryResultError<{ porcentaje_planilla_pagadas: number }>>;
    getAmountMonthsByYear: (date: string) => Promise<QueryResultError<{ mes: Date, sector_nombre: string, total_recaudado: number }[]>>;

}

