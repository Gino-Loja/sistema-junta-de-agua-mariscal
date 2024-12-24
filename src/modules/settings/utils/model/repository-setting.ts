import { QueryResultError } from "@/model/types";
import { Company, DigitalCert, DigitalCertDto } from "../../types";

export interface ISettingRepository {
    getCompany(): Promise<QueryResultError<Company[]>>;
    updateCompany(company: Company): Promise<QueryResultError<Company>>;
    getDigitalCertificate(): Promise<QueryResultError<DigitalCert[]>>;
    updateDigitalCertificate(company: DigitalCertDto): Promise<QueryResultError<DigitalCert>>;

}

