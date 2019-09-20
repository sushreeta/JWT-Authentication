const mongoose = require('mongoose')
const validator = require('validator')
const schema = mongoose.Schema
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new schema({
     username:{
          type: String,
          required: true,
          unique: true,
          minlength: 5
     },
     email:{
          type:String,
          required: true,
          unique: true,
          validate: {
               validator: function(value){
                    return validator.isEmail(value)
               },
               message: function(){
                    return 'invalid email format'
               }
          }
     },
     password:{
          type:String,
          required:true,
          minlength:6,
          maxlength: 128
     },
     tokens:[{
          token:{
               type:String
          },
          CreatedAt:{
               type:Date,
               default:Date.now
          }
     }]

     
})


//static findByCredentials()
userSchema.statics.findByCredentials = function(email, password){
     const User = this
     return User.findOne({ email })
          .then((user)=>{
               if(!user){
                    return Promise.reject('invalid email/password')
               }
               return bcryptjs.compare(password, user.password)
                    .then((result)=>{
                         if(result){
                              return Promise.resolve(user)
                         } else {
                              return Promise.reject('invalid email/password')
                         }
                    })
          })
          .catch((err)=>{
               return Promise.reject(err)
          })
}

userSchema.statics.findByToken = function(token){
     const user = this
     let tokenData
     try{
          tokenData=jwt.verify(token,'jwt@123')

     } catch(err){
          return Promise.reject(err)
     }
     return user.findOne({
          _id:tokenData._id,
          'tokens.token':token
     })
}

//Instance method
userSchema.methods.generateToken = function(){
     const user = this
     const tokenData = {
          _id: user._id,
          username: user.username,
          CreatedAt: Date.now()
     }
     const token = jwt.sign(tokenData,'jwt@123')
     user.tokens.push({ 
          token
     })
     console.log('saving')
     return user.save()
          .then((user)=>{
               return Promise.resolve(token)
          })
          .catch((err)=>{
               return Promise.reject(err)
          })
}

//pre hooks
userSchema.pre('save', function(next){
     const user = this
     if(user.isNew){
          bcryptjs.genSalt(10)
          .then((salt)=>{
               bcryptjs.hash(user.password, salt)
                    .then((encryptedPassword)=>{
                         user.password = encryptedPassword
                         next()
                    })
          })
     } else {
          next()
     }
     
})

const User = mongoose.model('User', userSchema)

module.exports = {User}