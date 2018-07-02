import { Student } from "./student";
import { CompanyOpportunity } from "./companyOpportunity";

export interface AppliedOpportunity{
    id?: number,
    student?: Student,
    opportunities?: CompanyOpportunity[],
    opportunity?: CompanyOpportunity,
    supervisor?: number,
    status?: string,
    created_at?: string
}