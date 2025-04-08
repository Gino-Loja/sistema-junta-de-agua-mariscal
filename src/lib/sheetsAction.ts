'use server'
import { MonthlyRevenue, QueryResultError, RevenueBySector, SheetDto, Sheets } from "@/model/types";
import pool from "./db";
import { revalidatePath } from 'next/cache';


export const getSheetsByYearsAndMonths = async (date: string): Promise<QueryResultError<Sheets[]>> => {
    try {
        const sheets: Sheets[] = (await pool.query(`
        SELECT 
                planillas.*, 
                lecturas.consumo, 
                lecturas.exceso, 
                usuarios.nombre AS nombre, 
                medidores.id AS medidor_id
        FROM 
            planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        WHERE 
            DATE_TRUNC('month', planillas.fecha_emision) = DATE_TRUNC('month', $1::date)
        `, [date])).rows; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const getCalculateMonthlyRevenue = async (year: number, month: number | null): Promise<QueryResultError<MonthlyRevenue>> => {
    try {
        const sheets: MonthlyRevenue = (await pool.query(`
        SELECT 
            SUM(valor_abonado) AS total_recaudado,
            SUM(total_pagar) AS total_pagar
        FROM 
            planillas
        WHERE 
            EXTRACT(YEAR FROM fecha_emision) = $1 AND
            ($2::integer IS NULL OR EXTRACT(MONTH FROM fecha_emision) = $2)
        `, [year, month])).rows[0]; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos de la planilla: ${error}` };
    }
};

export const getRevenueBySector = async (year: number, month: number | null): Promise<QueryResultError<RevenueBySector[]>> => {
    try {
        const sheets: RevenueBySector[] = (await pool.query(`
            SELECT 
            sectores.nombre AS sector_nombre,
            SUM(planillas.valor_abonado) AS total_recaudado
        FROM 
            planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        JOIN 
            sectores ON usuarios.sector_id = sectores.id
        WHERE 
            EXTRACT(YEAR FROM fecha_emision) = $1 AND
            ($2::integer IS NULL OR EXTRACT(MONTH FROM fecha_emision) = $2)
        GROUP BY 
            sectores.nombre
        `, [year, month])).rows; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };

    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const percentageRevenueByStatus = async (year: number, month: number | null): Promise<QueryResultError<{ porcentaje_planilla_pagadas: number }>> => {
    try {
        const sheets = (await pool.query(`
        SELECT 
            CASE 
                WHEN COUNT(*) = 0 THEN 0
                ELSE (COUNT(*) FILTER (WHERE estado = 'pagada') * 100 / COUNT(*))
            END AS porcentaje_planilla_pagadas
        FROM 
            planillas
        WHERE 
            EXTRACT(YEAR FROM fecha_emision) = $1 AND
            ($2::integer IS NULL OR EXTRACT(MONTH FROM fecha_emision) = $2) 
        `, [year, month])).rows[0];

        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getAmountMonthsByYear = async (year: number): Promise<QueryResultError<{ mes: Date, sector_nombre: string, total_recaudado: number, total_deuda: number }[]>> => {
    try {
        const months = (await pool.query(`
        SELECT 
            (DATE_TRUNC('month', planillas.fecha_emision))::date AS mes,
            sectores.nombre AS sector_nombre,
            SUM(planillas.valor_abonado) AS total_recaudado,
            SUM(planillas.total_pagar ) AS total_deuda
        FROM 
            planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        JOIN 
            sectores ON usuarios.sector_id = sectores.id
        WHERE 
            EXTRACT(YEAR FROM planillas.fecha_emision) = $1
        GROUP BY 
            mes, sectores.nombre
            `, [year])).rows;
        return { success: true, data: months };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo: ${error}` };
    }
}


export const getSheetsPagination = async (date: string, currentPage: number, itemsPerPage: number, query: string, year: number, month: number, status: string): Promise<QueryResultError<Sheets[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;
    //console.log(date, query, currentPage, itemsPerPage)
    let queryDate = date == "" ? null : date;
    let queryStatus = status == "" ? null : status;
    try {
        const sheets: Sheets[] = (await pool.query(`
        SELECT 
                planillas.*, 
                lecturas.consumo, 
                lecturas.exceso, 
                usuarios.id AS usuario_id,
                usuarios.nombre AS nombre, 
                medidores.id AS medidor_id
        FROM 
            planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        WHERE 
            EXTRACT(MONTH FROM planillas.fecha_emision) = $3 AND
            EXTRACT(YEAR FROM planillas.fecha_emision) = $2 AND
            ($5::date IS NULL OR planillas.fecha_emision = $5::date) AND
            ($4::text IS NULL OR planillas.estado = $4) AND
         (usuarios.nombre ILIKE '%' || $1 || '%'
            OR usuarios.cedula ILIKE  '%' || $1 || '%')
        ORDER BY 
            usuarios.nombre ASC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        
        `, [query, year, month, queryStatus, queryDate])).rows; // Formateamos la fecha con año-mes-01


        return { success: true, data: sheets };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };

    }
};

