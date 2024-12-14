"use client"

import React, { use, useEffect } from 'react'
import {
  Button,
  Select,
  SelectItem,
  Textarea,
  Divider,
  RadioGroup,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  DateValue,
} from "@nextui-org/react"
import { CustomRadio } from './CustomRadio'
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from './InputField'
import { useUserStore } from '@/lib/store'
import { getLocalTimeZone, now, parseAbsoluteToLocal } from '@internationalized/date'
import { IWaterMeter } from '@/model/water-meter/WaterMeterRepository'
import { createApiWaterMeter } from '@/services/waterMeterService'
import { toast } from 'react-toastify'
import { useAsyncList } from '@react-stately/data'


const schema = z.object({
  numero_serie: z.string().min(1, { message: "Debe ingresar el numero de serie!" }),
  usuario_id: z.preprocess((val) => {
    return Number(val)
  },
    z.number()),

  // usuario_id: z.string().min(1, { message: "Debe ingresar el numero de serie!" }),

  fecha_instalacion: z.preprocess((val) => {
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
  tipo: z.string(),
  detalle: z.string().min(2, { message: "Debe ingresar el detalle de la instalación!" }),
  estado: z.enum(["Activo", "Inactivo"]),
});

type WaterMeterInputs = z.infer<typeof schema>;

export function FormWaterMeter() {
  const { type, data, closeModal } = useUserStore();
  const repositoryWaterMeter: IWaterMeter = createApiWaterMeter();
  //console.log(type)


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted, },
  } = useForm<WaterMeterInputs>({

    resolver: zodResolver(schema),
    defaultValues: {
      usuario_id: data?.usuario_id,
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



  const onSubmit = handleSubmit((formData) => {

    if (type === "create") {

      repositoryWaterMeter.createWaterMeter(

        { ...formData, fecha_instalacion: formData.fecha_instalacion.toDate(getLocalTimeZone()) }
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

    }

  });

  // useEffect(() => {
  //   if (data?.usuario_id) {

  //     params.set('user', data.nombre);
  //     replace(`${pathname}?${params.toString()}`);
  //   }

  //   return () => {
  //     params.delete('user');
  //   }
  // }, [data, params]);

  //const selectedUser = users.find(user => user.id === data?.usuario_id);

  return (
    <form className='overflow-hidden' onSubmit={onSubmit}>
      <div className="max-w-xl  bg-content1 rounded-lg ">
        {/* Header */}
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Registro de Medidor
          </h3>

          <p className="text-small text-default-500">Complete los datos para registrar un nuevo medidor</p>
        </div>
        <Divider />
        <div className="space-y-4 mt-2">

          <InputField
            label="Número de Serie"
            //placeholder="Ingrese el número de serie"
            size='sm'
            name='numero_serie'
            defaultValue={data?.numero_serie}
            register={register}
            error={errors?.numero_serie}
          />

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
                inputValue={data?.nombre == undefined ? list.filterText : data?.nombre}
                label="Seleccione un usuario"
                placeholder="Busque el usuario..."
                variant="bordered"
                defaultSelectedKey={field.value?.toString()}
                //selectedKey={field.value?.toString()}
               // defaultInputValue={data?.nombre || ''}
                //defaultSelectedKey={data?.usuario_id?.toString()}

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
                    value={String(item.id)}
                    className="capitalize"
                  >
                    {item.nombre}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />

          <Controller
            name="tipo"
            control={control}
            defaultValue={data?.tipo}
            render={({ field }) => (
              <RadioGroup
                {...field}
                size='sm'
                isRequired
                orientation="horizontal"
                isInvalid={errors?.tipo?.message == undefined ? false : true}
                errorMessage={errors?.tipo?.message}
                label="Tipo de medidor">
                <div className="w-full gap-2">
                  <div className='flex flex-wrap justify-around w-full gap-2'>
                    <div >
                      <CustomRadio className='grow' description="base 15m" value="Domestico">
                        Domestico
                      </CustomRadio>
                    </div>
                    <div >
                      <CustomRadio description="base 15m" value="Industrial">
                        Industrial
                      </CustomRadio>
                    </div>
                    <div >
                      <CustomRadio description="base 15m" value="Otro">
                        Otro
                      </CustomRadio>
                    </div>
                  </div>
                </div>
              </RadioGroup>

            )}
          />

          <Controller
            name="fecha_instalacion"
            control={control}
            defaultValue={data?.fecha_instalacion == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(data?.fecha_instalacion.toISOString())}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Fecha"
                size="sm"
                granularity="day"
                isInvalid={errors?.fecha_instalacion?.message == undefined ? false : true}
                errorMessage={errors?.fecha_instalacion?.message}
                showMonthAndYearPickers
              //defaultValue={data?.fecha == null ? now(getLocalTimeZone()) : parseAbsoluteToLocal(data?.fecha.toISOString())}
              />
            )}
          />

          <Controller
            name="detalle"
            control={control}
            defaultValue={data?.detalle}

            render={({ field }) => (
              <Textarea
                isRequired
                {...field}
                size='sm'
                label="Detalles de Instalación"
                placeholder="Ingrese detalles adicionales"
                isInvalid={errors?.detalle?.message == undefined ? false : true}
                errorMessage={errors?.detalle?.message}
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
                <SelectItem key="Activo" value="Activo">Activo</SelectItem>
                <SelectItem key="Inactivo" value="Inactivo">Inactivo</SelectItem>
              </Select>
            )}
          />
        </div>

        {/* Footer */}
        <Button type="submit" isLoading={isSubmitted} color="primary" className="text-white mt-5 rounded-md flex w-full flex-wrap md:flex-nowrap">
          Guardar medidor
        </Button>
      </div>
    </form>
  )
}