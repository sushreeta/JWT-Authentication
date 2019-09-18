const express = require('express')
const router = express.Router()
const {User} = require('../model/user')

//localhost:3000/users/register
router.post('/register', (req,res)=>{
     const body = req.body
     const user = new User(body)
     user.save()
          .then((user)=>{
               res.json(user)
          })
          .catch((err)=>{
               res.send(err)
          })
})

//localhost:3000/users/register

//localhost:3000/users/register

module.exports = {
     userRouter : router
}