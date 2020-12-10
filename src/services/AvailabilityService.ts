import { GlobalScheduleException } from './../models/GlobalScheduleException';
import { Day } from './../models/enums/Day';
import { getManager } from 'typeorm';
import { AvailabilityInterface } from './../interfaces/availabilityInterface';
import { Availability } from './../models/Availabilty';

import {Service} from  'typedi'
import { availabilities } from '../dbInit';
import { start } from 'repl';
@Service()
export default class AvailabilityService{

    constructor(){}
    getAvailability: (id:string) => Promise<Availability> = async function(id:string){
        return await Availability.findOne(id);
    }
    createAvailability: (availabilityData:AvailabilityInterface) => Promise<Availability> = async function(availabilityData:AvailabilityInterface){
        
        let availability:Availability =new Availability()//create a new role and pass in the data
    
        availability.init(availabilityData)
        console.table(availability);
        return await Availability.save(availability)
    }

    getAvailabilityInRange: (startTime:Date,endTime:Date)=>Promise<Availability[]> = async function(startTime:Date,endTime:Date){
        //for every day inclusively between startTime and Endtime, we need to assess availability.
        //each day's availability should lool like availiability - GlobalScheduleException -/+ ShiftScheduleExceptions (-/+ because it can be add or drop shift)
        let availabilities: Availability[]

        for (let today = startTime; today<=endTime; today.setDate(today.getDate() + 1)){
            //now we can do something for each date between the 2 dates
            //GlobalScheduleException.find()
            availabilities.push(...await Availability.find({day:today.getDay()}))
        }
        availabilities

        return availabilities
    }

}