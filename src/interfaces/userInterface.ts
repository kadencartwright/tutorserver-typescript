import { Role } from './../models/Role';
export interface UserInterface{
    email?: string
    firstName?: string
    lastName?: string
    phoneNum?: string
    password?: string
    roles?: Role[]
}