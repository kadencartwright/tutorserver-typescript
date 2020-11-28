import {Router}  from 'express';
import apiRouter from './api.router'

var router: Router = Router();

router.get('/', (req,res)=>{
    res.send('running')
})


router.use('/api/v1', apiRouter)


export = router;


