import { createApiSettingRepository } from "@/modules/settings/service/service-setting";
import FormCompany from "@/modules/settings/ui/company/form-company";
import FormDigitalCert from "@/modules/settings/ui/company/form-digital-cert";
import { ISettingRepository } from "@/modules/settings/utils/model";

export default async function CompanyPage() {

    const repositorySetting: ISettingRepository = createApiSettingRepository();

    const company = await repositorySetting.getCompany();

    const digitalCert = await repositorySetting.getDigitalCertificate();

    if (!company.success) { return <div>Error</div> }

    if (!digitalCert.success) { return <div>Error</div> }
    //const logoBase64 = Buffer.from(company.data[0].logo).toString('base64'); // Convertir Uint8Array a Base64
    // return { ...data, logo: `data:image/png;base64,${logoBase64}` }; 


    //const logoBase64 = `data:image/png;base64,${Buffer.from(company.data[0].logo)}`;
    const logoBase64 = Buffer.from(company.data[0].logo).toString();
    const companyLogo = { ...company.data[0], logo: logoBase64 };

    // const certContent = Buffer.from(digitalCert.data[0].cetificado).toString('base64');
    // const digitalCertData = {
    //     ...digitalCert.data[0],
    //     cetificado:certContent  // Usar string vacío como fallback si la conversión falla
    // };


    const digitalCertBase64 = Buffer.from(digitalCert.data[0].certificado).toString();
    const digitalCertConverted = { ...digitalCert.data[0], certificado: digitalCertBase64 };

    return (
        <div className="min-h-screen">


            <div className="p-6">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">Informacion de la Junta</h2>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Important Notice */}
                    <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg mb-6">
                        <span className="text-blue-500">ℹ️</span>
                        <p className="text-sm text-blue-700">
                            <span className="font-medium">Importante:</span> Para configurar su cuenta deberá seguir con los siguientes pasos, si desea salir de este apartado podrá acceder nuevamente cuando lo requiera.
                        </p>
                    </div>

                    <div>
                        <FormCompany data={companyLogo} repository={repositorySetting} />
                    </div>

                </div>
                <div className="my-4">
                    <h2 className="text-2xl font-bold">Certificado Digital</h2>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Important Notice */}
                    <FormDigitalCert data={digitalCertConverted} repository={repositorySetting} />

                </div>

            </div>
        </div>

    )
}