const express = require('express');
const bodyParser = require('body-parser')

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use( (req,res,next) => {
//	console.log("Hello this is mildware fun")
//	next();
//})

app.use((req,res,next) => {
	console.log("hello middle")
	next()
})
app.get('/just' , (req , res) => {
   user ={
   	name: 'Ali Raza',
   	email : 'munir0047gmail.com',
   }
   //console.log(req.body)
   //console.log(req.query);
   //console.log(req.headers)
   //console.log(req.params)
   res.send(user);

   res.status(404).send("error 404");
})

app.get('/' , (req,res) => {
	//console.log(req.body)
	//console.log(req.headers)
	//console.log(req.params)
	console.log(req.query)
	
   res.send('success')
})





app.listen(3000)