'use server'
import pool from "../../../../lib/db";
import { revalidatePath } from 'next/cache';
import { CounterMeeting, Meeting, StatusAllMeeting } from "../../types";
import { QueryResultError } from "@/model/types";


export const getMeeting = async (date: string, query: string, currentPage: number, itemsPerPage: number): Promise<QueryResultError<Meeting[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;

    try {
        const meeting: Meeting[] = (await pool.query(`
            SELECT 
                u.nombre AS nombre_usuario,
                m.motivo,
                m.fecha,
                m.estado,
                m.fecha_actualizacion,
                m.id AS multa_id,
                u.id AS usuario_id
            FROM 
                multas m
            INNER JOIN 
                usuarios u ON m.usuario_id = u.id
            WHERE 
                date_trunc('month', m.fecha) = date_trunc('month', $1::date)
                AND ((u.nombre ILIKE '%' || $2 || '%'
                OR u.cedula ILIKE  '%' || $2 || '%'))

            ORDER BY 
            nombre_usuario ASC
            LIMIT ${itemsPerPage} OFFSET ${offset};
                
        `, [date, query])).rows; // Formateamos la fecha con año-mes-01
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

export const updateMeeting = async (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; multa_id: number }): Promise<QueryResultError<Meeting[]>> => {

    try {
        const meeting: Meeting[] = (await pool.query(`
            UPDATE 
                multas
            SET 
                usuario_id = $1,
                fecha = $2,
                estado = $3,
                motivo = $4,
                fecha_actualizacion = CURRENT_DATE,
            WHERE 
                id = $5
                
        `, [formData.usuario_id, formData.fecha, formData.estado, formData.motivo, formData.multa_id])).rows; // Formateamos la fecha con año-mes-01
        revalidatePath('/meeting');

        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const deleteMeeting = async (id: number): Promise<QueryResultError<Meeting[]>> => {

    try {
        const meeting: Meeting[] = (await pool.query(`
            DELETE FROM 
                multas
            WHERE 
                id = $1
                
        `, [id])).rows; // Formateamos la fecha con año-mes-01
        revalidatePath('/meeting');

        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const getTotalMeetingByStatus = async (date: string): Promise<QueryResultError<StatusAllMeeting[]>> => {
    try {
        const total: StatusAllMeeting[] = (await pool.query(`
            select
            estado,
            count(*) as total
            from
            multas
            WHERE 
                date_trunc('month', fecha) = date_trunc('month', $1::date)
               
            group by
            estado;
        `, [date])).rows;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};



export const getCounterMeetingByDate = async (date: string, query: string): Promise<QueryResultError<CounterMeeting>> => {
    try {
        const total: CounterMeeting = (await pool.query(`
            SELECT 
              
                count(*) as total
            FROM 
                multas m
            INNER JOIN 
                usuarios u ON m.usuario_id = u.id
            
            WHERE 
                date_trunc('month', m.fecha) = date_trunc('month', $1::date)
                AND ((u.nombre ILIKE '%' || $2 || '%'
                OR u.cedula ILIKE  '%' || $2 || '%'))

        `, [date, query])).rows[0];
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalAmount = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
            select
                sum(tarifas_agua.multa_sesiones) as total_recaudado
            from
                multas
                join tarifas_agua on true
            where
                multas.estado = 'pagado'
                and date_trunc('year', multas.fecha::date) = date_trunc('year', $1::date);

        `, [date])).rows[0].total_recaudado;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};