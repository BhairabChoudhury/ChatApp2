// const express = require("express") ;
//  const dotenv = require("dotenv") ; 
//  const mongoose = require("mongoose") ; 
//  const bcrypt = require("bcrypt") ; 
//  const {z }= require("zod"); 
//  const jwt = require("jsonwebtoken") ; 
//  const User  = require("../models/userModels") ; 
//  const cors = require("cors") ; 
//  const  app = express() ; 
//  dotenv.config() ; 
//  const JWT_SECRET = "jnhjsadnas" ; 
// app.use(express.json()) ; 
//  mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log("Mongo Db Successfully  Connected "))
// .catch(err =>console.log("error catch" ,err)) ;  

// app.use(
//    cors({
//        origin :"http://localhost:5173" ,
//        credentials:true 
// })
// )
 
//  app.post("/api/v1/signup", async(req, res)=>{
  
// const requiredBody = z.object({
//   name: z.string().min(4).max(20),
//   email: z.string().email(),   // ✅ FIX
//   password: z.string().min(5),
//   pic: z.string().min(5)
// });

 
// const process = requiredBody.safeParse(req.body) ;
//   if(!process.success){
//       res.json({
//          message : "Incorrect Format" 
//       })
//       return ;
//   } 

//   const {name , email , password , pic} = req.body ;
//   try {
//      const hashedPassword = await bcrypt.hash(password,10) ;
//      await User.create({
//           name,
//           email,
//           password:hashedPassword,
//           pic,
//      })
//   }catch(err){
//    res.json({message : "User already exist"});
//   }
 
//   res.json({message : "You have loged in Succesfully"}) ;

//  }) ;

//  app.post("/api/v1/login" , async(req , res)=>{
//  const requiredBody = z.object({
//   name: z.string().min(4).max(20),
//   email: z.string().email(),   // ✅ FIX
//   password: z.string().min(5),
// });

//     const process = requiredBody.safeParse(req.body) ;
//     if(!process.success) {
//        res.json({
//           message : "Incorrect Formate" 
//        })
//     } 
//    const { name , email, password } = req.body; 

//     const existingUser = await User.findOne({email})
 
//    if(!existingUser) {
//        return   res.status(403).json({message :"Invalid Credentilas"}) ; 
//    }
  
//     const isPasswordCorrect = await bcrypt.compare(
//       password , 
//       existingUser.password 
//     ) ; 

//     if(!isPasswordCorrect) { 
//        return res.status(403).json({message :"Invalid Credentials"}) ;
//     }

//     const token = jwt.sign({id:existingUser._id} , JWT_SECRET , {expiresIn :"30d"}) ;
    
//     res.json({token}) ; 
// })
  
// const  PORT   = process.env.PORT || 3000 
 
// app.listen(PORT ,()=>{
//      console.log(`Server is runing on PORT ${PORT}`) 
// }

// )

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors") ; 

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use(
  cors({
    origin: "http://localhost:5176",
    credentials: true,
  })
);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

const  PORT   = process.env.PORT || 8000
 
app.listen(PORT ,()=>{
     console.log(`Server is runing on PORT ${PORT}`) 
}

)