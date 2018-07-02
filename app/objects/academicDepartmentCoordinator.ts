import { AcademicDepartment } from './academicDepartment';
import { UserInfo } from './userInfo';
export interface AcademicDepartmentCoordinator {
    id?: number;
    userInfo?: number;
    user_info?: UserInfo,
    academicDepartment?: number;
    academic_department?: AcademicDepartment
}