const { PrismaClient } =require("@prisma/client");
// const  CustomRequest= require("utils/customize-reauest");
const prisma = new PrismaClient();
const jwtGenerstor = require ("../../utils/jwtGenerator")
// import type {} from "express";
// import { Handler, Request, Response, NextFunction } from "express";


const checkRequest=(req,res,next)=>{
  console.log("there is a reques here ")
  next()
}
const signUp= async(req,res)=>{
  try {
  
      console.log(`__________ signup method ${req.body.email}   )`);

  const {email,password,firstName}=req.body
  const chechEmail=prisma.user.findFirst({where:{
  email
  }})
  console.log(`__________ check email method ${JSON.stringify(chechEmail.id)}   )`);

  if (chechEmail.id==null){
    console.log(`__________ scheck there is no user with this email  )`);

    const newUser=await prisma.user.create({
      data:{
        email,
        password,
        firstName
      }
    })
  
    req.user=newUser

    console.log(`__________  new user ${newUser} )`);

    
  const token=jwtGenerstor(newUser.id)
  console.log(`__________ the token ${token}`);

  res.status(201).json({
      status:'success',
      token})
  
  }
  else{
    console.log(`__________ used email  )`);

    res.status(400).json({
      message:"the email is allready used"
    })
  }
    
} catch (error) {
    console.log(error.message)
}
  } 
  
  const signIn= async(req,res,next)=>{
    console.log(`__________ rgw re.body ${req.body.email}`);

    const {email,password}=req.body
    const checkEmail=await prisma.user.findUnique({where:{
      email
    }})
    console.log(`__________ the used account ${(checkEmail)}`);

    if (checkEmail.id==null){
      res.status(404).json({
        message:"un valid email or password"
      })
    
      
    }
    else{
      if (password== checkEmail.password){
        const token=jwtGenerstor(checkEmail.id)
  
        res.status(201).json({
          status:'success',
          token})
      }
      else {
        res.status(404).json({
          message:"un valid email or password"
        })
      }
      
    }
    }

    
const getPostsUserSaw = async (req, res) => {
  const user = req.user ;
  try {

  const posts = await prisma.postSeenByUser.findMany({
      
    where: {
      userId: user.id,
    },
    include: {
      post: true,
    },
  });

  res.status(200).json({
    data: posts,
  });
  
} catch (error) {
      console.log(error.message)
      res.json({
        message:"hold my bear"
      })
}
};

const getUserPosts = async (req,res) => {
  try {
   
  const user = req.user;
  console.log(`the user ${user.id},, ${user.firstName}`)
  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  });
  // console.log(posts)
  res.status(200).json({
    data: posts,
  });
   
} catch (error) {
 console.log(error.message)   
}
};


exports.signUp =signUp;
exports.signIn =signIn;
exports.getUserPosts=getUserPosts
exports.getPostsUserSaw=getPostsUserSaw
exports.checkRequest=checkRequest