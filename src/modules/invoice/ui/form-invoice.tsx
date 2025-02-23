'use client'
import { useFormDrawer, useUserStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, now, parseAbsoluteToLocal, parseDate } from "@internationalized/date";
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
    Card,
    CardHeader,
    CardBody,
    Input,
    Tabs,
    Tab,
} from "@nextui-org/react";
import { Controller, set, useForm } from "react-hook-form";
import { useAsyncList } from "@react-stately/data";
import { z } from "zod";
import { createApiWaterMeter } from "@/services/waterMeterService";
import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import { toast } from "react-toastify";
import { Check, Plus, Trash2 } from "lucide-react";
import { Details, InformationCompany, PaymentMethod, Service } from "../types";
import { useState } from "react";
import { IInvoiceRepository } from "../utils/model";
import { I18nProvider } from "@react-aria/i18n";
import React from "react";

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

const createEmptyDetail = (): Details => ({
    productCode: '',
    productName: '',
    description: '',
    quantity: 1,
    price: 0.00,
    discount: 0.00,
    subTotal: 0.00,
    taxTypeCode: "2",
    percentageCode: "0",
    rate: 0.00,
    taxableBaseTax: 0.00,
    taxValue: 0.00,
});

type DocumentInfo = {
    accessKey: string;
    businessName: string;
    commercialName: string;
    businessAddress: string;
    dayEmission: string;
    monthEmission: string;
    yearEmission: string;
    codDoc: '01';
    rucBusiness: string;
    environment: string;
    typeEmission: string;
    establishment: string;
    establishmentAddress: string;
    emissionPoint: string;
    sequential: string;
    obligatedAccounting: string;
    contribuyenteRimpe: string;
};

