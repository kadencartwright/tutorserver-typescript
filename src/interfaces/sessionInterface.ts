import { User } from './../models/User';
import { CourseInterface } from './courseInterface';
import { UserInterface } from './userInterface';
export interface SessionInterface{
    id?: string;
    course?: CourseInterface;
    startTime?: number;
    endTime?: number;
    tutor?: User;
    student?: User
}