import { Stack, Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <Stack>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} height="45px" />
        ))}
    </Stack>
  );
};

export default ChatLoading;
