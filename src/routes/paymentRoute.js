import express from 'express'
import { paymentController } from '../controllers/paymentController.js'
import { ensureAuthMiddleware } from '../middlewares/ensureAuthMid.js'
const paymentRouter = express.Router()


paymentRouter.get('/success', paymentController.success)
paymentRouter.get('/cancel', paymentController.cancel)

paymentRouter.post('/checkout/:reservationId', ensureAuthMiddleware, paymentController.createCheckoutSession)

export { paymentRouter }