import { ITEMS_PER_PAGE, TIME_ZONE } from "@/model/Definitions";
import { parseAbsolute, } from '@internationalized/date';

export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : ITEMS_PER_PAGE;
    // Restamos 1 a page para ajustar páginas que comienzan en 1
    const from = page ? (page - 1) * limit : 0;
    const to = page ? from + size - 1 : size - 1;
    return { from, to };
}

export function calculateRangeDate(
    anio: number,
    mes: number | null = null
): { fecha_inicio: string; fecha_fin: string } {
    let inicio: Date;
    let fin: Date;

    if (mes == null) {
        // Rango para todo el año
        inicio = new Date(anio, 0, 1);           // 1 de enero
        fin = new Date(anio + 1, 0, 0);       // día 0 de enero del año siguiente = 31 de diciembre del año
        
    } else {
        // Rango para el mes concreto
        inicio = new Date(anio, mes - 1, 1);     // 1 del mes
        fin = new Date(anio, mes, 0);         // día 0 del mes siguiente = último día del mes
    }

    return {
        fecha_inicio: inicio.toISOString(),
        fecha_fin: fin.toISOString()
    };
}


export function formatToEcuadorTime(date: string) {

    // const dateTime = parseAbsolute(date, TIME_ZONE);

    return parseAbsolute(date, TIME_ZONE);
}