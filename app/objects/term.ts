import { TrainingProgram } from './trainingProgram';
import { UserInfo } from './userInfo';

export interface Term {
    id?: number,
    name?: string,
    trainingProgram?: number,
    training_program?: TrainingProgram,
    user_info?: UserInfo,
    numberOfStudents?: number,
    status?: string
}