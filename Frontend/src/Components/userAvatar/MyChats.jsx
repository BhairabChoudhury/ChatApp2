// MY chat part code  

import {
  useToast , 
  Box ,
  Stack ,
  Text,
   Button
}  from "@chakra-ui/react"

import { useEffect , useState } from "react"; 
import { AddIcon } from "@chakra-ui/icons"; 
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../../config/ChatLogics";
const MyChats = ()=>{
     const [loggedUser , setLoggedUser] = useState() ;
     
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
   const toast = useToast() ; 
  const fetchChats = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    setChats(data);// here data is user 
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Load the chats",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, []);
   return (
 
    
<Box 
display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
flexDirection="column"
alignItems="center"
p={2}
bg="white"
w={{ base: "100%", md: "31%" }}
borderRadius="lg"
borderWidth="1px"

>
  <Box
    display="flex"
    bg="#F8F8F8"
    w="100%"
    justifyContent="space-between"
    alignItems="center"
    borderRadius="lg"
    p={3}
  >
    <Text
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work Sans"
    >
      My Chats
    </Text>

    <Button
      display="flex"
      fontSize={{ base: "17px", md: "10px", lg: "17px" }}
      rightIcon={<AddIcon />}
    >
      New Group Chat
    </Button>
  </Box>
  <Box
    display="flex"
flexDirection="column"
p={3}
bg="#F8F8F8"
w="100%"
h="100vh"
borderRadius="lg"
overflowY="hidden"
   >
      {chats.length > 0  && (
        <Stack overflow="auto" flex="1" >
            {chats.map((chat)=>{
                     <Box
        key={chat._id}
        onClick={() => setSelectedChat(chat)}
        cursor="pointer"
        bg={selectedChat?._id === chat._id ? "#38B2AC" : "#E8E8E8"}
        color={selectedChat?._id === chat._id ? "white" : "black"}
        px={3}
        py={2}
        borderRadius="lg"
      >
        <Text>
          {!chat.isGroupChat
            ? getSender(loggedUser, chat.users)
            : chat.chatName}
        </Text>
         </Box>
            })}
             
        </Stack>
      )  }
  </Box>
</Box>
   )
}

export default MyChats; 