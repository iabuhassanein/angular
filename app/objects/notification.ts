import { UserInfo } from './userInfo';

export interface Notification {
    id?: number,
    title?: string,
    content?: string,
    type?: string,
    userInfo?: number,
    user_info?: UserInfo,
    read?: boolean
}