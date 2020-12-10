import {Router}  from 'express';
import {check} from 'express-validator'
import * as sessionController from '../controllers/sessionController'
import * as authController from'../controllers/authController'
var router: Router = Router()
var apiRouter: Router = Router()
var authRouter: Router = Router()
import * as dbInitController from '../controllers/dbInitController'
import * as availabilityController from '../controllers/availabilityController'

/**
 * Root Routes
 */
router.get('/dbInit',dbInitController.initDb)// dont need this unless we need to generate a new dbData.json file


router.get('/', (req,res)=>{
    res.send('running')
})

    /**
     * API Routes (/api/v1/*) 
     */
    router.use('/api/v1', apiRouter)
    apiRouter.get('/session',
    [
        check('id').isString(),
        check('id').isLength({min:36,max:36})
    ],sessionController.getSession)
    apiRouter.post('/session',[
        check('course').isString(),
        check('tutor').isString(),
        check('student').isString(),
        check('startTime').isNumeric(),
        check('endTime').isNumeric(),
    ],sessionController.createSession)
    
    apiRouter.post('/availability',[
        check('startTime').isNumeric(),
        check('endTime').isNumeric(),
        check('day').isNumeric(),
        check('tutorEmail').isString()
    ], availabilityController.createAvailability)

    apiRouter.get('/sessions-in-range',[
        check('startTime').isNumeric(),
        check('endTime').isNumeric(),
    ], sessionController.getSessionsInRange)
        /**
         * Auth Routes
         * (/api/v1/auth/*) 
         */
        apiRouter.use('/auth',authRouter)

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


