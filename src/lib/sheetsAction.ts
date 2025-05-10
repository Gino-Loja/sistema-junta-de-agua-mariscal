'use server'
import { MonthlyRevenue, QueryResultError, RevenueBySector, SheetDto, Sheets } from "@/model/types";
import pool from "./db";
import { revalidatePath } from 'next/cache';
import { createClient } from "./supabase/server";
import { calculateRangeDate, getPagination } from '@/utils/getPagination';

export const getSheetsByYearsAndMonths = async (date: string): Promise<QueryResultError<Sheets[]>> => {
    try {
        // const sheets: Sheets[] = (await pool.query(`
        // SELECT 
        //         planillas.*, 
        //         lecturas.consumo, 
        //         lecturas.exceso, 
        //         usuarios.nombre AS nombre, 
        //         medidores.id AS medidor_id
        // FROM 
        //     planillas
        // JOIN 
        //     lecturas ON planillas.id_lectura = lecturas.id
        // JOIN 
        //     medidores ON lecturas.medidor_id = medidores.id
        // JOIN 
        //     usuarios ON medidores.usuario_id = usuarios.id
        // WHERE 
        //     DATE_TRUNC('month', planillas.fecha_emision) = DATE_TRUNC('month', $1::date)
        // `, [date])).rows; // Formateamos la fecha con año-mes-01
        const { fecha_fin, fecha_inicio } = calculateRangeDate(2023, 8);
        const supabase = await createClient();
        const { data, error } = await supabase.from("sheet_by_years_and_months")
            .select("*")
            .gte("fecha_emision", fecha_inicio)
            .lte("fecha_emision", fecha_fin)

        return { success: true, data: [] };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};

export const getCalculateMonthlyRevenue = async (year: number, month: number | null): Promise<QueryResultError<MonthlyRevenue>> => {
    try {
        // const sheets: MonthlyRevenue = (await pool.query(`
        // SELECT 
        //     SUM(valor_abonado) AS total_recaudado,
        //     SUM(total_pagar) AS total_pagar
        // FROM 
        //     planillas
        // WHERE 
        //     EXTRACT(YEAR FROM fecha_emision) = $1 AND
        //     ($2::integer IS NULL OR EXTRACT(MONTH FROM fecha_emision) = $2)
        // `, [year, month])).rows[0]; // Formateamos la fecha con año-mes-01
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('get_sheets_calculate_monthly_revenue', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        })
            .single();
        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos de la planilla: ${error}` };
    }
};

export const getRevenueBySector = async (year: number, month: number | null): Promise<QueryResultError<RevenueBySector[]>> => {
    try {
        // const sheets: RevenueBySector[] = (await pool.query(`
        //     SELECT 
        //     sectores.nombre AS sector_nombre,
        //     SUM(planillas.valor_abonado) AS total_recaudado
        // FROM 
        //     planillas
        // JOIN 
        //     lecturas ON planillas.id_lectura = lecturas.id
        // JOIN 
        //     medidores ON lecturas.medidor_id = medidores.id
        // JOIN 
        //     usuarios ON medidores.usuario_id = usuarios.id
        // JOIN 
        //     sectores ON usuarios.sector_id = sectores.id
        // WHERE 
        //     EXTRACT(YEAR FROM fecha_emision) = $1 AND
        //     ($2::integer IS NULL OR EXTRACT(MONTH FROM fecha_emision) = $2)
        // GROUP BY 
        //     sectores.nombre
        // `, [year, month])).rows; // Formateamos la fecha con año-mes-01

        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('get_sheets_revenue_by_sector', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        })

        if (error) { return { success: false, error: `Error: ${error.message}` }; }


        return { success: true, data };

    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const percentageRevenueByStatus = async (year: number, month: number | null): Promise<QueryResultError<{ porcentaje_planilla_pagadas: number }>> => {
    try {
        // const sheets = (await pool.query(`
        // SELECT 
        //     CASE 
        //         WHEN COUNT(*) = 0 THEN 0
        //         ELSE (COUNT(*) FILTER (WHERE estado = 'pagada') * 100 / COUNT(*))
        //     END AS porcentaje_planilla_pagadas
        // FROM 
        //     planillas
        // WHERE 
        //     EXTRACT(YEAR FROM fecha_emision) = $1 AND
        //     ($2::integer IS NULL OR EXTRACT(MONTH FROM fecha_emision) = $2) 
        // `, [year, month])).rows[0];

        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('get_sheets_percentage_revenue_by_status', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        }).single();

        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getAmountMonthsByYear = async (year: number): Promise<QueryResultError<{ mes: string, sector_nombre: string, total_recaudado: number, total_deuda: number }[]>> => {
    try {
        // const months = (await pool.query(`
        // SELECT 
        //     (DATE_TRUNC('month', planillas.fecha_emision))::date AS mes,
        //     sectores.nombre AS sector_nombre,
        //     SUM(planillas.valor_abonado) AS total_recaudado,
        //     SUM(planillas.total_pagar ) AS total_deuda
        // FROM 
        //     planillas
        // JOIN 
        //     lecturas ON planillas.id_lectura = lecturas.id
        // JOIN 
        //     medidores ON lecturas.medidor_id = medidores.id
        // JOIN 
        //     usuarios ON medidores.usuario_id = usuarios.id
        // JOIN 
        //     sectores ON usuarios.sector_id = sectores.id
        // WHERE 
        //     EXTRACT(YEAR FROM planillas.fecha_emision) = $1
        // GROUP BY 
        //     mes, sectores.nombre
        //     `, [year])).rows;
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year);
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('get_sheets_recaudado_by_month_sector', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        }).order('mes', { ascending: true });

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };

    } catch (error) {
        return { success: false, error: `Error al obtener el consumo: ${error}` };
    }
}


