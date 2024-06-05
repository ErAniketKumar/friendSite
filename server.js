const express = require('express')
const app = express()
const port = 3000
const multer=require('multer');
const session=require('express-session');
const router=require('./routes/thisRout.js');
const path=require('path');const exp = require('constants');
const mongoose=require('mongoose');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));
  
app.use('/',router);


  
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))