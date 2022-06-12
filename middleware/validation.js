const {auth_user} = require("../model/db")
const {contact} = require("../model/db");

const authEmailCheck = async(value)=>{
    const search_by_email = await auth_user.find({email: value})
    if (search_by_email.length!==0){
        throw new Error("Email Already Registered");
    }else if (!value){
        throw new Error("Email Is Empty");
    }
    return true;
}

const authNamaCheck = async(value)=>{
    const search_by_name = await auth_user.find({nama: `${value}`})
    if (search_by_name.length!==0){
        throw new Error("Username Already Registered");
    }else if (!value){
        throw new Error("Username Is Empty");
    }
    return true
}

const contactNamaCheck = async(value)=>{
    const search_by_name = await contact.find({nama: `${value}`})
    if (search_by_name.length!==0){
        throw new Error("Username Already Registered");
    }else if (!value){
        throw new Error("Username Is Empty");
    }
    return true
}

const contactUpdateNamaCheck = async(value, {req})=>{
    const search_by_name = await contact.find({nama: `${value}`})
    if (search_by_name[0]?.id !== req.params.id && search_by_name[0]?.id){
         throw new Error("Username Already Registered");
    }
    return true;
}

const reTypePasswordCheck = (value, {req})=>{
    if (value !== req.body.conPassword){
        throw new Error("Password and Confirmation Password doesn't match ")
    }
    return true
}

module.exports = {reTypePasswordCheck, authEmailCheck, authNamaCheck, contactNamaCheck, contactUpdateNamaCheck}