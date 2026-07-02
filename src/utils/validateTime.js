import dayjs from '../utils/dayjs.js'
import { horarios } from './availableTimes.js'

export function validateTime(dayjsI, dayjsF, roomReservations) {

    // Verifica se o horário inicial é posterior ou igual ao final
    const invalidOrder = dayjsI.isSameOrAfter(dayjsF)

    // Verifica se os horários existem entre os horários permitidos
    const invalidSlot = !horarios.some(h => h.hora === dayjsI.format('HH:mm')) || !horarios.some(h => h.hora === dayjsF.format('HH:mm'))

    // Verifica se a reserva entra em conflito com outra já existente
    const hasConflict = roomReservations.some(reservation => {
        const inicioReserva = dayjs(reservation.horaInicio, 'HH:mm')
        const fimReserva = dayjs(reservation.horaFim, 'HH:mm')
    
        // Há conflito quando a nova reserva começa antes da reserva existente terminar
        // e termina depois da reserva existente começar.
        return dayjsI.isBefore(fimReserva) && dayjsF.isAfter(inicioReserva)
    })

    // Retorna true caso alguma validação falhe
    return invalidOrder || invalidSlot || hasConflict
}

export function validateDate(date, horaInicio) {

    // Combina data e horário para criar um único objeto Day.js
    const reservationDateTime = dayjs(
        `${date} ${horaInicio}`,
        'YYYY-MM-DD HH:mm'
    )
    // Impede reservas em datas e horários passados
    return reservationDateTime.isBefore(dayjs())
}