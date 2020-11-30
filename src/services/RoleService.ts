import { RoleInterface } from './../interfaces/roleInterface';
import { Role } from './../models/Role';

import {Service} from  'typedi'
@Service()
export default class RoleService{

    constructor(){}
    
    getRole: (roleData:RoleInterface) =>Promise<Role> = async function(roleData:RoleInterface){
        roleData.type = roleData.type.toLowerCase()//all roles will be lowercase
        return await Role.findOne(roleData.type);
    }
    
    createRole: (roleData:RoleInterface) =>Promise<Role> = async function(roleData:RoleInterface){
        roleData.type = roleData.type.toLowerCase()//all roles will be lowercase
        let alreadyExists:boolean = await !!Role.findOne(roleData.type)
        if (alreadyExists){
            return null 
        }
        let role:Role =new Role()//create a new role and pass in the data
        role.init(roleData)
        return await Role.save(role)

    }
    

}