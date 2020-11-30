import { CourseInterface } from './../interfaces/courseInterface';
import { User } from './User';
import {Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinTable} from "typeorm"
@Entity()
export class Course extends BaseEntity implements CourseInterface{
    @PrimaryColumn()
    name: string;

    @ManyToOne(()=>User)
    @JoinTable()
    tutors: User[]

    init:(courseData:CourseInterface)=>void = function(courseData:CourseInterface){
            courseData.name = this.name
    }
    



}