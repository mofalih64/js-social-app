const {Router} = require('express');
const  userRouter = require ("./src/apps/user/user-router");
const postRouter= require ("./src/apps/post/post-router")
const router = Router();

// import { cartRouter } from './apps/cart/cartRoute';

router.use("/user", userRouter);
router.use("/post", postRouter);
exports.router = router;
