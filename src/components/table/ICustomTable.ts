import { ColumnDef } from "@tanstack/react-table";

export interface TableCustomProps<T> {
    data: T[];
    columns: ColumnDef<T, unknown>[];

    //renderCell: React.JSX.Element;
    labelName: string;
    filtersConfig?: Array<{         // Configuración de múltiples filtros
        columnItem: string;           // Columna que se va a filtrar
        columnsFilter: string[];      // Valores para filtrar en esa columna
    }>;
    childrenFilterForCalendarTable ?: React.ReactNode;
    children ?: React.ReactNode;
}
