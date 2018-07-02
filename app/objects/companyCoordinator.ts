import { Company } from './company';
import { UserInfo } from './userInfo';
export interface CompanyCoordinator {
    id?: number,
    mobile?: string;
    position?: string;
    fax?: string;
    company?: Company;
    userInfo?: UserInfo;
    user_info?: UserInfo;
}