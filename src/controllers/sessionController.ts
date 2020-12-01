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
    res.status(200).json({session:session})
}

export {getSession}