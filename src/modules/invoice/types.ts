export type Meeting = {
    id: number;
    nombre_usuario: string;
    usuario_id: number;
    fecha: Date;
    motivo: string;
    estado: string;
    fecha_actualizacion: Date;
};

export type StatusAllMeeting = {
    estado: string;
    total: number;
};

export type CounterMeeting = {
    total: number;
};

export type Details = {
    // {
    //     "productCode": "003",
    //     "productName": "KILO DE PITAHAYA DE PROCESO",
    //     "description": "KILO DE PITAHAYA DE PROCESO",
    //     "quantity": 1.0,
    //     "price": "0.50",
    //     "discount": "0.00",
    //     "subTotal": "0.50", //precio (precio x cantidad) sin impuestos pero con descuento
    //     "taxTypeCode": "2", //IVA codigo
    //     "percentageCode": "0",  // porcentaje del codigo
    //     "rate": "0.00",  // es el valor del impuesto del porcentaje  puede ser 0.00 o 0.10 o 0.12
    //     "taxableBaseTax": "0.00", //valor de base imponible
    //     "taxValue": "0.00" //valor ya con impuestos aplicados
    //   }
    productCode: string;
    productName: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    subTotal: number;
    taxTypeCode: string;
    percentageCode: string;
    rate: number;
    taxableBaseTax: number;
    taxValue: number;
}


export type Service = {
    id: number;
    cod_principal: string;
    cod_auxiliar: string;
    nombre: string;
    tipo: string;
    cod_iva: string;
    im_valor_agre: string;
    ICE: string;
}

//     cod_principal:001
// cod_auxiliar:001
// nombre:PAGO CONSUMO DE AGUA
// tipo: "servicio"
// cod_iva:0
// im_valor_agre: "IVA 0%"
// ICE: "NO APLICA"

export type InformationCompany = {
    id: number;
    ruc: string; // RUC de la empresa
    razon_social: string; // Razón social
    nombre_comercial: string; // Nombre comercial
    ciudad: string; // Ciudad
    direccion: string; // Dirección
    telefonos: string; // Teléfonos
    email: string; // Correo electrónico
    numero_establecimientos: string; // Número de establecimientos
    obligado_a_contabilidad: 'SI' | 'NO'; // Obligación a contabilidad, limitado a 'SI' o 'NO'
    contribuyente_regimen_rimpe: string;
}

export type PaymentMethod = {
    id: number;
    codigo: string;
    descripcion: string;
}

export type Invoice = {
    id: number;
    id_usuario: number;
    nombre_usuario: string;
    fecha_emision: Date;
    clave_acceso: string;
    estado: string;
    xml_firmado: string;
    numero_factura: string;
    factura_json: InvoiceGenerationRequest;
}

interface DocumentInfo {
    accessKey: string;
    businessName: string;
    commercialName: string;
    businessAddress: string;
    dayEmission: string;
    monthEmission: string;
    yearEmission: string;
    codDoc: string;
    rucBusiness: string;
    environment: string;
    typeEmission: string;
    establishment: string;
    establishmentAddress: string;
    emissionPoint: string;
    sequential: string;
    obligatedAccounting: string;
    contribuyenteRimpe: string;
}

interface Customer {
    identificationType: string;
    customerName: string;
    customerDni: string;
    customerAddress: string;
}

interface Payment {
    totalWithoutTaxes: string;
    totalDiscount: string;
    gratuity: string;
    totalAmount: string;
    currency: string;
    paymentMethodCode: string;
    totalPayment: string;
}

interface Detail {
    productCode: string;
    productName: string;
    description: string;
    quantity: number;
    price: string;
    discount: string;
    subTotal: string;
    taxTypeCode: string;
    percentageCode: string;
    rate: string;
    taxableBaseTax: string;
    taxValue: string;
}

interface AdditionalInfo {
    name: string;
    value: string;
}

interface TotalsWithTax {
    taxCode: string;
    percentageCode: string;
    taxableBase: string;
    taxValue: string;
}

export interface InvoiceGenerationRequest {
    documentInfo: DocumentInfo;
    customer: Customer;
    payment: Payment;
    details: Detail[];
    additionalInfo: AdditionalInfo[];
    totalsWithTax: TotalsWithTax[];
}
