import { UserType } from './userType';

export interface UserInfo {
    id?: number;
    firstName?: string;
    lastName?: string;
    login?: string;
    password?: string;
    phone?: string;
    email?: string;
    user_type?: UserType;
    userRole?: string;
    userType?: UserType;
}