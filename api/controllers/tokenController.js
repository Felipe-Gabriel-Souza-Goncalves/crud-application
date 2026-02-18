// posivelmente inutilizado

import jwt from 'jsonwebtoken'
export class TokenController {



  static async create(req, res) {
    const { name, email, password } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }


    const user = {name, email}

    const token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: "60s"})
    res.status(201).json({accessToken: token, message: 'Usuário criado' })
  }



  static async refresh(req, res) {
    res.json(users)
  }



  static async delete(req, res) {
    res.json(users)
  }

}
