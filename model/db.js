const mongoose = require('mongoose');
require('dotenv').config()
const mongoUri = process.env.MONGO_URI || 'development'

mongoose.connect(mongoUri).then((res)=>{
    console.log("Connected!")
}).catch((err)=> (console.log("There is problem during connection")));


const contact = mongoose.model('contact',{
    nama:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
    },
    email:String
})

const auth_user = mongoose.model('auth_user',{
    nama:{
        type:String,
        required:true
    },
    number:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refresh_token:{
        type:String
    }
})

module.exports = {contact, auth_user}