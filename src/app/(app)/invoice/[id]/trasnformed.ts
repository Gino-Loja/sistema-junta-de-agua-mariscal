
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
    totalWithoutTaxes: string;  // total sin impuestos
    totalDiscount: string;      // total de descuentos
    gratuity: string;
    totalAmount: string;
    currency: string;
    paymentMethodCode: string;
    totalPayment: string;
}

interface InvoiceDetail {
    productCode: string;
    productName: string;
    description: string;
    quantity: number;
    price: string;
    discount: string;
    subTotal: string;          // precio (precio x cantidad) sin impuestos pero con descuento
    taxTypeCode: string;       // IVA codigo
    percentageCode: string;    // porcentaje del codigo
    rate: string;              // valor del impuesto del porcentaje (0.00, 0.10, 0.12)
    taxableBaseTax: string;    // valor de base imponible
    taxValue: string;          // valor con impuestos aplicados
}

interface AdditionalInfo {
    name: string;
    value: string;
}

interface TotalWithTax {
    taxCode: string;
    percentageCode: string;
    taxableBase: string;
    taxValue: string;
}

interface InvoiceGenerationRequest {
    documentInfo: DocumentInfo;
    customer: Customer;
    payment: Payment;
    details: InvoiceDetail[];
    additionalInfo: AdditionalInfo[];
    totalsWithTax: TotalWithTax[];  // impuestos de cada detalle (no pueden haber impuestos repetidos)
}


interface XmlToJsonTransformer {
    transformXmlToRequestJson(xmlString: string): InvoiceGenerationRequest;
}

export class InvoiceXmlTransformer implements XmlToJsonTransformer {
    private parseXmlString(xmlString: string): Document {
        const parser = new DOMParser();
        return parser.parseFromString(xmlString, 'text/xml');
    }

    private getNodeText(element: Element, path: string): string {
        const node = element.querySelector(path);
        return node?.textContent || '';
    }

    transformXmlToRequestJson(xmlString: string): InvoiceGenerationRequest {
        const xmlDoc = this.parseXmlString(xmlString);
        const facturaElement = xmlDoc.querySelector('factura');

        if (!facturaElement) {
            throw new Error('Invalid XML structure: factura element not found');
        }

        return {
            documentInfo: this.extractDocumentInfo(facturaElement),
            customer: this.extractCustomerInfo(facturaElement),
            payment: this.extractPaymentInfo(facturaElement),
            details: this.extractDetails(facturaElement),
            additionalInfo: this.extractAdditionalInfo(facturaElement),
            totalsWithTax: this.extractTotalsWithTax(facturaElement)
        };
    }

    private extractDocumentInfo(facturaElement: Element): DocumentInfo {
        const infoTributaria = facturaElement.querySelector('infoTributaria');

        return {
            accessKey: this.getNodeText(infoTributaria!, 'ruc'),
            businessName: this.getNodeText(infoTributaria!, 'razonSocial'),
            commercialName: this.getNodeText(infoTributaria!, 'nombreComercial'),
            businessAddress: this.getNodeText(infoTributaria!, 'dirMatriz'),
            dayEmission: this.getNodeText(facturaElement, 'infoFactura > fechaEmision').split('/')[0],
            monthEmission: this.getNodeText(facturaElement, 'infoFactura > fechaEmision').split('/')[1],
            yearEmission: this.getNodeText(facturaElement, 'infoFactura > fechaEmision').split('/')[2],
            codDoc: this.getNodeText(infoTributaria!, 'codDoc'),
            rucBusiness: this.getNodeText(infoTributaria!, 'ruc'),
            environment: this.getNodeText(infoTributaria!, 'ambiente'),
            typeEmission: this.getNodeText(infoTributaria!, 'tipoEmision'),
            establishment: this.getNodeText(infoTributaria!, 'estab'),
            establishmentAddress: this.getNodeText(facturaElement, 'infoFactura > dirEstablecimiento'),
            emissionPoint: this.getNodeText(infoTributaria!, 'ptoEmi'),
            sequential: this.getNodeText(infoTributaria!, 'secuencial'),
            obligatedAccounting: this.getNodeText(facturaElement, 'infoFactura > obligadoContabilidad'),
            contribuyenteRimpe: this.getNodeText(infoTributaria!, 'contribuyenteRimpe')
        };
    }

    private extractCustomerInfo(facturaElement: Element): Customer {
        const infoFactura = facturaElement.querySelector('infoFactura');

        return {
            identificationType: this.getNodeText(infoFactura!, 'tipoIdentificacionComprador'),
            customerName: this.getNodeText(infoFactura!, 'razonSocialComprador'),
            customerDni: this.getNodeText(infoFactura!, 'identificacionComprador'),
            customerAddress: this.getNodeText(infoFactura!, 'direccionComprador')
        };
    }

    private extractPaymentInfo(facturaElement: Element): Payment {
        const infoFactura = facturaElement.querySelector('infoFactura');

        return {
            totalWithoutTaxes: this.getNodeText(infoFactura!, 'totalSinImpuestos'),
            totalDiscount: this.getNodeText(infoFactura!, 'totalDescuento'),
            gratuity: this.getNodeText(infoFactura!, 'propina'),
            totalAmount: this.getNodeText(infoFactura!, 'importeTotal'),
            currency: this.getNodeText(infoFactura!, 'moneda'),
            paymentMethodCode: this.getNodeText(infoFactura!, 'pagos > pago > formaPago'),
            totalPayment: this.getNodeText(infoFactura!, 'pagos > pago > total')
        };
    }

    private extractDetails(facturaElement: Element): InvoiceDetail[] {
        const detalles = facturaElement.querySelectorAll('detalles > detalle');
        return Array.from(detalles).map(detalle => ({
            productCode: this.getNodeText(detalle, 'codigoPrincipal'),
            productName: this.getNodeText(detalle, 'descripcion'),
            description: this.getNodeText(detalle, 'descripcion'),
            quantity: parseFloat(this.getNodeText(detalle, 'cantidad')),
            price: this.getNodeText(detalle, 'precioUnitario'),
            discount: this.getNodeText(detalle, 'descuento'),
            subTotal: this.getNodeText(detalle, 'precioTotalSinImpuesto'),
            taxTypeCode: this.getNodeText(detalle, 'impuestos > impuesto > codigo'),
            percentageCode: this.getNodeText(detalle, 'impuestos > impuesto > codigoPorcentaje'),
            rate: this.getNodeText(detalle, 'impuestos > impuesto > tarifa'),
            taxableBaseTax: this.getNodeText(detalle, 'impuestos > impuesto > baseImponible'),
            taxValue: this.getNodeText(detalle, 'impuestos > impuesto > valor')
        }));
    }

    private extractAdditionalInfo(facturaElement: Element): AdditionalInfo[] {
        const infoAdicional = facturaElement.querySelectorAll('infoAdicional > campoAdicional');
        return Array.from(infoAdicional).map(campo => ({
            name: campo.getAttribute('nombre') || '',
            value: campo.textContent || ''
        }));
    }

    private extractTotalsWithTax(facturaElement: Element): TotalWithTax[] {
        const totalImpuestos = facturaElement.querySelectorAll('infoFactura > totalConImpuestos > totalImpuesto');
        return Array.from(totalImpuestos).map(impuesto => ({
            taxCode: this.getNodeText(impuesto, 'codigo'),
            percentageCode: this.getNodeText(impuesto, 'codigoPorcentaje'),
            taxableBase: this.getNodeText(impuesto, 'baseImponible'),
            taxValue: this.getNodeText(impuesto, 'valor')
        }));
    }
}