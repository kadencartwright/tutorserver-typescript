import { Role } from './../models/Role';
import { Course } from './../models/Course';
import { User } from './../models/User';
import { Request,Response } from 'express';
import { Container } from 'typedi';

import AuthService from '../services/AuthService';
import SessionService from '../services/SessionService'
import * as initData from '../dbInit'
import RoleService from '../services/RoleService';
import CourseService from '../services/CourseService';
import AvailabilityService from '../services/AvailabilityService';

let initDb:(req:Request,res:Response)=>void= async (req:Request,res:Response)=>{
    let authService:AuthService = Container.get(AuthService);
    let sessionService:SessionService = Container.get(SessionService);
    let roleService:RoleService = Container.get(RoleService)
    let courseService:CourseService = Container.get(CourseService)
    let availabilityService:AvailabilityService = Container.get(AvailabilityService)
/*
    //init roles
    console.log("Creating Roles")
    await initData.roles.forEach(async element => {
        //initialize role here
        console.log(`Creating role: ${element.type}`)
        await roleService.createRole(element).catch(e=>{console.log(e)})
    });

*/



    //init users-- make some tutors, admins, students and tutor/admins
    console.log("Creating Users")
    initData.users.forEach(async element=>{
        console.log(`Creating User: ${element.userData.email}`)
        let user:User = await authService.createUser(element.userData)
        let roles:Role[];
        element.roleTypes.forEach(async e=>{
            let role:Role = await roleService.getRole({type:e.type})
            roles.push(role)
        })
        user.roles = roles;
        await User.save(user).catch(e=>{console.log(e)})
    })

    //init tutor classes
    console.log("Creating Courses")
    await initData.courses.forEach(async element=>{
        console.log(`Creating Course: ${element.name}`)
       await courseService.createCourse(element)
    })

    //init tutor availability
    await initData.availabilities.forEach(async element=>{
        console.log(`Creating Availability: ${element}`)
        let tutor:User = await User.findOne(element.tutorEmail)
        await availabilityService.createAvailability({...element.Availability,tutor:tutor})
    })

    //init sessions
    await initData.sessions.forEach(async element=>{
        let student:User = await User.findOne(element.userEmail)
        let tutor:User = await User.findOne(element.tutorEmail)
        let course:Course = await Course.findOne(element.courseName)
        await sessionService.createSession({...element.session,tutor:tutor,student:student})
    })
/*
    */
}



export  {initDb}