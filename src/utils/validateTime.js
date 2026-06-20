import dayjs from '../utils/dayjs.js'
import { horarios } from './availableTimes.js'

export function validateTime(dayjsI, dayjsF, roomReservations, horaInicio, horaFim) {

    const conflictedTime = 
        roomReservations.some(reservation => {
            const inicioReserva = dayjs(reservation.horaInicio, 'HH:mm')
            const fimReserva = dayjs(reservation.horaFim, 'HH:mm')

            return dayjsF.isAfter(inicioReserva) && dayjsI.isBefore(fimReserva)
        }) ||
        dayjsI.isSameOrAfter(dayjsF) ||
        !horarios.some(horario => horario.hora === horaInicio) ||
        !horarios.some(horario => horario.hora === horaFim)

    return conflictedTime
}
export function validateDate(date, horaInicio) {
    const today = dayjs()

    const invalidDate = dayjs(
        `${date} ${horaInicio}`,
        'YYYY-MM-DD HH:mm'
    ).isSameOrBefore(today)

    return invalidDate
}