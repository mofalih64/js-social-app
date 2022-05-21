const {Router }= require("express");
const  postController = require ('../post/post-controller.js')
const authController = require ("../user/auth-controller.js")
// import { optional } from "../user/auth-controller";

const router = Router();

router.get("/get-post/:id", authController.optional, postController.getPost);
router.post("/create-post", authController.authorize, postController.addPost);
router.get("/post-viewers/:id", postController.getPostViewers);


// router.get(
//   '/increase-quantity/:id',
//   passport.authenticate('jwt-user', { session: false }),
//   cartController.increaseItemQuantity
// );

// router.get(
//   '/decrease-quantity/:id',
//   passport.authenticate('jwt-user', { session: false }),
//   cartController.decreaseItemQuantity
// );

// router.get(
//     '/', cartController.getCarts
// );
module.exports = router;