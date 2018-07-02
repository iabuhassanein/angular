import { StudentTrainingAdvisor } from './studentTrainingAdvisor';

export interface News {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    imgLink: string;
    videoLink: string;
    type: string;
    tags?: string[],
    studentTrainingAdvisor: StudentTrainingAdvisor;
    dateAdded: string;
}