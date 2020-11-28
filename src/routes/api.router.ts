import { User } from '../models/User';
import {Router}  from 'express';
import {check, validationResult} from 'express-validator'
import {Container} from 'typedi';
import SessionService from '../services/SessionService';
import authRouter from './auth.router';

var router: Router = Router();
router.use('/auth', authRouter);
//all routes with /auth are defned in authRouter

router.get('/get-session',
    [
        check('id').isString(),
        check('id').isLength({min:36,max:36})
    ],async (req,res)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const sessionService = Container.get(SessionService)
        let session = await sessionService.getSession(req.body.id)
        res.status(200).json({session:session})
        
})


export = router;


