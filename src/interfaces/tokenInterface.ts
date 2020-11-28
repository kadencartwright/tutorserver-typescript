import { RoleInterface } from './roleInterface';

export interface TokenInterface{
    email?:String,
    name?: String,
    roles?: Array<RoleInterface>
}