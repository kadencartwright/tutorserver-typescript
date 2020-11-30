import { SessionInterface } from './../interfaces/sessionInterface';
import {Session} from '../models/Session'
import {Service} from 'typedi';
import { getManager } from 'typeorm';
@Service()
export default class SessionService{
    

    constructor(){

    }
    //createSession:()

    getSessionsInRange: (start:Date, end:Date)=>Promise<Session[]> = async function(start:Date, end:Date){
        //takes in 2 date objects, converts to number(the way session times are stored in DB) and finds sessions within the range
        let sessions: Session[]
        let startTime: number = start.getTime()
        let endTime: number = start.getTime()
        sessions = await getManager()
                            .createQueryBuilder(Session,'session')
                            .where('session.startTime > :startTime',{startTime:startTime})
                            .andWhere('session.starTime < :endTime',{endTime:endTime})
                            .getMany()
        return sessions
    }

    getSession:(id:string) =>Promise<Session> = async function(id:string){
        let session:Session = await Session.findOne({id: id})
        return session
    }

    createSession: (sessionData:SessionInterface) => Promise<Session> = async function(sessionData:SessionInterface){
        let session:Session = new Session()
        session.init(sessionData)
        return await Session.save(session)
    }





}