export const getSheetsPagination = async (date: string, currentPage: number, itemsPerPage: number, query: string, year: number, month: number, status: string): Promise<QueryResultError<Sheets[]>> => {
    const offset = (currentPage - 1) * itemsPerPage;
    //console.log(date, query, currentPage, itemsPerPage)

    try {
        // const sheets: Sheets[] = (await pool.query(`
        // SELECT 
        //         planillas.*, 
        //         lecturas.consumo, 
        //         lecturas.exceso, 
        //         usuarios.id AS usuario_id,
        //         usuarios.nombre AS nombre,
        //         medidores.id AS medidor_id
        // FROM 
        //     planillas
        // JOIN 
        //     lecturas ON planillas.id_lectura = lecturas.id
        // JOIN 
        //     medidores ON lecturas.medidor_id = medidores.id
        // JOIN 
        //     usuarios ON medidores.usuario_id = usuarios.id
        // WHERE 
        //     EXTRACT(MONTH FROM planillas.fecha_emision) = $3 AND
        //     EXTRACT(YEAR FROM planillas.fecha_emision) = $2 AND
        //     ($5::date IS NULL OR planillas.fecha_emision = $5::date) AND
        //     ($4::text IS NULL OR planillas.estado = $4) AND
        //  (usuarios.nombre ILIKE '%' || $1 || '%'
        //     OR usuarios.cedula ILIKE  '%' || $1 || '%')
        // ORDER BY 
        //     usuarios.nombre ASC
        // LIMIT ${itemsPerPage} OFFSET ${offset};

        // `, [query, year, month, queryStatus, queryDate])).rows; // Formateamos la fecha con año-mes-01
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const supabase = await createClient();
        let builder = supabase
            .from('sheet_by_years_and_months')
            .select('*')
            .gte("fecha_emision", fecha_inicio)
            .lte("fecha_emision", fecha_fin)
            .or(`nombre.ilike.%${query}%,cedula.ilike.%${query}%`)
            .order('nombre', { ascending: true })

        // Si se especifica sector, filtramos
        if (status !== "") { builder = builder.eq('estado', status); }
        if (date !== "") { builder = builder.eq('fecha_emision', date); }

        const { data, error } = await builder;

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };

    }
};

