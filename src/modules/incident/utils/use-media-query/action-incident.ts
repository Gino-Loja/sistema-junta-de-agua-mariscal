'use server';
// import pool from '@/lib/db';
import { QueryResultError } from '@/model/types';
import { revalidatePath } from 'next/cache';
// import { v4 as uuidv4 } from 'uuid';
import { Incident } from '../../types';
import { createClient } from '@/lib/supabase/server';
import { calculateRangeDate, getPagination } from '@/utils/getPagination';

export const getIncidents = async (
    date: string,
    query: string,
    currentPage: number,
    itemsPerPage: number,
    sectorId: string,
    year: number,
    month: number | null
): Promise<QueryResultError<Incident[]>> => {
    try {
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const { from, to } = getPagination(currentPage, itemsPerPage);

        const supabase = await createClient();
        let builder = supabase.from('get_incident_view').select('*')
            .gte("fecha", fecha_inicio)
            .lte("fecha", fecha_fin)
            .ilike("nombre_usuario", `%${query}%`)
            .order("fecha", { ascending: false })
            .range(from, to);
        if (date !== "") { builder = builder.eq("fecha", date); }
        if (sectorId !== "") { builder = builder.eq("sector_id", Number(sectorId)) }

        const { data, error } = await builder;


        // const incidents: Incident[] = (await pool.query(`
        //     SELECT 
        //         u.nombre AS nombre_usuario,
        //         u.id AS usuario_id,

        //         i.id,
        //         i.sector_id,
        //         s.nombre AS nombre_sector,
        //         s.id AS sector_id,
        //         i.fecha,
        //         i.descripcion,
        //         encode(i.foto, 'base64') AS foto,
        //         i.costo
        //     FROM 
        //         incidentes i
        //     INNER JOIN 
        //         usuarios u ON i.usuario_id = u.id
        //     INNER JOIN
        //         sectores s ON i.sector_id = s.id
        //     WHERE 
        //         EXTRACT(YEAR FROM i.fecha) = $4 
        //         AND ($5::integer IS NULL OR EXTRACT(MONTH FROM i.fecha) = $5)
        //         AND ($1::date IS NULL OR i.fecha = $1::date)
        //         AND (u.nombre ILIKE '%' || $2 || '%' )
        //         AND ($3::integer IS NULL OR i.sector_id = $3)
        //     ORDER BY 
        //         nombre_usuario ASC
        //     LIMIT ${itemsPerPage} OFFSET ${offset};
        // `, [queryDate, query, querySectorID, year, month])).rows;
        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los incidentes: ${error}` };
    }
};


export const insertIncident = async (formData: { usuario_id: number; fecha: string, sector_id: number; descripcion: string; costo: number; }): Promise<QueryResultError<boolean>> => {

    try {
        // const fotoBuffer = Buffer.from(formData.foto.split(',')[1], 'base64');

        // const incidents: Incident[] = (await pool.query(`
        //     INSERT INTO 
        //         incidentes (usuario_id, fecha, sector_id, descripcion, foto, costo)
        //     VALUES 
        //         ($1, $2, $3, $4, $5, $6)

        // `, [formData.usuario_id, formData.fecha, formData.sector_id, formData.descripcion, fotoBuffer, formData.costo])).rows; // Formateamos la fecha con año-mes-01

        const supabase = await createClient();

        const { data: incidents, error: incidentsError } = await supabase
            .from('incidentes')
            .insert(
                {
                    usuario_id: formData.usuario_id,
                    fecha: formData.fecha.toString(),
                    sector_id: formData.sector_id,
                    descripcion: formData.descripcion,
                    costo: formData.costo
                }
            )
            .select()
            .single();
        // const { data, error } = await supabase.storage
        //     .from("incidentes")
        //     .upload(`${formData.usuario_id}.png`, formData.foto, {
        //         cacheControl: '3600',
        //         upsert: true,
        //         contentType: 'image/png'
        //     });
        if (incidentsError) { return { success: false, error: `Error: ${incidentsError.message}` }; }
        revalidatePath('/incident');
        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al insertar el incidente: ${error}` };
    }
};

export const updateIncident = async (formData: { usuario_id: number; fecha: string, sector_id: number; descripcion: string; costo: number; incident_id: number }): Promise<QueryResultError<boolean>> => {
    try {
        // const incidents: Incident[] = (await pool.query(`
        //     UPDATE 
        //         incidentes
        //     SET 
        //         usuario_id = $1,
        //         fecha = $2,
        //         sector_id = $3,
        //         descripcion = $4,
        //         costo = $6
        //     WHERE 
        //         id = $7

        // `, [formData.usuario_id, formData.fecha, formData.sector_id, formData.descripcion, fotoBuffer, formData.costo, formData.incident_id])).rows; // Formateamos la fecha con año-mes-01
        const supabase = await createClient();

        const { data: incidents, error: incidentsError } = await supabase
            .from('incidentes')
            .update(
                {
                    usuario_id: formData.usuario_id,
                    fecha: formData.fecha.toString(),
                    sector_id: formData.sector_id,
                    descripcion: formData.descripcion,
                    costo: formData.costo
                }
            )
            .select()
            .single();

        revalidatePath('/incident');

        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al actualizar el incidente: ${error}` };
    }
};

export const deleteIncident = async (id: number): Promise<QueryResultError<boolean>> => {

    try {
        // (await pool.query(`
        //     DELETE FROM 
        //         incidentes
        //     WHERE 
        //         id = $1

        // `, [id])).rows; // Formateamos la fecha con año-mes-01

        const supabase = await createClient();

        const { data, error } = await supabase.from('incidentes').delete().eq('id', id);

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        revalidatePath('/incident');
        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al eliminar el incidente: ${error}` };
    }
};

export const getTotalAmountCostIncidetByYear = async (year: number, month: number | null): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`
        //     select
        //         coalesce(sum(costo), 0) as total
        //     from
        //         incidentes
        //     WHERE
        //         EXTRACT(YEAR FROM fecha) = $1 AND
        //         $2::integer IS NULL OR EXTRACT(MONTH FROM fecha) = $2
        // `, [year, month])).rows[0].total;
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);

        const supabase = await createClient();
        const { data, error } = await supabase.rpc('obtener_total_incidentes', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        });


        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalIncidentByYear = async (year: number, month: number | null): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`
        //     select
        //         coalesce(count(*), 0) as total
        //     from
        //         incidentes
        //     where
        //         EXTRACT(YEAR FROM fecha) = $1 AND
        //         $2::integer IS NULL OR EXTRACT(MONTH FROM fecha) = $2

        // `, [year, month])).rows[0].total;
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);

        const supabase = await createClient();
        const { data, error } = await supabase.rpc('contar_incidentes_por_rango_fechas', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        });
        if (error) { return { success: false, error: `Error: ${error.message}` }; }


        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalIncidentBySector = async (year: number, month: number | null): Promise<QueryResultError<{ name: string, value: number }[]>> => {
    try {
        // const total = (await pool.query(`
        //     select

        //         s.nombre as name,
        //         count(*) as value
        //     from
        //         incidentes
        //     inner join
        //         sectores s on incidentes.sector_id = s.id
        //     where

        //         EXTRACT(YEAR FROM fecha) = $1 AND
        //         $2::integer IS NULL OR EXTRACT(MONTH FROM fecha) = $2
        //     group by
        //         s.id,
        //         s.nombre

        // `, [year, month])).rows;

        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('contar_incidentes_por_sector_rango', {
            p_fecha_fin: fecha_fin,
            p_fecha_inicio: fecha_inicio
        });

        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getSectors = async (): Promise<QueryResultError<{ value: string, label: string }[]>> => {
    try {
        const supabase = await createClient();

        const { data: sectores, error } = await supabase
            .from('sectores')
            .select('value:id, label:nombre')
            .order('nombre', { ascending: true })

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        // transforma el value:number a string
        let _sectores = sectores.map((item) => ({
            ...item,
            value: item.value.toString()
        }));


        return { success: true, data: _sectores };
    } catch (error) {
        return { success: false, error: `Error al obtener los sectores: ${error}` };
    }
};

export const getCounterIncidentPagination = async (date: string, query: string, sectorId: string, year: number, month: number | null): Promise<QueryResultError<number>> => {
    let queryDate = date == "" ? undefined : date;
    let querySectorID = sectorId == "" ? undefined : Number(sectorId);



    try {
        //     const counter: number = (await pool.query(`
        //         SELECT 
        //             count(*) as total
        //         FROM 
        //             incidentes i
        //         INNER JOIN 
        //             usuarios u ON i.usuario_id = u.id
        //         INNER JOIN
        //             sectores s ON i.sector_id = s.id
        //         WHERE 
        //             EXTRACT(YEAR FROM i.fecha) = $4 
        //             AND ($5::integer IS NULL OR EXTRACT(MONTH FROM i.fecha) = $5)
        //             AND ($1::date IS NULL OR i.fecha = $1::date)
        //             AND (u.nombre ILIKE '%' || $2 || '%' )
        //             AND ($3::integer IS NULL OR i.sector_id = $3) 

        //     `, [queryDate, query, querySectorID, year, month])).rows[0].total;


        const supabase = await createClient();
        const { fecha_fin, fecha_inicio } = calculateRangeDate(year, month);
        let queryDate = date == "" ? undefined : date;
        let querySectorID = sectorId == "" ? undefined : Number(sectorId);
        console.log("queryDate", queryDate);
        const { data, error } = await supabase
            .rpc('contar_incidentes_por_rango', {
                p_fecha_fin: fecha_fin,
                p_fecha_inicio: fecha_inicio,
                p_search_term: query,
                p_sector_id: querySectorID,
                p_fecha_especifica: queryDate
            })
        
        if (error) { return { success: false, error: `Error: ${error.message}` }; }



        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};  
