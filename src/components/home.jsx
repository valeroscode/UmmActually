import React, { useEffect, useRef, useState } from 'react'
import HomeHeader from "./homeheader.jsx"
import './styles/home.css'
import blog from '../assets/blog-stock.jpg'
import { Link } from "react-router-dom";

function Home () {

  const [posts, setPosts] = useState([])
  const [livePosts, setLivePosts] = useState([])
  const helloWorld = useRef();
  const emailInput = useRef();

  const hello = ['Hello!', 'Hallo!', 'Hola!', 'مرحبًا!', 'Bonjour!', 'Ciao!', 'こんにちは!', 'سڵاو!', 'Hallå!']

  const homeSection = useRef()
  

  useEffect(() => {
    fetch('http://localhost:3000/blog', {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
        setPosts(data)
        setLivePosts(data)
      }).catch(e => {
        console.error(e.error)
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
    fetch('http://localhost:3000/blog/incviews', {
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

  function handleSubscribing(e, email) {

    fetch(`http://localhost:3000/blog/sub`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
          }),
      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
        console.log(data)
        document.cookie = `sub=true; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; Secure`;
        e.target.textContent = `You're Subscribed!`
        e.target.previousElementSibling.style.display = 'none'
      }).catch(e => {
        alert("something went wrong...")
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
            <img src='Um.png' alt="" />
            <p>Adriana Valero</p>
            <div class="talk-bubble tri-right round right-top">
            <div class="talktext">
            <p id='hi' ref={helloWorld}>Hello!</p>
            </div>
            </div>
        </div>
        <h2>Let's get into the nuance.</h2>
        <p>About amivnvofvmopdsnvosvosv;nfovwpvfnsrfmpknfkonforwnfowrnfpiwejrijepivgrpofprwifhweprkwogrio</p>

    </div>
    <div id='filter'>
    <h2>Discover Nice Articles Here</h2>
    <p>vmdkfnlnvfsklvmklbjslvknsdlnsdljkjvnsdklvbsdkjbvlsdjbvksdbljvbksd</p>
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
        livePosts.map((post) =>
        <div className='post-div'>
            <div></div>
            <img src={post.image} alt="" />
            <h5 className='category-preview'>{post.category}</h5>
            <div className='post-info'>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-quote'>{post.quote}</p>
            <hr />
            <div className='date-views'>
            <p>{post.date}</p>
            <p>{post.views} Views</p>
            </div>
            <Link to={`http://localhost:5173/blog?post=${post._id}`} target="_blank" rel="noopener noreferrer"><button className='read-more'
            onClick={() => updateViews(post._id, post.views)}>Read More</button></Link>
            </div>
        </div>
        )
    }
    </div>

    <div id='new-contnet'>
    <div id='sub'>
    <h2>Subscribe For New Content!</h2>
    <p>You'll be notified whenever a new blog post is up!</p>
    </div>

    <div id='sub-action'>
    <input ref={emailInput} type="text" placeholder='Email'/>
 
    <button onClick={(e) => handleSubscribing(e, emailInput.current.value)}>Subscribe</button>
    
    </div>
    </div>

    <div id='home-footer'>
        <h2>Um...</h2>
        <p>Thanks for visiting!</p>
    </div>


    </section>
    </>
  )
}

export default Home