export async function getCounterSheets(date: string, query: string, year: number, month: number, status: string): Promise<QueryResultError<{ total_planillas: number }>> {
    let queryDate = date === "" ? undefined : date;
    let queryStatus = status === "" ? undefined : status;
    try {
        //     const sheets = (await pool.query(`select
        //     count(*) as total_planillas
        //     from
        //     planillas
        //     JOIN 
        //         lecturas ON planillas.id_lectura = lecturas.id
        //     JOIN 
        //         medidores ON lecturas.medidor_id = medidores.id
        //     JOIN 
        //         usuarios ON medidores.usuario_id = usuarios.id
        //     WHERE 
        //         EXTRACT(MONTH FROM planillas.fecha_emision) = $3 AND
        //         EXTRACT(YEAR FROM planillas.fecha_emision) = $2 AND
        //         ($5::date IS NULL OR planillas.fecha_emision = $5::date) AND
        //         ($4::text IS NULL OR planillas.estado = $4) AND
        //      (usuarios.nombre ILIKE '%' || $1 || '%'
        //         OR usuarios.cedula ILIKE  '%' || $1 || '%')

        //     `, [query, year, month, queryDate, queryStatus])).rows[0]; // Formateamos la fecha con año-mes-01
        const supabase = await createClient();
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const { data, error } = await supabase.rpc('get_sheets_counter', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio,
            p_search_term: query,
            p_estado: queryStatus,
            p_fecha_especifica: queryDate,


        })
            .single();

        if (error) { return { success: false, error: `Error: ${error.message}` }; }


        return { success: true, data: { total_planillas: data } };

    } catch (error) {
        return { success: false, error: `Error al obtener el total de planillas: ${error}` };
    }
}

export async function updateSheet(data: SheetDto): Promise<QueryResultError<boolean>> {
    try {
        // const sheet: boolean = (await pool.query(`
        //     UPDATE public.planillas
        //     SET 
        //     valor_abonado=$1,
        //     estado=$2
        //     WHERE id = $3
        //     RETURNING
        //         id
        // `, [data.valor_abonado, data.estado, data.id])).rows[0].id;
        const supabase = await createClient();
        const { error } = await supabase
            .from('planillas')
            .update({
                valor_abonado: data.valor_abonado,
                estado: data.estado,
            })
            .eq('id', data.id)
            .select().single()
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        revalidatePath('/sheets/tableSheets');
        return { success: true, data: true };
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
    let queryStatus = status == "" ? null : status;
    let queryDate = date == "" ? null : date;

    try {
        // const sheets: Sheets[] = (await pool.query(`
        // SELECT 
        //         planillas.*, 
        //         lecturas.consumo, 
        //         lecturas.exceso, 
        //         usuarios.id AS usuario_id,
        //         usuarios.nombre AS nombre, 
        //         medidores.id AS medidor_id
        // FROM 
        //     planillas
        // JOIN 
        //     lecturas ON planillas.id_lectura = lecturas.id
        // JOIN 
        //     medidores ON lecturas.medidor_id = medidores.id
        // JOIN 
        //     usuarios ON medidores.usuario_id = usuarios.id
        // WHERE

        //     ($1::text IS NULL OR planillas.estado = $1) AND
        //     ($2::integer IS NULL OR EXTRACT(MONTH FROM planillas.fecha_emision) = $2) AND
        //     ($3::integer IS NULL OR EXTRACT(YEAR FROM planillas.fecha_emision) = $3) AND
        //     ($4::date IS NULL OR planillas.fecha_emision = $4::date) AND
        //     usuarios.id = $5 AND
        //     medidores.id = $6

        // ORDER BY 
        //     planillas.fecha_emision ASC
        // LIMIT ${itemsPerPage} OFFSET ${offset};

        // `, [queryStatus, month, year, queryDate, usuarioId, medidorId])).rows; // Formateamos la fecha con año-mes-01
        const supabase = await createClient();
        const { from, to } = getPagination(currentPage, itemsPerPage);

        let builder = supabase
            .from('sheet_by_years_and_months')
            .select('*')
            .eq('usuario_id', usuarioId)
            .eq('medidor_id', medidorId)
            .range(from, to)

            .order('fecha_emision', { ascending: true })
        if (year) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
            builder = builder
                .gte("fecha_emision", fecha_inicio)
                .lte("fecha_emision", fecha_fin);
        }
        if (queryStatus) { builder = builder.eq('estado', queryStatus); }
        if (queryDate) { builder = builder.eq('fecha_emision', queryDate); }

        const { data, error } = await builder;
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data: data };
    } catch (error) {

        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };

    }
};


