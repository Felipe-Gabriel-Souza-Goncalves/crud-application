import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import { cookieAuth } from '../middleware/cookieAuth.js'

const userRoutes = Router()

userRoutes.post('/', UserController.create)
userRoutes.post('/login', cookieAuth, UserController.login)
userRoutes.get('/', cookieAuth, UserController.list)
userRoutes.get('/:id', cookieAuth, UserController.getOne)
userRoutes.post('/atualizar', cookieAuth, UserController.updateMultiple)
userRoutes.post('/deletar', cookieAuth, UserController.deleteMultiple)
// userRoutes.delete('/:id', cookieAuth, UserController.delete)

export default userRoutes