export default function FormInvoice({ repositoryService,
    informationCompany,
    paymentMethods,
    numberInvoice
}: {
    repositoryService: IInvoiceRepository,
    informationCompany: InformationCompany,
    paymentMethods: PaymentMethod[],
    numberInvoice: number
}) {


    const repositoryWaterMeter: IWaterMeter = createApiWaterMeter();
    const [details, setDetails] = useState<Details[]>([]);
    const [description, setDescription] = useState<string>("");
    const [paymentMethodCode, setPaymentMethodCode] = useState<string>("20");


    const [dateInvoice, setDateInvoice] = React.useState<DateValue | null>(() => {
        // Obtener la fecha y hora actuales en la zona horaria local
        const localNow = now(getLocalTimeZone());
        // Convertir a un formato ISO 8601 compatible sin la zona horaria entre corchetes
        const isoString = localNow.toString().split("[")[0]; // Remover la parte de la zona horaria extendida
        // Convertir a un valor DateValue local
        return parseAbsoluteToLocal(isoString);
    });

    const [currentUser, setCurrentUser] = useState<Record<number, string>>({});


    const sendDataInvoice = async () => {
        if (!currentUser || !('id' in currentUser)) {
            toast.error('No hay un usuario seleccionado');
            return;
        }

        const user = currentUser as { id: number, nombre: string, cedula: string };
        const body = createInvoice();

        // Validaciones básicas antes de enviar
        if (details.length === 0) {
            toast.error('Debe agregar al menos un detalle a la factura');
            return;
        }

        if (!description.trim()) {
            toast.error('Debe agregar una descripción');
            return;
        }

        try {
            const id = toast.loading("Por favor espere, se está generando la factura");

            const response = await fetch(`https://api.jaapmariscalsucre.site/invoice/sign?usuario_id=${user.id}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body), // Reemplaza con tu lógica para crear la factura
            });



            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json();
            toast.update(id, { render: "Factura enviada y guardada con éxito", type: "success", isLoading: false, autoClose: 2000 });

        } catch (error) {
            console.error('Error al enviar la factura:', error);
            toast.error('Error al enviar la factura');
        }
    };

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


    const createEmptydocumentInfo = (): DocumentInfo => (

        {
            accessKey: informationCompany.ruc,
            businessName: informationCompany.razon_social,
            commercialName: informationCompany.nombre_comercial,
            businessAddress: informationCompany.direccion,
            dayEmission: dateInvoice?.day.toString().padStart(2, '0')!!,
            monthEmission: dateInvoice?.month.toString().padStart(2, '0')!!,
            yearEmission: dateInvoice?.year.toString()!!,
            codDoc: '01',
            rucBusiness: informationCompany.ruc,
            environment: '1',
            typeEmission: '1',
            establishment: informationCompany.numero_establecimientos,
            establishmentAddress: informationCompany.direccion,
            emissionPoint: '001',
            sequential: numberInvoice.toString(),
            obligatedAccounting: informationCompany.obligado_a_contabilidad,
            contribuyenteRimpe: informationCompany.contribuyente_regimen_rimpe
        }

    );

    // const onSubmit = handleSubmit((formData) => {
    //     // if (type === "create") {
    //     //     repository.insertMeeting({ ...formData, fecha: formData.fecha.toDate(getLocalTimeZone()) }).then((res) => {
    //     //         if (res.success) {
    //     //             toast.success('Sesión asignada con éxito');
    //     //             onClose()
    //     //         } else {
    //     //             toast.error('Algo salió mal,  no se pudo asignar la sesión');
    //     //         }
    //     //     });
    //     // } else {
    //     //     repository.updateMeeting({ ...formData, fecha: formData.fecha.toDate(getLocalTimeZone()), multa_id: data?.id }).then((res) => {
    //     //         if (res.success) {
    //     //             toast.success('Sesión actualizada con éxito');
    //     //             onClose()
    //     //         } else {
    //     //             toast.error('Algo salió mal,  no se pudo actualizar la sesión');
    //     //         }
    //     //     });
    //     // }



    // });
    let list = useAsyncList<{ id: number; nombre: string; cedula: string }>({
        async load({ signal, filterText }) {
            const text = filterText || '';
            try {
                const res = await repositoryWaterMeter.getUserByName(text);
                if (res?.success) {
                    return { items: res.data };
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            return { items: [] };
        },
    });

    // list services
    let listService = useAsyncList<Service>({
        async load({ signal, filterText }) {
            const text = filterText || '';
            try {
                const res = await repositoryService.getServive();
                if (res?.success) {
                    return { items: res.data };
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
            return { items: [] };
        },
    });


    const addRowDetail = () => {

        //setDetails( )
        setDetails(prev => [...prev, createEmptyDetail()]);

    }

    const getTotalDiscount = (details: Details[]) => {
        let total = 0;
        details.forEach(detail => {
            total += detail.discount;
        });
        return total.toFixed(2);
    };

    const getPaymentMethods = () => {

        return {
            "totalWithoutTaxes": getSubTotal(details),
            "totalDiscount": getTotalDiscount(details),
            "gratuity": (0.00).toFixed(2),
            "totalAmount": getTotal(details),
            "currency": "DOLAR",
            "paymentMethodCode": paymentMethodCode,
            "totalPayment": getTotal(details)
        }

    };

    // const AddServiceDetail = (service_id: number) => {
    //     const service = listService.items.find((item) => item.id === service_id);
    //     if (!service) return;

    //     const newDetail = {
    //         productCode: service.cod_principal,
    //         productName: service.nombre,
    //         description: service.nombre,
    //         quantity: 1,
    //         price: 0,
    //         discount: 0,
    //         subTotal: 0,
    //         taxTypeCode: "2",
    //         percentageCode: "0",
    //         rate: 0,
    //         taxableBaseTax: 0,
    //         taxValue: 0,
    //         service_id: service.id
    //     };

    //     setDetails(prev => [...prev, newDetail]);
    // };

    // const removeDetail = (index: number) => {
    //     setDetails(prev => prev.filter((_, i) => i !== index));
    // };

    // const updateDetailField = (index: number, field: keyof Details, value: number) => {
    //     setDetails(prev => {
    //         const updated = [...prev];
    //         updated[index] = {
    //             ...updated[index],
    //             [field]: value,
    //             subTotal: field === 'quantity' ?
    //                 value * (updated[index].price - updated[index].discount) :
    //                 field === 'price' ?
    //                     updated[index].quantity * (value - updated[index].discount) :
    //                     field === 'discount' ?
    //                         updated[index].quantity * (updated[index].price - value) :
    //                         updated[index].subTotal
    //         };
    //         return updated;
    //     });
    // };

    // ... (resto de hooks y funciones se mantienen igual)

    // const handleAddNewRow = () => {
    //     setShowNewRow(true);
    //     // AddServiceDetail(0);
    // };



    const updateServiceInRow = (index: number, service: Service) => {
        setDetails(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                productCode: service.cod_principal,
                productName: service.nombre,
                description: service.nombre,
                // Maintain existing values
                quantity: updated[index].quantity,
                price: updated[index].price,
                discount: updated[index].discount,
                //discount:((detail.price - (detail.subTotal / detail.quantity)) * detail.quantity).toString()
                //discount: updated[index].price - (updated[index].subTotal / updated[index].quantity),

                subTotal: updated[index].quantity * (updated[index].price - updated[index].discount),
                //taxValue: updated[index].subTotal + (updated[index].subTotal * updated[index].rate)
                taxValue: (updated[index].subTotal * (updated[index].rate) == 0 ? 0 : ((updated[index].rate) / 100)),
                taxableBaseTax: updated[index].subTotal,
            };
            return updated;
        });
    };

    // Function to update numeric fields and recalculate subtotal
    const updateDetailField = (index: number, field: keyof Details, value: number) => {
        setDetails(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };

            const quantity = field === 'quantity' ? value : updated[index].quantity;
            const price = field === 'price' ? value : updated[index].price;
            const discountPercentage = field === 'discount' ? value : updated[index].discount;


            // Calculate discount amount from percentage
            const discountAmount = (price * quantity * discountPercentage) / 100;
            // Store the discount percentage in the discount field
            updated[index].discount = discountAmount;

            // Calculate subtotal after discount
            updated[index].subTotal = (quantity * price) - discountAmount;

            updated[index].taxValue = (updated[index].subTotal * (updated[index].rate) == 0 ? 0 : ((updated[index].rate) / 100));
            updated[index].taxableBaseTax = updated[index].subTotal;

            return updated;
        });
    };

    // Function to remove a row
    const removeDetail = (index: number) => {
        setDetails(prev => prev.filter((_, i) => i !== index));
    };

    const getSubTotal = (details: Details[]) => {
        let total = 0;
        details.forEach(detail => {
            total += detail.subTotal;
        });
        return total.toFixed(2);
    };

    const getTotal = (details: Details[]) => {
        let total = 0;
        details.forEach(detail => {
            total += detail.taxableBaseTax;
        });
        return total.toFixed(2);
    };

    const getAditionalInfo = () => {
        return [{
            name: "Descripcion",
            value: description
        }]
    }


    const getTaxDetails = (details: Details[]) => {
        // Usamos un Map para agrupar por combinación de taxTypeCode y rate
        const taxGroups = new Map<string, { taxableBase: number; taxValue: number }>();

        details.forEach(detail => {
            const key = `${detail.taxTypeCode}-${detail.rate}`; // Clave única por código de impuesto y porcentaje

            if (!taxGroups.has(key)) {
                // Inicializamos el grupo si no existe
                taxGroups.set(key, { taxableBase: 0, taxValue: 0 });
            }

            // Actualizamos los valores del grupo
            const group = taxGroups.get(key)!;
            group.taxableBase += detail.subTotal; // Sumamos el subtotal
            group.taxValue += detail.taxValue;   // Sumamos el valor del impuesto
        });

        // Convertimos el Map a un array de resultados
        const taxDetails = Array.from(taxGroups.entries()).map(([key, values]) => {
            const [taxCode, rate] = key.split("-"); // Separar código de impuesto y porcentaje
            return {
                taxCode,
                percentageCode: rate,
                taxableBase: values.taxableBase.toFixed(2), // Base imponible con 2 decimales
                taxValue: values.taxValue.toFixed(2)        // Valor del impuesto con 2 decimales
            };
        });

        return taxDetails;
    };
    const formatValues = (obj: { [key: string]: number | string; }) => {
        const formatted: Record<string, string> = {};
        for (const key in obj) {
            if (typeof obj[key] === "number") {
                formatted[key] = (obj[key] as number).toFixed(2); // Convertir a cadena con 2 decimales
            } else {
                formatted[key] = obj[key] as string; // Mantener el valor original como cadena
            }
        }
        return formatted;
    };

    const createInvoice = () => {
        const user = currentUser as { id: number, nombre: string, cedula: string };



        const customer = {
            identificationType: "05",
            customerName: user.nombre,
            customerDni: user.cedula,
            customerAddress: "direccion Ejemplo"
        }
        const payment = getPaymentMethods();
        const aditionalInfo = getAditionalInfo();
        const totalsWithTax = getTaxDetails(details);

        const updatedDetails = details.map(formatValues);



        const invoice = {
            documentInfo: createEmptydocumentInfo(),
            customer,
            payment,
            details: updatedDetails,
            additionalInfo: aditionalInfo,
            totalsWithTax
        }
        return invoice;
    };


    return (

        <>
            <Card radius="sm" shadow="sm" className="w-full mx-auto">
                <CardHeader className="bg-primary">
                    <h3 className="text-primary-foreground">Registrar Documento Electrónico</h3>
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
                                        <I18nProvider locale="es">
                                            <DatePicker id="fecha" granularity="day"
                                                value={dateInvoice}
                                                onChange={setDateInvoice} className="max-w-xs" />
                                        </I18nProvider>
                                    </div>

                                    {/* Cliente */}
                                    <div className="flex gap-2 items-center ">
                                        <label className="font-medium">
                                            Cliente:
                                        </label>
                                        <Autocomplete
                                            id="cliente"
                                            aria-label="Seleccione un cliente"
                                            className="max-w-xs"
                                            key="service-user"
                                            items={list.items}
                                            isLoading={list.isLoading}
                                            placeholder="Seleccione un cliente..."
                                            variant="bordered"
                                            onInputChange={list.setFilterText}
                                            onSelectionChange={(selected) => {
                                                if (selected === null) return;
                                                // Lógica para manejar la selección

                                                const user = list.items.find(item => item.id === Number(selected));
                                                if (!user) return;
                                                setCurrentUser(user)

                                            }}
                                        >
                                            {(item) => (
                                                <AutocompleteItem key={item.id} className="capitalize">
                                                    {item.nombre}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                    </div>

                                    {/* Establecimiento */}
                                    <div className="flex items-center gap-4">
                                        <label className="font-medium">
                                            Establecimiento:
                                        </label>
                                        <Input
                                            id="establecimiento"
                                            readOnly
                                            value={informationCompany.numero_establecimientos}
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
                                            value={informationCompany.numero_establecimientos}
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
                                        value={numberInvoice.toString()}
                                        className="max-w-xs"
                                    />

                                </div>

                                {/* <div className="grid grid-cols-3 items-center gap-4">

                                    <div className="col-span-2 flex gap-2">
                                        buscador cliente
                                    </div>
                                </div> */}

                                {/* <div className="grid grid-cols-3 items-center gap-4">
                                    referencia
                                </div>

                                <div className="grid grid-cols-3 items-center gap-4">
                                    select
                                </div> */}

                                {/* <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="text-right font-medium">
                                        Vencimiento:
                                    </span>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <Input
                                            id="expiration"
                                            type="number"
                                            defaultValue="0"
                                            className="w-24"
                                        />
                                        <span className="text-sm text-muted-foreground">días</span>
                                    </div>
                                </div> */}
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
                                                <th className="p-2 text-left w-5"></th>
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
                                            {/* {details.map((detail, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="w-5">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            onPress={() => removeDetail(index)}
                                                        >

                                                            w <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.quantity.toString()}
                                                            className="h-8"
                                                            onChange={(e) => updateDetailField(index, 'quantity', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Controller
                                                            name="usuario_id"
                                                            control={control}
                                                            defaultValue={data?.usuario_id}
                                                            render={({ field }) => (
                                                                <Autocomplete
                                                                    {...field}
                                                                    size='sm'
                                                                    items={listService.items}
                                                                    isLoading={listService.isLoading}
                                                                    label="Seleccione un servicio"
                                                                    placeholder="Busque el servicio..."
                                                                    variant="bordered"
                                                                    onInputChange={listService.setFilterText}
                                                                    errorMessage={errors?.usuario_id?.message}
                                                                    onSelectionChange={(selected) => {
                                                                        if (selected === null) return;
                                                                        field.onChange(Number(selected));
                                                                        AddServiceDetail(Number(selected));
                                                                        //setShowNewRow(false); // Ocultar la fila de entrada después de seleccionar
                                                                    }}
                                                                >
                                                                    {(item) => (
                                                                        <AutocompleteItem
                                                                            key={item.id}
                                                                            className="capitalize"
                                                                        >
                                                                            {item.nombre}
                                                                        </AutocompleteItem>
                                                                    )}
                                                                </Autocomplete>
                                                            )}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.price.toString()}
                                                            className="h-8"
                                                            onChange={(e) => updateDetailField(index, 'price', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"
                                                            value={detail.discount.toString()}
                                                            className="h-8"
                                                            onChange={(e) => updateDetailField(index, 'discount', Number(e.target.value))}
                                                        />
                                                    </td>
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
                                            {showNewRow && (
                                                <tr className="border-b">
                                                    <td className="w-5">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            onPress={() => setShowNewRow(false)}
                                                        >
                                                            s
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </td>

                                                </tr>
                                            )} */}
                                            {details.map((detail, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="w-5">
                                                        <Button
                                                            aria-label="Detail delete"
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeDetail(index)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                    <td className="p-2">
                                                        <Input
                                                            type="number"

                                                            value={detail.quantity.toString()}
                                                            className="h-8"
                                                            onChange={(e) => updateDetailField(index, 'quantity', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    <td className="p-2">
                                                        <Autocomplete
                                                            aria-label="Seleccione un servicio"

                                                            key={'service' + index}
                                                            items={listService.items}
                                                            isLoading={listService.isLoading}
                                                            placeholder="Seleccione un servicio..."
                                                            variant="bordered"
                                                            onInputChange={listService.setFilterText}
                                                            onSelectionChange={(selected) => {
                                                                if (selected === null) return;
                                                                const service = listService.items.find(item => item.id === Number(selected));
                                                                if (service) {
                                                                    updateServiceInRow(index, service);
                                                                }
                                                            }}
                                                        >
                                                            {(item) => (
                                                                <AutocompleteItem
                                                                    key={item.id}
                                                                    className="capitalize"
                                                                >
                                                                    {item.nombre}
                                                                </AutocompleteItem>
                                                            )}
                                                        </Autocomplete>
                                                    </td>
                                                    {/* valor u */}
                                                    <td className="p-2">
                                                        <Input

                                                            type="number"
                                                            value={detail.price.toString()}
                                                            className="h-8"
                                                            onChange={(e) => updateDetailField(index, 'price', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    {/* IVA*/}
                                                    <td className="p-2">
                                                        <Input
                                                            aria-label="IVA"
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
                                                            aria-label="% Descuento"
                                                            type="number"
                                                            //value={detail.discount.toString()}
                                                            defaultValue="0.00"
                                                            className="h-8"
                                                            onChange={(e) => updateDetailField(index, 'discount', Number(e.target.value))}
                                                        />
                                                    </td>
                                                    {/* % Desc total*/}

                                                    <td className="p-2">
                                                        <Input
                                                            aria-label="% Descuento total"
                                                            type="number"
                                                            value={((detail.price - (detail.subTotal / detail.quantity)) * detail.quantity).toString()}
                                                            className="h-8"
                                                            readOnly
                                                        />

                                                    </td>
                                                    {/* % Desc subTotal*/}

                                                    <td className="p-2">
                                                        <Input
                                                            aria-label="% Descuento subtotal"
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

                                <Button
                                    radius="sm"
                                    aria-label="Add Detail"
                                    className="mt-4 w-fit"
                                    onPress={addRowDetail}
                                    color="primary"
                                >
                                    <Plus className="mr-2 w-4" />
                                    Agregar detalle
                                </Button>

                            </CardBody>
                        </Card>
                    </Tab>

                    {/* <Tab key="photos" title="Photos">
                        <Card>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab title="cuentas">Cuentas</Tab> */}
                    {/* <Tab title="centro-costo">Centro de Costo</Tab>
                    <Tab title="retencion">Retención</Tab> */}
                    <Tab title="formas-pago">
                        <Card className="w-1/2">
                            <CardHeader className="px-6" >

                                <h3 className="text-lg font-semibold flex items-center gap-2">Metodos de Pago</h3>
                            </CardHeader>
                            <CardBody className="px-6">

                                <Select
                                    defaultSelectedKeys={["20"]}

                                    disallowEmptySelection
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentMethodCode(e.target.value)}


                                >
                                    {paymentMethods.map((item) => (
                                        <SelectItem key={item.codigo}>
                                            {item.descripcion}
                                        </SelectItem>
                                    ))}

                                </Select>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>

            </div>

            <div className="container">
                <Card className="w-full p-6">
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-md font-semibold flex items-center gap-2">Descripcion</h3>

                            <Textarea
                                id="description"
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-2 mx-auto"
                                rows={4}
                            />
                        </div>

                        <div className="space-y-3 ">
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
                                    <Input radius="sm" readOnly type="number" value={getSubTotal(details)} defaultValue="0.00" className="w-32" />
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
                                    <Input radius="sm" readOnly type="number" value={getTotal(details)} defaultValue="0.00" className="w-32" />
                                </div>
                            </div>
                        </div>


                    </div>
                </Card>
            </div>
            <div className="flex justify-end">
                <Button
                    aria-label="Send Invoice"
                    radius="sm"
                    className=" w-fit justify-self-end"
                    onPress={sendDataInvoice}
                    color="primary"
                >
                    <Check className="mr-2 w-4" />
                    Guardar y enviar al SRI
                </Button>
            </div>
        </>










    )
}
