import { StudentTrainingAdvisor } from './studentTrainingAdvisor';

export interface Announcement {
    id?:number,
    title?: string,
    description?: string,
    imgLink?: string,
    videoLink?: string,
    type?: string,
    studentTrainingAdvisor?: number,
    training_advisor?: StudentTrainingAdvisor,
}