const mongoose = require('mongoose')

//db configuration
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/JWT',{
    useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log('successfully connected to JWT')
    })
    .catch((err)=>{
        console.log('Error conneting to DB',err)
    })

module.exports = mongoose
