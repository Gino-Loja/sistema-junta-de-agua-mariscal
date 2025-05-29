'use server';
import pool from '@/lib/db';
import { createClient } from '@/lib/supabase/server';
import { QueryResultError, Sector } from '@/model/types';
import { calculateRangeDate } from '@/utils/getPagination';
import { Rate } from '../../types';
// import { revalidatePath } from 'next/cache';




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
        // const total: number = (await pool.query(`

        //     select
        //         coalesce(count(*), 0) as total
        //     from
        //         incidentes
        //     where
        //         ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha) = $1)


        // `, [date])).rows[0].total;
        const supabase = await createClient();
        let builder = supabase.from('incidentes')
            .select('*', { count: 'exact' });


        if (date) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(date);
            builder = builder.gte('fecha', fecha_inicio).lte('fecha', fecha_fin);
        }

        const { count, error } = await builder;
        // console.log(count)

        if (error) { return { success: false, error: `Error: ${error.message}` }; }


        return { success: true, data: count || 0 };
    } catch (error) {
        return { success: false, error: `Error: ${error}` };
    }
};

export const getTotalSheets = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`

        //     select
        //         coalesce(count(*), 0) as total
        //     from
        //         planillas
        //     where
        //      ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)


        // `, [date])).rows[0].total;
        const supabase = await createClient();
        let builder = supabase.from('planillas')
            .select('*', { count: 'exact' });

        if (date) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(date);
            builder = builder.gte('fecha_emision', fecha_inicio).lte('fecha_emision', fecha_fin);
        }

        const { count, error } = await builder;

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data: count || 0 };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalWaterMeter = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`

        //         select
        //             coalesce(sum(consumo)) as total
        //         from
        //             public.lecturas
        //         where
        //      ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha) = $1)


        // `, [date])).rows[0].total;
        const supabase = await createClient();
        let builder = supabase.from('lecturas')
            .select('*', { count: 'exact' });


        if (date) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(date);
            builder = builder.gte('fecha', fecha_inicio).lte('fecha', fecha_fin);
        }

        const { count, error } = await builder;

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data: count || 0 };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getTotalUser = async (): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`

        //         select
        //             coalesce(count(*), 0) as total
        //         from
        //             usuarios;


        // `)).rows[0].total;
        const supabase = await createClient();
        const { count, error } = await supabase.from('usuarios').select('*', { count: 'exact' });
        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        return { success: true, data: count || 0 };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getAmountInvoice = async (date: number | null): Promise<QueryResultError<number>> => {
    try {

        // const total: number = (await pool.query(`

        //     select
        //         coalesce(sum(total_pagar-valor_abonado), 0) as total
        //     from
        //         public.planillas
        //     where
        //      ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)

        // `, [date])).rows[0].total;
        let fechafin: string | undefined, fechaini: string | undefined = undefined;
        const supabase = await createClient();

        if (date) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(date);
            fechafin = fecha_fin;
            fechaini = fecha_inicio;
        }


        const { data, error } = await supabase.rpc('calcular_total_pendiente_planillas', {
            p_fecha_fin: fechafin,
            p_fecha_inicio: fechaini
        });

        if (error) { return { success: false, error: `Error: ${error.message}` }; }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};



export const getAmountIncident = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`

        //     select

        //         coalesce(sum(costo), 0) as total
        //     from
        //         incidentes
        //     where
        //      ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha) = $1)

        // `, [date])).rows[0].total;
        let fechafin: string | undefined, fechaini: string | undefined = undefined;

        const supabase = await createClient();

        if (date) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(date);
            fechafin = fecha_fin;
            fechaini = fecha_inicio;
        }


        const { data, error } = await supabase.rpc('calcular_total_costo_incidentes', {
            p_fecha_fin: fechafin,
            p_fecha_inicio: fechaini
        });

        if (error) { return { success: false, error: `Error: ${error.message}` }; }


        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getAmountSheets = async (date: number | null): Promise<QueryResultError<number>> => {
    try {
        // const total: number = (await pool.query(`

        //     select
        //         coalesce(sum(valor_abonado), 0) as total
        //     from
        //         planillas
        //     where
        //      ($1::integer IS NULL OR EXTRACT(YEAR FROM fecha_emision) = $1)

        // `, [date])).rows[0].total;
        let fechafin: string | undefined, fechaini: string | undefined = undefined;

        const supabase = await createClient();

        if (date) {
            let { fecha_fin, fecha_inicio } = calculateRangeDate(date);
            fechafin = fecha_fin;
            fechaini = fecha_inicio;
        }


        const { data, error } = await supabase.rpc('calcular_total_valor_abonado', {
            p_fecha_fin: fechafin,
            p_fecha_inicio: fechaini
        });

        if (error) { return { success: false, error: `Error: ${error.message}` }; }



        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getRate = async (): Promise<QueryResultError<Rate>> => {
    try {
        // const total: Rate = (await pool.query(`
        //     select
        //         *
        //     from
        //         tarifas_agua
            
               
        // `)).rows[0];
        const supabase = await createClient();
        const { data, error } = await supabase.from('tarifas_agua').select('*').single();

        if (error) { return { success: false, error: `Error: ${error.message}` }; }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

