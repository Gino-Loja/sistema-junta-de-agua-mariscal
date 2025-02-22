'use server';
import pool from '@/lib/db';
import { QueryResultError } from '@/model/types';
import { revalidatePath } from 'next/cache';


export const getIncidents = async (
    date: string,
    query: string,
    currentPage: number,
    itemsPerPage: number,
    sectorId: string
): Promise<QueryResultError<Incident[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;
    try {
        const incidents: Incident[] = (await pool.query(`
            SELECT 
                u.nombre AS nombre_usuario,
                u.id AS usuario_id,
                i.id,
                i.sector_id,
                s.nombre AS nombre_sector,
                s.id AS sector_id,
                i.fecha,
                i.descripcion,
                encode(i.foto, 'base64') AS foto,
                i.costo
            FROM 
                incidentes i
            INNER JOIN 
                usuarios u ON i.usuario_id = u.id
            INNER JOIN
                sectores s ON i.sector_id = s.id
            WHERE 
                date_trunc('year', i.fecha) = date_trunc('year', $1::date)
                AND 
                (u.nombre ILIKE '%' || $2 || '%'  )
                AND
                (s.id::text ILIKE  '%' || $3 || '%')

            ORDER BY 
            nombre_usuario ASC
            LIMIT ${itemsPerPage} OFFSET ${offset};
                
        `, [date, query, sectorId])).rows; // Formateamos la fecha con año-mes-01
        return { success: true, data: incidents };
    } catch (error) {
        return { success: false, error: `Error al obtener los incidentes: ${error}` };
    }
};

export const insertIncident = async (formData: { usuario_id: number; fecha: Date, sector_id: number; descripcion: string; foto: string; costo: number; }): Promise<QueryResultError<Incident[]>> => {

    try {
        const fotoBuffer = Buffer.from(formData.foto.split(',')[1], 'base64');

        const incidents: Incident[] = (await pool.query(`
            INSERT INTO 
                incidentes (usuario_id, fecha, sector_id, descripcion, foto, costo)
            VALUES 
                ($1, $2, $3, $4, $5, $6)
                
        `, [formData.usuario_id, formData.fecha, formData.sector_id, formData.descripcion, fotoBuffer, formData.costo])).rows; // Formateamos la fecha con año-mes-01
        revalidatePath('/incident');
        return { success: true, data: incidents };
    } catch (error) {
        return { success: false, error: `Error al insertar el incidente: ${error}` };
    }
};

export const updateIncident = async (formData: { usuario_id: number; fecha: Date, sector_id: number; descripcion: string; foto: string; costo: number; incident_id: number }): Promise<QueryResultError<Incident[]>> => {

    try {
        const incidents: Incident[] = (await pool.query(`
            UPDATE 
                incidentes
            SET 
                usuario_id = $1,
                fecha = $2,
                sector_id = $3,
                descripcion = $4,
                foto = $5,
                costo = $6,
            WHERE 
                id = $7
                
        `, [formData.usuario_id, formData.fecha, formData.sector_id, formData.descripcion, formData.foto, formData.costo, formData.incident_id])).rows; // Formateamos la fecha con año-mes-01
        revalidatePath('/incident');

        return { success: true, data: incidents };
    } catch (error) {
        return { success: false, error: `Error al actualizar el incidente: ${error}` };
    }
};

export const deleteIncident = async (id: number): Promise<QueryResultError<boolean>> => {

    try {
         (await pool.query(`
            DELETE FROM 
                incidentes
            WHERE 
                id = $1
                
        `, [id])).rows; // Formateamos la fecha con año-mes-01
        revalidatePath('/incident');
        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al eliminar el incidente: ${error}` };
    }
};

export const getTotalAmountCostIncidetByYear = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
            select
                coalesce(sum(costo), 0) as total
            from
                incidentes
            where
                date_trunc('year', fecha::date) = date_trunc('year', $1::date);

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalIncidentByYear = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
            select
              
                coalesce(count(*), 0) as total

            from
                incidentes
            where
                date_trunc('year', fecha::date) = date_trunc('year', $1::date);

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalIncidentBySector = async (date: string): Promise<QueryResultError<{  name: string, value: number }[]>> => {
    try {
        const total = (await pool.query(`
            select
                
                s.nombre as name,
                count(*) as value
            from
                incidentes
            inner join
                sectores s on incidentes.sector_id = s.id
            where
                date_trunc('year', incidentes.fecha::date) = date_trunc('year', $1::date)
            group by
                s.id,
                s.nombre

        `, [date])).rows;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getSectors = async (): Promise<QueryResultError<{ value: string, label: string }[]>> => {
    try {
        const sectors: { value: string, label: string }[] = (await pool.query(`
            SELECT 
                id::text as value,
                nombre as label
            FROM 
                sectores
        `)).rows;
        return { success: true, data: sectors };
    } catch (error) {
        return { success: false, error: `Error al obtener los sectores: ${error}` };
    }
};