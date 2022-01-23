const  router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model /Post');


//Get All Post
router.get('/',verify, async(req,res)=>{
 try {
     const Posts =  await Post.find();
     res.status(200).json(Posts);    
 } catch (error) {
     res.status(500).json({message:error.message})
 }
});

//Get One Post
router.get('/:id',getpost,verify,(req,res)=>{
    res.json(res.post);

});

//Create Post 
router.post('/',verify, async(req,res)=>{
    const post = new Post({
        title : req.body.title,
        description: req.body.description
    });


    try {
        const savedPost = await post.save().catch((err)=> res.send(err.message));
        res.status(201).json(savedPost); 
    } catch (error) {
        res.status(400).json({message:error.message});    
    }

});

//Update Post
router.patch('/:id',getpost,verify, async(req,res)=>{
    if (req.body.title != null){
       res.post.title = req.body.title
    }

    if (req.body.description != null){
        res.post.description = req.body.description
    }

    try {
        const updatedPost = await res.post.save().catch((err)=> res.json({ message : err.message }))
        res.json(updatedPost);
        
    } catch (error) {
        res.status(400).json({message : error.message});
    }

});

//Delete One Post 
router.delete('/:id',getpost,verify, async(req,res)=>{
    try {
        await res.post.remove();
        res.json({ message:'Deleted post' });
        
    } catch (error) {

        res.status(500).json({ message:error.message })
    }

});


//Get the Post 
async function getpost(req, res, next){
  let post 
  try {
      post = await Post.findById(req.params.id);
      if(post == null){
        return res.status(404).json({message: 'Cannot find post'});
    } 
  } catch (error) {
      return res.status(500).json({message:error.message}) 
  }
  res.post = post;
  next()

}





module.exports = router