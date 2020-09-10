

const profilehandler = (req,res,db) => {
   const {id }= req.params
   db.select('*').from('users').where({
      id:id
   })
   .then(user => {
      if(user.length){
         res.json(user[0])
      }else{
         res.status(400).json("wrong id enter")
      }
      
   })
   .catch(err => res.status(400).json("error not logining"))

}

module.exports ={
	profilehandler:profilehandler
}