import { User } from './../models/User';
import { Role } from './../models/Role';
import { TokenInterface } from './../interfaces/tokenInterface';
import { LoginInterface } from './../interfaces/loginInterface';
import {Request,Response} from 'express';
import { Container } from 'typedi';
import { validationResult } from 'express-validator';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

let login: (req:Request,res:Response)=>void = async function(req,res){
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let authService = Container.get(AuthService)
    let userService = Container.get(UserService)
    let loginData:LoginInterface= {
        email: req.body.email,
        password: req.body.password
    }
    let user = await authService.login(loginData)
    //if user is undefined the authService.login() function failed to find a user
    //this most likely means incorrect credentials
    if(user == undefined){
        res.status(401).send('incorrect email and or password');
    }else{
        let token:TokenInterface = await authService.getToken(user)
        //we will send only certain fields to client, everything but password
        let userJson ={
            email: user.email,
            firsName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
        }
        res.status(200).json({
            token:token,
            user: userJson
        })
    }
}

let createUser:(req:Request,res:Response)=>void= async (req:Request,res:Response)=>{
    //if not all validations pass, return status code 400 and the output from validation result
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //get an authservice instance  
    let authService = Container.get(AuthService)
    let roles:Role[];
    roles = await Role.find({type:'student'})
    let user:User = new User(req.body.email,req.body.firstName,req.body.lastName,req.body.phoneNumber,req.body.password,roles)
    authService.createUser(user);
    res.send('done')
    
}


export {login, createUser}