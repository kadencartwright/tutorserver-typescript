import { CourseInterface } from './../interfaces/courseInterface';
import { Course } from './../models/Course';
import { Role } from './../models/Role';

import {Service} from  'typedi'
@Service()
export default class CourseService{

    constructor(){}

    getCourse: (course:string) => Promise<Course> = async function(name:string){
        return await Course.findOne(name);
    }
    createCourse: (courseData:CourseInterface) => Promise<Course> = async function(courseData:CourseInterface){
        courseData.name = courseData.name.toLowerCase()//all courses will be lowercase
        let alreadyExists:boolean = await !!Course.findOne(courseData.name )
        if (alreadyExists){
            return null 
        }
        let course:Course =new Course()//create a new role and pass in the data
        course.init(courseData)
        return await Course.save(course)
    }

}