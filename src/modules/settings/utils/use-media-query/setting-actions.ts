'use server'
import pool from "../../../../lib/db";
import { revalidatePath } from 'next/cache';
import { QueryResultError } from "@/model/types";
import { Company, DigitalCert } from "../../types";


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