
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { useUserStore } from "@/lib/store";
import { Sector } from "@/model/types";
import { Button, Chip, Select, SelectItem } from "@nextui-org/react";
import { createApiUserRepository } from "@/services/serviceUser";
import { IUserRepository } from "@/model/user-repository/UserRepository";
import { toast } from "react-toastify";

const schema = z.object({
    nombre: z
        .string()
        .min(4, { message: "Su nombre debe tener al menos 4 caracteres!" })
        .max(250, { message: "Su nombre no puede tener más de 150 caracteres!" }),
    email: z.string().email({ message: "Por favor ingrese un correo válido!" }),
    direccion: z.string().min(1, { message: "Dirección es obligatoria!" }),
    telefono: z.string().min(1, { message: "Teléfono es obligatorio!" })
        .max(10, { message: "No puede tener más de 10 caracteres!" }),
    sector_id: z.preprocess((val) => Number(val),
        z.number().min(1, { message: "Sector es obligatorio!" })),
    cedula: z.string().min(1, { message: "Cedula es obligatorio!" }),
    estado: z.preprocess((val) => val === "Activo" ? true : false, z.boolean().refine(val => typeof val === 'boolean', { message: "Estado es obligatorio!" })),
    tipo: z.string().min(1, { message: "Tipo es obligatorio!" }),
});
type Inputs = z.infer<typeof schema>;

export default function FormAddUser({ sectores }: { sectores: Sector[] }) {
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitted, },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });
    
    const { type, data, closeModal } = useUserStore();
    const repositoryUser: IUserRepository = createApiUserRepository();
    const onSubmit = handleSubmit((formData) => {
        if (type === "create") {
            // repositoryUser.createUser(formData).then((res) => {
            //     if (res.success) {
            //         closeModal();
            //         toast.success('Usuario creado con éxito');
            //     } else {
            //         toast.error('Algo salió mal, no se pudo crear el usuario');
            //     }
            // });

            toast.promise(
                repositoryUser.createUser(formData),
                {
                  pending: 'Creando usuario ...',
                  success: 'Usuario creado con éxito',
                  error: 'Algo salió mal, no se pudo crear el usuario'
                }
            )
        } else if (type === "update") {
            // repositoryUser.updateUser(formData, data?.id).then((res) => {
                
            //     if (res.success) {
            //         closeModal();
            //         toast.success('Usuario actualizado con éxito');
            //     } else {
            //         toast.error('Algo salió mal, no se pudo actualizar el usuario');
            //     }
            // });

            
            toast.promise(
                repositoryUser.updateUser(formData, data?.id),
                {
                  pending: 'Actualizando usuario ...',
                  success: 'Usuario actualizado con éxito',
                  error: 'Algo salió mal, no se pudo actualizar el usuario'
                }
            )
            closeModal();
        }
    });
    return (
        <>
            <form className="space-y-4 md:space-y-3 mb-2 mt-2" onSubmit={onSubmit}>
                <h1 className="text-xl font-semibold">Gestión de Usuarios</h1>

                <span className="text-xs text-gray-400 font-medium">
                    Informacion Personal
                </span>

                <InputField

                    label="Nombres y Apellidos"
                    name="nombre"
                    defaultValue={data?.nombre}
                    register={register}
                    error={errors?.nombre}
                />

                <InputField
                    label="Email"
                    name="email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors?.email}

                />
                <InputField
                    label="Direccion"
                    name="direccion"
                    defaultValue={data?.direccion}
                    register={register}
                    error={errors?.direccion}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <InputField
                        label="Telefono"
                        type="number"
                        name="telefono"
                        defaultValue={data?.telefono}
                        register={register}
                        error={errors?.telefono}
                    />

                    <InputField
                        label="Cedula"
                        type="number"
                        name="cedula"
                        defaultValue={data?.cedula}
                        register={register}
                        error={errors?.cedula}
                    />

                    <Select
                        label="Tipo"
                        placeholder="Seleccione el tipo"
                        //defaultSelectedKeys={[data?.sector_id]}
                        {...register("tipo")}
                        value={data?.tipo}
                        defaultSelectedKeys={[data?.tipo]}

                        isInvalid={errors.tipo?.message == undefined ? false : true}
                        errorMessage={errors.tipo?.message}
                    >
                        <SelectItem key={"Natural"}>
                            {"Natural"}
                        </SelectItem>
                        <SelectItem key={"Jurídica"}>
                            {"Jurídica"}
                        </SelectItem>
                    </Select>


                    <Select
                        label="Estado"
                        placeholder="Seleccione el estado"
                        //defaultSelectedKeys={[data?.sector_id]}
                        {...register("estado")}
                        defaultSelectedKeys={[data?.estado ? "Activo" : "Inactivo"]}
                        isInvalid={errors.estado?.message == undefined ? false : true}
                        errorMessage={errors.estado?.message}
                        renderValue={(value) => {
                            return value.map((item) => <Chip className="capitalize mt-2" key={item.key} color={item.key == "Activo" ? "success" : "warning"} size="sm" variant="flat">
                                <span className="text-small">{item.key}</span>
                            </Chip>);
                        }}

                    >
                        <SelectItem key={"Activo"}>

                            <Chip className="capitalize" color={'success'} size="sm" variant="flat">
                                <span className="text-small">{"Activo"}</span>
                            </Chip>

                        </SelectItem>
                        <SelectItem key={"Inactivo"}>
                            <Chip className="capitalize" color={'warning'} size="sm" variant="flat">
                                <span className="text-small">{"Inactivo"}</span>
                            </Chip>
                        </SelectItem>
                    </Select>

                    <Select
                        label="Sector"
                        placeholder="Seleccione la Comunidad"
                        //defaultSelectedKeys={[data?.sector_id]}
                        {...register("sector_id")}
                        isInvalid={errors.sector_id?.message == undefined ? false : true}
                        errorMessage={errors.sector_id?.message}
                        defaultSelectedKeys={[String(data?.sector_id)]}
                    //selectedKeys={[data?.sector_id]}
                    >
                        {sectores.map((sector) => (
                            <SelectItem key={sector.id}>
                                {sector.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <Button isDisabled={isSubmitted} type="submit" color="primary" className="text-white mt-5 rounded-md flex w-full flex-wrap md:flex-nowrap">
                    {type === "create" ? "Guardar" : "Update"}
                </Button>
            </form>
        </>

    );
}