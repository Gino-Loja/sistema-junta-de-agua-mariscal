'use server'
import pool from "../../../../lib/db";
import { revalidatePath } from 'next/cache';
import { QueryResultError } from "@/model/types";
import { Administrators, Company, DigitalCert } from "../../types";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/supabase";
import { getPagination } from "@/utils/getPagination";




export const getCompany = async (): Promise<QueryResultError<Company[]>> => {

    try {
        const company: Company[] = (await pool.query(`
            SELECT 
                *
            FROM
                empresa_informacion;
                
        `)).rows; // Formateamos la fecha con año-mes-01

        return { success: true, data: company };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};


export const updateCompany = async (formData: Company): Promise<QueryResultError<Company>> => {

    try {
        const meeting = <Company>(await pool.query(`
            UPDATE 
                empresa_informacion
            SET 
                ruc = $1,
                razon_social = $2,
                nombre_comercial = $3,
                ciudad = $4,
                direccion = $5,
                telefonos = $6,
                email = $7,
                numero_establecimientos = $8,
                obligado_a_contabilidad = $9,
                contribuyente_regimen_rimpe = $10,
                logo = $11
            WHERE 
                id = $12
                
        `, [
            formData.ruc,
            formData.razon_social,
            formData.nombre_comercial,
            formData.ciudad,
            formData.direccion,
            formData.telefonos,
            formData.email,
            formData.numero_establecimientos,
            formData.obligado_a_contabilidad,
            formData.contribuyente_regimen_rimpe,
            formData.logo,
            formData.id
        ])).rows[0]; // Formateamos la fecha con año-mes-01
        revalidatePath('/settings/company');

        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
};



export const getDigitalCertificate = async (): Promise<QueryResultError<DigitalCert[]>> => {

    try {
        const company: DigitalCert[] = (await pool.query(`
            SELECT 
                *
            FROM
                certificado_digital;
                
        `)).rows; // Formateamos la fecha con año-mes-01

        return { success: true, data: company };
    } catch (error) {
        return { success: false, error: `Error al obtener el certificado digital: ${error}` };
    }
};

export const updateDigitalCertificate = async (formData: DigitalCert): Promise<QueryResultError<DigitalCert>> => {
    try {
        const meeting = <DigitalCert>(await pool.query(`
            UPDATE 
                certificado_digital
            SET 
                cetificado = $1,
                password = $2,
                fecha_caducidad = $3,
            WHERE 
                id = $4
        `, [
            formData.certificado,
            formData.password,
            formData.fecha_caducidad,
            formData.id
        ])).rows[0]; // Formateamos la fecha con año-mes-01
        revalidatePath('/settings/company');

        return { success: true, data: meeting };
    } catch (error) {
        return { success: false, error: `Error al actualizar el certificado digital: ${error}` };
    }
};

export const getAdministrator = async (date: string, search: string, status: string, currentPage: number, itemsPerPage: number): Promise<QueryResultError<Administrators[]>> => {
    const supabase = await createClient();
    const { from, to } = getPagination(currentPage, itemsPerPage);

    try {
        let query = supabase
            .from("administradores_con_email")
            .select("*")
            .ilike("nombres", `%${search}%`)
            .range(from, to);

        if (status !== "") { query = query.eq("estado", status) }
        if (date !== "") { query = query.eq("fecha_creacion", date) }

        const { error, data } = await query

        if (error) {
            return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
        }
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }

};

export const getCountAdministrator = async (date: string, search: string, status: string): Promise<QueryResultError<number>> => {
    // let queryStatus = status == "" ? null : status;
    const supabase = await createClient();

    try {
        let query = supabase
            .from("administradores_con_email")
            .select("*", { count: 'exact' })
            // .eq("estado", status)
            // .eq("fecha_creacion", date)
            .ilike("nombres", `%${search}%`)

        if (status !== "") { query = query.eq("estado", status) }
        if (date !== "") { query = query.eq("fecha_creacion", date) }


        const { error, count } = await query


        if (error) {
            return { success: false, error: `Error al obtener todos los administradores: ${error.message}` };
        }


        return { success: true, data: count! };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }

};



