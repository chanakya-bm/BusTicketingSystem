const express = require('express')
const cors = require('cors')
const db = require('./connection/connection')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

app.get('/',(req,res)=>{
    return res.status(200).send("API is up")
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})