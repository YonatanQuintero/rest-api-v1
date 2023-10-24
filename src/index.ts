import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import router from "./routers"

const app = express()

app.use(
  cors({
    credentials: true,
  })
)

app.use(cookieParser())
app.use(compression())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(1020, () => {
  console.log("Server running on port 1020")
})

const MONGO_URL = "mongodb+srv://yhonaxqrz:6GxDQ7HKaQygX4Kh@cluster0.z2uzkhi.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on("error", (error: Error) => {
  console.error(error)
})

app.use("/", router())
