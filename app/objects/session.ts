import { UserInfo } from './userInfo';
import { Company } from './company';

export interface Session {
    id?: number,
    userInfo: UserInfo,
    role?: string,
    token?: string
}