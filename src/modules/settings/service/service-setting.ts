import { ISettingRepository } from "../utils/model";
import { getAdministrator, getCompany, getCountAdministrator, getDigitalCertificate, updateCompany, updateDigitalCertificate } from "../utils/use-media-query";


export function createApiSettingRepository(): ISettingRepository {
    return {
      
        getCompany,
        updateCompany,
        getDigitalCertificate,
        updateDigitalCertificate,
        getAdministrator,
        getCountAdministrator
    
    };
}
