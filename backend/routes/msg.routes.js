import express from 'express';
import { getmsg, sendmsg } from '../controllers/msg.controllers.js';
import { isLoggedIn } from '../middleware/isloggedin.js';

const router = express()


router.get('/:id', isLoggedIn, getmsg)
router.post('/send/:id', isLoggedIn, sendmsg)


export default router;