import express from 'express'; 
import { isLoggedIn } from '../middleware/isloggedin.js';
import { getUser } from '../controllers/user.controllers.js';

const router=express()

router.get('/' ,isLoggedIn,getUser)

export default router