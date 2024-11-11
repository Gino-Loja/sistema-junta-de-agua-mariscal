'use server';

import { QueryResultError, WaterMeter, WaterMeterDto } from "@/model/types";
import pool from "./db";

export async function getWaterMeter(): Promise<QueryResultError<WaterMeter[]>> {
    try {
        const waterMeters: WaterMeter[] = (await pool.query(

            `SELECT 
                m.id AS medidor_id,
                m.numero_serie,
                m.tipo,
                m.fecha_instalacion,
                u.nombre AS nombre,
                usuario_id,
                detalle,
                m.estado,
                u.cedula
            FROM 
                medidores m
            JOIN 
                usuarios u ON m.usuario_id = u.id
            ORDER BY 
                u.nombre ASC`
        )).rows;
        return { success: true, data: waterMeters };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterPagination(currentPage: number,
    itemsPerPage: number,
    query: string,
    type: string,
    status: string
): Promise<QueryResultError<WaterMeter[]>> {
    const offset = (currentPage - 1) * itemsPerPage;

    try {
        const waterMeters: WaterMeter[] = (await pool.query(
            `SELECT 
                m.id,
                m.numero_serie,
                m.tipo,
                m.fecha_instalacion,
                u.nombre AS nombre,
                usuario_id,
                detalle,
                m.estado,
                u.cedula
            FROM 
                medidores m
            JOIN 
                usuarios u ON m.usuario_id = u.id
            
            WHERE 
                    u.nombre ILIKE '%' || $1 || '%' OR
                    u.cedula ILIKE '%' || $1 || '%' OR
                    m.tipo ILIKE '%' || $1 || '%'  OR
                    m.estado ILIKE '%' || $1 || '%'
            ORDER BY 
                u.nombre ASC
            LIMIT ${itemsPerPage}
            OFFSET ${offset};

`, [query]
        )).rows;
        return { success: true, data: waterMeters };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getCounterMeterWater(query: string, status: string, type: string): Promise<QueryResultError<{ total_water_meters: number }>> {

    try {
        const waterMeters = (await pool.query(

            `SELECT COUNT(*) AS total_water_meters
            FROM medidores m
            JOIN usuarios u ON m.usuario_id = u.id
            
            WHERE  
                    u.nombre ILIKE '%' || $1 || '%' OR
                    u.cedula ILIKE '%' || $1 || '%' OR
                    m.tipo ILIKE '%' || $1 || '%'  OR
                    m.estado ILIKE '%' || $1 || '%' `, [query]
        )).rows[0];
        return { success: true, data: waterMeters };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }


}

export async function getUserByName(
    name: string
): Promise<QueryResultError<{ id: number, cedula: string, nombre: string }[]>> {

    try {
        const waterMeters = (await pool.query(
            `SELECT 
                u.cedula,
                u.nombre,
                u.id
            FROM 
                usuarios u
            WHERE 
                u.nombre ILIKE '%' || $1 || '%' OR
                u.cedula ILIKE '%' || $1 || '%'

            ORDER BY 
                u.nombre ASC
            LIMIT 8;`, [name]
        )).rows;

        return { success: true, data: waterMeters };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function createWaterMeter(waterMeter: WaterMeterDto): Promise<QueryResultError<boolean>> {
    try {
        const waterMeterId = (await pool.query(
            `INSERT INTO medidores (numero_serie, tipo, fecha_instalacion, usuario_id, detalle, estado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;`, [waterMeter.numero_serie, waterMeter.tipo, waterMeter.fecha_instalacion, waterMeter.usuario_id, waterMeter.detalle, waterMeter.estado]
        )).rows[0].id;
        return { success: true, data: waterMeterId };
    } catch (error) {
        return { success: false, error: `Error al crear el medidor: ${error}` };
    }
}

export async function getWaterMeterbyType(): Promise<QueryResultError<{ tipo: string, cantidad: number }[]>> {
    try {
        const rows = (await pool.query<{ tipo: string, cantidad: number }>(

            `SELECT tipo,
             COUNT(*) AS cantidad
            FROM medidores
            GROUP BY tipo;`
        )).rows
        return { success: true, data: rows };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterbyStatus(): Promise<QueryResultError<{ name: string, value: number }[]>> {
    try {
        const rows = (await pool.query<{ name: string, value: number }>(

            `SELECT estado as name, COUNT(*) AS value
                FROM medidores
                GROUP BY estado;
                `
        )).rows
        return { success: true, data: rows };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterbySector(): Promise<QueryResultError<{ name: string, value: number }[]>> {
    try {
        const rows = (await pool.query<{ name: string, value: number }>(

            `SELECT 
                s.nombre AS name,
                COUNT(*) AS value
            FROM 
                medidores m
            JOIN 
                usuarios u ON m.usuario_id = u.id
            JOIN 
                sectores s ON u.sector_id = s.id
            GROUP BY 
                s.nombre;
                `
        )).rows
        return { success: true, data: rows };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

//no esta  incluido en clean architecture
export async function getWaterMeterById(id: number): Promise<QueryResultError<WaterMeter[]>> {
    try {
        const waterMeter = (await pool.query(
            `SELECT 
                m.*, 
                u.nombre, 
                u.cedula
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

export async function getWaterMeterConsumptionById(id: number): Promise<QueryResultError<{ consumo_total: number }>> {
    try {
        const waterMeter = (await pool.query<{ consumo_total: number }>(
            `SELECT 
                    SUM(consumo) AS consumo_total
                FROM 
                    lecturas
                WHERE 
                    medidor_id = $1;
           `, [id]
        )).rows[0];
        return { success: true, data: waterMeter };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo del medidor: ${error}` };
    }
}

export async function getWaterMeterExcessById(id: number): Promise<QueryResultError<{ total_excesos: number }>> {
    try {
        const waterMeter = (await pool.query<{ total_excesos: number }>(
            `SELECT 
                SUM(exceso) AS total_excesos
            FROM 
                lecturas
            WHERE 
                medidor_id = 10;
           `, [id]
        )).rows[0];
        return { success: true, data: waterMeter };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo del medidor: ${error}` };
    }
}