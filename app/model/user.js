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
     }
})

const User = mongoose.model('User', userSchema)


//pre hooks
userSchema.pre('save', (next)=>{
     console.log('just before saving')
     // const user = this
     // console.log(user)
     // bcryptjs.genSalt(10)
     //      .then((salt)=>{
     //           bcryptjs.hash(user.password, salt)
     //                .then((encryptedPassword)=>{
     //                     user.password = encryptedPassword
     //                     next()
     //                })
     //      })
})

module.exports = {User}