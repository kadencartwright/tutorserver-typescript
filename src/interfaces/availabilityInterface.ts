import { User } from '../models/User'
import { Day } from '../models/enums/Day';
export interface AvailabilityInterface{
    id?: string;
    day?: Day
    startTime?: number
    endTime?: number//ex, 0100 is 1 am, 1245 is 12:45pm,  1453 = 2:53Pm
    tutor?: User
}