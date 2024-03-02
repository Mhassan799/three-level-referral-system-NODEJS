const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    refralCode:{
        type:Number,

    },
    referByCode:{
        type:Number,
    }
})

module.exports = mongoose.model('users',userSchema)