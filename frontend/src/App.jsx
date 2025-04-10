import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import { Toaster } from "react-hot-toast"
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import Form from './pages/Form'  


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
    <Toaster />
    </>
  )
}
