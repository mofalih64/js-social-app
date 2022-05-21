const {Router} =require ("express");
const { authorize } = require("./auth-controller");
const userController = require ("./user-controller");

const userRouter = Router();

// router.get(
//   "signUp"

//   //   usersController.getUser
// );


// userRouter
//   .route('/signUp')
//   .post(authController.validInfo,userController.addUser)
 

userRouter.route("/signup")
.post( userController.signUp);
userRouter.route("/signin").post( userController.signIn);
userRouter.get("/user-posts",authorize ,userController.getUserPosts);
userRouter.get("/posts-user-saw",authorize ,userController.getPostsUserSaw);


module.exports = userRouter ;
