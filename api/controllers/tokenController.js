import jwt from 'jsonwebtoken'
export class TokenController {


  static async refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      (err, user) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN,
          { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken });
      }
    );
  }

  static async authorization(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  }

  static async logout(req, res){
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(304);
    }

    res.clearCookie('refreshToken', {
      sameSite: "Lax",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      path: "/"
    });
    return res.status(200)
  }


  // static async create(req, res) {
  //   const { name, email, password } = req.body

  //   if (!name || !email) {
  //     return res.status(400).json({ error: 'Nome e email são obrigatórios' })
  //   }


  //   const user = {name, email}

  //   const token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: "60s"})
  //   res.status(201).json({accessToken: token, message: 'Usuário criado' })
  // }






  // static async delete(req, res) {
  //   res.json(users)
  // }

}
