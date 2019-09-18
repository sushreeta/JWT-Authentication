const express = require('express')
const app =express()
app.use(express.json())
const { mongoose } = require('./config/database')
const { userRouter } = require('./app/controller/usersController')

const port = 3000

app.use('/users', userRouter)


app.listen(port, function(){
     console.log('listening to port', port)
})


