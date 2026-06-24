let reservations = []

const reservationModel = {

    getReservationById: (reservationId) => reservations.find(reservation => reservation.reservationId === reservationId),

    getAll: () => reservations,

    getAllByUserId: (userId) => reservations.filter(reservation => reservation.userId === userId),

    getAllByRoomId: (roomId) => reservations.filter(reservation => reservation.roomId === roomId),

    storeReservation: (reservation) => {
        reservations.push(reservation)
        
    },

    delete: (reservationId) => {
        const filterReservations = reservations.filter(reservation => reservation.reservationId !== reservationId)
        reservations = filterReservations
    }

}

export { reservationModel }