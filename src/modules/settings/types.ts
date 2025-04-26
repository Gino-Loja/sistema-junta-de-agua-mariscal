import { Database, TablesInsert, } from "@/supabase";

export interface Company {
    id: number;
    ruc: string;
    razon_social: string;
    nombre_comercial: string;
    ciudad: string;
    direccion: string;
    telefonos: string;
    email: string;
    numero_establecimientos: string;
    obligado_a_contabilidad: "SI" | "NO";
    contribuyente_regimen_rimpe: string;
    logo: string;
}

export interface DigitalCert {
    id: number;
    certificado: string;
    password: string;
    fecha_caducidad: Date;
    fecha_actualizacion: Date;
}

export type DigitalCertDto = Omit<DigitalCert, "fecha_actualizacion">;

export type Administrators = Database["public"]["Views"]["administradores_con_email"]["Row"];
export type InsertAdministrators = Omit<Administrators, "id"> & {
    email: string;
};
