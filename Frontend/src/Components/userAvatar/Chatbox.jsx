import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat"
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
   const { selectedChat } = ChatState();
   return (
      <Box
         display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
         alignItems="center"
         flexDirection="column"
         p={3}
         bg="rgba(255, 255, 255, 0.4)"
         backdropFilter="blur(10px)"
         w={{ base: "100%", md: "68%" }}
         borderRadius="xl"
         borderWidth="1px"
         borderColor="whiteAlpha.400"
      >
         <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>

   )
}

export default Chatbox; 