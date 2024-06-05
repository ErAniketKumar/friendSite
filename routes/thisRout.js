const express=require('express');
const multer=require('multer');
const router=express.Router();
const path=require('path');
const session=require('express-session');
const mongoose=require('mongoose');
const { type } = require('os');
const { timeStamp } = require('console');
const uri='mongodb+srv://collegedb:collegedb123@cluster0.yubriwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const userAuth={
    isAuthenticated: (req, res, next)=>{
        if(req.session && req.session.user) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }
}
router.get('/',userAuth.isAuthenticated,(req, res)=> {
    res.render('home');
})
router.get('/home',userAuth.isAuthenticated,(req, res)=>{
    res.redirect('/');
})


router.get('/login',(req, res)=>{
    res.render('login');
})

router.get('/signup',(req, res)=>{
    res.render('signup');
})

router.get('/logout',(req, res)=>{
    req.session.destroy();
    res.redirect('/login');
})
//after login page get req


router.get('/friends',(req, res)=>{
    res.render('friends.ejs');
})

router.get('/addinfo',(req, res)=>{
    res.render('addinfo.ejs');
})
router.get('/aniket',(req, res)=>{
    res.render('aniket.ejs');
})
router.get('/saheb',(req, res)=>{
    res.render('saheb.ejs');
})
router.get('/nitesh',(req, res)=>{
    res.render('nitesh.ejs');
})


//schema
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
},{
    timeStamp:true,
});

//compile schema model
const userModel=mongoose.model('acollection',userSchema);
// data base connection

async function run() {
    try{
        const dboptions={
            dbname:'thisDb',
        }
        await mongoose.connect(uri, dboptions);
        console.log('connected Db');
    } catch (err) {
        console.log('error');
        res.send('server error');
    }
}
run();

//get data from db
const getAllData=async()=>{
    const data=await userModel.find();
    return data;
}

router.post('/login',async(req, res)=>{
    const {userEmail, userPassword}=req.body;
    const data=await getAllData();
    const userExist=data.some((ele)=>{
        return ele.email==userEmail && ele.password==userPassword;
    });
    if(userExist) {
        req.session.user = userExist;
        res.redirect('/');
    } else {
        res.redirect('/signup');
    }
})

router.post('/signup',async(req, res)=>{
    const {name,number,userEmail,userPassword, password}=req.body;
    if(userPassword!=password) {
        res.send('password missmatched');
    } else {
        const data=await getAllData();
        const userExist=data.some((ele)=>{
            return ele.email==userEmail && ele.password==userPassword;
        });
        if(userExist) {
            res.send('User AllReady Exists');
        } else {
            const createDoc=new userModel({
                name:name,
                number:number,
                email:userEmail,
                password:userPassword,
            })
            await createDoc.save();
            console.log('saved');
            res.redirect('/login');
        }
    }
})

module.exports=router;