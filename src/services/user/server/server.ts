import cors from "cors"
import express, { Request, Response } from "express"
import http from "http"
import https from "https"
import authenticationRouter from "../routers/authentication"
import passRouter from "../routers/pass-router"
import userRouter from "../routers/user"
const app = express()

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use("/auth", authenticationRouter) 
app.use("/pass", passRouter)
app.use("/user", userRouter)

app.get("/", (req: Request, res: Response) => {
    console.log("all systems are nominal")
    res.sendStatus(200)
})

export const startHttpsServer = () => {
    const port = 8081
    const server = https.createServer(
        {
            rejectUnauthorized: false,
            requestCert: false,
        },
        app
    )

    server.listen(port, () => {
        console.log(`Server is running at https://localhost:${port}`)
    })
}

export const startHttpServer = () => {
    const port = 8080
    const server = http.createServer(app)

    server.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}
