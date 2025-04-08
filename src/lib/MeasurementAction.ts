'use server'
import { Lectures, LecturesDto, MeasurementMacro, Months, QueryResultError, Years } from "@/model/types";
import pool from "./db";
import { revalidatePath } from 'next/cache';


export const getLecturesByYearsAndMonths = async (date: string): Promise<QueryResultError<Lectures[]>> => {
    try {
        const lectures: Lectures[] = (await pool.query(`
            SELECT 
                u.nombre AS nombre, 
                m.numero_serie, 
                m.id AS medidor_id,
                u.id AS usuario_id, 
                l.fecha,
                l.lectura_anterior, 
                l.lectura_actual, 
                l.consumo, 
                l.exceso,
                l.id
             
            FROM 
                usuarios u
            INNER JOIN 
                medidores m ON u.id = m.usuario_id
            LEFT JOIN 
                lecturas l ON m.id = l.medidor_id 
                AND date_trunc('month', l.fecha) = date_trunc('month', $1::date)

                
        `, [date])).rows; // Formateamos la fecha con año-mes-01
        return { success: true, data: lectures };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};
export async function getAllYearLectures(): Promise<QueryResultError<Years[]>> {
    try {
        const years: Years[] = (await pool.query(`
            
                select distinct
            extract(
                year
                from
                fecha
            ) as anio
            from
            lecturas
            order by
            anio desc;
`)).rows;
        return { success: true, data: years };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
}
export async function getALLMonthsLecturesByYear(year: string): Promise<QueryResultError<Months[]>> {
    try {
        const months: Months[] = (await pool.query(`
            SELECT DISTINCT TO_CHAR(fecha, 'MM') AS mes
            FROM lecturas
            WHERE EXTRACT(YEAR FROM fecha) = $1
            ORDER BY mes;
            `, [year])).rows;
        return { success: true, data: months };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
}
export async function getComsumedMetersByMonths(month: number, year: number): Promise<QueryResultError<{ exceso: number | null, consumo: number | null }>> {
    try {
        const consumo: { exceso: number | null, consumo: number | null } = (await pool.query(`
        SELECT
        sum(consumo) as consumo,
        sum(exceso) as exceso
        FROM
        lecturas
        WHERE
        EXTRACT(YEAR FROM fecha) = $1 AND
        EXTRACT(MONTH FROM fecha) = $2
        `, [year, month])).rows[0];
        return { success: true, data: consumo };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo de metros: ${error}` };
    }
}
export async function getConsumedBySector(year: number, month: number): Promise<QueryResultError<{ sector: string, consumo: number }[]>> {

    try {
        const lectures = (await pool.query(`
                SELECT
            s.nombre AS sector,
            SUM(l.consumo) AS consumo
            FROM
            lecturas l
        JOIN
            medidores m ON l.medidor_id = m.id
        JOIN
            usuarios u ON m.usuario_id = u.id
        JOIN
            sectores s ON u.sector_id = s.id
        WHERE
            EXTRACT(YEAR FROM l.fecha) = $1 AND
            EXTRACT(MONTH FROM l.fecha) = $2
        GROUP BY
            s.nombre
    `, [year, month])).rows;
        return { success: true, data: lectures };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
}
export async function getComsumedMonthsByYear(year: number): Promise<QueryResultError<{ mes: string, consumo_total: number, exceso_total: number }[]>> {
    try {
        const months = (await pool.query(`
                    SELECT 
            CASE EXTRACT(MONTH FROM fecha)
                WHEN 1 THEN 'Enero'
                WHEN 2 THEN 'Febrero'
                WHEN 3 THEN 'Marzo'
                WHEN 4 THEN 'Abril'
                WHEN 5 THEN 'Mayo'
                WHEN 6 THEN 'Junio'
                WHEN 7 THEN 'Julio'
                WHEN 8 THEN 'Agosto'
                WHEN 9 THEN 'Septiembre'
                WHEN 10 THEN 'Octubre'
                WHEN 11 THEN 'Noviembre'
                WHEN 12 THEN 'Diciembre'
            END AS mes,
            SUM(consumo) AS consumo_total, 
            SUM(exceso) AS exceso_total
            FROM 
                lecturas
            WHERE 
                EXTRACT(YEAR FROM fecha) = $1
            GROUP BY 
                EXTRACT(MONTH FROM fecha)
         
            `, [year])).rows;
        return { success: true, data: months };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo: ${error}` };
    }
}
export async function createLecture(data: LecturesDto): Promise<QueryResultError<boolean>> {
    try {
        const lecture: boolean = (await pool.query(`
            INSERT INTO
                lecturas (fecha, medidor_id, lectura_actual)
            VALUES
                ($1, $2, $3)
            RETURNING
                id            
        `, [data.fecha, data.medidor_id, data.lectura_actual])).rows[0].id;
        revalidatePath('/sheets');
        return { success: true, data: lecture };
    } catch (error) {
        return { success: false, error: `Error al crear la lectura: ${error}` };
    }
}
export async function updateLecture(data: LecturesDto, id: number): Promise<QueryResultError<boolean>> {
    try {
        const lecture: boolean = (await pool.query(`
            UPDATE
                lecturas
            SET
                fecha = $1,
                medidor_id = $2,
                lectura_actual = $3
            WHERE
                id = $4
            RETURNING
                id
        `, [data.fecha, data.medidor_id, data.lectura_actual, id])).rows[0].id;
        revalidatePath('/sheets');
        return { success: true, data: lecture };
    } catch (error) {
        return { success: false, error: `Error al actualizar la lectura: ${error}` };
    }
}

export async function getLecturesPagination(
    currentPage: number,
    itemsPerPage: number,
    query: string,
    year: number,
    month: number,
    sector: string
): Promise<QueryResultError<Lectures[]>> {
    //const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const offset = (currentPage - 1) * itemsPerPage;


    try {
        const lectures: Lectures[] = (await pool.query(`
            SELECT 
                u.nombre AS nombre, 
                m.numero_serie, 
                m.id AS medidor_id,
                u.id AS usuario_id, 
                l.fecha,
                l.lectura_anterior, 
                l.lectura_actual, 
                l.consumo, 
                l.exceso,
                l.id
            FROM 
                usuarios u
            INNER JOIN 
                medidores m ON u.id = m.usuario_id
            INNER JOIN
                sectores s ON u.sector_id = s.id
            LEFT JOIN 
                lecturas l ON m.id = l.medidor_id 
                AND EXTRACT(MONTH FROM l.fecha) = $2
                AND EXTRACT(YEAR FROM l.fecha) = $3
            WHERE 
                s.id::text ILIKE  '%' || $4 || '%' AND

                (u.nombre ILIKE '%' || $1 || '%'
                OR u.cedula ILIKE  '%' || $1 || '%')

            ORDER BY u.nombre ASC

            LIMIT ${itemsPerPage} OFFSET ${offset}`, [query, month, year, sector])).rows;
        // console.log(lectures)
        return { success: true, data: lectures };
    } catch (error) {
        console.log(error)

        return { success: false, error: `Error al obtener todos las lecturas: ${error}` };
    }
}
export async function getCounterLectures(
    query: string,
    sector: string = '',
    month: number,
    year: number): Promise<QueryResultError<{ total_lectures: number }>> {
    try {
        const lecture = (await pool.query(`
        SELECT count(*) as total_lectures
        FROM usuarios u
        JOIN medidores m ON u.id = m.usuario_id
        INNER JOIN sectores s ON u.sector_id = s.id
        LEFT JOIN 
            lecturas l ON m.id = l.medidor_id 
            AND EXTRACT(MONTH FROM l.fecha) = $2
            AND EXTRACT(YEAR FROM l.fecha) = $3
        WHERE 
            s.id::text ILIKE  '%' || $4 || '%' AND

            (u.nombre ILIKE '%' || $1 || '%'
            OR u.cedula ILIKE '%' || $1 || '%');
        `, [query, month, year, sector])).rows[0];
        //  console.log(lecture)
        return { success: true, data: lecture };
    } catch (error) {

        return { success: false, error: `Error al obtener el total usuariosde : ${error}` };
    }
}

export async function insertMeasurementMacro(date: Date, lectura: number): Promise<QueryResultError<boolean>> {

    try {
        const lecture: boolean = (await pool.query(`
            INSERT INTO
                lectura_macromedidor (fecha, lectura)
            VALUES
                ($1, $2)
            RETURNING
                id            
        `, [date, lectura])).rows[0].id;
        revalidatePath('/measurement/macro');
        return { success: true, data: lecture };
    } catch (error) {
        return { success: false, error: `Error al crear la lectura: ${error}` };
    }

}

export async function updateMeasurementMacro(date: Date, lectura: number, id: number): Promise<QueryResultError<boolean>> {

    try {
        const lecture: boolean = (await pool.query(`
            UPDATE
                lectura_macromedidor
            SET
                fecha = $1,
                lectura = $2
            WHERE
                id = $3
            RETURNING
                id
        `, [date, lectura, id])).rows[0].id;
        revalidatePath('/measurement/macro');
        return { success: true, data: lecture };
    } catch (error) {
        return { success: false, error: `Error al actualizar la lectura: ${error}` };
    }
}

export const getMeasurementMacro = async (
    currentPage: number,
    itemsPerPage: number,
    from: string,
    to: string,
    month: number,
    year: number): Promise<QueryResultError<MeasurementMacro[]>> => {
    try {
        const offset = (currentPage - 1) * itemsPerPage;
        const lectures: MeasurementMacro[] = (await pool.query(`
            SELECT id, fecha, lectura, consumo
            FROM
            lectura_macromedidor
            WHERE  
                    ( -- Filtrar por rango de fechas si $3 y $4 no son vacíos
                    ($3 <> '' AND $4 <> '') 
                    AND fecha >= TO_DATE($3, 'DD/MM/YYYY') 
                    AND fecha < TO_DATE($4, 'DD/MM/YYYY') + INTERVAL '1 day'
                    )
                    OR 
                    ( -- Filtrar por mes/año si no hay rango (parámetros vacíos)
                    ($3 = '' AND $4 = '') 
                    AND EXTRACT(MONTH FROM fecha) = $1 
                    AND EXTRACT(YEAR FROM fecha) = $2
                    )
            ORDER BY id DESC
            LIMIT ${itemsPerPage} OFFSET ${offset}
        
        `, [month, year, from, to])).rows;

        return { success: true, data: lectures };
    } catch (error) {
        return { success: false, error: `Error al obtener todos las lecturas: ${error}` };
    }
}

export const deleteMeasurementMacro = async (id: number): Promise<QueryResultError<boolean>> => {
    try {

        await (pool.query(`
            DELETE FROM
            lectura_macromedidor
            where id = $1
        `, [id]));
        revalidatePath('/measurement/macro');

        return { success: true, data: true };
    } catch (error) {
        return { success: false, error: `Error al eliminar la lectura: ${error}` };
    }
}

export const getMeasurementMacroAreaChart = async (from: string, to: string, month: number, year: number): Promise<QueryResultError<{ fecha: Date, consumo: number }[]>> => {
    let queryFrom = from == '' ? null : from;
    let queryTo = to == '' ? null : to;

    try {
        const lectures: { fecha: Date, consumo: number }[] = (await pool.query(`
           SELECT fecha, consumo
                FROM lectura_macromedidor
                WHERE 
                EXTRACT(MONTH FROM fecha) = $1 AND
                EXTRACT(YEAR FROM fecha) = $2 AND
                (TO_DATE($3, 'DD/MM/YYYY') IS NULL OR fecha >= TO_DATE($3, 'DD/MM/YYYY')) AND
                (TO_DATE($4, 'DD/MM/YYYY') IS NULL OR fecha < TO_DATE($4, 'DD/MM/YYYY') + INTERVAL '1 day')
                ORDER BY id ASC;
        
        `, [month, year, queryFrom, queryTo])).rows;
        return { success: true, data: lectures };
    } catch (error) {
        return { success: false, error: `Error al obtener todos las lecturas: ${error}` };
    }
}

export const getCounterMeasurementMacro = async ( month: number, year: number, from: string, to: string): Promise<QueryResultError<{ total: number }>> => {

    let queryFrom = from == '' ? null : from;
    let queryTo = to == '' ? null : to;

    try {
        const lecture: { total: number } = (await pool.query(`
            SELECT count(*) as total
            FROM
            lectura_macromedidor
            WHERE 
            EXTRACT(MONTH FROM fecha) = $1 AND
            EXTRACT(YEAR FROM fecha) = $2 AND
            (TO_DATE($3, 'DD/MM/YYYY') IS NULL OR fecha >= TO_DATE($3, 'DD/MM/YYYY')) AND
            (TO_DATE($4, 'DD/MM/YYYY') IS NULL OR fecha < TO_DATE($4, 'DD/MM/YYYY') + INTERVAL '1 day')
            
        `, [month, year, queryFrom, queryTo])).rows[0];
        return { success: true, data: lecture };
    } catch (error) {

        return { success: false, error: `Error al obtener el conteo : ${error}` };
    }
}