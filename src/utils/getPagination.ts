import { ITEMS_PER_PAGE } from "@/model/Definitions"

export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : ITEMS_PER_PAGE;
    // Restamos 1 a page para ajustar páginas que comienzan en 1
    const from = page ? (page - 1) * limit : 0;
    const to = page ? from + size - 1 : size - 1;
    return { from, to };
}