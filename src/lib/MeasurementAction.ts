'use server'
import { Lectures, LecturesDto, Months, QueryResultError, Years } from "@/model/types";
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
export async function getComsumedMetersByMonths(date: string): Promise<QueryResultError<{ exceso: number | null, consumo: number | null }>> {
    try {
        const consumo: { exceso: number | null, consumo: number | null } = (await pool.query(`
        SELECT
        sum(consumo) as consumo,
        sum(exceso) as exceso
        FROM
        lecturas
        WHERE
        date_trunc('month', fecha) = date_trunc('month', $1::date)
        `, [date])).rows[0];
        return { success: true, data: consumo };
    } catch (error) {
        return { success: false, error: `Error al obtener el consumo de metros: ${error}` };
    }
}
export async function getConsumedBySector(date: string): Promise<QueryResultError<{ sector: string, consumo: number }[]>> {

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
            date_trunc('month', l.fecha) = date_trunc('month', $1::date)
        GROUP BY
            s.nombre
    `, [date])).rows;
        return { success: true, data: lectures };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
}
export async function getComsumedMonthsByYear(date: string): Promise<QueryResultError<{ mes: string, consumo_total: number, exceso_total: number }[]>> {
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
                extract(year from fecha) = extract( year from $1::date )
            GROUP BY 
                EXTRACT(MONTH FROM fecha)
            ORDER BY 
                EXTRACT(MONTH FROM fecha);
            `, [date])).rows;
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

export async function getLecturesPagination(date: string,
    currentPage: number,
    itemsPerPage: number,
    query: string): Promise<QueryResultError<Lectures[]>> {
    //const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const offset = (currentPage - 1) * itemsPerPage;

    // Si `itemsPerPage` es mayor que 0, aplicamos la paginación
    // if (ITEMS_PER_PAGE > 0) {
    //     const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    //     query += ` LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    // }
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
                lecturas l ON m.id = l.medidor_id AND date_trunc('month', l.fecha) = date_trunc('month', $1::date)
            WHERE 
                 (u.nombre ILIKE '%' || $2 || '%'
                OR u.cedula ILIKE  '%' || $2 || '%')
            ORDER BY 
            u.nombre ASC
            LIMIT ${itemsPerPage} OFFSET ${offset}`, [date, query])).rows;
           // console.log(lectures)
        return { success: true, data: lectures };
    } catch (error) {

        return { success: false, error: `Error al obtener todos las lecturas: ${error}` };
    }
}
export async function getCounterLectures(date: string, query: string): Promise<QueryResultError<{ total_lectures: number }>> {
    try {
        const lecture = (await pool.query(`
            SELECT count(*) as total_lectures
        FROM usuarios u
        JOIN medidores m ON u.id = m.usuario_id
        LEFT JOIN lecturas l ON m.id = l.medidor_id AND date_trunc('month', l.fecha) = date_trunc('month', $1::date)
        WHERE 
            (u.nombre ILIKE '%' || $2 || '%'
            OR u.cedula ILIKE '%' || $2 || '%');
        `, [date, query])).rows[0];
      //  console.log(lecture)
        return { success: true, data: lecture };
    } catch (error) {

        return { success: false, error: `Error al obtener el total usuariosde : ${error}` };
    }
}