const bcrypt = require('bcrypt')

 const encrypt=(password)=>{
     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

 const compare= (password,hashedPass)=>{
   return bcrypt.compareSync(password, hashedPass)
}

module.exports ={encrypt,compare}