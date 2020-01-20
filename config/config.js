"use strict"
var mongodb = require('mongodb');
var mongoose = require('mongoose');
 var dburl = "mongodb://localhost:27017/skybox";
mongoose.Promise = global.Promise;
 mongoose.connect(dburl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
   () => {console.log('Database is connected') },
   err => { console.log('Can not connect to the database'+ err)}
 );