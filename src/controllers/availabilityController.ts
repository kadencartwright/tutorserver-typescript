import { User } from './../models/User';
import { Availability } from './../models/Availabilty';
import { UserInterface } from './../interfaces/userInterface';
import { TokenInterface } from './../interfaces/tokenInterface';
import { LoginInterface } from './../interfaces/loginInterface';
import {Request,Response} from 'express';
import { Container } from 'typedi';
import { validationResult } from 'express-validator';
import AvailabilityService from '../services/AvailabilityService'
import UserService from '../services/UserService';

let createAvailability:(req:Request,res:Response)=>void= async (req:Request,res:Response)=>{
    let availabilityService:AvailabilityService = Container.get(AvailabilityService);
    let userService:UserService = Container.get(UserService)
    let tutor:User = await userService.getUser(req.body.tutorEmail);
    let availability:Availability = await availabilityService.createAvailability({startTime:req.body.startTime,endTime:req.body.endTime,day:req.body.day,tutor:tutor});
    res.status(201).json({sessionId:availability.id})
}


export {createAvailability}