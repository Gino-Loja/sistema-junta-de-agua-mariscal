
'use client'

import { useUserStore } from "@/lib/store";
import { InvoiceGenerationRequest } from "@/modules/invoice/types";
import { Button, Card, CardBody, CardHeader, Chip, DatePicker, Input, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Textarea } from "@nextui-org/react";
import { FileDown } from "lucide-react";
import { date } from "zod";

export default function InvoicePage() {


    const { data } = useUserStore();

    const invoice = data.factura_json as InvoiceGenerationRequest

    const date = new Date(data.fecha_emision);

    console.log(invoice)
    const paymentMethods = [
        { id: 1, codigo: '01', descripcion: 'SIN UTILIZACION DEL SISTEMA FINANCIERO' },
        { id: 2, codigo: '15', descripcion: 'COMPENSACIÓN DE DEUDAS' },
        { id: 3, codigo: '16', descripcion: 'TARJETA DE DÉBITO' },
        { id: 4, codigo: '17', descripcion: 'DINERO ELECTRÓNICO' },
        { id: 5, codigo: '18', descripcion: 'TARJETA PREPAGO' },
        { id: 6, codigo: '19', descripcion: 'TARJETA DE CRÉDITO' },
        { id: 7, codigo: '20', descripcion: 'OTROS CON UTILIZACION DEL SISTEMA FINANCIERO' },
        { id: 8, codigo: '21', descripcion: 'ENDOSO DE TÍTULOS' }
    ];




    return (
        <div className="flex flex-col gap-4 px-4 pb-4">
            <Card radius="sm" shadow="sm" className="w-full mx-auto">
                <CardHeader className="bg-primary">
                    <h3 className="text-primary-foreground">Documento Electrónico #{`${ invoice.documentInfo.emissionPoint}-${invoice.documentInfo.establishment}-${invoice.documentInfo.sequential}`}
                    </h3>
                </CardHeader>
                <CardBody className="p-6">
                    <form className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Left Column */}
                            <div className="grid gap-6 ">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Fecha */}
                                    <div className="flex items-center gap-4">
                                        <label className="font-medium">
                                            Fecha:
                                        </label>

                                        <span>{date.toLocaleDateString()}</span>

                                    </div>

                                    {/* Cliente */}
                                    <div className="flex gap-2 items-center ">
                                        <label className="font-medium">
                                            Cliente:
                                        </label>

                                        <Input
                                            id="cliente"
                                            readOnly
                                            value={invoice.customer.customerName}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    {/* Establecimiento */}
                                    <div className="flex items-center gap-4">
                                        <label className="font-medium">
                                            Establecimiento:
                                        </label>
                                        <Input
                                            id="establecimiento"
                                            readOnly
                                            value={invoice.documentInfo.establishment}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    {/* Punto de Emisión */}
                                    <div className="flex items-center gap-4">
                                        <label className="font-medium">
                                            P. Emisión:
                                        </label>
                                        <Input
                                            readOnly
                                            value={invoice.documentInfo.emissionPoint}
                                            className="max-w-xs"
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="font-medium">
                                        # de Documento:
                                    </label>
                                    <Input
                                        id="number-invoice"
                                        readOnly
                                        value={`${invoice.documentInfo.emissionPoint}-${invoice.documentInfo.establishment}-${invoice.documentInfo.sequential}`}
                                        className="max-w-xs"
                                    />

                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="font-medium">
                                        Clave de Acceso:
                                    </label>
                                    <Input
                                        id="number-invoice"
                                        readOnly
                                        value={data.clave_acceso}
                                    />

                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <label className="font-medium">
                                        Estado:
                                    </label>
                                    <Chip className="capitalize"
                                        color={"success"}
                                        size={'sm'}

                                        radius="sm"
                                        variant="bordered">
                                        {data.estado}
                                    </Chip>

                                </div>


                            </div>
                        </div>


                    </form>
                </CardBody>
            </Card>
            <div className="container space-y-4">

                <Tabs radius="sm" variant="solid" className="w-full">
                    <Tab title="servicios">
                        <Card>
                            <CardBody className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b text-sm">
                                                <th className="p-2 text-left w-32">Cant.</th>
                                                <th className="p-2 text-left w-80">Cuenta</th>
                                                <th className="p-2 text-left w-32">Valor U.</th>
                                                <th className="p-2 text-left w-32">IVA</th>
                                                {/* <th className="p-2 text-left w-24">% ICE</th>
                                                <th className="p-2 text-left w-32">Ret. IR</th>
                                                <th className="p-2 text-left w-32">Ret. IVA</th> */}
                                                <th className="p-2 text-left w-32">% Desc.</th>
                                                <th className="p-2 text-left w-32">Desc.</th>
                                                <th className="p-2 text-left w-32">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {invoice.details.map((detail, index) => (
                                                <tr key={index} className="border-b">

                                                    <td className="p-2">
                                                        <Input

                                                            value={detail.quantity.toString()}
                                                            className="h-8"
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            value={detail.productName}
                                                            className="h-8"
                                                            readOnly
                                                        //onChange={(e) => updateDetailField(index, 'discount', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    {/* valor u */}
                                                    <td className="p-2">
                                                        <Input
                                                            value={detail.price.toString()}
                                                            className="h-8"
                                                        />
                                                    </td>
                                                    {/* IVA*/}
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.rate.toString()}
                                                            className="h-8"
                                                            readOnly
                                                        //onChange={(e) => updateDetailField(index, 'discount', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    {/* % Desc*/}
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.discount.toString()}
                                                            defaultValue="0.00"
                                                            className="h-8"
                                                        //onChange={(e) => updateDetailField(index, 'discount', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    {/* % Desc total*/}

                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.discount.toString()}
                                                            className="h-8"
                                                            readOnly
                                                        />

                                                    </td>
                                                    {/*  Desc subTotal*/}


                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.subTotal.toString()}
                                                            className="h-8"
                                                            readOnly
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>



                            </CardBody>
                        </Card>
                    </Tab>


                    <Tab title="formas-pago">
                        <Card className="w-1/2">
                            <CardHeader className="px-6" >

                                <h3 className="text-lg font-semibold flex items-center gap-2">Metodos de Pago</h3>
                            </CardHeader>
                            <CardBody className="px-6">

                                <Input
                                    id="number-invoice"
                                    readOnly
                                    value={paymentMethods.find((item) => item.codigo === invoice.payment.paymentMethodCode)?.descripcion}
                                />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>

            </div>

            <div className="container">
                <Card className="w-full p-6">
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div >

                            <div className="space-y-3 border border-default-200 rounded-md p-3  ">
                                <h3 className="text-md font-semibold flex items-center gap-2">Descripcion</h3>

                                {
                                    invoice.additionalInfo.map((info, index) => (
                                        <div key={index} className="text-sm ">
                                            <span className="font-medium"></span> {info.value}
                                        </div>
                                    ))
                                }
                            </div>


                        </div>

                        <div className="space-y-3 border border-default-200 rounded-md p-3  ">
                            <div className="flex justify-end items-center gap-3">
                                <span className="text-sm">Subtotal 15%:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" defaultValue="0.00" className="w-32" />

                                </div>
                            </div>
                            <div className="flex justify-end items-center  gap-3">
                                <span className="text-sm">Subtotal 5%:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" defaultValue="0.00" className="w-32" />
                                </div>
                            </div>
                            <div className="flex justify-end items-center  gap-3">
                                <span className="text-sm">Subtotal 0%:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" value={invoice.payment.totalWithoutTaxes} defaultValue="0.00" className="w-32" />
                                </div>
                            </div>
                            <div className="flex justify-end items-center  gap-3">
                                <span className="text-sm">Descuento:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" defaultValue="0.00" className="w-32 font-medium" />
                                </div>
                            </div>
                            <div className="flex justify-end items-center  gap-3">
                                <span className="text-sm">IVA 15%:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" defaultValue="0.00" className="w-32 " />
                                </div>
                            </div>
                            <div className="flex justify-end items-center  gap-3">
                                <span className="text-sm">IVA 5%:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" defaultValue="0.00" className="w-32" />
                                </div>
                            </div>

                            <div className="flex justify-end items-center ">
                                <span className="text-sm">Total:</span>
                                <div className="flex items-center gap-1">
                                    <span>$</span>
                                    <Input radius="sm" readOnly type="number" value={invoice.payment.totalAmount} defaultValue="0.00" className="w-32" />
                                </div>
                            </div>
                        </div>


                    </div>
                </Card>
            </div>


        </div>
    );



}
