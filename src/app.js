import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.STRIPE_SECRET) {
    throw new Error('STRIPE_SECRET não definida.')
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definida.')
}

if (!process.env.WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET não definida.')
}

if (!process.env.BASE_URL) {
    throw new Error('BASE_URL não definida.')
}

import cookieParser from 'cookie-parser'
import { homeRouter } from './routes/homeRoute.js'
import { roomRoute } from './routes/roomRoute.js'
import { reservationRouter } from './routes/reservationRoute.js'
import { authRouter } from './routes/authRoute.js'
import { loadUserMid } from './middlewares/loadUserMid.js'
import { paymentRouter } from './routes/paymentRoute.js'
import { paymentController } from './controllers/paymentController.js'


const app = express()


app.set('view engine', 'ejs')
app.set('views', './views')

/* botei aqui, pois o parseamento pra json estava impedindo a rota de funcionar*/
app.post(
    '/payment/webhook',
    express.raw({ type: 'application/json' }),
    paymentController.webhook
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(loadUserMid)
app.use(express.static('./public'))


app.use('/', homeRouter)
app.use('/rooms', roomRoute)
app.use('/reservations', reservationRouter)
app.use('/auth', authRouter)
app.use('/payment', paymentRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`)
})

