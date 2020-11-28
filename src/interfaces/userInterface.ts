import { RoleInterface } from './roleInterface';
export interface UserInterface{
    email: string
    firstName: string
    lastName: string
    phoneNum: string
    password: string
    roles: RoleInterface[]
}