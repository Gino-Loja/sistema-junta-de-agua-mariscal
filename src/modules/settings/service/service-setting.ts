import { ISettingRepository } from "../utils/model";
import { countSectors, getAdministrator, getCompany, getCountAdministrator, getDigitalCertificate, getSectors, updateCompany, updateDigitalCertificate } from "../utils/use-media-query";


export function createApiSettingRepository(): ISettingRepository {
    return {
      
        getCompany,
        updateCompany,
        getDigitalCertificate,
        updateDigitalCertificate,
        getAdministrator,
        getCountAdministrator,
        getSectors,
        countSectors,
    
    };
}
