const express = require('express')
const app = express();
// const mySql = require('./DB');
const customer = require('./Customers')
const bodyParser = require("body-parser");
const cors = require("cors");
var corsOptions = {
    origin: '*',
    // Credential: true,
    // optionsSuccessStatus: 200,// For legacy browser support
    // methods: "**"
}
app.use(cors(corsOptions))
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("hello world")
})
app.use('/customer', customer)
// Use this after the variable declaration
app.listen(8081);

