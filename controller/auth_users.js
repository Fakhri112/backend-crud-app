const { auth_user } = require("../model/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const store = require("store")
const { validationResult } = require('express-validator');

const authSuccess = (req, res) => {
    res.sendStatus(200)
}

const getAuthUser = async (req, res) => {
    try {
        const LoadContact = await auth_user.find()
        res.json(LoadContact);
    }
    catch (err) {
        console.log("its error")
    }
}

const deleteAuthUser = async (req, res) => {
    try {
        await auth_user.findByIdAndDelete(req.params.userId).then((x) => {
            store.remove(req.params.userId)
            res.send(x)
        })
    } catch (error) {
        console.log(error)
    }
}

const regiserUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors.array());
    }
    const { nama, number, email, password, conPassword } = req.body
    if (password !== conPassword) return res.status(400).json({ msg: "Password and Confirm Password doesn't match " })
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        const input_data_user = new auth_user({
            nama: nama,
            number: number,
            email: email,
            password: hashPassword
        });
        input_data_user.save().then((x) => {
            res.json(x);
        })

    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {

        const loadUser = await auth_user.findOne({ email: req.body.email })
        if (!loadUser) return res.status(401).json({ msg: "Invalid Email" })
        const match = await bcrypt.compare(req.body.password, loadUser.password)
        if (!match) return res.status(401).json({ msg: "Wrong Password" })
        const userId = loadUser._id
        const nama = loadUser.nama
        const email = loadUser.email
        const number = loadUser.number
        const refresh_token_user = loadUser.refresh_token
        const access_token = jwt.sign({ userId, nama, email, number },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10000' })
        if (!refresh_token_user) {
            const refresh_token = jwt.sign({ userId, nama, email, number },
                process.env.REFRESH_TOKEN_SECRET)
            await auth_user.findByIdAndUpdate(userId, { refresh_token: refresh_token })
        }
        if (!store.get(userId)) {
            store.set(userId, refresh_token_user)
        }
        return res.json({ access_token })
    } catch (error) {
        return res.send(error)
    }
}

const logOut = async (req, res) => {
    try {
        store.remove(req.params.userId)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAuthUser, deleteAuthUser, authSuccess, regiserUser,
    loginUser, logOut
}