const {contact} = require("../model/db");
const {validationResult} = require("express-validator")

const listContact = async (req, res) => {
    try{
        const LoadContact = await contact.find()
        res.json(LoadContact);
    }
    catch(err){
        console.log("its error")
    }
}

const detailContact = async (req, res) => {
    try{
        const LoadContact = await contact.findById(req.params.id)
        res.json(LoadContact);
    }
    catch(err){
        console.log("its error")
    }
}

const addContact = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(errors.array());
      }
    else{
        const input_data = new contact({
            nama: req.body.nama,
            number: req.body.number,
            email: req.body.email
        });
        await input_data.save().then((x)=>{
            res.json(x);
        })
    }
}

const updateContact = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        res.send(errors.array())
      }
    else{
        await contact.findByIdAndUpdate(req.params.id,{
            nama: req.body.nama,
            number: req.body.number,
            email: req.body.email        
        }).then((x)=>{
            res.send('Data Has Been Updated Successfully');
        })

    }

}

const deleteContact = async (req, res) => {
    await contact.deleteOne({nama: req.params.nama}).then((x)=>{
        res.send(x)
    })
}

module.exports = {deleteContact, updateContact, detailContact, addContact, listContact}