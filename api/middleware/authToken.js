import jwt from 'jsonwebtoken'
import 'dotenv/config';
import db from '../db.js'

export function authorizeToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);

    const dbUser = db
      .prepare(`SELECT * FROM users WHERE id = ?`)
      .get(user.id)

    console.log(dbUser)
    
    if(dbUser.role !== 'Administrador') return res.sendStatus(403);

  });
  

  next();
}