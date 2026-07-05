import Stripe from 'stripe'
import dayjs from 'dayjs'
import { reservationModel } from '../models/reservationModel.js'
import { roomsModel } from '../models/roomModel.js'

const BASE_URL = process.env.BASE_URL
const stripe = new Stripe(process.env.STRIPE_SECRET)

export const paymentController = {

    // Cria uma sessão de pagamento para a reserva selecionada
    createCheckoutSession: async (req, res) => {
        const user = req.user
        const { reservationId } = req.params

        const reservation = reservationModel.getReservationById(reservationId)
        // Verifica se a reserva existe e pertence ao usuário autenticado
        if (!reservation) return res.status(404).send('Reserva não encontrada')
        if (reservation.userId !== user.id) return res.status(403).send('Acesso negado')

        const room = roomsModel.getById(reservation.roomId)
        if (!room) return res.status(404).send('Sala não encontrada')

        // Cria a sessão de pagamento na Stripe
        try {
            const session = await stripe.checkout.sessions.create({
                success_url: `${BASE_URL}/payment/success`,
                cancel_url: `${BASE_URL}/payment/cancel`,
                line_items: [{
                    price_data: { currency: 'brl', product_data: { name: room.nome, description: room.descricao }, unit_amount: reservation.total * 100 },
                    quantity: 1
                }],
                mode: 'payment',
                metadata: {
                    reservationId: reservation.id,
                    userId: user.id
                }, payment_method_types: ['card', 'boleto']
            })

            return res.redirect(303, session.url)
        } catch (error) {
            console.error('Erro ao criar sessão do Stripe:' , error)
            return res.status(500).send('Erro ao iniciar pagamento')
        }

    },

    success: (req, res) => {
        const user = req.user
        res.render('payment/success', { user })
    },

    cancel: (req, res) => {
        res.redirect('/')
    },

    // Recebe notificações enviadas pela Stripe após mudanças no pagamento
    webhook: (req, res) => {
        try {
            // Valida a assinatura para garantir que o evento veio da Stripe
            const signature = req.headers['stripe-signature']
            const event = stripe.webhooks.constructEvent(req.body, signature, process.env.WEBHOOK_SECRET)
            const session = event.data.object

            // Processa apenas pagamentos concluídos com sucesso
            if (event.type === 'checkout.session.completed' && session.payment_status === 'paid') {
                const reservationId = session.metadata.reservationId
                const userId = session.metadata.userId

                //verifica se a reserva existe e pertence ao usuário logado
                const reservation = reservationModel.getReservationById(reservationId)
                if (!reservation || reservation.userId !== userId) return res.sendStatus(200)

                // Confirma a reserva após a confirmação do pagamento
                reservationModel.confirmReservation(reservationId)
            }

            // Responde à Stripe que o evento foi tratado (ou ignorado, que é o meu caso),
            // evitando novas tentativas de envio.
            return res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return res.sendStatus(400)
        }

    }
}

