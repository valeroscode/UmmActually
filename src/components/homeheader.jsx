import React from 'react'
import "./styles/header.css"
import { Link } from "react-router-dom";

function Homeheader() {
  return (
    <>
    <div id='header'>
    <div id='logo-title'>
    <h2>Umm... Actually</h2>
    </div>

    <nav>
    <Link to={'/'}><a>Home</a></Link>
    <Link to={'/about'}><a>About</a></Link>
    </nav>

    <div id='author'>
    <img src="" alt="" />
    <a id='contact-btn' href='mailto:AdrianaDValero@gmail.com'>Contact</a>
    </div>

    </div>
    </>
  )
}

export default Homeheader