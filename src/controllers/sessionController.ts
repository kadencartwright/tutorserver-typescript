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
    console.log('crrat')
    const sessionService = Container.get(SessionService)
    let sessionData:SessionInterface = {
        course:req.body.course,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        tutor: req.body.tutor,
        student: req.body.student
    }
    await sessionService.createSession(sessionData)
    .then(session=>{
        delete session.student.password
        delete session.tutor.password
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

export {getSession,createSession}