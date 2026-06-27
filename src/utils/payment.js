import dayjs from "../utils/dayjs.js"

export function isExpired(reservation) {
    return dayjs().isAfter(reservation.expiresAt)
}

