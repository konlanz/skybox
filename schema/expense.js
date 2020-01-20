var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expense = new Schema({
    Ename:{
        type:String
    },
    price:{
        type:String
    },
    photo:{
        type:String
    },
    dis:{
        type:String
    }
});
var admin = mongoose.model('expn', expense);
module.exports= admin;