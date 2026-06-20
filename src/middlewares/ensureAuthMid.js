import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'


export function ensureAuthMiddleware(req, res, next) {
    const token = req.cookies?.token

    if (!token) return res.status(401).send("Não autenticado")

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const user = userModel.getById(userId)

        if (!user) {
            return res.status(401).redirect('/auth/login')
        }

        req.user = user
        next()
    } catch (err) {
        return res.status(401).send('Token Inválido / expirado')
    }
}


