"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { Button, Input } from "@nextui-org/react";
import { useUserStore } from "@/lib/store";
import { DatePicker } from "@nextui-org/react";
import {  now, parseAbsoluteToLocal, DateValue } from "@internationalized/date";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { toast } from "react-toastify";
import { useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { TIME_ZONE } from "@/model/Definitions";

// Definir el esquema de validación usando Zod
//const schemaDate:DateValue = 
const schema = z.object({

    id: z.number().optional(),
    fecha: z.preprocess((val) => {
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
    //consumo: z.number().nonnegative({ message: "Consumo debe ser positivo!" }).nullable().optional(),
    //lectura_anterior: z.number().nonnegative({ message: "Lectura anterior debe ser positiva!" }).nullable().optional(),
    lectura: z.preprocess((val) => {
        return Number(val)
    },
        z.number().min(1, { message: "La lectura es requerida!" })),

});

type Inputs = z.infer<typeof schema>;

export default function FormMacro() {
    //const repositoryLectures: ILecturesRepository = createApiLecturesRepository();
    const [isLoading, setIsLoading] = useState(false);
    const { type, data, closeModal } = useUserStore();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitted },

    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: data?.id
        },
    });

    const repositoryLectures: ILecturesRepository = createApiLecturesRepository();

    const onSubmit = handleSubmit((formData,) => {
        setIsLoading(true);
        if (type === "create") {

            repositoryLectures.insertMeasurementMacro(
                formData.fecha.toDate(TIME_ZONE), formData.lectura
            ).then((res) => {
                if (res.success) {
                    closeModal();
                    setIsLoading(false);
                    toast.success('Lectura guardada con éxito');
                }
            }).catch((err) => {
                closeModal();
                setIsLoading(false);
                toast.error('Algo salió mal, no se pudo guardar la lectura', err);
            });;

        } else if (type === "update") {
            repositoryLectures.updateMeasurementMacro(
                formData.fecha.toDate(TIME_ZONE), formData.lectura, formData.id!!
            ).then((res) => {
                if (res.success) {
                    closeModal();
                    toast.success('Lectura actualizada con éxito');
                }
            }).catch((err) => {
                closeModal();
                toast.error('Algo salió mal, no se pudo actualizar la lectura', err);
            });
        }
    });
    return (
        <>
            <form className="space-y-4 md:space-y-3 mb-2 mt-2" onSubmit={onSubmit}>
                <h1 className="text-xl font-semibold">Gestión de MacroMedidor</h1>


                <span className="text-xs text-gray-400 font-medium">
                    Datos de lectura
                </span>
                {/* <InputField

                    label="Fecha"
                    name="fecha"
                    type="date"
                    register={register}
                    defaultValue={data?.fecha}

                    error={errors?.fecha}
                /> */}

                {/* <DatePicker {...register('fecha')} label="Birth date" className="max-w-[284px]" /> */}
                <Controller
                    name="fecha"

                    control={control}
                    defaultValue={data?.fecha == null ? now(TIME_ZONE) : parseAbsoluteToLocal(data?.fecha.toISOString())}
                    render={({ field }) => (
                        <I18nProvider

                            locale="es">

                            <DatePicker
                                {...field}
                                label="Fecha"
                                hideTimeZone
                                showMonthAndYearPickers
                                size="sm"
                                isInvalid={errors?.fecha?.message == undefined ? false : true}
                                errorMessage={errors?.fecha?.message}
                            />
                        </I18nProvider>

                    )}
                />
                <Input
                    isDisabled
                    label="Consumo"
                    name="consumo"
                    type="number"
                    defaultValue={data?.consumo}
                    size="sm"
                />


                <InputField
                    label="Lectura lectura"
                    name="lectura"
                    register={register}
                    error={errors?.lectura}
                    type="number"

                    defaultValue={data?.lectura}
                    size="sm"
                />



                <Button isLoading={isLoading} type="submit" color="primary" className="text-white mt-5 rounded-md flex w-full flex-wrap md:flex-nowrap">
                    Guardar Lectura
                </Button>
            </form>
        </>
    );
}
