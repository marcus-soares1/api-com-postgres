require("dotenv").config()
const express = require("express")
const productsRouter = require("./routes/productsRouter")
const customersRouter = require("./routes/customersRouter")

const app = express()

app.use(express.json())
app.use("/api", productsRouter)
app.use("/api", customersRouter)

app.listen(process.env.PORT ?? 3000, ()=>console.log(`http://localhost:${PORT}/`))