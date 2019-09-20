const mongoose = require('mongoose')
const validator = require('validator')
const schema = mongoose.Schema
const bcryptjs = require('bcryptjs')

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

//pre hooks
userSchema.pre('save', function(next){
     const user = this
     //console.log(user)
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


const User = mongoose.model('User', userSchema)

module.exports = {User}