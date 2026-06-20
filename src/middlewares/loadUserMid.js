import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'

export function loadUserMid(req, res, next) {
    const token = req.cookies?.token

    if (!token) {
        req.user = null
        return next()
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const user = userModel.getById(userId) || null
        req.user = user
        next()
    } catch { req.user = null }
}