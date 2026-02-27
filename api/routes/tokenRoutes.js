import { Router } from 'express'
import { TokenController } from '../controllers/tokenController.js'

const tokenRoutes = Router()

tokenRoutes.post('/refresh', TokenController.refresh)
tokenRoutes.post('/authorization', TokenController.authorization)
tokenRoutes.post('/delete', TokenController.logout)

export default tokenRoutes
