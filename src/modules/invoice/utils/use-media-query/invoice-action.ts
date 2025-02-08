'use server'
import pool from "../../../../lib/db";
import { revalidatePath } from 'next/cache';
import { CounterMeeting, InformationCompany, Invoice, Meeting, PaymentMethod, Service, StatusAllMeeting } from "../../types";
import { QueryResultError } from "@/model/types";


export const getServive = async (): Promise<QueryResultError<Service[]>> => {
    try {
        const servicios: Service[] = (await pool.query(`
            select
                *
            from
                servicios
        `)).rows;
        return { success: true, data: servicios };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getInformationCompany = async (): Promise<QueryResultError<InformationCompany[]>> => {
    try {
        const informacion: InformationCompany[] = (await pool.query(`
            select
                id,
                ruc,
                razon_social,
                nombre_comercial,
                ciudad,
                direccion,
                telefonos,
                email,
                numero_establecimientos,
                obligado_a_contabilidad,
                contribuyente_regimen_rimpe     
            from
                empresa_informacion
        `)).rows;
        return { success: true, data: informacion };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};


export const getPaymentMethods = async (): Promise<QueryResultError<PaymentMethod[]>> => {
    try {
        const paymentMethods: PaymentMethod[] = (await pool.query(`
            select
                *
            from
                metodos_pagos
        `)).rows;
        return { success: true, data: paymentMethods };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getNumberInvoice = async (): Promise<QueryResultError<number>> => {
    try {
        const secuencial: number = (await pool.query(`
            SELECT LPAD((COALESCE(MAX(id::INTEGER), 0) + 1)::text, 9, '0') AS secuencial
            FROM public.facturas_detalles;

        `)).rows[0].secuencial;
        return { success: true, data: secuencial };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
};

export const getInvoice = async (page: number, per_page: number, date: string, query: string): Promise<QueryResultError<Invoice[]>> => {
    const offset = (page - 1) * per_page;

    try {
        const invoice: Invoice[] = (await pool.query(`
            SELECT 
                u.nombre AS nombre_usuario,
                f.fecha_emision,
                f.estado,
                f.clave_acceso,
                f.numero_factura,
                f.xml_firmado,
                f.factura_json,
                f.id,
                u.id AS usuario_id

            FROM 
                facturas f
            INNER JOIN 
                usuarios u ON f.usuario_id = u.id
            WHERE 
                date_trunc('month', f.fecha_emision) = date_trunc('month', $1::date)
                AND ((u.nombre ILIKE '%' || $2 || '%'
                OR u.cedula ILIKE  '%' || $2 || '%'))

            ORDER BY 
            nombre_usuario ASC
            LIMIT ${per_page} OFFSET ${offset};

        `, [date, query])).rows;
        return { success: true, data: invoice };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };
    }
}

export const getCounterInvoiceByDate = async (date: string, query: string): Promise<QueryResultError<{ total: number }>> => {
    try {
        const total: { total: number } = (await pool.query(`
            SELECT 
              
                count(*) as total
            FROM 
                facturas f
            INNER JOIN 
                usuarios u ON f.usuario_id = u.id
            
            WHERE 
                date_trunc('month', f.fecha_emision) = date_trunc('month', $1::date)
                AND ((u.nombre ILIKE '%' || $2 || '%'
                OR u.cedula ILIKE  '%' || $2 || '%'))

        `, [date, query])).rows[0];
        return { success: true, data: total };
    } catch (error) {
        return { success: false, error: `Error al obtener los datos: ${error}` };

    }
};