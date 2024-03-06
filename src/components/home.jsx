import React, { useEffect, useRef, useState } from 'react'
import HomeHeader from "./homeheader.jsx"
import './styles/home.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faCalendar
} from "@fortawesome/free-solid-svg-icons";
import Subscribe from './subscribe.jsx';

function Home ({posts}) {
  const [livePosts, setLivePosts] = useState(posts)
  console.log(livePosts)
  const helloWorld = useRef();
  

  const hello = ['Hello!', 'Hallo!', 'Hola!', 'مرحبًا!', 'Bonjour!', 'Ciao!', 'こんにちは!', 'سڵاو!', 'Hallå!']

  const homeSection = useRef()
  

  useEffect(() => {
    window.scroll({
      top: '0px',
    })
      setTimeout(() => {
        homeSection.current.style.opacity = 1;
        homeSection.current.style.top = '3rem';  
    }, 100)
  }, [])


  function handleFilteringPosts(e) {
    if (e.target.textContent === 'All') {
    setLivePosts(posts)
    } else {    
    const filter = posts.filter(post => post.category === e.target.textContent)
    setLivePosts(filter)
    }
  }

  function searchPosts(e) {
    const title = document.getElementsByClassName('post-title')
    for (let i = 0; i < title.length; i++) {
        if (e.target.value !== '') {
            const text = title[i].textContent;
            const value = e.target.value.toLocaleUpperCase()
        if (text.toLocaleUpperCase().indexOf(value) > -1) {
            title[i].closest(".post-div").style.display = 'flex';
        } else {
            title[i].closest(".post-div").style.display = 'none';
        }
    } else {
        title[i].closest(".post-div").style.display = 'flex';
    }
    }
  }

  function updateViews(id, views) {
    fetch('https://ummactuallyblog.onrender.com/blog/incviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            views: parseInt(views) + 1
          })
      }).then(res => {
        if (res.ok) return res.json()
        console.log(res)
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
        console.log(data)
      }).catch(e => {
        console.error(e.error)
      })
  }

  let i = 0;

  function handleLanguageChanging(event) {
    if (!event) {
        return
    } else {
        helloWorld.current.textContent = hello[i];
        if (i === hello.length - 1) {
        i = 0
        } else {
        i = i + 1
        }
        setTimeout(() => {
        handleLanguageChanging()
        }, 1000)
  }
}

  return (
    <>
    <HomeHeader/>
    <section id='home-section' ref={homeSection}>
    <div id='about-blog'>
        <div id='author-img-name' onMouseLeave={() => handleLanguageChanging(false)} onMouseOver={() => handleLanguageChanging(true)}>
            <img src='author.jpg' alt="" />
            <p>Adriana Valero</p>
            <div class="talk-bubble tri-right round right-top">
            <div class="talktext">
            <p id='hi' ref={helloWorld}>Hello!</p>
            </div>
            </div>
        </div>
        <h2>Let's get into the nuance.</h2>
        <p className='about-the-blog roboto-regular'>Um…Actually is a student project created as an informal outlet for thoughts, ideas, and speculations about past and present International developments. With a focus on the political, economic, and social implications of domestic and world events, this blog aims to educate on topics not commonly presented in a practical (or honest) way.</p>

    </div>
    <div id='filter'>
    <h2>Discover All Articles Here</h2>
    <p className='roboto-regular'>Enjoy exploring the articles below, and don't forget to utilize the filters and search bar for easier navigation</p>
    <div id='search-and-filters'>
        <input onKeyUp={(e) => searchPosts(e)} type="text" placeholder='Search...' />
        <div id='filter-btns-container'>
        <button onClick={(e) => handleFilteringPosts(e)} className='filter-btn'>All</button>
    {
        posts.map((cat, index) => 
            <button key={index} onClick={(e) => handleFilteringPosts(e)} className='filter-btn'>{cat.category}</button>
        )
    }
    </div>
    </div>
    </div>

    <div id='posts'>
    {
     livePosts.length === 0 ? posts.map((post) =>
        <div className='post-div'>
            <img src={post.image} alt="" />
            <h5 className='category-preview roboto-bold'>{post.category}</h5>
            <div className='post-info'>
            <h3 className='post-title roboto-bold'>{post.title}</h3>
            <p className='post-quote roboto-regular'>{post.quote}</p>
            <hr />
            <div className='date-views'>
            <p className='roboto-regular'><FontAwesomeIcon icon={faCalendar} /> {post.date}</p>
            <p className='roboto-regular'><FontAwesomeIcon icon={faEye} /> {post.views} Views</p>
            </div>
            <Link to={{pathname: '/posts', search: `?post=${post._id}` }} target="_blank" rel="noopener noreferrer"><button className='read-more'
            onClick={() => updateViews(post._id, post.views, post.category)}>Read More</button></Link>
            </div>
        </div>
        ) : 
        livePosts.map((post) =>
        <div className='post-div'>
            <img src={post.image} alt="" />
            <h5 className='category-preview'>{post.category}</h5>
            <div className='post-info'>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-quote'>{post.quote}</p>
            <hr />
            <div className='date-views'>
            <p><FontAwesomeIcon icon={faCalendar} /> {post.date}</p>
            <p><FontAwesomeIcon icon={faEye} /> {post.views} Views</p>
            </div>
            <Link to={{pathname: '/posts', search: `?post=${post._id}` }} target="_blank" rel="noopener noreferrer"><button className='read-more'
            onClick={() => updateViews(post._id, post.views, post.category)}>Read More</button></Link>
            </div>
        </div>
        )
    }
    </div>

    <Subscribe/>

    <div id='home-footer'>
        <h2 className='playfair-display-text'>Um...</h2>
        <p>Thanks for visiting!</p>
    </div>


    </section>
    </>
  )
}

export default Home