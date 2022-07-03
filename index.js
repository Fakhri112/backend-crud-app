const express = require('express')
const cookieparser = require('cookie-parser');
const cors = require('cors')
const router = require("./utils/route");
const dotenv = require("dotenv");
const { corsOptionsDelegate } = require('./controller/cors');
const app = express()
const port = process.env.PORT || 5000;
dotenv.config()

app.use(cookieparser('hello'))
app.use(express.static('public')) //middleware
app.use(express.json())
app.use(cors(
    corsOptionsDelegate
));
app.use(router);



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})