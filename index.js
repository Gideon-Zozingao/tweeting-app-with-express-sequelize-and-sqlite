const PORT=8000;

const express=require("express")


const {conn}=require("./db.js")
const {User}=require("./models/User.js")
const {Twits}=require("./models/Twits.js")
const bodyParser=require("body-parser")
const cookieParser = require("cookie-parser")
var expressLayouts = require('express-ejs-layouts');
const { v4: uuidv4 } = require('uuid');
//const bcrypt = require('bcryptjs');
const app=express()
const routes = require('./routes');

app.set("view engine","ejs");

const middlewares=[cookieParser(),express.urlencoded({extended: false}),express.static('public'),expressLayouts];

app.use(middlewares);

app.use('/',routes)
app.listen(PORT,()=>{

	console.log(`Application has Started and Running ah localhost:${PORT}`);
})
