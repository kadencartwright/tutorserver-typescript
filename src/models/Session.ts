import { SessionInterface } from './../interfaces/sessionInterface';
import { Course } from './Course';
import {User} from './User';
import {Entity, PrimaryGeneratedColumn,OneToMany, Column, ManyToOne, JoinColumn, BaseEntity, JoinTable} from "typeorm"

@Entity()
export class Session extends BaseEntity implements SessionInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(()=>Course)
    @JoinTable()
    course: Course

    @Column({type:"datetime"})
    startTime: Date;
    @Column({type:"datetime"})
    endTime: Date;

    @ManyToOne(()=> User)
    @JoinColumn()
    tutor: User

    @ManyToOne(()=> User)
    @JoinColumn()
    student: User


    init: (sessionData:SessionInterface) =>void = function(sessionData:SessionInterface){
        this.startTime = sessionData.startTime
        this.endTime = sessionData.endTime
    }
}