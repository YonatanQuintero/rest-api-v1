import express from "express"
import { getUserByEmail, createUser } from "../db/users"

import { random, authentication } from "../helpers"

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
      throw new Error("Email, username and password are required")
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new Error("The user already exists" + email)
    }

    const salt = random()
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    })

    return res.status(200).json(user).end()
  } catch (error) {
    console.error(error)
    return res.sendStatus(400)
  }
}

export const init = async (req: express.Request, res: express.Response) => {
  try {
    res.json({ status: "ok" }).sendStatus(200).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
