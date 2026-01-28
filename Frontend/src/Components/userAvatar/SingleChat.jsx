import { useState, useEffect } from "react";
import {
  Box,
  Text,
  IconButton,
  Spinner,
  Input,
  useToast,
  FormControl
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/ChatLogics";
import { getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal"
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import ScrollableChat from "./ScrollableChat";
import "./styles.css"
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8000";
let socket;
let selectedChatCompare;
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { selectedChat, setSelectedChat, user } = ChatState();
 
   const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:8000/api/message/${selectedChat._id}`,
        config
      );

      console.log(data);
      setMessages(data);
      setLoading(false);


    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:8000/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        setNewMessage("");// means when you press anter then  input  field is empty 
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"], // IMPORTANT
    });

    if (user) {
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
    }
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return  ; 

    if(!typing){
      setTyping(true) ; 
      socket.emit("typing",selectedChat._id) ; 
    } 
    let lastTypingTime = new Date().getTime() ; 
    var timerLength = 3000 ; 
    setTimeout(()=>{
      var timeNow = new Date().getTime() ; // start  timing 
      var timeDiff = timeNow - lastTypingTime ; 
      if(timeDiff >= timerLength && typing){
        socket.emit("stop typing",selectedChat._id) ; 
        setTyping(false) ; 
      }
    },timerLength) 
  };


  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    if (socket && selectedChat) {
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // notification logic can go here
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              < div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                  sendMessage(e);
                }
              }}
              isRequired
              mt={3}
            >
              {isTyping ?(
                <div>
                 <Lottie
                   options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                 />

                </div>
              ):(
                   <> </>
              )}
                
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work Sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );

}
export default SingleChat

/*
onKeyDown is a keyboard event handler.
It runs every time a key is pressed down while the element is focused.
*/