export async function getWaterMeterById(id: number): Promise<QueryResultError<{ id: number, estado: string, tipo: string }[]>> {
    try {
        // const waterMeter = (await pool.query(
        //     `SELECT 
        //         m.id,
        //         m.estado,
        //         m.tipo
        //     FROM 
        //         medidores m
        //     JOIN 
        //         usuarios u ON m.usuario_id = u.id
        //     WHERE 
        //         u.id = $1
        //    `, [id]
        // )).rows;
        const supabase = await createClient();
        const { data, error } = await supabase
            .rpc('obtener_medidores_por_usuario', {
                p_usuario_id: id
            })
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getCountSheetPendingByUser(
    year: number | null,
    month: number | null,
    userId: number,
    medidorId: number
): Promise<QueryResultError<{ fecha: string, valor_abonado: number, total_pagar: number, id: number }[]>> {
    let queryFechaFin: string | undefined = undefined;
    let queryFechaInicio: string | undefined = undefined;
    try {

        // const count = (await pool.query<{ fecha: Date, valor_abonado: number, total_pagar: number, id: number }>(`
        //     SELECT 
        //         planillas.fecha_emision as fecha,
        //         planillas.valor_abonado ,
        //         planillas.total_pagar,
        //         planillas.id 

        //     FROM 
        //         planillas
        //     JOIN 
        //         lecturas ON planillas.id_lectura = lecturas.id
        //     JOIN 
        //         medidores ON lecturas.medidor_id = medidores.id
        //     JOIN 
        //         usuarios ON medidores.usuario_id = usuarios.id
        //     WHERE 
        //         ($1::integer IS NULL OR EXTRACT(MONTH FROM planillas.fecha_emision) = $1) AND
        //         ($2::integer IS NULL OR EXTRACT(YEAR FROM planillas.fecha_emision) = $2) AND
        //         usuarios.id = $3 AND
        //         medidores.id = $4 AND
        //         planillas.estado = 'pendiente' 
        //     ORDER BY planillas.fecha_emision


        //    `, [month, year, userId, medidorId]
        // )).rows;
        const supabase = await createClient();

        if (year) {
            const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
            queryFechaFin = fecha_fin;
            queryFechaInicio = fecha_inicio;
        }
        const { data, error } = await supabase.rpc('get_pending_planillas_by_user', {
            p_medidor_id: medidorId,
            p_usuario_id: userId,
            p_to: queryFechaFin,
            p_from: queryFechaInicio
        })

        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}


export async function getUserById(id: number): Promise<QueryResultError<{ id: number, cedula: string, nombre: string }>> {

    try {
        // const user = (await pool.query(
        //     `SELECT 
        //         u.cedula,
        //         u.nombre,
        //         u.id
        //     FROM 
        //         usuarios u
        //     WHERE 
        //         u.id = $1
        //     `, [id]
        // )).rows[0];
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('usuarios')
            .select('cedula, nombre, id')
            .eq('id', id)
            .single()
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
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
    let queryDate = date == "" ? undefined : date;
    let queryStatus = status == "" ? undefined : status;
    let queryFechaFin: string | undefined = undefined;
    let queryFechaInicio: string | undefined = undefined;
    try {
        // const sheets = (await pool.query(`select
        // count(*) as total_planillas
        // from
        // planillas
        // JOIN 
        //     lecturas ON planillas.id_lectura = lecturas.id
        // JOIN 
        //     medidores ON lecturas.medidor_id = medidores.id
        // JOIN 
        //     usuarios ON medidores.usuario_id = usuarios.id
        // WHERE 
        //     ($1::text IS NULL OR planillas.estado = $1) AND
        //     ($2::integer IS NULL OR EXTRACT(MONTH FROM planillas.fecha_emision) = $2) AND
        //     ($3::integer IS NULL OR EXTRACT(YEAR FROM planillas.fecha_emision) = $3) AND
        //     ($4::date IS NULL OR planillas.fecha_emision = $4::date) AND
        //     usuarios.id = $5 AND
        //     medidores.id = $6

        // `, [
        //     queryStatus,
        //     month,
        //     year,
        //     queryDate,
        //     usuarioId,
        //     medidorId
        // ])).rows[0]; // Formateamos la fecha con año-mes-01

        const supabase = await createClient();
        if (year) {
            const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
            queryFechaFin = fecha_fin;
            queryFechaInicio = fecha_inicio;
        }

        const { data, error } = await supabase.rpc('get_sheets_count_by_users', {
            p_to: queryFechaFin,
            p_from: queryFechaInicio,
            p_fecha_especifica: queryDate,
            p_estado: queryStatus,
            p_usuario_id: usuarioId,
            p_medidor_id: medidorId
        })
            .single();
        if (error) { return { success: false, error: `Error: ${error.message}` }; }



        return { success: true, data: { total_planillas: data } };
    } catch (error) {
        return { success: false, error: `Error al obtener el conteo de planillas: ${error}` };
    }
}