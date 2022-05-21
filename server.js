const express = require("express");
const {...config}  =require("./src/utils/config");
const  app = require( "./app");

// Start listening
const expressServer = app.listen(config.PORT, () => {
  console.log(`App listening on http://localhost:${config.PORT}/api`);
});

module.exports= express 
