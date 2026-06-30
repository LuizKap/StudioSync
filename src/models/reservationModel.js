import { isExpired } from "../utils/payment.js"

let reservations = []

const reservationModel = {

    getReservationById: (reservationId) => reservations.find(r => r.id === reservationId),

    getAll: () => reservations,

    getPendingByUserId: (userId) => {
        return reservations.filter(r =>
            r.userId === userId &&
            r.status === 'pagamento pendente'
        )
    },

    getAllByUserId: (userId) => reservations.filter(r => r.userId === userId),

    getAllByRoomId: (roomId) => reservations.filter(r => r.roomId === roomId),

    storeReservation: (reservation) => {
        reservations.push(reservation)
    },

    cleanExpiredReservations: () => {
        reservations = reservations.filter(reservation => {
            return !(
                reservation.status === 'pagamento pendente' &&
                isExpired(reservation)
            )
        })
    },

    confirmReservation: (reservationId) => {
        const r = reservations.find(r => reservationId === r.id)
        r.status = 'confirmado'
    }
}

export { reservationModel }