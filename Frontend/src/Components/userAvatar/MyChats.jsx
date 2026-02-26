// MY chat part code  

import {
  useToast,
  Box,
  Stack,
  Text,
  Button
} from "@chakra-ui/react"

import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, notification, setNotification } = ChatState();
  const toast = useToast();
  const fetchChats = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:8000/api/chat", config);
      setChats(Array.isArray(data) ? data : []);
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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("from localStorage:", userInfo); // ✅ correct
    setLoggedUser(userInfo);
    fetchChats();
  }, [fetchAgain]);


  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="rgba(255, 255, 255, 0.4)" // Glass effect
      backdropFilter="blur(10px)"
      w={{ base: "100%", md: "31%" }}
      borderRadius="xl" // Larger radius
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      boxShadow="lg"
    >
      <Box
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        pb={4}
      >
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work Sans"
        >
          My Chats
        </Text>

        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="transparent"
        w="100%"
        h="100%"
        borderRadius="xl"
        overflowY="hidden"
      >
        {Array.isArray(chats) && chats.length > 0 && (
          <Stack overflow="auto" flex="1">
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => {
                  setSelectedChat(chat);
                  setNotification(notification.filter((n) => n.chat._id !== chat._id))
                }}
                cursor="pointer"
                bg={selectedChat?._id === chat._id ? "brand.500" : "whiteAlpha.700"}
                color={selectedChat?._id === chat._id ? "white" : "black"}
                px={3}
                py={3}
                borderRadius="xl"
                mb={2}
                boxShadow="sm"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                  bg: selectedChat?._id === chat._id ? "brand.600" : "whiteAlpha.900",
                  transform: "scale(1.02)",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text fontWeight="bold">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </div>
                {notification.filter((n) => n.chat._id === chat._id).length > 0 && (
                  <div
                    style={{
                      background: "green",
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px 10px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {notification.filter((n) => n.chat._id === chat._id).length}
                  </div>
                )}
              </Box>
            ))}
          </Stack>
        )}

      </Box>
    </Box>
  )
}

export default MyChats;
/*
What you wrote (NO return )
chats.map((chat) => {
  <Box>
    ...
  </Box>
});

When you use { } after the arrow =>, JavaScript expects an explicit return.
Since you didn’t write one, the function returns undefined.

 so use it=>  chats.map((chat)=>(
   
  ))
*/