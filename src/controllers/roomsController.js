import { reservationModel } from "../models/reservationModel.js"
import { roomsModel } from "../models/roomModel.js"
import { horarios } from "../utils/availableTimes.js"
import dayjs from '../utils/dayjs.js'


const roomsController = {

    getAll: (req, res) => {
        const user = req.user
        const rooms = roomsModel.getAll()
        if (!rooms || rooms.length === 0) return res.status(404).send('Não encontrado')
        else res.render('rooms', { rooms, user })
    },

    availability: (req, res) => {
        const { roomId } = req.params
        const { date } = req.query

        if (!date) return res.status(400).send('Data não informada')

        const reservations = reservationModel.getAll()

        const roomReservations = reservations.filter(reservation => reservation.roomId === roomId && reservation.data === date)

        const horasDisponiveis = horarios.map(horario => {
            const estaOcupado = roomReservations.some(reserva => horario.hora === reserva.horaInicio || dayjs(horario.hora, 'HH:mm').isBetween(dayjs(reserva.horaInicio, 'HH:mm'), dayjs(reserva.horaFim, 'HH:mm')))

            return { hora: horario.hora, disponivel: estaOcupado ? false : true }
        })

        res.json(horasDisponiveis)
    }
}

export { roomsController }