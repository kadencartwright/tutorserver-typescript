import { RoleInterface } from './../interfaces/roleInterface';

import { Request,Response } from 'express';
import { Container } from 'typedi';

import AuthService from '../services/AuthService';
import SessionService from '../services/SessionService'
import RoleService from '../services/RoleService';
import CourseService from '../services/CourseService';
import AvailabilityService from '../services/AvailabilityService';
import fs from 'fs'

let initData = JSON.parse(fs.readFileSync('./dbData.json').toString())

let initDb:(req:Request,res:Response)=>void= async (req:Request,res:Response)=>{
    let authService:AuthService = Container.get(AuthService);
    let sessionService:SessionService = Container.get(SessionService);
    let roleService:RoleService = Container.get(RoleService)
    let courseService:CourseService = Container.get(CourseService)
    let availabilityService:AvailabilityService = Container.get(AvailabilityService)


    //init roles
    console.table(initData.roles)
    console.log("Creating Roles")
    let roles:RoleInterface[] = initData.roles
    for (let role of roles){
        console.log(role)
        console.log(await roleService.createRole(role))
    }


   //init users-- make some tutors, admins, students and tutor/admins
    console.log("Creating Users")
    for (let element of initData.users){
        console.log(`initData.user`)
        console.table(element)
        console.log(`Creating User: ${element.userData.email}`)
        await authService.createUser({...element.userData,roles:element.roleTypes})
    }

  

    //init courses
    console.log("Creating Courses")
    for (let course of initData.courses){

        console.log(`Creating Course: ${course.name}`)
        await courseService.createCourse(course)
    }

    await initData.courses.forEach(async element=>{
        
    })
}


export  {initDb}