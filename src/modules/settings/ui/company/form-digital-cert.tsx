'use client'

import { useState } from "react"
import { z } from "zod";
import { Company, DigitalCert } from "../../types";
import { Controller, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { ISettingRepository } from "../../utils/model";
import { toast } from "react-toastify";
import { DateValue, getLocalTimeZone, now, parseAbsoluteToLocal } from "@internationalized/date";
const schema = z.object({
    id: z.number(),
    certificado: z.string(),
    password: z.string(),
    fecha_caducidad: z.preprocess((val) => {
        // Verificar si el valor es nulo o indefinido
        if (val == null) {
            return null;
        }
        // Si el valor ya es un objeto con `calendar`, lo retornamos tal cual
        if (typeof val === 'object' && 'calendar' in val) {
            return val;
        }
        // Si no, intentamos convertirlo a un `DateValue` usando `parseAbsoluteToLocal`
        if (typeof val === 'string' || val instanceof Date) {
            return parseAbsoluteToLocal(new Date(val).toISOString());
        }
        return null;
    }, z.custom<DateValue>((data) => {
        // Verificamos que el dato sea del tipo `DateValue` y que no sea nulo
        return data != null && typeof data === 'object' && 'calendar' in data;
    }, { message: "Debe ingresar la Fecha!" })),

});


export default function FormDigitalCert({ data, repository }: { data: DigitalCert, repository: ISettingRepository }) {
    type WaterBillData = z.infer<typeof schema>;
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitted },
    } = useForm<WaterBillData>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: data.id,
        }
    });


    const convertFileToBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result?.toString().split(",")[1] || "";
                resolve(base64String);
            };

            reader.onerror = () => {
                reject(new Error('Error al leer el archivo'));
            };

            reader.readAsDataURL(file);
        });
    };


    const onSubmit = handleSubmit((formData) => {
        // const file = formData.certificado;


        // Obtiene el resultado como cadena Base64 y elimina el prefijo del tipo MIME

        // Aquí puedes usar `base64String` sin el prefijo MIME

        // const updatedData = {
        //     ...formData,
        //     certificado: base64String, // Asignar el Base64 sin el prefijo MIME
        // };


        // repository.updateDigitalCertificate(formData)
        //     .then((result) => {
        //         if (result.success) {
        //             toast.success("Datos actualizados con éxito");
        //         } else {
        //             toast.error("Algo salió mal, no se pudo actualizar los datos");
        //         }
        //     })
        //     .catch(() => {
        //         toast.error("Algo salió mal, no se pudo actualizar los datos");
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });


        // Convierte el archivo a Data URL
    });

    return (

        <form className="space-y-6" onSubmit={onSubmit}>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>

                        <Controller
                            name="password"
                            control={control}
                            defaultValue={data.password}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="password"
                                    className="w-full py2 "
                                    radius="sm"
                                    variant="bordered"
                                    //max={data?.total_pagar}
                                    isInvalid={!!errors.password}
                                    errorMessage={errors.password?.message}
                                // /value={String(field.value)}

                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">RUC:</label>

                        <Controller
                            name="fecha_caducidad"
                            control={control}
                            defaultValue={parseAbsoluteToLocal(data?.fecha_caducidad.toISOString())}

                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Fecha"
                                    size="sm"
                                    granularity="day"
                                    isInvalid={errors?.fecha_caducidad?.message == undefined ? false : true}
                                    errorMessage={errors?.fecha_caducidad?.message}
                                    showMonthAndYearPickers
                                //defaultValue={data?.fecha == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(data?.fecha.toISOString())}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coloque el archivo .p12 de su certificado digital:</label>
                        <Controller
                            name="certificado"
                            control={control}
                            defaultValue={data.certificado}
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <Input
                                    {...fieldProps}
                                    isInvalid={!!errors?.certificado?.message}
                                    errorMessage={errors?.certificado?.message}
                                    name="certificado"
                                    placeholder="certificado"
                                    type="file"
                                    accept="application/x-pkcs12"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        onChange(file); // Actualizamos el campo con el archivo

                                        if (file) {
                                            const reader = new FileReader();

                                            reader.onloadend = () => {
                                                const result = reader.result as string;

                                                // Eliminamos el prefijo "data:application/x-pkcs12;base64,"
                                                const base64String = result.split(",")[1] || "";
                                                // Aquí puedes guardar el Base64 en un estado o usarlo directamente
                                                onChange(base64String); // Pasamos el Base64 al formulario
                                            };

                                            reader.readAsDataURL(file); // Convertimos el archivo a Base64
                                        }
                                    }}
                                />
                            )}
                        />


                    </div>

                </div>

                {/* Right Column */}

            </div>

            <div className="flex justify-end">
                <Button isLoading={isLoading} type="submit" color="primary">Actualizar Datos</Button>
            </div>
        </form>
    )
}