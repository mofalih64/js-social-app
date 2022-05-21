const {PrismaClient} = require("@prisma/client");
const prisma =new PrismaClient()
const { SECRET_KEY } =require( "../../utils/config");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { v4 } =require( "uuid");
// import { CustomRequest } from "@utils/customize-reauest";
const authorize = async (
  req,
  res,
  next
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token)
    if (!token) {
      res.status(401).json( {message :"not authorised please sign in"});
    }

    const payload = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    console.log(payload);
    const user = await prisma.user.findUnique({
      where: {
        id: payload.user,
      },
    });
    if (user != null) req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    // res.status(403).json("not authourised");
  }
};

 const optional = async (
  req,
  res,
  next
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token == null) {
    //   let vistorUserId = await checkCookie(req);
    // console.log(`__________ the token  after stringfy ${JSON.stringify(token)}`);

    //   if (vistorUserId) {
    //     console.log(`__________ the session id  after stringfy ${JSON.stringify(vistorUserId)}`);

    //     res.cookie("session_id", vistorUserId,{secure: false });
        // console.log(res.cookie)
        next();
      }
    else {
      const payload = await promisify(jwt.verify)(token, SECRET_KEY);
      console.log(`the papload ${payload}`)
      let id = payload.user;
      console.log(`__________ the id  after stringfy ${JSON.stringify(id)}`);
      let user = await prisma.user.findUnique({ where: { id } });
      if (user == null) {
        res.status(401).json("not authourised invalid token");
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(403).json("not authourised");
  }
};

// export const checkCookie:Handler=(req,res,next:NextFunction)=>{

// }

const checkCookie=(req) =>{
  const { cookies } = req;
  if ("session_id" in cookies) {
    console.log(`the sesssion id in check ${JSON.stringify(req.cookies)}`);

    return cookies.session_id;
  } else {
    const id = v4();
    console.log(`the sesssion id in check  else${id}`);

    return id;
  }
}

exports.optional =optional;
exports.checkCookie =checkCookie;
exports.authorize =authorize;