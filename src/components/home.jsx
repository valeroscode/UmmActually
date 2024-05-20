import React, { useEffect, useRef, useState } from 'react'
import HomeHeader from "./homeheader.jsx"
import './styles/home.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faCalendar
} from "@fortawesome/free-solid-svg-icons";
import Subscribe from './subscribe.jsx';

function Home () {

  setTimeout(() => {
  const children = document.getElementsByClassName('post-div');
    for (let i = 0; i < children.length; i++) {
        children[i].style.opacity = 1;
        children[i].style.top = '0rem';
    }
  }, 500)

  const [posts, setPosts] = useState([])
  const [livePosts, setLivePosts] = useState([])
  const helloWorld = useRef();
  const nuance = useRef();
  const headline = useRef();
  const thoughts = useRef();
  const ideas = useRef();
  const specs = useRef();
  const hello = ['Hello!', 'Hallo!', 'Hola!', 'مرحبًا!', 'Bonjour!', 'Ciao!', 'こんにちは!', 'سڵاو!', 'Hallå!']

  const homeSection = useRef()

  const postsElement = useRef();
  const fixedFilters = useRef();
  

  useEffect(() => {

      fetch('https://umactuallyblog.azurewebsites.net/api/Posts/GetAllPosts', {
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        }).then((data) => {
          setPosts(data)
          setLivePosts(data)
        }).catch(e => {
          console.error(e.error)
        })

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('home-section').style.top = '0'
    document.getElementById('home-section').style.opacity = '1'
    window.scroll({
      top: '0px',
    })
      setTimeout(() => {
        homeSection.current.style.opacity = 1;
        homeSection.current.style.top = '3rem';  
    }, 100)
    handleLanguageChanging()

    const ob = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
      
      fixedFilters.current.style.right = '0rem';
        } else {
    
          fixedFilters.current.style.right = '-20rem';
        }
      })
    })

    const nuanceOb = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        nuance.current.style.color = "#8969E5"
      } else {
        nuance.current.style.color = "black"
      }
    })
    })

    const headlineOb = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        headline.current.style.fontSize = "3rem"
      } else {
        headline.current.style.fontSize = "2.7rem"
      }
    })
    })

    function highlightword(word, delay) {
      const highlight = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              word.style.color = "#F1DD73"
            }, delay)
          
        } else {
          word.style.color = "black"
        }
      })
      })

      highlight.observe(word)
    }

    ob.observe(postsElement.current)
    nuanceOb.observe(nuance.current)
    headlineOb.observe(headline.current)
    highlightword(thoughts.current, 500)
    highlightword(ideas.current, 1000)
    highlightword(specs.current, 1500)
  }, [])


  function handleFilteringPosts(e) {
    if (e.target.textContent === 'All') {
    setLivePosts(posts)
    } else {    
    const filter = posts.filter(post => post.category === e.target.textContent)
    setLivePosts(filter)
    }
  }

  useEffect(() => { 

    const children = document.getElementsByClassName('post-div');
    let i = 0;
    function showPosts() {
      if (i === children.length - 1) {
      return
      } else {
     
      setTimeout(() => {
      showPosts()
      children[i].style.opacity = 1;
      children[i].style.top = '0rem';
      i++
    }, 200)
      }
    }
    if (livePosts.length !== 0) {
      showPosts()
    }
    
  }, [livePosts])

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

  function updateViews(title, views) {
    localStorage.setItem('post', title)
    const calc = parseInt(views) + 1
    const str = calc.toString()
    fetch('https://umactuallyblog.azurewebsites.net/api/Posts/incviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            views: str
          })
      }).then(res => {
        if (res.ok) return res.json()
        console.log(res)
        return res.json().then(json => Promise.reject(json))
      }).then((data) => {
      }).catch(e => {
        console.error(e.error)
      })
  }

  let i = 0;

  const talkBubble = useRef();

  function handleLanguageChanging() {
    if (i === hello.length - 1) {
       i = 0;
       setTimeout(() => {
        handleLanguageChanging()
        }, 2000)
    } else {
        helloWorld.current.style.opacity = 0;
        i = i + 1;
        setTimeout(() => {
          helloWorld.current.textContent = hello[i];
        helloWorld.current.style.opacity = 1;
        }, 200)
        setTimeout(() => {
        handleLanguageChanging()
        }, 2000)
  }
}

  return (
    <>
    <HomeHeader/>
    <section id='home-section' ref={homeSection}>

      <div id="hello-banner">
      <div className="talk-bubble tri-right round right-top" ref={talkBubble}>
            <div className="talktext">
            <p id='hi' ref={helloWorld}>Hello!</p>
            </div>
      </div>
      </div>
    <div id='about-blog'>
        {/* <div id='author-img-name'>
            <img src='author.jpg' alt="" />
            <p className='authName'>Adriana Valero</p>
            
        </div> */}
        <h2 ref={headline}>Let's get into the <a ref={nuance} id='nuance'>nuance</a>.</h2>
        <p className='about-the-blog roboto-regular'>Um, Actually... is a student project created as an informal outlet for <a ref={thoughts}>thoughts</a>, <a ref={ideas}>ideas</a>, and <a ref={specs}>speculations</a> about past and present International developments. With a focus on the political, economic, and social implications of domestic and world events, this blog aims to educate on topics not commonly presented in a practical (or honest) way.</p>
    </div>
    <div id='filter-btns-container' ref={fixedFilters}>
        <button onClick={(e) => handleFilteringPosts(e)} className='filter-btn'>All</button>
    {
        posts.map((cat, index) => 
            <button key={index} onClick={(e) => handleFilteringPosts(e)} className='filter-btn'>{cat.category}</button>
        )
    }
    </div>
    <div id='filter'>
    <h2>Discover <i>All</i> Articles Here</h2>
    <p className='roboto-regular'>Enjoy exploring the articles below, and don't forget to utilize the filters and search bar for easier navigation</p>
    <div id='search-and-filters'>
        <input onKeyUp={(e) => searchPosts(e)} type="text" placeholder='Search...' />
        
    </div>
    </div>

    <div id='posts' ref={postsElement}>
    {
     livePosts.length === 0 ? posts.map((post) =>
      <Link to={{pathname: '/posts', search: `?post=${post.title}` }} rel="noopener noreferrer"> 
      <div className='post-div' onClick={() => updateViews(post.title, post.views)}>
           <div className='post-div-img-cat'>
            <img src={post.image} alt="" />
            <h5 className='category-preview roboto-bold'>{post.category}</h5>
            </div>
            <div className='post-info'>
            <h3 className='post-title roboto-bold'>{post.title}</h3>
            <p className='post-quote roboto-regular'>{post.quote}</p>
            <hr />
            <div className='date-views'>
            <p className='roboto-regular'><FontAwesomeIcon icon={faCalendar} /> {post.date}</p>
            <p className='roboto-regular'><FontAwesomeIcon icon={faEye} /> {post.views} Views</p>
            </div>
            </div>
            </div>
            </Link>
       
        ) : 
        livePosts.map((post) =>
          <Link to={{pathname: '/posts', search: `?post=${post.title}` }} rel="noopener noreferrer">
        <div className='post-div' onClick={() => updateViews(post.title, post.views)}>
            <div className='post-div-img-cat'>
           
            <img src={post.image} alt="" />
            <h5 className='category-preview roboto-bold'>{post.category}</h5>
            </div>
            <div className='post-info'>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-quote'>{post.quote}</p>
            <hr />
            <div className='date-views'>
            <p><FontAwesomeIcon icon={faCalendar} /> {post.date}</p>
            <p><FontAwesomeIcon icon={faEye} /> {post.views} Views</p>
            </div>
            </div>
        </div>
        </Link>
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