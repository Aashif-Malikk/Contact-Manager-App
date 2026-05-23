const express = require('express')
const router = require('./Router/routes')
const connectDB = require('./mongo/db')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/', router)

const PORT = process.env.PORT

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server was running on http://localhost:${PORT}`);
        })
    })