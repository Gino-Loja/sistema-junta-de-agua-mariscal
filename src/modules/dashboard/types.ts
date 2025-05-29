// type Rate = {
//     id: number,
//     valor_m3: number,
//     valor_exceso: number,
//     metros_base: number,
//     metros_base_exceso: number,
//     valor_exceso_superior: number,
//     multa_sesiones: number,
// }

import { Database } from "@/supabase";

export type Rate = Database['public']['Tables']['tarifas_agua']['Row'];


