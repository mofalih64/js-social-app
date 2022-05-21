const express = require("express");
const  {router}= require ("./routers");
const morgan =require ("morgan")
const {API_PREFIX} =require( "./src/utils/config");
const cookieParser =require( "cookie-parser");

// import passport from "passport-jwt";

// const genuuid = requi
// import { errorHandler }

const app = express();
app.use(morgan("dev"))
app.use(cookieParser());

// // parse application/x-www
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(passport.initialize());

app.use(API_PREFIX, router);

// app.use(session(
//
module.exports = app;
