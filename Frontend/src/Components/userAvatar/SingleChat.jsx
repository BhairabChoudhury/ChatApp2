import { useState } from "react";
import {
  Box,
  Text,
  IconButton,
  Spinner,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/ChatLogics";
import { getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal"
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const { selectedChat, setSelectedChat, user } = ChatState();

 return (
  <>
    {selectedChat ? (
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
            />
          </>
        )}
      </Text>
    ) : 
    (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )
    }
  </>
);

};

export default SingleChat;
