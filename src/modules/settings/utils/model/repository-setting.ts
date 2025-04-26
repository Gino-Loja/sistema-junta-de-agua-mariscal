import { QueryResultError } from "@/model/types";
import { Administrators, Company, DigitalCert, DigitalCertDto } from "../../types";

export interface ISettingRepository {
    getCompany(): Promise<QueryResultError<Company[]>>;
    updateCompany(company: Company): Promise<QueryResultError<Company>>;
    getDigitalCertificate(): Promise<QueryResultError<DigitalCert[]>>;
    updateDigitalCertificate(company: DigitalCertDto): Promise<QueryResultError<DigitalCert>>;
    getAdministrator(date: string, search: string, status: string, currentPage: number, itemsPerPage: number): Promise<QueryResultError<Administrators[]>>;
    
    getCountAdministrator(date: string, query: string, status: string): Promise<QueryResultError<number>>;

}

