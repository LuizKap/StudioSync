import express from 'express'
import { reservationController } from '../controllers/reservationController.js'
import { ensureAuthMiddleware } from '../middlewares/ensureAuthMid.js'
import { checkReservationMid } from '../middlewares/checkReservation.js'

const reservationRouter = express.Router()

reservationRouter.get('/', ensureAuthMiddleware, checkReservationMid, reservationController.getAll)
reservationRouter.get('/create/:roomId', ensureAuthMiddleware, checkReservationMid, reservationController.create)

reservationRouter.post('/:roomId', ensureAuthMiddleware, reservationController.storeReservation)


export { reservationRouter }