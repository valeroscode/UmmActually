import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import Blog from './components/blog.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="posts" element={<Blog/>}></Route>
          <Route path="about" element={<About/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
