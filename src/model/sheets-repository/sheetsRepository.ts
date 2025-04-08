import { MonthlyRevenue, QueryResultError, RevenueBySector, SheetDto, Sheets } from "../types";

export interface ISheetsRepository {
    getSheetsByYearsAndMonths: (date: string) => Promise<QueryResultError<Sheets[]>>;
    getCalculateMonthlyRevenue: (year: number, month: number | null) => Promise<QueryResultError<MonthlyRevenue>>;
    getRevenueBySector: (year: number, month: number | null) => Promise<QueryResultError<RevenueBySector[]>>;
    percentageRevenueByStatus: (year: number, month: number | null) => Promise<QueryResultError<{ porcentaje_planilla_pagadas: number }>>;
    getAmountMonthsByYear: (year: number) => Promise<QueryResultError<{ mes: Date, sector_nombre: string, total_recaudado: number, total_deuda: number }[]>>;
    getSheetsPagination: (date: string, currentPage: number, itemsPerPage: number, query: string, year: number, month: number, status: string) => Promise<QueryResultError<Sheets[]>>;
    getCounterSheets: (date: string, query: string, year: number, month: number, status: string) => Promise<QueryResultError<{ total_planillas: number }>>;
    updateSheet: (data: SheetDto) => Promise<QueryResultError<boolean>>;
    getSheetsByUser: (date: string, currentPage: number, itemsPerPage: number, year: number | null, month: number | null, status: string, usuarioId: number, medidorId: number) => Promise<QueryResultError<Sheets[]>>;
    getWaterMeterById: (id: number) => Promise<QueryResultError<{ id: number, estado: string, tipo: string }[]>>;
    getCountSheetPendingByUser: (year: number | null,
        month: number | null,
        userId: number,
        medidorId: number

    ) => Promise<QueryResultError<{ fecha: Date, valor_abonado: number, total_pagar: number,id:number }[]>>;
    getUserById: (id: number) => Promise<QueryResultError<{ id: number, nombre: string, cedula: string }>>;
    getCounterSheetsByUser: (date: string, year: number | null, month: number | null, status: string, usuarioId: number, medidorId: number) => Promise<QueryResultError<{ total_planillas: number }>>;
}

