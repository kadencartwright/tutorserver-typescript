import { User } from './../models/User';
import { CourseInterface } from './courseInterface';
import { UserInterface } from './userInterface';
export interface SessionInterface{
    id?: string;
    course?: CourseInterface;
    startTime?: Date;
    endTime?: Date;
    tutor?: User;
    student?: User
}