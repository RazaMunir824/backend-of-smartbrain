
const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: 'fddd2a41e9ef40eb9ab82b0e6bf3e83a'

});

const handleApiCall = (req,res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(data => {
      	res.json(data)
      })
      .catch(err => res.status('400').json('error in imageurl part'))
}


const imagehandler = (req, res,db) => {
   const { id }= req.body;
   db('users').where('id' , '=', id)
   .increment('entries',1)
   .returning('entries')
   .then(entries => {
   	res.json(entries[0])
   })
   .catch(err => res.status(400).json("entries not increment"))

   
	  /* .then(entries => {
	      db.select('entries').from('users').where('id' , '=', id)
	        .then(daat => {
	        	res.json(daat[0].value)
	        })
	   }) */
}

module.exports ={
	imagehandler,
	handleApiCall
}