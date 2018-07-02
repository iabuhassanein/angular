import { Student } from './student';
import { UserInfo } from './userInfo';

export interface StudentComment {
    id?: number,
    student?: Student,
    stdID?: number,
    userInfo?: number,
    user_info?: UserInfo,
    comment?: string,
    type?: string,
    employee?: string,
    created_at?: string,
    updated_at?: string
}