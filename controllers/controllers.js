const bcrypt = require('bcryptjs');
const config = require("../config/config");
const home = require("./homeRoute");
const loginForm = require("./login");
const addTwitsPost = require("./addTwits");
const addTwitForm = require("./addTwitForm");
const loginUser = require("./userLogin");
const getTwitDetails = require("./getTwitDetails");
const userRegistration = require("./userRegistration");
const getTwits = require("./getTwits");
const getUserRegForm = require("./getUserRegForm");
const viewUsers = require("./viewUsers");
const userLogout = require("./userLogout");
const viewUser = require("./viewUserDetail");
const invalidGet = require("./invalidGet");
const invalidPost = require("./invalidPost");
const tokenHandler = require("./tokenHandler");
exports.homeRoute = home.homeRoute;
exports.login = loginForm.login;
exports.addTwits = addTwitsPost.addTwits;
exports.getAddTwit = addTwitForm.getAddTwit;
exports.userLogin = loginUser.userLogin;
exports.twitDetails = getTwitDetails.twitDetails;
exports.registerUser = userRegistration.registerUser;
exports.viewTwits = getTwits.viewTwits;
exports.createUser = getUserRegForm.createUser;
exports.viewUser = viewUsers.viewUser;
exports.logout = userLogout.logout;
exports.userDetails = viewUser.userDetails;
exports.invalidGetRequest = invalidGet.invalidGetRequest;
exports.invalidPostRequest = invalidPost.invalidPostRequest;
exports.authenticateToken = tokenHandler.authenticateToken;
