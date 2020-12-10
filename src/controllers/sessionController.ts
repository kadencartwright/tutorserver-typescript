import { Session } from './../models/Session';
import { SessionInterface } from './../interfaces/sessionInterface';
import { Container } from 'typedi';
import { validationResult } from 'express-validator';
import {Request,Response} from 'express';
import SessionService from '../services/SessionService'

let getSession: (req:Request,res:Response)=>void = async function(req,res){
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const sessionService = Container.get(SessionService)
    let session = await sessionService.getSession(req.body.id)
    let result:any = {...session}
    
    result.startTime = result.startTime.getTime()
    result.endTime = result.endTime.getTime()
    res.status(200).json({session:result})
}

let createSession:  (req:Request,res:Response)=>void = async function(req,res){
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const sessionService = Container.get(SessionService)
    req.body.startTime = new Date(req.body.startTime)
    req.body.endTime = new Date(req.body.endTime)
    let sessionData:SessionInterface = {
        course:req.body.course,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        tutor: req.body.tutor,
        student: req.body.student
    }
    await sessionService.createSession(sessionData)
    .then(session=>{
        res.status(201).json({
            message:"session created",
            sessionId:session.id
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send('sorry, there was an issue on our end')
    })

}

let getSessionsInRange: (req:Request,res:Response)=>void = async function(req,res){
    console.table(req.query)
    let data:any = req.query;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        let start:Date = new Date(Number.parseInt(data.startTime))
        let end:Date = new Date(Number.parseInt(data.endTime))
    
        console.log({start:start,end:end})
        const sessionService = Container.get(SessionService)
        await sessionService.getSessionsInRange(start,end).then(sessions=>{
            res.status(200).json(sessions)
        })
    }
}
let getSessions: (req:Request,res:Response)=>void = async function(req,res){
    const sessionService = Container.get(SessionService)
    try{
        let sessions:SessionInterface[] = await sessionService.getSessions();
        res.status(200).json(sessions)
    }catch(e){
        console.log(e)
        res.status(500).send('sorry, something went wrong')
    }


}


export {getSession,createSession,getSessionsInRange,getSessions}