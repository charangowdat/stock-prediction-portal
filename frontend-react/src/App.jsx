import React from "react"

import './assets/style.css'
import Header from "./components/header.jsx"
import Main from "./components/main.jsx"
import Footer from "./components/footer.jsx"
import {BrowserRouter, Routes, Route} from "react-router";
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"

function App() {

  return (  
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="register/" element={<Register/>} />
          <Route path="login/" element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
