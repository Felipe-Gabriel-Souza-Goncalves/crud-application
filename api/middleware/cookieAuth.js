import jwt from "jsonwebtoken";

export function cookieAuth(req, res, next){
  try {    
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
    });
      
    next()
  } catch (error) {
    res.status(500).send({message: "Erro interno do servidor:", error})
  }
}