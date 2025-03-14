// hooks/useSearchParams.ts
import { TIME_ZONE } from "@/model/Definitions";
import { CustomSearchParams } from "@/model/types";
import {  now } from "@internationalized/date";

export  function useFilterPaginationParams(searchParams: Record<string, string | string[] | undefined> & CustomSearchParams) {
  const currentDate = now(TIME_ZONE);

  // Si no existe el parámetro 'date', usa la fecha actual

  //const dateResponse = searchParams.date
  const date =  searchParams.date || currentDate.toAbsoluteString();

  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '10'; // ITEMS PER PAGE
  const query = searchParams['query'] ?? '';
  const type = searchParams['type'] ?? '';
  const status = searchParams['status'] ?? '';
  const user = searchParams['user'] ?? '';
  const medidor = searchParams['medidor'] ?? '';

  // Cálculo de paginación
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10, ...
  const end = start + Number(per_page);

  return { date, page, per_page, query, start, end, type , status, user, medidor };
}
