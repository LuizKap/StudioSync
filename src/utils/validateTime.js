import dayjs from '../utils/dayjs.js'
import { horarios } from './availableTimes.js'

export function validateTime(dayjsI, dayjsF, roomReservations) {

    const invalidOrder = dayjsI.isSameOrAfter(dayjsF)

    const invalidSlot = !horarios.some(h => h.hora === dayjsI.format('HH:mm')) || !horarios.some(h => h.hora === dayjsF.format('HH:mm'))

    const hasConflict = roomReservations.some(reservation => {
        const inicioReserva = dayjs(reservation.horaInicio, 'HH:mm')
        const fimReserva = dayjs(reservation.horaFim, 'HH:mm')

        return dayjsI.isBefore(fimReserva) && dayjsF.isAfter(inicioReserva)
    })

    return invalidOrder || invalidSlot || hasConflict
}

export function validateDate(date, horaInicio) {

    const reservationDateTime = dayjs(
        `${date} ${horaInicio}`,
        'YYYY-MM-DD HH:mm'
    )

    return reservationDateTime.isBefore(dayjs())
}