import Stripe from 'stripe'
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import { reservationModel } from '../models/reservationModel.js'
import { roomsModel } from '../models/roomModel.js'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET)

export const paymentController = {

    createCheckoutSession: async (req, res) => {
        const user = req.user
        const { reservationId } = req.params

        const reservation = reservationModel.getReservationById(reservationId)
        if (!reservation) return res.status(404).send('Reserva não encontrada')
        if (reservation.userId !== user.id) return res.status(403).send('Acesso negado')

        const room = roomsModel.getById(reservation.roomId)
        if (!room) return res.status(404).send('Sala não encontrada')


        const session = await stripe.checkout.sessions.create(
            {
                success_url: 'http://localhost:3000/payment/success',
                cancel_url: 'http://localhost:3000/payment/cancel',
                line_items:
                    [{
                        price_data: { currency: 'brl', product_data: { name: room.nome, description: room.descricao }, unit_amount: reservation.total * 100 },
                        quantity: 1
                    }],
                mode: 'payment',
                metadata: {
                    reservationId: reservation.id,
                    userId: user.id
                }, payment_method_types: ['card', 'boleto']
            }
        )

        res.redirect(303, session.url)
    },

    success: (req, res) => {
        const user = req.user
        res.render('payment/success', { user })
    },

    cancel: (req, res) => {
        res.redirect('/')
    },

    webhook: (req, res) => {
        try {
            const signature = req.headers['stripe-signature']
            const event = stripe.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET)
            const session = event.data.object

            if (event.type === 'checkout.session.completed' && session.payment_status === 'paid') {
                const reservationId = session.metadata.reservationId
                const userId = session.metadata.userId

                const reservation = reservationModel.getReservationById(reservationId)
                if (!reservation || reservation.userId !== userId) return

                reservationModel.confirmReservation(reservationId)
            }

            return res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return res.sendStatus(400)
        }

    }
}

