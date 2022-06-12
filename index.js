const express = require('express')
const cookieparser = require('cookie-parser');
const cors = require('cors')
const router = require("./utils/route");
const dotenv = require("dotenv")
const app = express()
const port = 5000;
dotenv.config()

app.use(cookieparser('hello'))
app.use(express.static('public')) //middleware
app.use(express.json())
app.use(cors({

}));
app.use(router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})