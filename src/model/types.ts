import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UsersBySector = {
  sector_nombre: string;
  numero_usuarios: number;
}

export type UsersInactivesActives = {
  estado: boolean;
  numero_usuarios: number;
}

export type TotalUser = {
  total_usuarios: number;
}

export type Sector = {
  id: number;
  nombre: string;
}


export type FormModalType = {
  table:
  | "user"
  | "student"
  | "parent"
  | "subject"
  | "class"
  type: "create" | "update"
  data: unknown;
  id?: number;
}

//type dataOrError<T> = { data: T } | { success: false, error: string };

export type QueryResultError<T> = { success: true, data: T } | { success: false, error: string };


export type Lectures = {
  id: number | null;
  fecha: Date | null;
  consumo: number | null;
  lectura_anterior: number | null; // Opcional porque puede ser null
  lectura_actual: number | null; // Opcional porque puede ser null
  exceso: number | null; // Opcional porque puede ser null
  usuario_id: number;
  nombre_usuario: string;
  numero_serie: string
  medidor_id: number;
}


export type Years = { anio: number }

export type Months = { mes: string, value: number }


export type LecturesDto = Omit<Lectures, "id" | "usuario_id" | "nombre_usuario" | "numero_serie" | "consumo" | "consumo" | "exceso" | "lectura_anterior">
export type Sheets = {
  id: number;                    // ID de la planilla
  id_lectura: number;            // ID de la lectura asociada
  fecha_emision: Date;         // Fecha de emisión en formato de cadena (puede usarse 'Date' si se parsea)
  valor_abonado: number;         // Valor abonado (pagado parcialmente)
  total_pagar: number;           // Total a pagar
  estado: 'pendiente' | 'pagada'; // Estado de la planilla
  total_consumo: number;         // Consumo total (litros o metros cúbicos)
  total_exceso: number;          // Exceso total registrado
  consumo: number;               // Consumo de agua en esta lectura
  exceso: number;                // Exceso de agua registrado
  nombre: string;        // Nombre del usuario asociado al medidor
  medidor_id: number;            // ID del medidor
};

export type MonthlyRevenue = {
  total_recaudado: number;
  total_pagar: number;
};

export type RevenueBySector =  { sector_nombre: string, total_recaudado: number }

export const monthsInSpanish = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
