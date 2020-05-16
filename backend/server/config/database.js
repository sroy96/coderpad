
const chalk = require('chalk');
const mongoose = require('mongoose');
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
const dbURL=require('./properties').DB;
module.exports =function(){

mongoose.connect(dbURL, { useNewUrlParser: true});
let db = mongoose.connection;
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");



};
// const MongoClient = require('mongodb').MongoClient;
// const uri = require('./properties').DB;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("coderpad").collection("user");
//   console.log(collection);
//   // perform actions on the collection object
//   client.close();
// });
// client.error(term=> {
//      console.log(error("MongoDB default connection has occured "+err+" error"));
// });
