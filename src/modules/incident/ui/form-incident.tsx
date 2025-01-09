'use client'

import React, { use, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardHeader, CardBody, Input, Button, Textarea, Autocomplete, AutocompleteItem, Select, SelectItem, DatePicker, DateValue } from "@nextui-org/react";
import ImagePreview from './image-preview';
import { useFormDrawer, useIncidentStore, useUserStore } from '@/lib/store';
import { useAsyncList } from '@react-stately/data';
import { createApiWaterMeter } from '@/services/waterMeterService';
import { getLocalTimeZone, now, parseAbsoluteToLocal } from '@internationalized/date';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { I18nProvider } from '@react-aria/i18n';
import { createApiIncidentRepository } from '../service/service-incident';
import { toast } from 'react-toastify';




const schema = z.object({
    usuario_id: z.preprocess((val) => {
        return Number(val)
    },
        z.number()),


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

    descripcion: z.string().min(2, { message: "Debe ingresar del incidente !" }),

    costo: z.preprocess((val) => {
        return Number(val)
    },
        z.number().min(0, { message: "Debe ingresar el costo del incidente !" })),



    sector_id: z.preprocess((val) => Number(val),
        z.number().min(1, { message: "Sector es obligatorio!" })),
    foto: z.string().min(2, { message: "Debe ingresar la foto del incidente !" }),
});
type IncidentForm = z.infer<typeof schema>;



