import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
// if don't  give  App  as a className then  image will not render 
function App() {
  return ( 
   <div className="App"> 
    
      <Routes>
        <Route path="/" element={ <Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    
   </div>

  )
  
}

export default App;