export async function getCounterSheets(date: string, query: string, year: number, month: number, status: string): Promise<QueryResultError<{ total_planillas: number }>> {
    let queryDate = date == "" ? null : date;
    let queryStatus = status == "" ? null : status;
    try {
        const sheets = (await pool.query(`select
        count(*) as total_planillas
        from
        planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        WHERE 
            EXTRACT(MONTH FROM planillas.fecha_emision) = $3 AND
            EXTRACT(YEAR FROM planillas.fecha_emision) = $2 AND
            ($5::date IS NULL OR planillas.fecha_emision = $5::date) AND
            ($4::text IS NULL OR planillas.estado = $4) AND
         (usuarios.nombre ILIKE '%' || $1 || '%'
            OR usuarios.cedula ILIKE  '%' || $1 || '%')

        `, [query, year, month, queryDate, queryStatus])).rows[0]; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener el total de planillas: ${error}` };
    }
}

export async function updateSheet(data: SheetDto): Promise<QueryResultError<boolean>> {
    try {
        const sheet: boolean = (await pool.query(`
            UPDATE public.planillas
            SET 
            valor_abonado=$1,
            estado=$2
            WHERE id = $3
            RETURNING
                id
        `, [data.valor_abonado, data.estado, data.id])).rows[0].id;
        revalidatePath('/sheets/tableSheets');
        return { success: true, data: sheet };
    } catch (error) {

        return { success: false, error: `Error al actualizar la planilla: ${error}` };
    }
}

/*
    Funciones para planillas por usuario
*/

export const getSheetsByUser = async (
    date: string,
    currentPage: number,
    itemsPerPage: number,
    year: number | null,
    month: number | null,
    status: string,
    usuarioId: number,
    medidorId: number
): Promise<QueryResultError<Sheets[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;
    let queryStatus = status == "" ? null : status;
    let queryDate = date == "" ? null : date;

    try {
        const sheets: Sheets[] = (await pool.query(`
        SELECT 
                planillas.*, 
                lecturas.consumo, 
                lecturas.exceso, 
                usuarios.id AS usuario_id,
                usuarios.nombre AS nombre, 
                medidores.id AS medidor_id
        FROM 
            planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        WHERE
        
            ($1::text IS NULL OR planillas.estado = $1) AND
            ($2::integer IS NULL OR EXTRACT(MONTH FROM planillas.fecha_emision) = $2) AND
            ($3::integer IS NULL OR EXTRACT(YEAR FROM planillas.fecha_emision) = $3) AND
            ($4::date IS NULL OR planillas.fecha_emision = $4::date) AND
            usuarios.id = $5 AND
            medidores.id = $6
        
        ORDER BY 
            planillas.fecha_emision ASC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        
        `, [queryStatus, month, year, queryDate, usuarioId, medidorId])).rows; // Formateamos la fecha con año-mes-01


        return { success: true, data: sheets };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };

    }
};


export async function getWaterMeterById(id: number): Promise<QueryResultError<{ id: number, estado: string, tipo: string }[]>> {
    try {
        const waterMeter = (await pool.query(
            `SELECT 
                m.id,
                m.estado,
                m.tipo
            FROM 
                medidores m
            JOIN 
                usuarios u ON m.usuario_id = u.id
            WHERE 
                u.id = $1
           `, [id]
        )).rows;
        return { success: true, data: waterMeter };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getCountSheetPendingByUser(
    year: number | null,
    month: number | null,
    userId: number,
    medidorId: number
): Promise<QueryResultError<{ fecha: Date, valor_abonado: number, total_pagar: number, id: number }[]>> {
    try {

        const count = (await pool.query<{ fecha: Date, valor_abonado: number, total_pagar: number, id: number }>(`
            SELECT 
                planillas.fecha_emision as fecha,
                planillas.valor_abonado ,
                planillas.total_pagar,
                planillas.id 

            FROM 
                planillas
            JOIN 
                lecturas ON planillas.id_lectura = lecturas.id
            JOIN 
                medidores ON lecturas.medidor_id = medidores.id
            JOIN 
                usuarios ON medidores.usuario_id = usuarios.id
            WHERE 
                ($1::integer IS NULL OR EXTRACT(MONTH FROM planillas.fecha_emision) = $1) AND
                ($2::integer IS NULL OR EXTRACT(YEAR FROM planillas.fecha_emision) = $2) AND
                usuarios.id = $3 AND
                medidores.id = $4 AND
                planillas.estado = 'pendiente' 
            ORDER BY planillas.fecha_emision


           `, [month, year, userId, medidorId]
        )).rows;
        return { success: true, data: count };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}


export async function getUserById(id: number): Promise<QueryResultError<{ id: number, cedula: string, nombre: string }>> {

    try {
        const user = (await pool.query(
            `SELECT 
                u.cedula,
                u.nombre,
                u.id
            FROM 
                usuarios u
            WHERE 
                u.id = $1
            `, [id]
        )).rows[0];

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}


export async function getCounterSheetsByUser(
    date: string,
    year: number | null,
    month: number | null,
    status: string,
    usuarioId: number,
    medidorId: number

    ): Promise<QueryResultError<{ total_planillas: number }>> {
    let queryDate = date == "" ? null : date;
    let queryStatus = status == "" ? null : status;
    try {
        const sheets = (await pool.query(`select
        count(*) as total_planillas
        from
        planillas
        JOIN 
            lecturas ON planillas.id_lectura = lecturas.id
        JOIN 
            medidores ON lecturas.medidor_id = medidores.id
        JOIN 
            usuarios ON medidores.usuario_id = usuarios.id
        WHERE 
            ($1::text IS NULL OR planillas.estado = $1) AND
            ($2::integer IS NULL OR EXTRACT(MONTH FROM planillas.fecha_emision) = $2) AND
            ($3::integer IS NULL OR EXTRACT(YEAR FROM planillas.fecha_emision) = $3) AND
            ($4::date IS NULL OR planillas.fecha_emision = $4::date) AND
            usuarios.id = $5 AND
            medidores.id = $6

        `, [
            queryStatus,
            month,
            year,
            queryDate,
            usuarioId,
            medidorId
        ])).rows[0]; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener el conteo de planillas: ${error}` };
    }
}