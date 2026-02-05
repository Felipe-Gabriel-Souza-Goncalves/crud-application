import db from '../db.js'

export class UserController {

  static create(req, res) {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }

    // verificar se já existe
    // const userExists = db
    //   .prepare('SELECT * FROM users WHERE email = ?')
    //   .get(email)

    // if (userExists) {
    //   return res.status(400).json({ error: 'Usuário já existe' })
    // }

    // inserir
    db
      .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
      .run(name, email)

    res.status(201).json({ message: 'Usuário criado' })
  }




  static getOne(req, res) {
    const { id } = req.params

    const user = db
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(id)

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json(user)
  }



  static list(req, res) {
    const users = db
      .prepare('SELECT * FROM users')
      .all()

    res.json(users)
  }



  static update(req, res) {
    const { id } = req.params
    const { name, email } = req.body

    const result = db
      .prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
      .run(name, email, id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json({ message: 'Usuário atualizado' })
  }



  static delete(req, res) {
    const { id } = req.params

    const result = db
      .prepare('DELETE FROM users WHERE id = ?')
      .run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json({ message: 'Usuário removido' })
  }
}
