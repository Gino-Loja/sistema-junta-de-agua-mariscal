'use client'

import { useState } from "react"
import Image from "next/image";
import { z } from "zod";
import { Company } from "../../types";
import { Controller, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { ISettingRepository } from "../../utils/model";
import { toast } from "react-toastify";
const schema = z.object({
    id: z.number(),
    ruc: z.string(),
    razon_social: z.string(),
    nombre_comercial: z.string(),
    ciudad: z.string(),
    direccion: z.string(),
    telefonos: z.string(),
    email: z.string(),
    numero_establecimientos: z.string(),
    obligado_a_contabilidad: z.enum(["SI", "NO"]),
    contribuyente_regimen_rimpe: z.string(),
    logo: z.string()

});


export default function FormCompany({ data, repository }: { data: Company, repository: ISettingRepository }) {
    type WaterBillData = z.infer<typeof schema>;
    const [imagePreview, setImagePreview] = useState<string | null>(`data:image/png;base64,${data.logo}`);
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted,  },
    } = useForm<WaterBillData>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: data.id,
        }
    });


    const onSubmit = handleSubmit((formData) => {
        setIsLoading(true);
        //const logoBase64 = Buffer.from(imagePreview).toString('base64'); // Convertir Uint8Array a Base64
        const logoBase64 = imagePreview?.split(',')[1] || data.logo;

        repository.updateCompany({ ...formData, logo: logoBase64 }).then((result) => {
            if (result.success) {
                toast.success('Datos actualizada con éxito');
                setIsLoading(false);

            }

        }).catch((e) => {
            toast.error('Algo salió mal, no se pudo actualizar los datos');
            setIsLoading(false);

        });
    });

    return (

        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">RUC:</label>

                        <Controller
                            name="ruc"
                            control={control}
                            defaultValue={data.ruc}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    className="w-full py2 "
                                    radius="sm"
                                    variant="bordered"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.ruc}
                                    errorMessage={errors.ruc?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social:</label>

                        <Controller
                            name="razon_social"
                            control={control}
                            defaultValue={data.razon_social}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.razon_social}
                                    errorMessage={errors.razon_social?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>

                        <Controller
                            name="email"
                            control={control}
                            defaultValue={data.email}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial:</label>

                        <Controller
                            name="nombre_comercial"
                            control={control}
                            defaultValue={data.nombre_comercial}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.nombre_comercial}
                                    errorMessage={errors.nombre_comercial?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad:</label>

                        <Controller
                            name="ciudad"
                            control={control}
                            defaultValue={data.ciudad}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.ciudad}
                                    errorMessage={errors.ciudad?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfonos:</label>

                        <Controller
                            name="telefonos"
                            control={control}
                            defaultValue={data.telefonos}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.telefonos}
                                    errorMessage={errors.telefonos?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección:</label>

                        <Controller
                            name="direccion"
                            control={control}
                            defaultValue={data.direccion}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    type="text"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.direccion}
                                    errorMessage={errors.direccion?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Establecimientos:
                            <span className="text-gray-500 text-xs ml-1">(Formato válido: 001,002,003 etc.)</span>
                        </label>

                        <Controller
                            name="numero_establecimientos"
                            control={control}
                            defaultValue={data.numero_establecimientos}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    variant="bordered"
                                    className="w-full py2"
                                    radius="sm"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.numero_establecimientos}
                                    errorMessage={errors.numero_establecimientos?.message}
                                    value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Obligado a llevar contabilidad:</label>


                        <Controller
                            name="obligado_a_contabilidad"
                            control={control}
                            defaultValue={data.obligado_a_contabilidad}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    selectedKeys={[field.value]}
                                    disallowEmptySelection
                                    isInvalid={errors.obligado_a_contabilidad?.message == undefined ? false : true}
                                    errorMessage={errors.obligado_a_contabilidad?.message}
                                >
                                    <SelectItem key="SI" value="SI">SI</SelectItem>
                                    <SelectItem key="NO" value="NO">NO</SelectItem>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="space-y-3">
                        {/* <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                            <label className="ml-2 text-sm text-gray-700">Contribuyente especial</label>
                        </div> */}

                        {/* <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                            <label className="ml-2 text-sm text-gray-700">Gran Contribuyente</label>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" checked className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                            <label className="ml-2 text-sm text-gray-700">Contribuyente Régimen RIMPE</label>
                        </div> */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">Contribuyente Régimen:</label>


                            <Controller
                                name="contribuyente_regimen_rimpe"
                                control={control}
                                defaultValue={data.contribuyente_regimen_rimpe}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        selectedKeys={[field.value]}
                                        disallowEmptySelection
                                        isInvalid={errors.contribuyente_regimen_rimpe?.message == undefined ? false : true}
                                        errorMessage={errors.contribuyente_regimen_rimpe?.message}
                                    >
                                        <SelectItem key="CONTRIBUYENTE RÉGIMEN RIMPE" value="CONTRIBUYENTE RÉGIMEN RIMPE">Contribuyente Régimen RIMPE</SelectItem>
                                        <SelectItem key="CONTRIBUYENTE NEGOCIO POPULAR - RÉGIMEN RIMPE" value="CONTRIBUYENTE NEGOCIO POPULAR - RÉGIMEN RIMPE">Contribuyente Negocio Popular - Régimen RIMPE</SelectItem>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Image
                                alt="Product image"
                                className="aspect-square  rounded-md object-cover"
                                height="100"
                                src={`${imagePreview}` || "/placeholder.svg"}
                                width="150"
                            />


                            <Controller
                                name="logo"
                                control={control}
                                defaultValue={data.logo || "/placeholder.svg"}
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <Input
                                        {...fieldProps}
                                        className="w-1/2"
                                        name='logo'
                                        placeholder="imagen"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            if (event.target.files && event.target.files[0]) {
                                                const file = event.target.files[0];
                                                const reader = new FileReader();

                                                reader.onloadend = () => {
                                                    // El resultado es una cadena base64
                                                    const base64String = reader.result as string;
                                                    setImagePreview(base64String); // Guardamos la cadena base64 para la vista previa y el envío
                                                };

                                                reader.readAsDataURL(file); // Convierte el archivo a base64
                                            }
                                        }}

                                    />
                                )}
                            />


                        </div>

                        {/* <div className="flex items-center gap-4 ml-6">
                            <label className="flex items-center">
                                <input type="radio" name="exportador" className="h-4 w-4 text-blue-600" checked />
                                <span className="ml-2 text-sm text-gray-700">Habitual</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="exportador" className="h-4 w-4 text-blue-600" />
                                <span className="ml-2 text-sm text-gray-700">No habitual</span>
                            </label>
                        </div> */}

                        {/* <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                            <label className="ml-2 text-sm text-gray-700">Agente de retención</label>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button isLoading={isLoading} type="submit" color="primary">Actualizar Datos</Button>
            </div>
        </form>
    )
}