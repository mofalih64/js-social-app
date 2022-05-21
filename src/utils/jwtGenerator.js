const jwt= require("jsonwebtoken")
require("dotenv").config();

function jwtGenerstor(user_id){

    console.log (00000000)
console.log(process.env.SECRET_KEY)
    const payload={
        user:user_id
    }
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"10d"})
}

module.exports=jwtGenerstor