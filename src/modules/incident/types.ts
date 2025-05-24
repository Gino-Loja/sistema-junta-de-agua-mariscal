import { Database } from "@/supabase";
import { QueryParams } from "../types";

export type Incident =  Database["public"]["Views"]["get_incident_view"]["Row"]


type IncidentDto = Omit<Incident, "id" | "nombre_usuario"  | "nombre_sector"  >

export type IncidentParams = Omit<QueryParams, "from" | "to"  | "status" | "type">;
