// require("dotenv").config({ path: "./.env" });
// require("dotenv").config({
  //   path: path.resolve(__dirname, ".env")
  // });
  // const app = require("./app");
  const path = require("path");
  require("dotenv").config({ path: "../.env" });



// console.log("ENV PATH:", path.resolve(__dirname, ".env"));
// console.log("DB_USER:", process.env.DB_USER);


// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const express = require("express");
const app = require('./app');


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
