import { ISettingRepository } from "../utils/model";
import { getCompany, getDigitalCertificate, updateCompany, updateDigitalCertificate } from "../utils/use-media-query";


export function createApiSettingRepository(): ISettingRepository {
    return {
      
        getCompany,
        updateCompany,
        getDigitalCertificate,
        updateDigitalCertificate
    
    };
}
