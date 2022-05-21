const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const isPostViewedByVistour =async (VistourId,postId)=>{
  let isViewed=await prisma.PostViwedByVistour.findUnique({
    where:{
      vistourId,
      postId
    }
  })

  if (isViewed!=null){
    return true
  }
  else {
    return false
  }
}
////////////////
const increasePostViewers=async (postId)=>{
  try {
  let post=await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  return post

} catch (error) {
  console.log(error.message)
  return null 
}

}

/////////////////
const isPostViewed=async (userId,postId)=>{
  try {
  let isViewed=await prisma.postSeenByUser.findFirst({
    where:{
 userId,
 postId  
    }
  })

  if(isViewed.id!=null){
    return true
  }
  else {
    return false
  }
} catch (error) {
    console.log( error.message)
    return false
}
}
/////////////////////
const addVistourToPostViewrs=async (vistourId,postId)=>{
// let isViewed= await(isPostViewedByVistour(vistourId,postId))
//   if(isViewed!=null){
    var  check =await prisma.PostViwedByVistour.create({
      data:{
        vistourId,
        postId
      }
    })

    // await prisma.post.update({
    //   where: {
    //     id: postId,
    //   },
    //   data: {
    //     views: {
    //       increment: 1,
    //     },
    //   },
    // });
    if (check!=null){

return true
    }
  else {
return false
  }
}

//////////////////////
const getPostById =async (postId)=>{
  try {
 console.log (2222222222)
let thePost=await prisma.post.findUnique({
  where:{
    id:postId
  }
})

if(thePost!=null){
    console.log (00000)
  return thePost

}
else{
    console.log (5555555)
  return false
}

} catch (error) {
    
  console.log( error.message)
  return false
}
}


exports.getPostById=getPostById
exports.addVistourToPostViewrs=addVistourToPostViewrs
exports.isPostViewed=isPostViewed
exports.increasePostViewers=increasePostViewers
exports.isPostViewedByVistour=isPostViewedByVistour
