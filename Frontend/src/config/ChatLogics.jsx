// remember in message array store both message sender and receiver 

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const  isSameSenderMargin = (messages , m , i,userId)=>{
 if(i<messages.lenght-1 && messages[i+1].sender._id===m.sender._id && messages[i].sender._id!=userId){
   return 33 ; 
 }
 else if(

      (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)

 ) {
  return 0 ; 
 }
 else return "auto" ; 
}

export const isLastMessage = (messages, i, userId) => { // last message of in chat bos sended by user 
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSender = (messages, m, i, userId) => {  // for checking  last message of other user whom you are messaging it help to stick other uer  photo in last message 
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id/*means after his message you have send message */ ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};