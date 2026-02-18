import express from 'express'
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";

const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(express.static(path.resolve('public')))

// rotas da API
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
})

export default app
