import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'


export function ensureAuthMiddleware(req, res, next) {
    const token = req.cookies?.token

    if (!token) return res.redirect('/auth/login')

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const user = userModel.getById(userId)

        if (!user) {
            return res.redirect('/auth/login')
        }

        req.user = user
        next()
    } catch (err) {
        return res.redirect('/auth/login')
    }
}


