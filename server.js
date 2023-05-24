// require
const express = require("express")
const bodyParser = require('body-parser');
const todoRoutes = require("./routes/todo.routes")
const getConnection = require("./config/db")

//init
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const conn = getConnection();

//middleware
app.use("/",(req, res, next)=>{
    req.conn = conn;
    next();
});

//routes
app.use("/todo",todoRoutes)

//server activation
app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})