import express from 'express'
import { roomsController } from '../controllers/roomsController.js'
const roomRoute = express.Router()

roomRoute.get('/', roomsController.getAll)
roomRoute.get('/:roomId/availability', roomsController.availability)

export { roomRoute }