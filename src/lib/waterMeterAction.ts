'use server';

import { QueryResultError, WaterMeter, WaterMeterById, WaterMeterCreate, WaterMeterDto } from "@/model/types";
import pool from "./db";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { getPagination } from "@/utils/getPagination";


export async function getWaterMeter(): Promise<QueryResultError<WaterMeter[]>> {
    try {
        // const waterMeters: WaterMeter[] = (await pool.query(

        //     `SELECT 
        //         m.id AS medidor_id,
        //         m.numero_serie,
        //         m.tipo,
        //         m.fecha_instalacion,
        //         u.nombre AS nombre,
        //         usuario_id,
        //         detalle,
        //         m.estado,
        //         u.cedula
        //     FROM 
        //         medidores m
        //     JOIN 
        //         usuarios u ON m.usuario_id = u.id
        //     ORDER BY 
        //         u.nombre ASC`
        // )).rows;
        const supabase = await createClient()
        const { error, data: waterMeters } = await supabase
            .from('vista_medidores_usuarios')
            .select('*')
        if (error) {
            return { success: false, error: `Error al obtener todos los medidores: ${error}` };
        }

        return { success: true, data: waterMeters };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterPagination(
    currentPage: number,
    itemsPerPage: number,
    query: string,
    type: string,
    status: string,
    date: string
): Promise<QueryResultError<WaterMeter[]>> {
    const supabase = await createClient()
    const { from, to } = getPagination(currentPage, itemsPerPage);


    // const offset = (currentPage - 1) * itemsPerPage;

    // let conditions: string[] = [];

    // if (date) {
    //     // Se usa DATE() para comparar solo la parte de la fecha
    //     conditions.push(`DATE(m.fecha_instalacion) = DATE('${date}')`);
    // }


    // try {
    //     const waterMeters: WaterMeter[] = (await pool.query(
    //         `SELECT 
    //         m.id,
    //         m.numero_serie,
    //         m.tipo,
    //         m.fecha_instalacion,
    //         u.nombre AS nombre,
    //         usuario_id,
    //         detalle,
    //         m.estado,
    //         u.cedula
    //     FROM 
    //         medidores m
    //     JOIN 
    //         usuarios u ON m.usuario_id = u.id 
    //     WHERE 
    //         ${conditions.length ? conditions[0] + ' AND ' : ''}
    //         (u.nombre ILIKE '%' || $1 || '%' OR
    //         u.cedula ILIKE '%' || $1 || '%') AND
    //         m.tipo ILIKE '%' || $2 || '%' AND
    //         ($3 = '' OR m.estado ILIKE $3)
    //     ORDER BY 
    //         u.nombre ASC
    //     LIMIT ${itemsPerPage}
    //     OFFSET ${offset};
    //     `, [query, type, status]
    //     )).rows;

    try {
        let getWaterMeters = supabase
            .from("vista_medidores_usuarios")
            .select("*")
            .ilike("nombre", `%${query}%`)
            .range(from, to);

        if (status !== "") { getWaterMeters = getWaterMeters.eq("estado", status) }
        if (date !== "") { getWaterMeters = getWaterMeters.eq("fecha_instalacion", date) }
        if (type !== "") { getWaterMeters = getWaterMeters.eq("tipo", type) }

        const { error, data } = await getWaterMeters

        if (error) {
            return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
        }
        // return { success: true, data: data };
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}


export async function getCounterMeterWater(query: string, status: string, type: string, date: string): Promise<QueryResultError<{ total_water_meters: number }>> {
    //let conditions: string[] = [];

    // if (date) {
    //     // Se usa DATE() para comparar solo la parte de la fecha
    //     conditions.push(`DATE(m.fecha_instalacion) = DATE('${date}')`);
    // }

    try {
        const supabase = await createClient()

        // const waterMeters = (await pool.query(

        //     `SELECT COUNT(*) AS total_water_meters
        //     FROM medidores m
        //     JOIN usuarios u ON m.usuario_id = u.id

        //     WHERE  
        //     ${conditions.length ? conditions[0] + ' AND ' : ''}
        //     (u.nombre ILIKE '%' || $1 || '%' OR
        //     u.cedula ILIKE '%' || $1 || '%') AND
        //     m.tipo ILIKE '%' || $2 || '%' AND
        //     ($3 = '' OR m.estado ILIKE $3)
        //     `,

        //     [query, type, status]
        // )).rows[0];

        let countWaterMeters = supabase
            .from('vista_medidores_usuarios')
            .select('*', { count: 'exact' })
            .ilike("nombre", `%${query}%`)

        if (status !== "") { countWaterMeters = countWaterMeters.eq("estado", status) }
        if (date !== "") { countWaterMeters = countWaterMeters.eq("fecha_instalacion", date) }
        if (type !== "") { countWaterMeters = countWaterMeters.eq("tipo", type) }

        const { error, count } = await countWaterMeters

        if (error) {
            return { success: false, error: `Error al obtener todos los medidores: ${error}` };
        }
        return { success: true, data: { total_water_meters: count == null ? 0 : count } };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }


}

export async function getUserByName(
    name: string
): Promise<QueryResultError<{ id: number, cedula: string, nombre: string }[]>> {

    try {
        // const waterMeters = (await pool.query(
        //     `SELECT 
        //         u.cedula,
        //         u.nombre,
        //         u.id
        //     FROM 
        //         usuarios u
        //     WHERE 
        //         u.nombre ILIKE '%' || $1 || '%' OR
        //         u.cedula ILIKE '%' || $1 || '%'

        //     ORDER BY 
        //         u.nombre ASC
        //     LIMIT 8;`, [name]
        // )).rows;

        const supabase = await createClient()
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, cedula, nombre')
            // .ilike('nombre', `%${name}%`)
            .or(`cedula.ilike.%${name}%, nombre.ilike.%${name}%`)
            // .ilike('cedula', `%${name}%`)
            .limit(8)

        if (error) {
            return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
        }

        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function createWaterMeter(waterMeter: WaterMeterCreate): Promise<QueryResultError<boolean>> {
    try {

        const supabase = await createClient()
        const { error } = await supabase
            .from('medidores')
            .insert([
                {
                    numero_serie: waterMeter.numero_serie,
                    tipo: waterMeter.tipo,
                    fecha_instalacion: waterMeter.fecha_instalacion,
                    usuario_id: waterMeter.usuario_id,
                    detalle: waterMeter.detalle,
                    estado: waterMeter.estado,
                },
            ])
            .select()


        // const waterMeterId = (await pool.query(
        //     `INSERT INTO medidores (numero_serie, tipo, fecha_instalacion, usuario_id, detalle, estado)
        //     VALUES ($1, $2, $3, $4, $5, $6)
        //     RETURNING id;`, [waterMeter.numero_serie, waterMeter.tipo, waterMeter.fecha_instalacion, waterMeter.usuario_id, waterMeter.detalle, waterMeter.estado]
        // )).rows[0].id;

        if (error) {
            return { success: false, error: `Error al crear el medidor: ${error}` };
        }


        revalidatePath('/water-meter');
        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al crear el medidor: ${error}` };
    }
}
export async function updateWaterMeter(waterMeter: WaterMeterDto, id: number): Promise<QueryResultError<boolean>> {

    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from('medidores')
            .update({
                detalle: waterMeter.detalle,
                numero_serie: waterMeter.numero_serie,
                tipo: waterMeter.tipo,
                fecha_instalacion: waterMeter.fecha_instalacion,
                usuario_id: waterMeter.usuario_id,
                estado: waterMeter.estado
            })
            .eq('id', id)
            .select().single()

        if (error) {
            return { success: false, error: `Error al actualizar el medidor: ${error}` };
        }
        // const waterMeterId = (await pool.query(
        //     `UPDATE medidores SET numero_serie = $1, tipo = $2, fecha_instalacion = $3, usuario_id = $4, detalle = $5, estado = $6
        //     WHERE id = $7 RETURNING id;`, [waterMeter.numero_serie, waterMeter.tipo, waterMeter.fecha_instalacion, waterMeter.usuario_id, waterMeter.detalle, waterMeter.estado, id]
        // )).rows[0].id;
        revalidatePath('/water-meter');
        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al actualizar el medidor: ${error}` };
    }
}

export async function deleteWaterMeter(id: number): Promise<QueryResultError<boolean>> {
    const supabase = await createClient()

    try {
        const { error } = await supabase.from("medidores").delete().eq("id", id).select("id");
        if (error) {
            return { success: false, error: `Error al eliminar el medidor: ${error}` };
        }
        revalidatePath('/water-meter');

        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al crear el medidor: ${error}` };
    }
}

export async function getWaterMeterbyType(): Promise<QueryResultError<{ tipo: string, cantidad: number }[]>> {
    try {
        // const rows = (await pool.query<{ tipo: string, cantidad: number }>(
        //     `SELECT tipo,
        //      COUNT(*) AS cantidad
        //     FROM medidores
        //     GROUP BY tipo;`
        // )).rows
        const supabase = await createClient()
        const { error, data } = await supabase.rpc('get_water_meter_by_type')

        if (error) {
            return { success: false, error: `Error al obtener todos los medidores: ${error}` };
        }
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterbyStatus(): Promise<QueryResultError<{ name: string, value: number }[]>> {
    try {
        // const rows = (await pool.query<{ name: string, value: number }>(

        //     `SELECT estado as name, COUNT(*) AS value
        //         FROM medidores
        //         GROUP BY estado;
        //         `
        // )).rows

        const supabase = await createClient()
        const { error, data } = await supabase.rpc('get_water_meter_by_estatus')
        if (error) {
            return { success: false, error: `Error al obtener todos los medidores: ${error}` };
        }
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterbySector(): Promise<QueryResultError<{ name: string, value: number }[]>> {
    try {
        // const rows = (await pool.query<{ name: string, value: number }>(

        //     `SELECT 
        //         s.nombre AS name,
        //         COUNT(*) AS value
        //     FROM 
        //         medidores m
        //     JOIN 
        //         usuarios u ON m.usuario_id = u.id
        //     JOIN 
        //         sectores s ON u.sector_id = s.id
        //     GROUP BY 
        //         s.nombre;
        //         `
        // )).rows

        const supabase = await createClient()
        const { error, data } = await supabase.rpc('get_water_meter_by_sector')
        if (error) {
            return { success: false, error: `Error al obtener todos los medidores: ${error}` };
        }
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

//no esta  incluido en clean architecture
export async function getWaterMeterById(id: number): Promise<QueryResultError<WaterMeter[]>> {
    try {
        // const waterMeter = (await pool.query(
        //     `SELECT 
        //         m.*, 
        //         u.nombre, 
        //         u.cedula
        //     FROM 
        //         medidores m
        //     JOIN 
        //         usuarios u ON m.usuario_id = u.id
        //     WHERE 
        //         u.id = $1
        //    `, [id]
        // )).rows;
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('vista_medidores_usuarios')
            .select('*', { count: 'exact' })
            .eq('usuario_id', id)

        if (error) {
            return { success: false, error: `Error al obtener todos los medidores: ${error}` };
        }

        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los medidores: ${error}` };
    }
}

export async function getWaterMeterConsumptionById(id: number): Promise<QueryResultError<{ consumo_total: number }>> {
    try {
        // const waterMeter = (await pool.query<{ consumo_total: number }>(
        //     `SELECT 
        //             SUM(consumo) AS consumo_total
        //         FROM 
        //             lecturas
        //         WHERE 
        //             medidor_id = $1;
        //    `, [id]
        // )).rows[0];
        const supabase = await createClient()
        const { data, error } = await supabase.rpc('get_water_meter_consumption_by_id', { medidor_id_param: id })
        if (error) {
            return { success: false, error: `Error al obtener el consumo del medidor: ${error.message}` };
        }
        return { success: true, data: { consumo_total: data } };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo del medidor: ${error}` };
    }
}

export async function getWaterMeterExcessById(id: number): Promise<QueryResultError<{ total_excesos: number }>> {
    try {
        // const waterMeter = (await pool.query<{ total_excesos: number }>(
        //     `SELECT 
        //         SUM(exceso) AS total_excesos
        //     FROM 
        //         lecturas
        //     WHERE 
        //         medidor_id = $1;
        //    `, [id]
        // )).rows[0];
        const supabase = await createClient()
        const { data, error } = await supabase.rpc('get_water_meter_excess_by_id', { medidor_id_param: id })
        if (error) {
            return { success: false, error: `Error al obtener el consumo del medidor: ${error.message}` };
        }
        return { success: true, data: { total_excesos: data } };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo del medidor: ${error}` };
    }
}

export async function getWaterMeterLecturesById(id_usuario: number, id_medidor: number, fecha: number, currentPage: number, itemsPerPage: number): Promise<QueryResultError<WaterMeterById[]>> {


    try {
        // const waterMeter = (await pool.query<{
        //     id: number,
        //     fecha: Date,
        //     consumo: number,
        //     lectura_anterior: number,
        //     lectura_actual: number,
        //     exceso: number,
        //     medidor_id: number
        // }>(
        //     `SELECT 
        //         l.id,
        //         l.fecha,
        //         l.consumo,
        //        l.lectura_anterior,
        //         l.lectura_actual,
        //         l.exceso,
        //        l.medidor_id
        //     FROM 
        //         lecturas l
        //     JOIN 
        //         medidores m ON l.medidor_id = m.id
        //     JOIN 
        //         usuarios u ON m.usuario_id = u.id
        //     WHERE 
        //         u.id = $1
        //         AND m.id = $2
        //         AND date_trunc('year', l.fecha) = date_trunc('year', $3::date)

        //     ORDER BY 
        //         l.fecha ASC
        //     LIMIT ${itemsPerPage}
        //     OFFSET ${offset};
        //    `, [id_usuario, id_medidor, fecha]
        // )).rows;
        const { from, to } = getPagination(currentPage, itemsPerPage);
        const supabase = await createClient()

        const { data, error } = await supabase
            .rpc('get_water_meter_lectures_by_id', {
                anio: fecha,
                id_medidor: id_medidor,
                id_usuario: id_usuario
            }).range(from, to);



        if (error) {
            return { success: false, error: `Error al obtener el consumo del medidor: ${error.message}` };
        }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo del medidor: ${error}` };
    }
}

export async function getCounterMeterWaterbyId(id_usuario: number, id_medidor: number, fecha: number): Promise<QueryResultError<{ total_lecturas: number }>> {
    try {

        // const waterMeter = (await pool.query<{ total_lecturas: number }>(
        //     `SELECT 
        //             COUNT(*) AS total_lecturas
        //         FROM 
        //             lecturas l
        //         JOIN 
        //             medidores m ON l.medidor_id = m.id
        //         JOIN 
        //             usuarios u ON m.usuario_id = u.id
        //         WHERE 
        //             u.id = $1
        //             AND m.id = $2
        //         AND date_trunc('year', l.fecha) = date_trunc('year', $3::date)
        //     `, [id_usuario, id_medidor, fecha]
        // )).rows[0];
        const supabase = await createClient()
        const { data, error } = await supabase.rpc('get_counter_meter_water_by_id', {
            usuario_id_param: id_usuario,
            medidor_id_param: id_medidor,
            anio_param: fecha
        })
        if (error) {
            return { success: false, error: `Error al obtener el consumo del medidor: ${error.message}` };
        }

        return { success: true, data: { total_lecturas: data } };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo del medidor: ${error}` };
    }
}

