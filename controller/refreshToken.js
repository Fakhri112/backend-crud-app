const {auth_user} = require("../model/db")
const jwt = require("jsonwebtoken")
const store = require("store")

const refresh_token = async(req, res)=>{
    try {
        const getRefreshToken = store.get(req.params.userId)
        const user = await auth_user.findOne({refresh_token: getRefreshToken})
        var refresh_token = user?.refresh_token
        if(!refresh_token) return res.sendStatus(403)
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if (err) return res.sendStatus(403)
            const userId = user._id
            const nama = user.nama
            const email = user.email
            const number = user.number
            const access_token = jwt.sign({userId, nama, email, number}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: "10000"
            })
            res.json({access_token})
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports.refresh_token = refresh_token