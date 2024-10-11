'use server'
import { MonthlyRevenue, QueryResultError, RevenueBySector, Sheets } from "@/model/types";
import pool from "./db";
import { date } from "zod";


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