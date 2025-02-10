require('dotenv').config()

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const customerRoutes = require('./routes/customer')


// express app
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    next()
})

//routes
app.use('/api/customer', customerRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log("connected to db and listening on port 4000")
        })
    })
    .catch((err) => {
        console.log(err)
    })
