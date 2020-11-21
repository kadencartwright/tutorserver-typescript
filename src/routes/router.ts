import {Router}  from 'express';
import apiRouter from './api-router'

var router: Router = Router();


router.use('api/v1', apiRouter)

export = router;


