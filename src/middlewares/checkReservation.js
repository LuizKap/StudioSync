import { reservationModel } from "../models/reservationModel.js"

export function checkReservationMid(req, res, next) {
    reservationModel.cleanExpiredReservations()
    return next()
}