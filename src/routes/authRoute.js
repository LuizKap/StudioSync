import express from 'express'
import { authController } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/register', (req, res) => res.render('auth/register'))
authRouter.get('/login', (req, res) => res.render('auth/login'))

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.post('/logout', authController.logout)

export { authRouter }