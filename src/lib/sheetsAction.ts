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

export const getCalculateMonthlyRevenue = async (date: string): Promise<QueryResultError<MonthlyRevenue>> => {
    try {
        const sheets: MonthlyRevenue = (await pool.query(`
                SELECT 
            SUM(valor_abonado) AS total_recaudado,
            SUM(total_pagar) AS total_pagar
        FROM 
            planillas
        WHERE 
            DATE_TRUNC('month', fecha_emision) = DATE_TRUNC('month', $1::date);
        `, [date])).rows[0]; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos de la planilla: ${error}` };
    }
};

export const getRevenueBySector = async (date: string): Promise<QueryResultError<RevenueBySector[]>> => {
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
            DATE_TRUNC('month', planillas.fecha_emision) = DATE_TRUNC('month', $1::date)
        GROUP BY 
            sectores.nombre
        `, [date])).rows; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };

    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const percentageRevenueByStatus = async (date: string): Promise<QueryResultError<{ porcentaje_planilla_pagadas: number }>> => {
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
            DATE_TRUNC('month', fecha_emision) = DATE_TRUNC('month', $1::date);
                        `, [date])).rows[0]; // Formateamos la fecha con año-mes-01
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getAmountMonthsByYear = async (date: string): Promise<QueryResultError<{ mes: Date, sector_nombre: string, total_recaudado: number }[]>> => {
    try {
        const months = (await pool.query(`
                       SELECT 
                        (DATE_TRUNC('month', planillas.fecha_emision))::date AS mes,
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
                        EXTRACT(YEAR FROM planillas.fecha_emision) = EXTRACT(YEAR FROM $1::date)
                    GROUP BY 
                        mes, sectores.nombre
            `, [date])).rows;
        return { success: true, data: months };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo: ${error}` };
    }
}


export const getSheetsPagination = async (date: string, currentPage: number, itemsPerPage: number, query: string): Promise<QueryResultError<Sheets[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;
    //console.log(date, query, currentPage, itemsPerPage)

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
            AND (usuarios.nombre ILIKE '%' || $2 || '%'
            OR usuarios.cedula ILIKE  '%' || $2 || '%')
        ORDER BY 
            usuarios.nombre ASC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        
        `, [date, query])).rows; // Formateamos la fecha con año-mes-01


        return { success: true, data: sheets };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };

    }
};

export async function getCounterSheets(date: string, query: string): Promise<QueryResultError<{ total_planillas: number }>> {
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
            DATE_TRUNC('month', planillas.fecha_emision) = DATE_TRUNC('month', $1::date)
            AND (usuarios.nombre ILIKE '%' || $2 || '%'
            OR usuarios.cedula ILIKE  '%' || $2 || '%')
        `, [date, query])).rows[0];
        return { success: true, data: sheets };
    } catch (error) {
        return { success: false, error: `Error al obtener el total de usuarios: ${error}` };
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