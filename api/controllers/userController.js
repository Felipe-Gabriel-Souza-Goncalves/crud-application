import db from '../db.js'
import bycript from "bcrypt"

export class UserController {

  static async create(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Algum campo não foi inserido' })
    }

    if (typeof(name) !== "string" ||
        typeof(email) !== "string" || 
        typeof(password) !== "string") {
      return res.status(400).json({ error: 'Envio de informações incompatível' })
    }

    const usuario = db
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(email)

    if(usuario){
      return res.status(400).json({message: "Usuário já cadastrado com esses e-mail"})
    }


    const salt = await bycript.genSalt(10)
    const passwordSalted = await bycript.hash(password, salt)
    
    db
      .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run(name, email, passwordSalted)

    res.status(201).json({ message: 'Usuário criado' })
  }




  static async login(req, res){
    try {
      const { name, password } = req.body
  
      if (!name || !password) { // FUTURAMENTE TERÁ E-MAIL
        return res.status(400).json({ error: 'Algum campo não foi inserido' })
      }
  
      const usuario = 
        db.prepare(`
          SELECT * FROM users WHERE name = ?
        `).get([name])
  
      if(!usuario){
        return res.status(404).json({ message: "Usuário não encontrado"})
      } 
  
      const samePassword = await bycript.compare(password, usuario.password)

      if(samePassword){
        return res.status(200).json({message: `Bem-vindo, ${usuario.name}`})
      } else{
        return res.status(401).json({message: `Acesso negado`})
      }
  
    } catch (error) {
      return res.status(500).json({message: "Erro interno no servidor", erro: error}) 
    }

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
