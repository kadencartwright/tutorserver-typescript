import { GlobalScheduleExceptionInterface } from './../interfaces/globalScheduleExceptionInterface';
import { ChangeCode } from './enums/ChangeCode';
import {Entity, PrimaryGeneratedColumn,BaseEntity, Column, JoinColumn} from "typeorm"

@Entity()
export class GlobalScheduleException extends BaseEntity implements GlobalScheduleExceptionInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    startTime: number

    @Column()
    endTime: number

    @Column()
    changeCode:ChangeCode


}
