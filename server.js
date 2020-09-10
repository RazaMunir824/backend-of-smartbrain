const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();
const register = require('./controler/registerhandler')
const signin = require('./controler/signinhandler')
const profile = require('./controler/profilehandler')
const image = require('./controler/imagehandler')

const knex = require('knex')


var db = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'smartbrain'
  }
});

/*
db.select('*').from('users').then(data => {
   console.log(data)
})

*/

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
//app.use( (req,res,next) => {
// console.log("Hello this is mildware fun")
// next();
//})

app.use((req,res,next) => {
   console.log("hello middle")
   next()
})


const database = {
   user:[
      {
         id:'123',
         name:'Ali',
         email:'ali@gmail.com',
         password:'cookie',
         entries: 0,
         joined:new Date()  
      },
      {
         id:'124',
         name:'Raza',
         email:'Raza@gmail.com',
         password:'cookiee',
         entries: 0,
         joined:new Date()  
      }
   ]
}

app.get('/' , (req,res) => {res.send(database.user)})


//for signin
app.post('/signin' , (req,res) => {signin.signinhandler(req,res,db,bcrypt)})


/*
//for register withou db
app.post('/register' , (req,res) => {
   const {name , email ,password} =req.body

   database.user.push({
      id:'125',
      name:name,
      email:email,
      password:password,
      entries:0,
      joined:new Date()
   })

   res.json(database.user[database.user.length - 1])

   res.status(400).send("error not logining")
   
})

*/

/*
//first attempt to insert with db 
app.post('/register' , (req,res) => {
   const {name , email ,password} =req.body

   db('users')
      .returning('*')
      .insert({
         name:name,
         email:email,
         joined:new Date()
      })
      .then(user => {
         res.json(user[0])
      })
      .catch(err => res.status(400).send("error not logining"))
})
*/

app.post('/register' , (req,res) => {register.registerhandler(req,res,db,bcrypt)})




/*
//getting profile without
app.get('/profile/:id' , (req,res) => {
   const {id }= req.params
   let found = false
   database.user.forEach(user => {
      if(user.id === id){
         found = true
         return res.json(user)
      }
   })
   if(!found){
      res.status(400).send("error not login")
   }

})
*/

app.get('/profile/:id' , (req,res) => {profile.profilehandler(req,res,db)})

/*
//Increment entries without
app.put('/image' , (req,res) => {
   const { id }= req.body;
   let found = false;
   database.user.forEach(user => {
      if(user.id === id){
         found = true
         user.entries++
         return res.json(user.entries)
      }
   })
   if(!found){
      res.status(400).send("error not login")
   }

})
*/
app.put('/image' , (req, res) => {image.imagehandler(req,res,db)})


app.post('/imageurl' , (req, res) => {image.handleApiCall(req,res)})




app.listen(3000, () => {
   console.log("App runing on 3000 ports")
})