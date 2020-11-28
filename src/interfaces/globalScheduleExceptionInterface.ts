import { ChangeCode } from '../models/enums/ChangeCode';
export interface GlobalScheduleExceptionInterface{
    id?: string
    startTime?: number

    endTime?: number

    changeCode?:ChangeCode
}