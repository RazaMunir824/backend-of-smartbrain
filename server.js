const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();

//File Resourse
const register = require('./controler/registerhandler')
const signin = require('./controler/signinhandler')
const profile = require('./controler/profilehandler')
const image = require('./controler/imagehandler')

const knex = require('knex')

//Connection
var db = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'smartbrain'
  }
});



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//MiddleWare
app.use((req,res,next) => {
   console.log("hello middle")
   next()
})



//Routes
app.get('/' , (req,res) => {res.send(database.user)})
app.post('/signin' , (req,res) => {signin.signinhandler(req,res,db,bcrypt)})
app.post('/register' , (req,res) => {register.registerhandler(req,res,db,bcrypt)})
app.get('/profile/:id' , (req,res) => {profile.profilehandler(req,res,db)})
app.put('/image' , (req, res) => {image.imagehandler(req,res,db)})
app.post('/imageurl' , (req, res) => {image.handleApiCall(req,res)})




app.listen(process.env.PORT || 3000, () => {
   console.log(`App runing on ${process.env.PORT} ports`)
})
