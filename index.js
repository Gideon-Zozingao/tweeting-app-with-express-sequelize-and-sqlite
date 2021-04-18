const PORT = 8000;
const express = require("express")
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
var expressLayouts = require('express-ejs-layouts');
const {
	v4: uuidv4
} = require('uuid');
const app = express()
const routes = require('./routes');
app.set("view engine", "ejs");

const middlewares = [cookieParser(), express.urlencoded({
	extended: false
}), express.static('public'), expressLayouts, bodyParser.json(), (req, res,
	next) => {
	res.locals.user = req.user;
	next()
}, fileUpload({
	createParentPath: true
})];
app.use(middlewares);

app.use('/', routes)
app.listen(PORT, () => {

	console.log(`Application has Started and Running ah localhost:${PORT}`);
})
