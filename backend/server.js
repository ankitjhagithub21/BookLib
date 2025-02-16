require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDB = require('./db/conn')
const authRouter = require('./routes/authRoutes')
const bookRouter = require('./routes/bookRoutes')
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.static('public'))

app.use(express.json());
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth",authRouter)
app.use("/api/books",bookRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})