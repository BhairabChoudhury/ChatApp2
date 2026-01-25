import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";  // remember VStack form react 
import axios from "axios";
import { useState } from "react";  
import { useToast } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom"
function Login (){
       
      const  [show  , setShow] = useState(false ) ; 
              const [name , setName] = useState() ; 
              const [email , setEmail] = useState() ; 
              const [password , setPassword] = useState() ;
              const [pic , setPic] = useState() ; 
              const handleClick = () =>setShow(!show) ; 
              const [loading , setLoading] = useState(false) ; 
            // const [serverResponse , setServerResponse] = useState(null) ; 
              const navigate  = useNavigate() ;
               const toast =useToast() ;
       const submitHandler = async () => {
    setLoading(true);
    if ( !name||!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        { name,email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
     return (
          
                <VStack spacing="5px">
                  <FormControl id="first-name" isRequired>
                        <FormLabel>Name</FormLabel>
                            <Input
                            placeholder="Enter Your Name"
                             onChange={(e) => setName(e.target.value)}
                            />
                  </FormControl>
                  <FormControl id ="email" isRequired>
                       <FormLabel>Email Address</FormLabel>
                        <Input
                         type="email"
                         placeholder="Enter Your Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                         />
                         </FormControl>
                      <FormControl>
                         <FormLabel> Password</FormLabel> 
                          <InputGroup> 
                            <Input 
                                 type = {show ? "text" :"password"} 
                                 placeholder = "Enter Password" 
                                 onChange = {(e) => setPassword(e.target.value)}
        
                              /> 
                            <InputRightElement width="4.5rem">
                              <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                                 </Button>
                                 </InputRightElement>
                          </InputGroup>
        
                    </FormControl>  
                   
                   <Button
                colorScheme="blue"
                width="100%" 
                style={{ marginTop: 15 }}
                onClick={ submitHandler} 
                isLoading={loading}
                >
                 Login 
               </Button>

        </VStack>

     )

}

export default Login ; 
