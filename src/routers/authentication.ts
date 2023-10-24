import express from "express"
import { register, init } from "../controllers/authentication"

export default (router: express.Router) => {
  router.get("/auth/init", init)
  router.post("/auth/register", register)
}
