import { log } from "console";
import express from "express";

const app = express()

app.listen(3000, () => {
    log('Server is running in Port 3000!!!')
})

