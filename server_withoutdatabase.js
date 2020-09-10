const express = require('express');
const bodyParser = require('body-parser')
const bcrypts = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
//app.use( (req,res,next) => {
//	console.log("Hello this is mildware fun")
//	next();
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

app.get('/' , (req,res) => {
    res.send(database.user)
})


//for signin
app.post('/signin' , (req,res) => {
   if(req.body.email === database.user[0].email &&  req.body.password === database.user[0].password )
   {
      res.json(database.user[0])
   }
   else{
      res.status(400).send("error not login")
   }
   
})


//for register
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

//getting profile
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


//Increment entries
app.put('/image' , (req,res) => {
   const { id }= req.body
   let found = false
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




app.listen(3000, () => {
   console.log("App runing on 3000 ports")
})