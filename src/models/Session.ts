import { SessionInterface } from './../interfaces/sessionInterface';
import { Course } from './Course';
import {User} from './User';
import {Entity, PrimaryGeneratedColumn,OneToOne, Column, ManyToOne, JoinColumn, BaseEntity} from "typeorm"

@Entity()
export class Session extends BaseEntity implements SessionInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(()=>Course)
    class: Course


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
}