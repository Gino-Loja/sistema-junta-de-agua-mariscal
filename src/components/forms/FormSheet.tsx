"use client"
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectItem, Button, Divider } from "@nextui-org/react";
import { toast } from "react-toastify";
import { ISheetsRepository } from "@/model/sheets-repository/sheetsRepository";
import { createApiSheetsRepository } from "@/services/serviceSheets";
import { useUserStore } from '@/lib/store';




export default function FormAddSheet() {
  const { type, data, closeModal } = useUserStore();

  const schema = z.object({
    id: z.number(),
    valor_abonado: z.preprocess((val) => Number(val),
      z.number()
      .min(0, { message: "Coloca un valor positivo" })
      .max(data?.total_pagar, { message: "El valor no puede exceder el total a pagar" })),
    estado: z.enum(["pendiente", "pagada"]),
  });
  type WaterBillData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<WaterBillData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id,
    }
  });

  //console.log(data)

  const repositorySheets: ISheetsRepository = createApiSheetsRepository();
  const onSubmit = handleSubmit((formData) => {


    repositorySheets.updateSheet(formData).then((res) => {
      if (res.success) {
        toast.success('Planilla actualizada con éxito');
        closeModal();
      } else {
        toast.error(`Algo salió mal, no se pudo actualizar la planilla`);
        closeModal();

      }
    });
  });
  return (
    <div >
      <div className="flex flex-row items-start justify-between">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Planilla {data?.id}
          </h3>

          <p className="text-small text-default-500">Fecha: {data?.fecha_emision.toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="bordered">
            Ver mis planillas
          </Button>
        </div>
      </div>
      <div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-3">
            <h4 className="font-semibold">Detalles de la Planilla</h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-default-500">Consumo</span>
                <span>{data?.consumo} m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-default-500">Exceso</span>
                <span>{data?.exceso} m³</span>
              </div>
            </div>
          </div>
          <Divider />
          <div className="grid gap-3">
            <div className="flex justify-between">
              <span className="text-default-500">Total Consumo</span>
              <span>${data?.total_consumo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">Total Exceso</span>
              <span>${data?.total_exceso.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total a Pagar</span>
              <span>${data?.total_pagar.toFixed(2)}</span>
            </div>
          </div>
          <Divider />
          <div className="grid gap-3">
            <h4 className="font-semibold">Información del Usuario</h4>
            <div className="flex justify-between">
              <span className="text-default-500">Nombre</span>
              <span>{data?.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">Medidor ID</span>
              <span>{data?.medidor_id}</span>
            </div>
          </div>
          <Divider />
          <div className="grid gap-3">
            <h4 className="font-semibold">Información de Pago</h4>
            <div className="flex justify-between items-center">
              <span className="text-default-500">Valor Abonado</span>
              <Controller
                name="valor_abonado"
                control={control}
                defaultValue={data?.valor_abonado.toFixed(2)}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    className="max-w-[120px]"
                    //max={data?.total_pagar}
                    isInvalid={!!errors.valor_abonado}
                    errorMessage={errors.valor_abonado?.message}
                    value={String(field.value)}

                  />
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-500">Estado</span>
              <Controller
                name="estado"
                control={control}
                defaultValue={data?.estado}

                render={({ field }) => (
                  <Select
                    {...field}
                    selectedKeys={[field.value]}
                    className="max-w-[120px]"
                    disallowEmptySelection
                    isInvalid={errors.estado?.message == undefined ? false : true}
                    errorMessage={errors.estado?.message}
                  >
                    <SelectItem key="pendiente" value="pendiente">Pendiente</SelectItem>
                    <SelectItem key="pagada" value="pagado">Pagado</SelectItem>
                  </Select>
                )}
              />
            </div>
          </div>
          <Button type="submit" color="primary" isLoading={isSubmitted} fullWidth>
            Actualizar Planilla
          </Button>
        </form>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-small text-default-500">
          Actualizado: {data?.fecha_actualizacion !== null ? data?.fecha_actualizacion.toLocaleDateString() : data?.fecha_emision.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}