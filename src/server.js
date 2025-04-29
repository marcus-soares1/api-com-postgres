require("dotenv").config()
const express = require("express")
const router = require("./routes")

const app = express()

app.use(express.json())
app.use("/api", router)

app.listen(process.env.PORT ?? 3000, ()=>console.log(`http://localhost:${PORT}/`))