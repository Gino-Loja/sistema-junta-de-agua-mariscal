'use server'
import pool from "../../../../lib/db";
import { revalidatePath } from 'next/cache';
import { CounterMeeting, Meeting, StatusAllMeeting } from "../../types";
import { QueryResultError } from "@/model/types";


export const getMeeting = async (date: string, query: string, currentPage: number, itemsPerPage: number, year: number, status: string): Promise<QueryResultError<Meeting[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;
    let queryStatus = status == "" ? null : status;
    let queryDate = date == "" ? null : date;
    try {
        const meeting: Meeting[] = (await pool.query(`
            SELECT 
                u.nombre AS nombre_usuario,
                m.motivo,
                m.fecha,
                m.estado,
                m.fecha_actualizacion,
                m.id,
                u.id AS usuario_id
            FROM 
                multas m
            INNER JOIN 
                usuarios u ON m.usuario_id = u.id
            WHERE 
                 ($4::date IS NULL OR m.fecha = $4) AND
                ($3::text IS NULL OR m.estado = $3) AND
                EXTRACT(YEAR FROM m.fecha) = $2 
                AND ((u.nombre ILIKE '%' || $1 || '%'
                OR u.cedula ILIKE  '%' || $1 || '%'))

            ORDER BY 
            nombre_usuario ASC
            LIMIT ${itemsPerPage} OFFSET ${offset};
                
        `, [query, year, queryStatus, queryDate])).rows; // Formateamos la fecha con año-mes-01
        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const insertMeeting = async (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; }): Promise<QueryResultError<Meeting[]>> => {

    try {
        const meeting: Meeting[] = (await pool.query(`
            INSERT INTO 
                multas (usuario_id, fecha, estado, motivo)
            VALUES 
                ($1, $2, $3, $4)
                
        `, [formData.usuario_id, formData.fecha, formData.estado, formData.motivo])).rows; // Formateamos la fecha con año-mes-01
        revalidatePath('/meeting');

        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const updateMeeting = async (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; multa_id: number }): Promise<QueryResultError<boolean>> => {
    try {
        const meeting: boolean = (await pool.query(`
            UPDATE 
                multas
            SET 
                usuario_id = $1,
                fecha = $2,
                estado = $3,
                motivo = $4,
                fecha_actualizacion = CURRENT_DATE
            WHERE 
                id = $5
            RETURNING id
                
        `, [formData.usuario_id, formData.fecha, formData.estado, formData.motivo, formData.multa_id])).rows[0].id; // Formateamos la fecha con año-mes-01
        revalidatePath('/meeting');

        return { success: true, data: meeting };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const deleteMeeting = async (id: number): Promise<QueryResultError<boolean>> => {

    try {
        const meeting: boolean = (await pool.query(`
            DELETE FROM 
                multas
            WHERE 
                id = $1
            RETURNING id
                
        `, [id])).rows[0].id; // Formateamos la fecha con año-mes-01
        revalidatePath('/meeting');

        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const getTotalMeetingByStatus = async (year: number): Promise<QueryResultError<StatusAllMeeting[]>> => {
    try {
        const total: StatusAllMeeting[] = (await pool.query(`
            select
            estado,
            count(*) as total
            from
            multas
            WHERE 
            EXTRACT(YEAR FROM fecha) = $1 

            group by
            estado;
        `, [year])).rows;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};



export const getCounterMeetingByDate = async (date: string, query: string, year:number): Promise<QueryResultError<CounterMeeting>> => {
    let queryStatus = date == "" ? null : date;
    try {
        const total: CounterMeeting = (await pool.query(`
            SELECT 
              
                count(*) as total
            FROM 
                multas m
            INNER JOIN 
                usuarios u ON m.usuario_id = u.id
            
            WHERE 

                ($1::date IS NULL OR m.fecha = $1) 
                AND EXTRACT(YEAR FROM fecha) = $3 

                AND ((u.nombre ILIKE '%' || $2 || '%'
                OR u.cedula ILIKE  '%' || $2 || '%'))

        `, [queryStatus, query, year])).rows[0];
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalAmount = async ( year: number): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
            select
                sum(tarifas_agua.multa_sesiones) as total_recaudado
            from
                multas
                join tarifas_agua on true
            where
                multas.estado = 'pagado'
                and 
                EXTRACT(YEAR FROM fecha) = $1

        `, [year])).rows[0].total_recaudado;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};