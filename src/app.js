import express from 'express'
import dotenv from 'dotenv'
import { homeRouter } from './routes/homeRoute.js'
import { roomRoute } from './routes/roomRoute.js'
import { reservationRouter } from './routes/reservationRoute.js'
import { authRouter } from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import { loadUserMid } from './middlewares/loadUserMid.js'
dotenv.config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cookieParser())
app.use(loadUserMid)

app.use(express.static('./public'))


app.use('/', homeRouter)
app.use('/rooms', roomRoute)
app.use('/reservations', reservationRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})

