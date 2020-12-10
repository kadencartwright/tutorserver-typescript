import { AvailabilityInterface } from './../interfaces/availabilityInterface';
import {Entity, BaseEntity, PrimaryGeneratedColumn,ManyToOne, Column, JoinTable} from "typeorm"
import {Day} from './enums/Day';
import {User} from './User'
@Entity()
export class Availability extends BaseEntity implements AvailabilityInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    day: Day
    
    @Column()
    startTime: number
    @Column()
    endTime: number//ex, 0100 is 1 am, 1245 is 12:45pm,  1453 = 2:53Pm

    @ManyToOne(()=>User)
    @JoinTable()
    tutor: User
    init: (availabilityData:AvailabilityInterface)=>void=function(availabilityData:AvailabilityInterface){
        this.day = availabilityData.day
        this.endTime = availabilityData.endTime
        this.startTime = availabilityData.startTime
        this.tutor = availabilityData.tutor
        }

}