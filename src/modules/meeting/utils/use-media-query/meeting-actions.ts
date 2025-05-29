'use server'
import pool from "../../../../lib/db";
import { revalidatePath } from 'next/cache';
import { CounterMeeting, Meeting, StatusAllMeeting } from "../../types";
import { QueryResultError } from "@/model/types";
import { calculateRangeDate, getPagination } from "@/utils/getPagination";
import { createClient } from "@/lib/supabase/server";


export const getMeeting = async (date: string, query: string, currentPage: number, itemsPerPage: number, year: number, status: string): Promise<QueryResultError<Meeting[]>> => {
    try {
        // const meeting: Meeting[] = (await pool.query(`
        //     SELECT 
        //         u.nombre AS nombre_usuario,
        //         m.motivo,
        //         m.fecha,
        //         m.estado,
        //         m.fecha_actualizacion,
        //         m.id,
        //         u.id AS usuario_id
        //         u.cedula
        //     FROM 
        //         multas m
        //     INNER JOIN 
        //         usuarios u ON m.usuario_id = u.id
        //     WHERE 
        //         ($4::date IS NULL OR m.fecha = $4) AND
        //         ($3::text IS NULL OR m.estado = $3) AND
        //         EXTRACT(YEAR FROM m.fecha) = $2 
        //         AND ((u.nombre ILIKE '%' || $1 || '%'
        //         OR u.cedula ILIKE  '%' || $1 || '%'))

        //     ORDER BY 
        //     nombre_usuario ASC
        //     LIMIT ${itemsPerPage} OFFSET ${offset};

        // `, [query, year, queryStatus, queryDate])).rows; // Formateamos la fecha con año-mes-01
        const { from, to } = getPagination(currentPage, itemsPerPage);
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year);
        const supabase = await createClient();
        let builder = supabase
            .from('vista_multas_con_usuarios')
            .select('*')
            .or(`nombre_usuario.ilike.%${query}%,cedula.ilike.%${query}%`)
            .range(from, to)
            .gte("fecha", fecha_inicio)
            .lte("fecha", fecha_fin)
            .order('nombre_usuario', { ascending: true })




        if (date !== "") { builder = builder.eq("fecha", date); }
        if (status !== "") { builder = builder.eq("estado", status) }

        const { data, error } = await builder;
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };

    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const insertMeeting = async (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; }): Promise<QueryResultError<boolean>> => {

    try {
        // const meeting: Meeting[] = (await pool.query(`
        //     INSERT INTO 
        //         multas (usuario_id, fecha, estado, motivo)
        //     VALUES 
        //         ($1, $2, $3, $4)

        // `, [formData.usuario_id, formData.fecha, formData.estado, formData.motivo])).rows; // Formateamos la fecha con año-mes-01

        const supabase = await createClient();
        const { error } = await supabase
            .from('multas')
            .insert({
                usuario_id: formData.usuario_id,
                fecha: formData.fecha.toISOString(),
                estado: formData.estado,
                motivo: formData.motivo,
            })


        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        revalidatePath('/meeting');

        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const updateMeeting = async (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; multa_id: number }): Promise<QueryResultError<boolean>> => {
    try {
        // const meeting: boolean = (await pool.query(`
        //     UPDATE 
        //         multas
        //     SET 
        //         usuario_id = $1,
        //         fecha = $2,
        //         estado = $3,
        //         motivo = $4,
        //         fecha_actualizacion = CURRENT_DATE
        //     WHERE 
        //         id = $5
        //     RETURNING id

        // `, [formData.usuario_id, formData.fecha, formData.estado, formData.motivo, formData.multa_id])).rows[0].id; // Formateamos la fecha con año-mes-01
        const supabase = await createClient();
        const { error } = await supabase
            .from('multas')
            .update({
                usuario_id: formData.usuario_id,
                fecha: formData.fecha.toISOString(),
                estado: formData.estado,
                motivo: formData.motivo,
                fecha_actualizacion: new Date().toISOString()
            })
            .eq('id', formData.multa_id)
        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        revalidatePath('/meeting');

        return { success: true, data: true };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const deleteMeeting = async (id: number): Promise<QueryResultError<boolean>> => {

    try {
        // const meeting: boolean = (await pool.query(`
        //     DELETE FROM 
        //         multas
        //     WHERE 
        //         id = $1
        //     RETURNING id

        // `, [id])).rows[0].id; // Formateamos la fecha con año-mes-01
        const supabase = await createClient();
        const { error } = await supabase
            .from('multas')
            .delete()
            .eq('id', id)
        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        revalidatePath('/meeting');

        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const getTotalMeetingByStatus = async (year: number): Promise<QueryResultError<StatusAllMeeting[]>> => {
    const { fecha_fin, fecha_inicio } = calculateRangeDate(year);
    try {
        // const total: StatusAllMeeting[] = (await pool.query(`
        //     select
        //     estado,
        //     count(*) as total
        //     from
        //     multas
        //     WHERE 
        //     EXTRACT(YEAR FROM fecha) = $1 
        //     group by
        //     estado;
        // `, [year])).rows;
        const supabase = await createClient();
        const { data, error } = await supabase
            .rpc('contar_multas_por_estado_en_rango', {
                p_fecha_fin: fecha_fin,
                p_fecha_inicio: fecha_inicio,
            })
        if (error) { return { success: false, error: `Error: ${error.message}` }; }


        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};



export const getCounterMeetingByDate = async (date: string, query: string, year: number): Promise<QueryResultError<CounterMeeting>> => {
    const { fecha_fin, fecha_inicio } = calculateRangeDate(year);

    try {
        // const total: CounterMeeting = (await pool.query(`
        //     SELECT 

        //         count(*) as total
        //     FROM 
        //         multas m
        //     INNER JOIN 
        //         usuarios u ON m.usuario_id = u.id

        //     WHERE 

        //         ($1::date IS NULL OR m.fecha = $1) 
        //         AND EXTRACT(YEAR FROM fecha) = $3 

        //         AND ((u.nombre ILIKE '%' || $2 || '%'
        //         OR u.cedula ILIKE  '%' || $2 || '%'))

        // `, [queryStatus, query, year])).rows[0];
        const supabase = await createClient();
        const { data, error } = await supabase
            .rpc('contar_multas_filtradas', {
                p_fecha_fin: fecha_fin,
                p_fecha_inicio: fecha_inicio,
                p_search_term: query,
                p_fecha_especifica: date,
            })
        if (error) { return { success: false, error: `Error: ${error.message}` }; }



        return { success: true, data: { total: data } }
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalAmount = async (year: number): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`
        //     select
        //         sum(tarifas_agua.multa_sesiones) as total_recaudado
        //     from
        //         multas
        //         join tarifas_agua on true
        //     where
        //         multas.estado = 'pagado'
        //         and 
        //         EXTRACT(YEAR FROM fecha) = $1

        // `, [year])).rows[0].total_recaudado;
        const supabase = await createClient();
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year);

        const { data, error } = await supabase
            .rpc('calcular_total_recaudado_multas', {
                p_fecha_fin: fecha_fin,
                p_fecha_inicio: fecha_inicio,
            })
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};