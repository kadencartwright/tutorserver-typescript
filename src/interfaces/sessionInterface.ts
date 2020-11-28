import { CourseInterface } from './courseInterface';
import { UserInterface } from './userInterface';
export interface SessionInterface{
    id: string;
    class: CourseInterface;
    startTime: number;
    endTime: number;
    tutor: UserInterface;
    student: UserInterface
}