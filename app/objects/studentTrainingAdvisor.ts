import { AcademicDepartment } from './academicDepartment';
import { UserInfo } from './userInfo';


export interface StudentTrainingAdvisor {
    id: number;
    userInfo: UserInfo;
    academicDepartment: AcademicDepartment;
}