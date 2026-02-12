import jwt from "jsonwebtoken";

export function cookieAuth(req, res, next){
  try {
    console.log("middleware, ebaaaa")
    next()
  } catch (error) {
    console.log("moiou, ó:", error)
  }
}