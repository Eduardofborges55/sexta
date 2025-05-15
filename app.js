import express from "express";

import { userRoutes } from "./routes.js"

const app = express()

app.use(express.json())
app.use("/user",userRoutes)

export default app