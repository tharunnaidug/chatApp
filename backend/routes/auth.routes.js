import express from 'express';
import { login, logout, register } from '../controllers/auth.controllers.js';

const router=express()

router.post("/login",login)

router.get("/logout",logout)

router.post("/register",register)


export default router