import { CompanyOpportunity } from './companyOpportunity';
import { UserInfo } from './userInfo';

export interface OpportunityComment {
    id?: number,
    opportunity?: CompanyOpportunity,
    oppID?: number,
    userInfo?: number,
    user_info?: UserInfo,
    comment?: string,
    type?: string,
    employee?: string,
    created_at?: string,
    updated_at?: string
}