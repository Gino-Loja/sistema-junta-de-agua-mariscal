'use server'
import { z } from "zod";
import { createClient } from "@/lib/supabase/server"; 
import { revalidatePath } from "next/cache";

// Definimos el esquema de validación con Zod
const updateSchema = z.object({
    usuario: z.string().min(1, { message: "El usuario es requerido" }),
    nombres: z.string().min(1, { message: "El nombre es requerido" }),
    email: z.string().email({ message: "Correo inválido" }),
    estado: z.enum(["activo", "inactivo"], {
        errorMap: () => ({ message: "Selecciona un estado válido" })
    }),
    rol: z.string().min(1, { message: "El rol es requerido" }),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional()
});

// Función para actualizar el administrador en el servidor
export async function profileUpdateAdministratorAction(prevState: any, formData: FormData) {
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
    // Verificamos que, si se ingresó nueva contraseña, coincida con su confirmación
    if (dataObj.newPassword && dataObj.newPassword !== dataObj.confirmPassword) {
        return {
            success: false,
            error: "La nueva contraseña y la confirmación no coinciden"
        };
    }
    // Preparamos la información para actualizar el usuario
    // Nota: Supabase no requiere (ni debería) enviar la contraseña actual en la actualización,
    // se asume que ya el usuario está autenticado y se maneja de forma segura.
    const updatePayload: {
        email: string;
        password?: string;
        data: {
            usuario: string;
            nombres: string;
            estado: string;
            rol: string;
        };
    } = {
        email: dataObj.email.toString(),
        data: {
            usuario: dataObj.usuario.toString(),
            nombres: dataObj.nombres.toString(),
            estado: dataObj.estado.toString(),
            rol: dataObj.rol.toString()
        }
    }

    if (dataObj.newPassword) {
        updatePayload.password = dataObj.newPassword.toString();
    }

    // Inicializamos el cliente de Supabase en el servidor
    const supabase = await createClient();
    // Realizamos la actualización del usuario
    const { data, error:errorUpdate } = await supabase.auth.updateUser(updatePayload);
    // Actualización exitosa
    if (errorUpdate) {
        return {
            success: true,
            error: errorUpdate.message
        };
    }
    revalidatePath("/setting")
    revalidatePath("/")

    return {
        success: true,
        error: null
    };
}
