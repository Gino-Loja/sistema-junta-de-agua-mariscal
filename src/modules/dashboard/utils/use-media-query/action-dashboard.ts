'use server';
import pool from '@/lib/db';
import { QueryResultError, Sector } from '@/model/types';
import { revalidatePath } from 'next/cache';




export const getTotalInvoice = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(count(*), 0)  as total
            from
                public.facturas
            where
                date_trunc('year', fecha_emision::date) = date_trunc('year', $1::date);

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getTotalIncident = async (date: string): Promise<QueryResultError<number>> => {
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

export const getTotalSheets = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(count(*), 0) as total
            from
                planillas
            where
                date_trunc('year', fecha_emision::date) = date_trunc('year', $1::date);

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalWaterMeter = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
                select
                    coalesce(sum(consumo)) as total
                from
                    public.lecturas
                where
                date_trunc('year', fecha::date) = date_trunc('year', $1::date);
           

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

export const getAmountInvoice = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(sum(total_pagar), 0) as total
            from
                public.planillas
            where
                date_trunc('year', fecha_emision::date) = date_trunc('year', $1::date);

        `, [date])).rows[0].total;
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};



export const getAmountIncident = async (date: string): Promise<QueryResultError<number>> => {
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

export const getAmountSheets = async (date: string): Promise<QueryResultError<number>> => {
    try {
        const total: number = (await pool.query(`
           
            select
                coalesce(sum(valor_abonado), 0) as total
            from
                planillas
            where
                date_trunc('year', fecha_emision::date) = date_trunc('year', $1::date);

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

