const express = require('express');
const app  = express();
const connection = require('./config/connection')


const bodyParser = require('body-parser');
const cors = require('cors');
const register = require('./routes/route');
app.use(bodyParser.json())

app.use(cors({origin:'*'})); 
app.use(express.json());

app.use('/',register)


app.listen(3045,async()=>{
    try {
        await connection;
        console.log("Server is listening at port 3045");
    } catch (error) {
        console.log(error)
    }
})