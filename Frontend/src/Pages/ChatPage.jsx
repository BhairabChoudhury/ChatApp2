import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider.jsx";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/userAvatar/MyChats.jsx";
function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
        >
        {user && <MyChats />}
      </Box>
    </div>
  );
}

export default ChatPage;