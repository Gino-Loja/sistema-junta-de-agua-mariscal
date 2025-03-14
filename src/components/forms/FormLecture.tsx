"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { Button, Input } from "@nextui-org/react";
import { useUserStore } from "@/lib/store";
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, now, parseAbsoluteToLocal, DateValue } from "@internationalized/date";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { toast } from "react-toastify";
import { I18nProvider } from "@react-aria/i18n";
import { TIME_ZONE } from "@/model/Definitions";

// Definir el esquema de validación usando Zod
//const schemaDate:DateValue = 
const schema = z.object({
    // fecha: z.preprocess((val) => {
    //     console.log(val)
    //     return String(val)
    // }, z.string().datetime({ offset: true, message: "Fecha no válida!", local: true })),
    // fecha: z.object().string().datetime().transform((str) => {

    //     console.log(str)
    //     return  now(TIME_ZONE)
    // }),
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
    lectura_actual: z.preprocess((val) => {
        return Number(val)
    },
        z.number().min(1, { message: "La lectura es requerida!" })),
    // exceso: z.number().nonnegative({ message: "Exceso debe ser positivo!" }).nullable(),
    //usuario_id: z.number().min(1, { message: "Usuario es obligatorio!" }),
    //nombre_usuario: z.string().min(1, { message: "Nombre de usuario es obligatorio!" }),
    // numero_serie: z.string().min(1, { message: "Número de serie es obligatorio!" }),

    medidor_id: z.preprocess((val) => {
        return Number(val)
    },
        z.number().min(1)),
});

type Inputs = z.infer<typeof schema>;

export default function FormAddLecture() {
    //const repositoryLectures: ILecturesRepository = createApiLecturesRepository();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitted },

    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });
    const { type, data, closeModal } = useUserStore();

    const repositoryLectures: ILecturesRepository = createApiLecturesRepository();


    const onSubmit = handleSubmit((formData,) => {
        // Lógica para manejar la creación o actualización de la lectura
        //console.log(formData)

        //console.log(formData.fecha.toDate(TIME_ZONE))


        if (type === "create") {

            repositoryLectures.createLecture(
                { fecha: formData.fecha.toDate(TIME_ZONE), lectura_actual: formData.lectura_actual, medidor_id: formData.medidor_id, }
            ).then((res) => {
                if (res.success) {
                    closeModal();
                    toast.success('Lectura creada con éxito');
                } else {
                    closeModal();
                    toast.error('Algo salió mal, ya tienes lectura de ese mes');
                }
            });
        } else if (type === "update") {
            repositoryLectures.updateLecture({ fecha: formData.fecha.toDate(TIME_ZONE), lectura_actual: formData.lectura_actual, medidor_id: formData.medidor_id, }, data?.id).then((res) => {
                if (res.success) {
                    closeModal();
                    toast.success('Lectura actualizada con éxito');

                } else {
                    closeModal();
                    toast.error('Algo salió mal, no se pudo actualizar la lectura');
                }
            });
        }
    });
    return (
        <>
            <form className="space-y-4 md:space-y-3 mb-2 mt-2" onSubmit={onSubmit}>
                <h1 className="text-xl font-semibold">Gestión de Lecturas</h1>

                <span className="text-xs text-gray-400 font-medium">
                    Informacion Personal
                </span>
                <Input
                    label="Nombres y Apellidos"
                    name="nombre"
                    defaultValue={data?.nombre}
                    isDisabled
                />
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
                            size="sm"
                            granularity="day"
                            isInvalid={errors?.fecha?.message == undefined ? false : true}
                            errorMessage={errors?.fecha?.message}
                            showMonthAndYearPickers
                        //defaultValue={data?.fecha == null ? now(TIME_ZONE) : parseAbsoluteToLocal(data?.fecha.toISOString())}
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
                <Input
                    isDisabled
                    label="Lectura Anterior"
                    name="lectura_anterior"
                    type="number"
                    defaultValue={data?.lectura_anterior}
                    size="sm"
                />

                <InputField
                    label="Lectura Actual"
                    name="lectura_actual"
                    register={register}
                    error={errors?.lectura_actual}
                    type="number"

                    defaultValue={data?.lectura_actual}
                    size="sm"
                />
                <Input
                    label="Exceso"
                    name="exceso"
                    type="number"
                    isDisabled
                    defaultValue={data?.exceso}
                    size="sm"
                />
                <span className="text-xs text-gray-400 font-medium">
                    Datos del Medidor
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



                    <Controller
                        name="medidor_id"
                        control={control}
                        defaultValue={Number(data?.medidor_id)}

                        render={({ field }) => (
                            <Input
                                label="Codigo de Medidor"
                                {...field}
                                //name="medidor_id"
                                type="number"
                                isDisabled
                                value={String(field.value)} 
                                size="sm"
                            />
                        )}
                    />



                    <Input
                        label="Número de Serie"
                        name="numero_serie"
                        defaultValue={data?.numero_serie}

                        size="sm"
                        isDisabled
                    />
                </div>

                <Button isDisabled={isSubmitted} type="submit" color="primary" className="text-white mt-5 rounded-md flex w-full flex-wrap md:flex-nowrap">
                    Guardar Lectura
                </Button>
            </form>
        </>
    );
}
