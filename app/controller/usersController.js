const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
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


// router.get('/info',(req,res)=>{
//      User.find()
//           .then((users)=>{
//                res.json(users)
//           })
//           .catch((err)=>{
//                res.json(err)
//           })
// })


//localhost:3000/users/register
router.post('/login', (req,res)=>{
     const body = req.body
     console.log(body)
     User.findByCredentials(body.email, body.password)
          .then((user)=>{
               console.log(user)
               res.send(user)
          })
          .catch((err)=>{
               res.send(err)
          })
})


//localhost:3000/users/register

module.exports = {
     userRouter : router
}