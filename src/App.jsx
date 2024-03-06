import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import Blog from './components/blog.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://ummactuallyblog.onrender.com/blog', {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
        setPosts(data)
      }).catch(e => {
        console.error(e.error)
      })
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home posts={posts}/>}></Route>
          <Route path="/home" element={<Home posts={posts}/>}></Route>
          <Route path="blog" element={<Blog posts={posts}/>}></Route>
          <Route path="about" element={<About/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
