import { v4 as uuidv4 } from 'uuid'
import { reservationModel } from '../models/reservationModel.js'
import { roomsModel } from '../models/roomModel.js'
import { horarios } from '../utils/availableTimes.js'
import { calculatePrice } from '../utils/calculatePrice.js'
import { validateDate, validateTime } from '../utils/validateTime.js'
import dayjs from '../utils/dayjs.js'



const reservationController = {

    getAll: (req, res) => {
        const user = req.user
        const reservations = reservationModel.getAllByUserId(user.id)

        res.render('reservations', {
            reservations,
            user
        })
    },

    create: (req, res) => {
        const user = req.user
        const { roomId } = req.params
        const room = roomsModel.getById(roomId)
        if (!room) return res.status(404).send('Sala Não encontrada')

        res.render('reservations/create', {
            room,
            user
        })
    },

    storeReservation: (req, res) => {
        const user = req.user
        const { roomId } = req.params
        const { date, horaInicio, horaFim } = req.body

        const room = roomsModel.getById(roomId)
        if (!room) return res.status(404).send('sala não encontrada')
        if (!date || !horaInicio || !horaFim) return res.status(400).send('Todos os campos são obrigatórios')

        const roomReservations = reservationModel.getAllByRoomId(roomId).filter(reservation => reservation.data === date)
        const dayjsI = dayjs(horaInicio, 'HH:mm')
        const dayjsF = dayjs(horaFim, 'HH:mm')

        const conflicted = validateTime(dayjsI, dayjsF, roomReservations, horaInicio, horaFim) || validateDate(date, horaInicio)
        if (conflicted) return res.status(400).send('Horários ou datas Inválido(a)s')

        //Regra de negócio: Só pode fazer uma nova reserva depois de pagar a que está pendente
        const pending = reservationModel.getPendingByUserId(user.id)
        if (pending.length >= 1) {
            return res.status(400).send(
                'Você deve pagar a reserva pendente antes de fazer uma nova.'
            )
        }
        
        const total = calculatePrice(horaInicio, horaFim, room.precoHora)
        reservationModel.storeReservation({
            id: uuidv4(),
            userId: user.id,
            roomId: roomId,
            salaNome: room.nome,
            data: date,
            createdAt: dayjs().toDate(),
            expiresAt: dayjs().add(10, 'minute').toDate(),
            horaInicio: horaInicio,
            horaFim: horaFim,
            status: 'pagamento pendente',
            total: total
        })
        res.redirect('/reservations')
    }

}

export { reservationController }