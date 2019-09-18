const bcrypt = require('bcryptjs')

bcrypt.genSalt(10)
     .then((salt)=>{
          bcrypt.hash('secret123',salt)
               .then((encryptedPassword)=>{
                    console.log(encryptedPassword)
               })
     })
     .catch((err)=>{
          console.log(err)
     })