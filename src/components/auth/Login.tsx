import { login } from "@/app/(auth)/login/action";
import { Button, Input, Card, CardHeader, CardBody } from "@nextui-org/react";
// import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { signIn } from "next-auth/react"; // Cambiamos la importación
// import { useRouter } from "next/navigation";

// Definir el esquema de validación
// const loginSchema = z.object({
//     usuario: z.string().nonempty("El usuario es obligatorio"),
//     password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

export const Login = () => {
    // const router = useRouter();
    // const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormValues>({
    //     resolver: zodResolver(loginSchema),
    // });

    // const onSubmit = async (data: LoginFormValues) => {
    //     try {
    //         const result = await signIn("credentials", {
    //             username: data.usuario,
    //             password: data.password,
    //             redirect: false, // Importante: manejamos la redirección manualmente
    //         });

    //         if (result?.error) {
    //             // Manejar errores de autenticación
    //             setError("root", {
    //                 message: "Usuario o contraseña incorrectos"
    //             });
    //             return;
    //         }

    //         if (result?.ok) {
    //             // Redireccionar al dashboard o página principal
    //             router.push("/");
    //             router.refresh(); // Refresca la página para actualizar el estado de la sesión
    //         }
    //     } catch (error) {
    //         console.error("Error durante el login:", error);
    //         setError("root", {
    //             message: "Ocurrió un error durante el inicio de sesión"
    //         });
    //     }
    // };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto gap-4 mb-4">
            <Card>
                <CardHeader className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
                </CardHeader>
                <CardBody className="space-y-6 px-4">
                    <form className="space-y-6" >
                        <Input
                            variant="bordered"
                            label="Usuario"
                            type="email"
                            name="email"
                            required
                        />
                        <Input
                            variant="bordered"
                            label="Password"
                            type="password"
                            name="password"
                            required
                         
                        />
                        {/* {errors.root && (
                            <div className="text-red-500 text-sm text-center">
                                {errors.root.message}
                            </div>
                        )} */}
                        <Button
                            className="w-full"
                            type="submit"
                            variant="flat"
                            color="primary"
                            formAction={login}
                        >
                            Ingresar
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};