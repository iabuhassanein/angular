import { Company } from './company';
import { CompanyCoordinator } from './companyCoordinator';
import { AcademicDepartment } from './academicDepartment';
import { TrainingProgram } from './trainingProgram';
import { DocFile } from './DocFile';

export interface CompanyOpportunity {
    id?: number;
    englishTitle?: string;
    englishDescription?: string;
    numberOfOpportunities?: number;
    leastAcceptableGPA?: number;
    city?: string;
    salary?: number;
    housingExpenses?: number;
    transportationExpenses?: number;
    commentary?: string;
    trainingPlanLink?: string;
    coordinatorResponse?: any;
    trainingPlan?: string;
    coordinateResponse?: string;
    company?: Company;
    companyCoordinator?: CompanyCoordinator;
    academicDepartment?: AcademicDepartment;
    trainingProgram?: TrainingProgram;
    public?: boolean;
    abroad?: boolean;
    applied?: any;
    personal?: boolean;
    show?: boolean;
    approvedByTDAndAD?: boolean;
    approvedByAcademicDepartment?: boolean;
    approvedByTrainingDepartment?: boolean;
    abilityNominateStudents?: boolean;
    files?: DocFile[]
}