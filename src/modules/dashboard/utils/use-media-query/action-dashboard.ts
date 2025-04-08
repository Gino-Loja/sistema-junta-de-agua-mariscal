'use server';
import pool from '@/lib/db';
import { QueryResultError, Sector } from '@/model/types';
import { revalidatePath } from 'next/cache';




export const getTotalInvoice = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(count(*), 0)  as total
            from
                public.facturas
            where
             ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getTotalIncident = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
              
                coalesce(count(*), 0) as total

            from
                incidentes
            where
                ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha) = $1)


        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalSheets = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(count(*), 0) as total
            from
                planillas
            where
             ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)


        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalWaterMeter = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
                select
                    coalesce(sum(consumo)) as total
                from
                    public.lecturas
                where
             ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha) = $1)
           

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalUser = async (): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
                select
                    coalesce(count(*), 0) as total
                from
                    usuarios;
           

        `)).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getAmountInvoice = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(sum(total_pagar-valor_abonado), 0) as total
            from
                public.planillas
            where
             ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};



export const getAmountIncident = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
              
                coalesce(sum(costo), 0) as total
            from
                incidentes
            where
             ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha) = $1)

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getAmountSheets = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(sum(valor_abonado), 0) as total
            from
                planillas
            where
             ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getRate = async (): Promise<QueryResultError<Rate>> => {
    try {
        const total: Rate = (await pool.query(`
            select
                *
            from
                tarifas_agua
            
               
        `)).rows[0];
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

