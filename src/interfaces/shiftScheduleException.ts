import { UserInterface} from './userInterface';
import { ChangeCode } from '../models/enums/ChangeCode';
export interface ShiftScheduleExceptionInterface{
    id: string
    changeCode:ChangeCode
    tutor: UserInterface
    startTime: number
    endTime: number

}
