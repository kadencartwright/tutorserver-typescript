import { AvailabilityInterface } from './../interfaces/availabilityInterface';
import { Availability } from './../models/Availabilty';

import {Service} from  'typedi'
@Service()
export default class AvailabilityService{

    constructor(){}
    getAvailability: (id:string) => Promise<Availability> = async function(id:string){
        return await Availability.findOne(id);
    }
    createAvailability: (availabilityData:AvailabilityInterface) => Promise<Availability> = async function(availabilityData:AvailabilityInterface){
        let availability:Availability =new Availability()//create a new role and pass in the data
        availability.init(availabilityData)
        return await Availability.save(availability)
    }

}