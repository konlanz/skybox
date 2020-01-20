"use strict"
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var session = require('express-session');
var Admin = require('../schema/admin');
var Expense = require('../schema/expense');
var upload = require('../routes/upload');

/* GET home page. */
function secur(req, res, next){
  if(req.session.admin){
    next();
  }else{
    res.redirect('/');
  }
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/logout', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  var passenc = crypto.createHash('md5').update(password).digest('hex');
  Admin.findOne({username:username, password:passenc},(err, data)=>{
      if(err){
          res.redirect('/');
      }
      console.log(data)
      if(data == null){
        res.redirect('/')
      }else{
        res.redirect('/home');
      }

      
  });
});
router.get('/home',  (req, res)=>{
  Expense.find({},function(err, dat){
    if (err) throw err;
    res.render('home',  {dat:dat});
         
  });
  
});

router.get('/detail/:id', (req, res)=>{
  var prod = req.params.id;
  Expense.find({_id: prod},function(err, dat){
    if (err) throw err;
    console.log(dat);
    res.render('detail',  {dat:dat});
         
  });
})
router.get('/signup', (req, res)=>{
  res.render('signup');
})
router.get('/addxpence', (req, res)=>{
  res.render('addxp');
})

router.post('/addexpence', (req, res)=>{
  upload(req, res, (err)=>{
      if(err){
        console.log(err);
        res.render('index', {
          msg:err
        });
      }else{
          
        var obj = {Ename:req.body.expenseName, photo: req.file.filename, price:req.body.amt, dis:req.body.dis};
        var prd = new Expense(obj);
        prd.save();
        console.log(obj)
        res.redirect('/home') 
      }
  }); 
  
})
router.post('/signup', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.uemail;
  var cpass = req.body.cpassword;
  var passenc = crypto.createHash('md5').update(password).digest('hex');
  console.log(passenc);
  var adde ={
      email:email,
      username:username,
      password:passenc
  } 
  console.log(adde);
  new Admin(adde).save();
  res.redirect('/');
})

module.exports = router;
