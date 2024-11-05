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
                u.nombre AS usuario_nombre
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
                m.estado
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
): Promise<QueryResultError<{ id: number, nombre: string }[]>> {

    try {
        const waterMeters = (await pool.query(
            `SELECT 
                u.id,
                u.nombre
            FROM 
                usuarios u
            WHERE 
                u.nombre ILIKE '%' || $1 || '%' OR
                u.cedula ILIKE '%' || $1 || '%' OR
                u.id::text ILIKE '%' || $1 || '%'
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