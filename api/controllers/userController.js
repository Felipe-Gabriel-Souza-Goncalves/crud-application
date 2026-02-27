import db from '../db.js'
import bycript from "bcrypt"
import jwt from 'jsonwebtoken'

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

    const user = db
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(email)

    if(user){
      return res.status(400).json({message: "Usuário já cadastrado com esses e-mail"})
    }


    const salt = await bycript.genSalt(10)
    const passwordSalted = await bycript.hash(password, salt)
    
    const result = db
      .prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, 'Visitante', CURRENT_TIMESTAMP)")
      .run(name, email, passwordSalted)

    
    const userId = result.lastID;

    // const accessToken = jwt.sign(
    //   { id: userId, email },
    //   process.env.ACCESS_TOKEN,
    //   { expiresIn: "15m" }
    // );

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   // sameSite: "strict",
    //   maxAge: 15 * 60 * 1000
    // });

    res.cookie("refreshToken", refreshToken, {
      sameSite: "Lax",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
    });



    res.status(201).json({ message: 'Usuário criado'})
  }




  static async login(req, res){
    try {
      const { email, password } = req.body

      if (!email || !password) return res.status(400).json({ error: 'Algum campo não foi inserido' })

      const user = db
        .prepare(`SELECT * FROM users WHERE email = ?`)
        .get(email)

      if(!user) return res.status(404).json({ message: "Usuário não encontrado"}) 
      const samePassword = await bycript.compare(password, user.password)

      if(!samePassword) return res.status(401).json({message: "E-mail ou senha incorreta"})

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN,
        { expiresIn: "7d" }
      );

      res.cookie("refreshToken", refreshToken, {
        sameSite: "Lax",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
      });


      return res.status(200).json({
        message: `Bem-vindo, ${user.name}`,
        redirectTo: user.role === 'Administrador' ? '/admin.html' : '/home.html'
      });

    } catch (error) {
      return res.status(500).json({message: "Erro interno no servidor"})
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



  static updateMultiple(req, res) {
    const changes = req.body.changes
    if(!changes) return res.status(403).json({error: "Não há índices para deletar"})

    try {
      const query = db
        .prepare(`UPDATE users SET name = @name, role = @role WHERE id = @id`)
  
      const enviarMudancas = db.transaction((changes) =>{
        for(const change of changes){
          query.run(change)
        }
      })
  
      enviarMudancas(changes)
  
      return res.status(200).json({message: "Usuários atualizados com sucesso"})
    } catch (error) {
      return res.status(500).json({error: error})
    }
  }



  static deleteMultiple(req, res) {
    const ids = req.body.ids
    if(!ids) return res.status(403).json({error: "Não há índices para deletar"})

    const placeholder = ids.map(() => '?').join(',')
    
    const result = db
      .prepare(`DELETE FROM users WHERE id in (${placeholder})`)
      .run(...ids)


    res.status(204).json({ message: 'Usuários removidos' })
  }


  static delete(req, res) {
    

    const result = db
      .prepare('DELETE FROM users WHERE id = ?')
      .run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json({ message: 'Usuário removido' })
  }

}
