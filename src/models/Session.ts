import { SessionInterface } from './../interfaces/sessionInterface';
import { Course } from './Course';
import {User} from './User';
import {Entity, PrimaryGeneratedColumn,OneToOne, Column, ManyToOne, JoinColumn, BaseEntity, JoinTable} from "typeorm"

@Entity()
export class Session extends BaseEntity implements SessionInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(()=>Course)
    @JoinTable()
    course: Course

    @Column()
    startTime: number;
    @Column()
    endTime: number;

    @OneToOne(()=> User)
    @JoinColumn()
    tutor: User

    @OneToOne(()=> User)
    @JoinColumn()
    student: User


    init: (sessionData:SessionInterface) =>void = function(sessionData:SessionInterface){
        this.startTime = sessionData.startTime
        this.endTime = sessionData.endTime
    }
}