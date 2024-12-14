'use client'
import { useFormDrawer, useUserStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, now, parseAbsoluteToLocal } from "@internationalized/date";
import {

    DateValue,
    Button,
    Select,
    SelectItem,
    Textarea,
    DatePicker,
    Divider,
    Autocomplete,
    AutocompleteItem,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useAsyncList } from "@react-stately/data";
import { z } from "zod";
import { createApiWaterMeter } from "@/services/waterMeterService";
import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import DrawerCustom from "@/components/modal/drawer-custom";
import { createApiMeetingRepository } from "../service/service-meeting";
import { toast } from "react-toastify";

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
    motivo: z.string().min(2, { message: "Debe ingresar el detalle de la instalación!" }),
    estado: z.enum(["pendiente", "pagado"]),
});
type MeetingInputs = z.infer<typeof schema>;

export default function FormMeeting() {


    const repositoryWaterMeter: IWaterMeter = createApiWaterMeter();
    const { onClose } = useFormDrawer()

    const repository = createApiMeetingRepository();
    const { data, type } = useUserStore();
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitted, },
    } = useForm<MeetingInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            usuario_id: data?.usuario_id,
        }
    });

    const onSubmit = handleSubmit((formData) => {
        if (type === "create") {
            repository.insertMeeting({ ...formData, fecha: formData.fecha.toDate(getLocalTimeZone()) }).then((res) => {
                if (res.success) {
                    toast.success('Sesión asignada con éxito');
                    onClose()
                } else {
                    toast.error('Algo salió mal,  no se pudo asignar la sesión');
                }
            });
        } else {
            repository.updateMeeting({ ...formData, fecha: formData.fecha.toDate(getLocalTimeZone()), multa_id: data?.id }).then((res) => {
                if (res.success) {
                    toast.success('Sesión actualizada con éxito');
                    onClose()
                } else {
                    toast.error('Algo salió mal,  no se pudo actualizar la sesión');
                }
            });
        }



    });

    let list = useAsyncList<{ id: number; nombre: string; cedula: string }>({
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

        <DrawerCustom tittle="Registro de sesion" >
            <form className='overflow-hidden' onSubmit={onSubmit}>
                <div className="max-w-xl  bg-content1 rounded-lg ">
                    {/* Header */}
                    <div className="grid gap-4">

                        <p className="text-small text-default-500">Complete estos campos para registrar una sesion por usuario</p>
                    </div>
                    <Divider />
                    <div className="space-y-4 mt-4">
                        <Controller
                            name="usuario_id"
                            control={control}
                            defaultValue={data?.usuario_id}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    isRequired
                                    size='sm'
                                    items={list.items}
                                    isLoading={list.isLoading}
                                    //inputValue={list.filterText}
                                    inputValue={data?.nombre == undefined ? list.filterText : data?.nombre}

                                    label="Seleccione un usuario"
                                    placeholder="Busque el usuario..."
                                    variant="bordered"
                                    defaultSelectedKey={data?.usuario_id?.toString()}
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
                            )}
                        />


                        <Controller
                            name="fecha"
                            control={control}
                            defaultValue={data?.fecha == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(data?.fecha_instalacion.toISOString())}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Fecha de sesion"
                                    size="sm"
                                    granularity="day"
                                    isInvalid={errors?.fecha?.message == undefined ? false : true}
                                    errorMessage={errors?.fecha?.message}
                                    showMonthAndYearPickers
                                //defaultValue={data?.fecha == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(data?.fecha.toISOString())}
                                />
                            )}
                        />

                        <Controller
                            name="motivo"
                            control={control}
                            defaultValue={data?.motivo}

                            render={({ field }) => (
                                <Textarea
                                    isRequired
                                    {...field}
                                    label="Motivo de sesion"
                                    placeholder="Ingrese detalles adicionales"
                                    isInvalid={errors?.motivo?.message == undefined ? false : true}
                                    errorMessage={errors?.motivo?.message}
                                    minRows={2}
                                    maxRows={4}
                                />
                            )}
                        />

                        <h3 className="text-default-500 text-small">Estado</h3>
                        <Controller
                            name="estado"
                            control={control}
                            defaultValue={data?.estado}

                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isRequired
                                    selectedKeys={[field.value]}
                                    className="max-w-[150px]"
                                    disallowEmptySelection
                                    isInvalid={errors.estado?.message == undefined ? false : true}
                                    errorMessage={errors.estado?.message}
                                >
                                    <SelectItem  key="pendiente" value="pendiente">Pendiente</SelectItem>
                                    <SelectItem key="pagado" value="pagado">Pagado</SelectItem>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Footer */}
                    <Button type="submit" color="primary" className="text-white mt-5 rounded-md flex w-full flex-wrap md:flex-nowrap">
                        Guardar
                    </Button>
                </div>
            </form>
        </DrawerCustom>




    )
}
