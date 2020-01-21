"use strict"
var mongodb = require('mongodb');
var mongoose = require('mongoose');
 var dburl = "mongodb://localhost:27017/skybox";
 var dburi = "mongodb+srv://mkonlan:5hinvi5@zion@cluster0-uylml.mongodb.net/test?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
 mongoose.connect(dburi, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
   () => {console.log('Database is connected') },
   err => { console.log('Can not connect to the database'+ err)}
 );