const PORT=8000;
const {conn}=require("./db.js")
const express=require("express")

const app=express()
const bodyParser=require("body-parser")
const cookieParser = require("cookie-parser")
var expressLayouts = require('express-ejs-layouts');
const routes = require('./routes');

app.set("view engine","ejs");
const middlewares=[cookieParser(),express.urlencoded({extended: false}),express.static('public'),expressLayouts];

app.use(middlewares);

app.use('/',routes)
app.listen(PORT,()=>{
	console.log(`Application has Started and Running ah localhost:${PORT}`);
})
