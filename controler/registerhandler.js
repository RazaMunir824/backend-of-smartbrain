

const registerhandler =  (req,res,db , bcrypt) => {
   const {name , email ,password} =req.body
   if(!email || !name || !password){
   	 return res.status('400').json('form submission faied due to incomplete info ')
   }
   const hash = bcrypt.hashSync(password);
   console.log(hash)
      db.transaction(trx => {
        trx.insert({
          email:email,
          hash:hash
        })
        .into('login')
        .returning('email')
        .then(siginemal => {
            return trx('users')
             .returning('*')
             .insert({
                 email:email,
                 name:name,
                 joined:new Date()
              })
             .then(user => {
               trx.select('*').from('users').where({id:user})
                 .then(resp => {
                 	res.json(resp[0])
                 })
             })
             .catch(err => res.status(400).json("error not logining"))
        })
        .then(trx.commit)
        .then(trx.rollback)
      })
      .catch(err => res.status(400).json("error not logining"))

   
}

module.exports={
   registerhandler:registerhandler
}