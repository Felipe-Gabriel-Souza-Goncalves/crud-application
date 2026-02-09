import { Router } from 'express'
import { UserController } from '../controllers/userController.js'

const userRoutes = Router()

userRoutes.post('/', UserController.create)
userRoutes.post('/login', UserController.login)
userRoutes.get('/', UserController.list)
userRoutes.get('/:id', UserController.getOne)
userRoutes.put('/:id', UserController.update)
userRoutes.delete('/:id', UserController.delete)

export default userRoutes
