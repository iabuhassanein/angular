import { UserInfo } from './userInfo';
import { AppliedOpportunity } from './appliedOpportunity';
import { AcademicDepartmentCoordinator } from './academicDepartmentCoordinator';
import { AcademicDepartment } from './academicDepartment';
import { TrainingProgram } from './trainingProgram';
import { Supervisor } from './supervisor';
import { Company } from './company';
export interface Student {
    id?: number,
    studentID?: number,
    userInfo?: UserInfo,
    firstName?: string,
    lastName?: string,
    phone?: number,
    email?: string,
    supervisor?: Supervisor,
    sponsorCompany?: Company,
    avatar?: string,
    GPA?: number,
    gpa?: number,
    cv?: string,
    major?: string,
    majorBranch?: string,
    birthDate?: string,
    gender?: string,
    year?: number
    academicDepartment?: AcademicDepartment,
    academic_department_coordinator: AcademicDepartmentCoordinator,
    applied_opportunities?: AppliedOpportunity,
    trainingProgram?: TrainingProgram,
    trainingStatus?: boolean,
    incomplete?: boolean,
    eligible?: boolean,
    completedWeeks?: number,
    obligationConfirmed?: boolean,
    hasAccessToApplication?: boolean,
}