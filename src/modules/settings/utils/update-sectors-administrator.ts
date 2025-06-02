'use server'
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Definimos el esquema de validación con Zod
const updateSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, { message: "El usuario es requerido" }),
    descripcion: z.string().min(1, { message: "la descripcion es requerida" }),
});
// Función para actualizar el administrador en el servidor
export async function UpdateSectorsAdministratorAction(prevState: any, formData: FormData) {
    // Convertimos el FormData en objeto plano
    const dataObj = Object.fromEntries(formData.entries());
    // Validamos la información recibida
    const validationResult = updateSchema.safeParse(dataObj);
    if (!validationResult.success) {
        // Retornamos los errores de validación
        return {
            success: false,
            error: validationResult.error.flatten().fieldErrors
        };
    }
    // Preparamos la información para actualizar el usuario
    // Nota: Supabase no requiere (ni debería) enviar la contraseña actual en la actualización,
    // se asume que ya el usuario está autenticado y se maneja de forma segura.
    const updatePayload: {
        nombre: string;
        descripcion: string;
        id: number;
    } = {
        nombre: validationResult.data.nombre,
        descripcion: validationResult.data.descripcion,
        id: validationResult.data.id
    }



    // Inicializamos el cliente de Supabase en el servidor
    const supabase = await createClient();
    // Realizamos la actualización del usuario
    const { data, error } = await supabase.from("sectores").update({
        nombre: updatePayload.nombre,
        descripcion: updatePayload.descripcion
    }).eq("id", updatePayload.id);
    // Actualización exitosa
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    revalidatePath("/setting/sectors")
    return {
        success: true,
        error: null
    };
}
