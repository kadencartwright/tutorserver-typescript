import { Availability } from './../models/Availabilty';
import { Course } from './../models/Course';
import { Session } from './../models/Session';
import {Service,Container} from  'typedi'
import SessionService from './SessionService';
import AvailabilityService from './AvailabilityService';
@Service()
export default class CalendarService{

    getAvailableSessions: (course:Course,startTime:Date,endTime:Date)=>Promise<Session[]> = async function(course:Course,startTime:Date,endTime:Date){
        //get all sessions in time frame where tutor can tutor class
        let sessionService:SessionService = Container.get(SessionService)
        let availabilityService:AvailabilityService = Container.get(AvailabilityService)
        
        //filter out sessions that are booked
        //first get the booked sessions then use it to filter the master availability array
        let bookedSessions:Session[] = await sessionService.getSessionsInRange(startTime,endTime)
        
        let availabilities: Availability[] = await availabilityService.getAvailabilityInRange(startTime,endTime)

        for (let availability of availabilities ){
            availability.startTime
            availability.endTime
        }

        //return what's left
        return bookedSessions

    }


}