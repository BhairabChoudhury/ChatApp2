import React from 'react'
import { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
function ChatPage() {
   const {user} = ChatState() ;
   const [fetchAgain , setFetchAgain] = useState(false)  
  return (
    <div style={{width :"100%"}}>
       {/* {user && <SideDrawer/>}  */}
        <Box d="flex" justifyContent={"space-between"} w="100%" h="91.5vh" p="10px">
       
    
        </Box>
      
</div>
  )
};

export default ChatPage