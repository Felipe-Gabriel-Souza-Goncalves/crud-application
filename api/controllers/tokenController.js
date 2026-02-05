
export class TokenController {



  static async create(req, res) {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' })
    }

    res.status(201).json({ message: 'Usuário criado' })
  }



  static async refresh(req, res) {
    res.json(users)
  }



  static async delete(req, res) {
    res.json(users)
  }



}
