import React, {useEffect} from 'react'
import "./styles/header.css"
import { Link } from "react-router-dom";

function Homeheader() {

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header')
      if (window.scrollY > 5) {
        header.style.padding = '0rem 0'
      } else {
        header.style.padding = '2rem 0'
      }
    })
  }, [])

  return (
    <>
    <div id='header'>
    <div id='logo-title'>
    <h2 className='playfair-display-text'>Um, Actually...</h2>
    </div>

    <nav>
    <Link to={'/'}><a style={window.location.pathname === '/' ? {color: 'gray'} : null}>Home</a></Link>
    <Link to={'/about'}><a style={window.location.pathname === '/about' ? {color: 'gray'} : null}>About</a></Link>
    </nav>

    <div id='author'>
    <img src="author.jpg" alt="" />
    <a id='contact-btn' href='mailto:AdrianaDValero@gmail.com'>Contact</a>
    </div>

    </div>
    </>
  )
}

export default Homeheader