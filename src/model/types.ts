import { Database } from "@/supabase";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UsersBySector = Database["public"]["Views"]["get_all_user_by_sector"]["Row"]

export type UsersInactivesActives =  Database["public"]["Views"]["get_users_inactives_actives"]["Row"]


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
  id: number ;
  fecha: string ;
  consumo: number ;
  lectura_anterior: number ; // Opcional porque puede ser null
  lectura_actual: number ; // Opcional porque puede ser null
  exceso: number ; // Opcional porque puede ser null
  usuario_id: number;
  nombre: string;
  numero_serie: string;
  medidor_id: number;
}

export type Years = { anio: number }

export type Months = { mes: string, value: number }


export type LecturesDto = Omit<Database["public"]["Tables"]["lecturas"]["Row"], "mes_truncado" | "consumo" | "exceso" | "lectura_anterior" | "id">
// export type Sheets = {
//   id: number;                    // ID de la planilla
//   id_lectura: number;            // ID de la lectura asociada
//   fecha_emision: Date;         // Fecha de emisión en formato de cadena (puede usarse 'Date' si se parsea)
//   valor_abonado: number;         // Valor abonado (pagado parcialmente)
//   total_pagar: number;           // Total a pagar
//   estado: 'pendiente' | 'pagada'; // Estado de la planilla
//   total_consumo: number;         // Consumo total (litros o metros cúbicos)
//   total_exceso: number;          // Exceso total registrado
//   consumo: number;               // Consumo de agua en esta lectura
//   exceso: number;                // Exceso de agua registrado
//   nombre: string;        // Nombre del usuario asociado al medidor
//   medidor_id: number;            // ID del medidor
//   usuario_id: number;            // ID del usuario asociado al medidor
// };

export type Sheets = Database["public"]["Views"]["sheet_by_years_and_months"]["Row"]

export type SheetDto = Omit<Database["public"]["Tables"]["planillas"]["Row"], "medidor_id" | "id_lectura" | "fecha_emision" | "total_pagar" | "total_consumo" | "total_exceso" | "consumo" | "exceso" | "nombre" | "usuario_id" |"cedula" |"fecha_actualizacion">

export type MonthlyRevenue = {
  total_recaudado: number;
  total_pagar: number;
};

export type RevenueBySector = { sector_nombre: string, total_recaudado: number }

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
export const ObjectMonthsInSpanish = {
  January: 'Enero',
  February: 'Febrero',
  March: 'Marzo',
  April: 'Abril',
  May: 'Mayo',
  June: 'Junio',
  July: 'Julio',
  August: 'Agosto',
  September: 'Septiembre',
  October: 'Octubre',
  November: 'Noviembre',
  December: 'Diciembre'
};

export type CustomSearchParams = { date: string, page: string, per_page: string, query: string, type:string , status:string, user: string, medidor: string }


export type WaterMeter = Database["public"]["Views"]["vista_medidores_usuarios"]["Row"] 
export type WaterMeterDto = Database["public"]["Tables"]["medidores"]["Update"] 
export type WaterMeterCreate = Database["public"]["Tables"]["medidores"]["Insert"]
export type WaterMeterById = Database["public"]["Functions"]["get_water_meter_lectures_by_id"]["Returns"][number]


export type MeasurementMacro = {
  id:number,
  lectura:number,
  consumo:number,
  fecha:string
}