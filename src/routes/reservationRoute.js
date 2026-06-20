import express from 'express'
import { reservationController } from '../controllers/reservationController.js'
import { ensureAuthMiddleware } from '../middlewares/ensureAuthMid.js'

const reservationRouter = express.Router()

reservationRouter.get('/', ensureAuthMiddleware, reservationController.getAll)
reservationRouter.get('/create/:roomId', ensureAuthMiddleware, reservationController.create)


reservationRouter.post('/:roomId', ensureAuthMiddleware, reservationController.storeReservation)
reservationRouter.delete('/:reservationId', ensureAuthMiddleware, reservationController.delete)

export { reservationRouter }