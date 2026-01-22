// chats
// isGroupschas 

const  mongoose = require('mongoose') ;

const chatModel = mongoose.Schema ({
  chatName :{type :String , trim :true} , // trim white  spaces are removed 
  isGroupChat :{type :Boolean , defult :false}  ,
  users : [{ type : mongoose.Schema.Types.ObjectId , ref :"User"}]  , //  why   array in  chat here  are more then one member 
   
  latestMessage :{ type :mongoose .Schema .Types.ObjectId , ref :"Message"} ,  // recent uocoming message 
  groupAdmin :{ type :mongoose.Schema.Types.ObjectId  , ref:"User"} , 

} , 
{
     timestapms :true 
} 

);
const Chat = mongoose.model("Chat" , chatModel) ;
module.exports = Chat ;