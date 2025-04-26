'use server'
import { z } from "zod";
import { createClient, createSupbaseAdmin } from "@/lib/supabase/server";
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
    confirmPassword: z.string().optional(),
    id: z.string(),
});

// Función para actualizar el administrador en el servidor
export async function updateAdministratorAction(prevState: any,formData: FormData) {
    // console.log(formData,prevState)
    // Convertimos el FormData en objeto plano
    const dataObj = Object.fromEntries(formData.entries());
    // Validamos la información recibida
    const validationResult = updateSchema.safeParse(dataObj);
    if (!validationResult.success) {
        // Retornamos los errores de validación
        // mostrar los errores en un solo mensaje de error
        return {
            success: false,
            error: validationResult.error.errors.map(
                (e) => `${e.path[0]}: ${e.message}`
            )
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
        user_metadata: {
            usuario: string;
            nombres: string;
            estado: string;
            rol: string;
            celular: string;
        };
    } = {
        email: dataObj.email.toString(),
        user_metadata: {
            usuario: dataObj.usuario.toString(),
            nombres: dataObj.nombres.toString(),
            estado: dataObj.estado.toString(),
            rol: dataObj.rol.toString(),
            celular: dataObj.celular.toString()
        }
    }

    if (dataObj.newPassword) {
        updatePayload.password = dataObj.newPassword.toString();
    }

    // Inicializamos el cliente de Supabase en el servidor
    const supabase = await createClient();
    // Realizamos la actualización del usuario
    const { data, error: errorUpdate } = await supabase.auth.getUser()
    
    // Actualización exitosa
    if (errorUpdate) {
        return {
            success: false,
            error: errorUpdate.message.toString()
        };
    }

    const supabaseAdmin = await createSupbaseAdmin();
    // Actualizamos el usuario en la tabla de usuarios
    const { data: updatedUser, error: errorUpdateUser } = await supabaseAdmin.auth.admin.updateUserById(dataObj.id.toString(), updatePayload)
    if (errorUpdateUser) {
        return {
            success: false,
            error: errorUpdateUser.message.toString()
        };
    }
    revalidatePath("/setting/administrator")
    return {
        success: true,
        error: null
    };
}
