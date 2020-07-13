var express = require("express");
var app = express();
var mysql = require("mysql");
var cors = require("cors");
var bodyparser = require("body-parser")
var multer = require('multer');
const { recognizer } = require('./requests/recognizer')
const authRoutes = require("./routes/new_auth");
var upload = multer();

const PORT = process.env.PORT || 8000
//Database Connection
global.db = mysql.createConnection({
    port: 3306,
    host: "sql12.freemysqlhosting.net",
    user: "sql12353410",
    password: "JMQNFdARsQ",
    database: "sql12353410",
    multipleStatements: true
})
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected");
    }
})

//Middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())

app.use('/Images', express.static('Images'));

//My routes
app.use("/api", authRoutes)

app.get('/', (req, res) => {
    recognizer(req, res, db);

})
app.listen(PORT, () => {
    console.log("app is running at " + PORT)
});



//You are not exporting anything in the app.js file. At the end of app.js file, include following line.

module.exports = app;