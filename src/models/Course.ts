import { CourseInterface } from './../interfaces/courseInterface';
import { User } from './User';
import {Entity, BaseEntity, PrimaryColumn, ManyToMany, JoinTable} from "typeorm"
@Entity()
export class Course extends BaseEntity implements CourseInterface{
    @PrimaryColumn()
    name: string;

    @ManyToMany(()=>User)
    @JoinTable()
    tutors: User[]

    init:(courseData:CourseInterface)=>void = function(courseData:CourseInterface){
            this.name = courseData.name
    }
    



}