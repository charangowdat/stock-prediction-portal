import React from "react"
import './assets/style.css'
import Header from "./components/Header.jsx"
import Main from "./components/Main.jsx"
import Footer from "./components/footer.jsx"
import {BrowserRouter, Routes, Route} from "react-router";
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import AuthProvider from "./AuthProvider.jsx"
import Dashboard from "./components/dashboard/dashboard.jsx"
import {ToastContainer} from 'react-toastify'
import PrivateRoute from "./PrivateRoute.jsx"
import PublicRoute from "./PublicRoute.jsx"


function App() {

  return (  
    <>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="register/" element={<PublicRoute><Register/></PublicRoute>} />
          <Route path="login/" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="dashboard/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </AuthProvider>
    </>
  )
}

export default App
