
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react"; 
import Signup from "../Components/Authentication/Signup"
import Login from "../Components/Authentication/Login";
function Homepage() {
  return (
        <Container maxW="xl" centerContent>
            <Box 
                d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
            >
             <Text fontSize="4xl" fontFamily="Work sans">
                 Hi Users Welcome  Our Chat App!
                </Text>     
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                  <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
            </Box>
        </Container>
  );
}

export default Homepage;