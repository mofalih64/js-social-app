const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const authController=require("../user/auth-controller")
const {addVistourToPostViewrs,isPostViewed,increasePostViewers,isPostViewedByVistour,getPostById} = require ("./post-utils")

const getPost = async (req, res) => {
  try {
    // console.log(`__________ the get ;post)`);

  var user = req.user;
  // const { cookies } = req;
  // console.log(`__________ the coookie id ${cookies}  after stringfy )`);
  // console.log(111111111)

  if (user ==null) {
    var vistourId=authController.checkCookie(req);
  console.log(`__________ the coookie id ${vistourId}  after stringfy )`);

  }
  else {


    var the_id=user.id

  }

  const postId = req.params.id;
 
    var thePost = await getPostById(postId) 
    if (thePost==false){
      res.status(404).json({
        message:"invalid post id "
      })
    }
    if (the_id  !=null){

    var checkIfPostViewed = await prisma.postSeenByUser.findFirst({
      where: {
        userId: the_id,
        postId
      },
    });
  }
  else if (vistourId !=null) {

var checkIfPostViewedByVistour =await prisma.PostViwedByVistour.findFirst({
  where:{
    vistourId,
    postId
  }
})
console.log(` the vistour check${JSON.stringify(checkIfPostViewedByVistour)}`)
  }

  if(checkIfPostViewedByVistour==null &&thePost != null &&vistourId!=null){ 
   var updatedPost= await increasePostViewers(postId);

  }

    if(the_id!=null&&the_id != thePost.userId &&thePost != null &&checkIfPostViewed==null){

    var updatedPost=await increasePostViewers(postId);
    }
  
  if (the_id !=null){
     
    
    await prisma.postSeenByUser.create({
      data: {
        userId: the_id,
        postId
      },
    });
  }

  console.log(`the vistour id before res  ${vistourId}`)

     
 if(vistourId ){
  await addVistourToPostViewrs(vistourId,postId)
    res.cookie("session_id", vistourId,{secure: false });
    console.log(`the vistour id ${vistourId}`)

}
    res.status(200).json({
      data: updatedPost,
    });
  
 } catch (error) {
      console.log(error.message);
    }
  
};

const addPost = async (req, res) => {

  const { title, content } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      userId: req.user.id,
    },
  });

  res.status(201).json({
    message: "the post added successfully ",
    data: newPost,
  });
};

const postsUserSaw = async (req, res) => {
  try {
    
  const user = req.user;
  console.log( `the posts  ${user.id}`)
  const viewrs = await prisma.postSeenByUser.findMany({
    where: {
      userId: user.id,
    },
    include: {
      post: true,
    },
  });

  res.status(200).json({
    data: viewrs,
  });
  
} catch (error) {
 console.log(error.message)   
}
};


const getPostViewers = async (req, res) => {
  try {
    
  const id = req.params.id;
  const viewrs = await prisma.postSeenByUser.findMany({
    where: {
      postId:id,
    },
    include: {
user:true
    },
  });

  res.status(200).json({
    data: viewrs,
  });
  
} catch (error) {
 console.log(error.message)   
}
};

exports.getPost=getPost
exports.addPost=addPost
exports.getPostViewers=getPostViewers
exports.postsUserSaw=postsUserSaw
