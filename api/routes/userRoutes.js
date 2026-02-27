import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import { authorizeToken } from '../middleware/authToken.js'

const userRoutes = Router()

userRoutes.post('/', UserController.create)
userRoutes.post('/login', UserController.login)
userRoutes.get('/', authorizeToken, UserController.list)
userRoutes.get('/:id', authorizeToken, UserController.getOne)
userRoutes.post('/atualizar', authorizeToken, UserController.updateMultiple)
userRoutes.post('/deletar', authorizeToken, UserController.deleteMultiple)
// userRoutes.delete('/:id', cookieAuth, UserController.delete)

export default userRoutes
