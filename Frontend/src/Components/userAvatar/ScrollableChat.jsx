import { Avatar, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ScrollToBottom from "react-scroll-to-bottom";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollToBottom className="messages">
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}

            <span
              style={{
                background:
                  m.sender._id === user._id
                    ? "linear-gradient(to right, #805AD5, #6B46C1)"  // Brand gradient for user
                    : "#E2E8F0", // Light gray for others
                color: m.sender._id === user._id ? "white" : "black",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: m.sender._id === user._id
                  ? "20px 20px 0 20px"
                  : "20px 20px 20px 0",
                padding: "10px 18px",
                maxWidth: "75%",
                boxShadow: "sm",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollToBottom>
  );
}

export default ScrollableChat;