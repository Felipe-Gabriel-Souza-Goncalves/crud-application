import { Router } from 'express'
import { TokenController } from '../controllers/tokenController.js'

const tokenRoutes = Router()

tokenRoutes.post('/', TokenController.create)
tokenRoutes.get('/', TokenController.refresh)
tokenRoutes.delete('/', TokenController.delete)

export default tokenRoutes
