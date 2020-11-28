import {Router}  from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';
import {check, validationResult} from 'express-validator'
import { TokenInterface } from '../interfaces/tokenInterface';
import { LoginInterface } from '../interfaces/loginInterface';
import {Container} from 'typedi';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import * as apiController from '../controllers/apiController'
import * as authController from'../controllers/authController'
var router: Router = Router();
var apiRouter: Router = Router();


/**
 * Root Routes
 */
router.get('/', (req,res)=>{
    res.send('running')
})

    /**
     * API Routes (/api/v1/*) 
     */
    router.use('/api/v1', apiRouter)
    apiRouter.get('/get-session',
    [
        check('id').isString(),
        check('id').isLength({min:36,max:36})
    ],apiController.getSession)

        /**
         * Auth Routes
         * (/api/v1/auth/*) 
         */
        apiRouter.use('/auth', authRouter);
        var authRouter: Router = Router();


        authRouter.post('/login',[
            check('email').isEmail(),
            check('password').isString(),
        ], authController.login)


        authRouter.post('/create-user',[
            check('email').isEmail(),
            check('password').isString(),
            check('password').isLength({min:8}),
            check('phoneNumber').isMobilePhone('any'),
            check('firstName').isString(),
            check('lastName').isString()
        ],authController.createUser)


export = router;


