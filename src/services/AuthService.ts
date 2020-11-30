import { Role } from './../models/Role';
import { UserInterface } from './../interfaces/userInterface';
import { LoginInterface } from '../interfaces/loginInterface';
import { TokenInterface } from '../interfaces/tokenInterface';
import { hash,compare } from 'bcrypt';
import { User } from '../models/User';
import {Service} from 'typedi';
import {verify,sign} from 'jsonwebtoken';
@Service()
export default class AuthService{
    private helpers:Helpers
    constructor(){
        this.helpers = new Helpers();
    }
    login: (loginData:LoginInterface) => Promise<User> = async function(loginData:LoginInterface){
        let user:User = await User.findOne({email:loginData.email},{ relations: ["roles"] })
        let validPassword:boolean = await this.helpers.verifyPassword(loginData.password, user.password)
        if (validPassword){
            return user
        }else{
            return undefined
        }
    }

    createUser: (userData:UserInterface)=>Promise<User> = async function(userData:UserInterface){
        let roles:Role[];
        roles = await Role.find({type:'student'}) //default to create student
        let user:User = new User()
        user.init({email:userData.email,firstName:userData.firstName,lastName:userData.lastName,phoneNum:userData.phoneNum,password:userData.password,roles:roles})
        let alreadyExists:boolean = await !!User.findOne(user.email); //if user already exists this returns true
        if(alreadyExists){
            return null //return undefined if user already exist
        }else{
            user.password = await this.helpers.hashPassword(user.password)//hash password before creating
            let result:User = await User.save(user)
            return result
        }
    }

    updatePassword: (user:User, newPassword:String)=>Promise<User> = async function(user:User, newPassword:String){
        user.password = await this.helpers.hashPassword(user.password)//hash password before creating
        let result:User = await User.save(user)
        return result
    }
    getToken: (user:User)=>Promise<TokenInterface> = async function(user:User){
        return this.helpers.createJwt(user) as TokenInterface
    }
    decodeToken: (jwt:String) =>TokenInterface = function(jwt:String){
        //returns decoded JWT
        return this.helpers.decodeToken(jwt) as TokenInterface
    }
}

class Helpers{
    hashPassword: (password:String)=>Promise<String> = async function(password:String){
        return hash(password,10)
    }
    createJwt: (user:User)=>String = function(user:User){
        return sign({email: user.email, roles: user.roles},process.env.JWT_SECRET_KEY, { expiresIn: '3h' })
    }
    decodeToken: (jwt:string) =>TokenInterface = function(jwt:string){
        return verify(jwt,process.env.JWT_SECRET_KEY) as TokenInterface
    }
    verifyPassword: (password:string,hash:string)=>Promise<boolean> = async function(password:string, hash:string){
        return compare(password,hash)
    }

}