export const FormIncident = ({ sectors }: { sectors: { value: string, label: string }[] }) => {

    const { incident } = useIncidentStore();

    const { onClose } = useFormDrawer();

    const { type } = useUserStore();

    const [previewImage, setPreviewImage] = useState<string | null>(incident?.foto ? incident.foto.toString() : null);

    const {
        handleSubmit,
        control,
        setValue,

        formState: { errors, isSubmitted },
    } = useForm<IncidentForm>({
        resolver: zodResolver(schema),

    });

    const repositoryWaterMeter = createApiWaterMeter();
    const repositoryIncident = createApiIncidentRepository();


    const onSubmit = async (data: IncidentForm) => {

        try {
            if (type === "create") {
                console.log(data.foto)
                const res = await repositoryIncident.insertIncident({ ...data, fecha: data.fecha.toDate(getLocalTimeZone()) });
                if (res.success) {
                    toast.success('Incidente creado con éxito');
                    onClose();
                } else {
                    toast.error('Algo salió mal, no se pudo crear el incidente');
                }
            } else if (type === "update") {
                console.log(data)
            }

        } catch (error) {
            throw error;
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreviewImage(base64String);
                setValue('foto', base64String);


                // register('foto').onChange({
                //     target: { value: base64String }
                // });
            };
            reader.readAsDataURL(file);
        }
    };

    const list = useAsyncList<{ id: number; nombre: string; cedula: string }>({
        initialFilterText: incident?.nombre_usuario?.toString(),
        async load({ signal, filterText }) {
            const text = filterText || '';
            const res = await repositoryWaterMeter.getUserByName(text);
            if (res.success) {
                return {
                    items: res.data, // res.data debe ser un arreglo de usuarios.
                };
            }
            return { items: [] }; // Asegúrate de devolver al menos un objeto con `items`.
        },
    });


    return (
        <div className="min-h-screen bg-gradient-to-b  p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Detalles del Incidente */}
                    <Card className="p-6 border">
                        <CardHeader className="pb-4 grid">
                            <h2 className="text-2xl font-bold ">Detalles del Incidente</h2>
                            <p className="text-sm text-gray-500">Indique el usuario que reporto el incidente y la fecha del incidente</p>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <Controller
                                name="usuario_id"
                                control={control}
                                defaultValue={incident?.usuario_id}

                                render={({ field }) => {

                                    return <Autocomplete
                                        {...field}
                                        isRequired
                                        size='sm'
                                        items={list.items}

                                        // defaultItems={
                                        //     [{
                                        //         nombre: incident?.nombre_usuario?.toString(),
                                        //         id: incident?.usuario_id,
                                        //         cedula: ''
                                        //     }]
                                        // }



                                        isLoading={list.isLoading}
                                        inputValue={
                                            list.filterText
                                        }
                                        //inputValue={incident?.nombre_usuario == null ? list.filterText : incident?.nombre_usuario?.toString()}
                                        //defaultInputValue={defaulUser?.toString()}



                                        label="Seleccione un usuario"
                                        placeholder="Busque el usuario..."
                                        variant="bordered"
                                        //defaultSelectedKey={incident?.usuario_id?.toString()}
                                        defaultSelectedKey={incident?.usuario_id?.toString()}

                                        defaultInputValue='lkahdlaskdhsalk'

                                        //selectedKey={field.value?.toString()}
                                        //defaultInputValue={data?.nombre || ''}
                                        // isInvalid={errors?.usuario_id?.message ? true : false}
                                        onInputChange={list.setFilterText}
                                        errorMessage={errors?.usuario_id?.message}
                                        onSelectionChange={(selected) => {
                                            field.onChange(Number(selected));
                                        }}
                                    >
                                        {(item) => (
                                            <AutocompleteItem
                                                key={item.id}
                                                //value={String(item.id)}
                                                className="capitalize"
                                            >
                                                {item.nombre}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                }}
                            />

                            <Controller
                                name="fecha"
                                control={control}
                                defaultValue={incident?.fecha == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(incident?.fecha.toISOString())}
                                render={({ field }) => (
                                    <I18nProvider locale="es">
                                        <DatePicker
                                            {...field}
                                            label="Fecha de incidente"
                                            size="sm"
                                            granularity="day"
                                            isInvalid={errors?.fecha?.message == undefined ? false : true}
                                            errorMessage={errors?.fecha?.message}
                                            showMonthAndYearPickers
                                        //defaultValue={data?.fecha == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(data?.fecha.toISOString())}
                                        />
                                    </I18nProvider>



                                )}
                            />
                            <Controller
                                name="costo"
                                control={control}
                                defaultValue={incident?.costo}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        label="Costo"
                                        size="sm"
                                        isInvalid={errors?.costo?.message == undefined ? false : true}
                                        errorMessage={errors?.costo?.message}
                                        value={field.value?.toString()}
                                    />
                                )}

                            />




                        </CardBody>
                    </Card>

                    {/* Ubicación y Estado */}
                    <Card className="p-6 border">
                        <CardHeader className="pb-4 grid">
                            <h2 className="text-2xl font-bold ">Ubicación y Descripcion</h2>

                            <p className="text-sm text-gray-500">Indique el sector del incidente</p>
                        </CardHeader>
                        <CardBody className="space-y-4">

                            <Controller
                                name="sector_id"
                                control={control}
                                defaultValue={incident?.sector_id}
                                //defaultValue={data?.sector_id}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isRequired
                                        defaultSelectedKeys={[String(field.value)]}

                                        disallowEmptySelection
                                        isInvalid={errors.sector_id?.message == undefined ? false : true}
                                        errorMessage={errors.sector_id?.message}
                                    >
                                        {
                                            sectors.map((item, index) => {
                                                return (
                                                    <SelectItem key={item.value} >{item.label}</SelectItem>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            />

                            <Controller
                                name="descripcion"
                                control={control}
                                defaultValue={incident?.descripcion}

                                render={({ field }) => (
                                    <Textarea
                                        isRequired
                                        {...field}
                                        label="Motivo de sesion"
                                        placeholder="Ingrese detalles adicionales"
                                        isInvalid={errors?.descripcion?.message == undefined ? false : true}
                                        errorMessage={errors?.descripcion?.message}
                                        minRows={2}
                                        maxRows={4}
                                    />
                                )}
                            />




                        </CardBody>
                    </Card>
                </div>

                {/* Evidencia Fotográfica */}
                <Card className="p-6 border">
                    <CardHeader className="pb-4 grid">
                        <h2 className="text-2xl font-bold ">Evidencia Fotográfica</h2>
                        <p className="text-sm text-gray-500">Adjunte una imagen del incidente</p>
                    </CardHeader>
                    <CardBody>
                        <ImagePreview imageData={previewImage} />


                        <Controller
                            name="foto"
                            control={control}
                            defaultValue={incident?.foto}

                            render={({ field }) => (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-primary file:text-white
                                            hover:file:bg-primary/80"
                                    isInvalid={errors?.foto?.message == undefined ? false : true}
                                    errorMessage={errors?.foto?.message}

                                />
                            )}
                        />


                        {/* <input
                            
                            type="file"
                            accept="image/*"

                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/80"
                        /> */}
                    </CardBody>
                </Card>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        className="px-8"
                    >
                        Registrar Incidente
                    </Button>
                </div>
            </form>
        </div>
    );
};

