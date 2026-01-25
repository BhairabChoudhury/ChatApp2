const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const User = require("../models/userModels") ; 
const generateToken = require("../config/generateToken");
const { regex } = require("zod");


//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public 

const allUsers = asyncHandler(async (req , res) =>{
       const  keyword = req.query.search 
       ? {
         $or:[
             {name :{$regex :req.query.search , $options :"i"}} ,
             {email :{$regex:req.query.search , $options:"i"}}
         ] ,
        
       } :{} ; // if not present then {} 

       const users = await User.find(keyword).find({_id :{$ne:req.user._id}}) ;/// it  users store users array of object users where keyword matching with any Users 
        res.send(users);
})

//@description     Register new user
//@route           POST /api/user/
//@access          Public

const registerUser = asyncHandler(async(req ,res ) =>{

    const requiredBody = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email(),   // ✅ FIX
  password: z.string().min(5),
  pic: z.string().min(5)
});
console.log("dkfn inasaksd samkls");
 
const process = requiredBody.safeParse(req.body) ;
  if(!process.success) {
      res.json({
         message : "Incorrect Format" 
      })
      return ;
  } 

  const {name , email , password , pic} = req.body ;
  try {
     const hashedPassword = await bcrypt.hash(password,10) ;
     await User.create({
          name,
          email,
          password:hashedPassword,
          pic,
     })
  }catch(err){
   res.json({message : "User already exist"});
  }
 
  res.json({message : "You have loged in Succesfully"}) ;
})


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public 
const  authUser = asyncHandler (async (req ,res ) =>{
     const requiredBody = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email(),   // ✅ FIX
  password: z.string().min(5),

});
  console.log("dfhjkadhaohooishd") ; 
    const process = requiredBody.safeParse(req.body) ;
    if(!process.success) {
       res.json({
          message : "Incorrect Formate"  
       })
    } 
   const { name , email, password } = req.body; 

    const existingUser = await User.findOne({email})
 
   if(!existingUser) {
       return   res.status(403).json({message :"Invalid Credentilas"}) ; 
   }
  
    const isPasswordCorrect = await bcrypt.compare(
      password , 
      existingUser.password 
    ) ; 

    if(!isPasswordCorrect) { 
       return res.status(403).json({message :"Invalid Credentials"}) ;
    }
   res.json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      pic: existingUser.pic,
      token: generateToken(existingUser._id),
    });
})

module.exports = { allUsers, registerUser, authUser , };