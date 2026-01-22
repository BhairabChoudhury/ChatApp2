import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import ChatProvider from "./Context/ChatProvider.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
