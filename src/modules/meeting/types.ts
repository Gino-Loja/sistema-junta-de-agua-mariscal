import { Database } from "@/supabase";

export type Meeting = Database["public"]["Views"]["vista_multas_con_usuarios"]["Row"];

export type StatusAllMeeting = {
    estado: string;
    total: number;
};

export type CounterMeeting = {
    total: number;
};