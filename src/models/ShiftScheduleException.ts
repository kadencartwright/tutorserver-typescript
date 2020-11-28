import { ShiftScheduleExceptionInterface } from './../interfaces/shiftScheduleException';
import { ChangeCode} from './enums/ChangeCode';
import {Entity, PrimaryGeneratedColumn,OneToOne, Column, JoinColumn, BaseEntity} from "typeorm"
import {User} from './User'

@Entity()
export class ShiftScheduleException extends BaseEntity implements ShiftScheduleExceptionInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    changeCode:ChangeCode

    @OneToOne(()=>User)
    @JoinColumn()
    tutor: User;


    @Column()
    startTime: number

    @Column()
    endTime: number

}
