import { UserInfo } from './userInfo';
import { Company } from './company';
export interface Supervisor {
    id?: number,
    position?: string,
    mobile?: string,
    fax?: string,
    userInfo?: UserInfo,
    company?: Company
}