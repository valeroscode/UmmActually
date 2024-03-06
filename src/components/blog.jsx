import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import "./styles/blog.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft, faChevronRight, faEye, faCalendar
} from "@fortawesome/free-solid-svg-icons";
import Subscribe from './subscribe';

function Blog() {

  const [posts, setPosts] = useState([])
  const [similarPosts, setSimilarPosts] = useState([])
  const [postIndex, setPostIndex] = useState(0)
  const commenterName = useRef()
  const commentText = useRef()
  const postCategory = useRef()

  const [post, setPost] = useState({
    title: "",
    date: "",
    text: "",
    quote: "",
    comments: []
  })

  let params = new URL(document.location).searchParams;
  let id = params.get("post")

  useEffect(() => {
    window.scroll({
      top: '0px',
    })
    fetch(`https://ummactuallyblog.onrender.com/blog/article/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
        setPost(data)
      }).catch(e => {
        console.error(e.error)
      })

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

  useEffect(() => {
  setSimilarPosts(posts.filter((p => p.title !== post.title && p.category === post.category)))
  findPostIndex()
  }, [post])

  function findPostIndex() {
   
    let index;
    posts.map((p, i) => p.title === post.title ? index = i : null)
    setPostIndex(index)
  }

  function handleLeavingComment(name, comment) {
    if (name !== '' && comment !== '') {
    let params = new URL(document.location).searchParams;
    let id = params.get("post")
    fetch(`https://ummactuallyblog.onrender.com/blog/newcomment`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            name: name,
            comment: comment
          })
        }).then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        }).then(({ data }) => {
            const userCommentDiv = new DocumentFragment();
            const h4 = document.createElement('h4');
            const text = document.createElement('p')
            h4.textContent = name;
            text.textContent = comment;
            userCommentDiv.appendChild(h4)
            userCommentDiv.appendChild(text)
            document.getElementById('reading-comments').appendChild(userCommentDiv)
            commenterName.current.value = '';
            commentText.current.value = '';
        }).catch(e => {
          alert("something went wrong... the developer has been notified.")
          console.error(e.error)
        })
    } else {
        alert('Please fill out all the fields')
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
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
    
      }).catch(e => {
        console.error(e.error)
      })
  }

  return (
    <>
    <div id='blog-header'>
        <div id='blog-header-nav'>
        {
            postIndex > 0 ? <Link to={{pathname: '/posts', search: `?post=${posts[postIndex - 1]._id}` }}><button onClick={() => {
              setTimeout(() => {
              window.location.reload()
            }, 100)
            }}><FontAwesomeIcon icon={faChevronLeft} /> Prev Post</button></Link> : <button style={{display:'none'}}>Prev Post</button>
        }
        <h3 className='playfair-display-text'>Umm Actually...</h3>
        {
            postIndex < posts.length - 1 ? <Link to={{pathname: '/posts', search: `?post=${posts[postIndex + 1]._id}` }}><button onClick={() => {
              setTimeout(() => {
                window.location.reload()
              }, 100)
            }}>Next Post <FontAwesomeIcon icon={faChevronRight} /></button></Link> : <button style={{display:'none'}}>Next Post</button>
        }
        
        </div>
        <hr />
    </div>
    <section id='post-section'>
    <p ref={postCategory} id='post-category' className='roboto-regular'>{post.category}</p>
    <h1 className='playfair-display-text'>{post.title}</h1>
    <div id='author-date'>
    <p className='author roboto-regular'>BY ADRIANA</p>
    <p className='roboto-regular'>/</p>
    <p className='date roboto-regular'>{post.date}</p>
    </div>
    <div id='quote-in-post'>
    <h1 className='quote-h1'>"</h1>
    <h2 className='playfair-display-text'>{post.quote}</h2>
    </div>
    <img src={post.image} alt="" />
    <div id='post-body'>
    <p id='post-text' className='roboto-regular'>
    {post.text}</p>
    </div>

    <Subscribe/>

    <div id='comments-section'>
    <div id='reading-comments'>
      {
        post.comments.length > 0 ? <h2>Comments</h2> : null
      }
    
    {
        post.comments.map((comment) => 
            <div>
                <h4>{comment.name}</h4>
                <p>{comment.comment}</p>
            </div>
        )
    }
    </div>
    <div id='leave-comment-section' className='roboto-regular'>
    <h2>Leave a comment</h2>
    <div>
       <input ref={commenterName} type="text" placeholder='Name' />
       <input ref={commentText} type="text" placeholder='Comment' />
       <button id='leave-comment'
       onClick={() => handleLeavingComment(commenterName.current.value, commentText.current.value)}>Leave Comment</button>
    </div>
    </div>
    </div>
    </section>


    { similarPosts.length !== 0 ?
    <section id='similar-posts'>
    <h3 className='roboto-regular sh3'>Similar Posts</h3>
    <div id='posts'>
    {
        similarPosts.map((post) =>
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
            <Link to={{pathname: '/posts', search: `?post=${post._id}` }}><button className='read-more'
            onClick={() => {
            updateViews(post._id, post.views, post.category)
            setTimeout(() => {
              window.location.reload()
            }, 100)
            }}>Read More</button></Link>
            </div>
        </div>
        )
    }
    </div>
    </section>
 : null}

    <section id='footer'>
    <a id='contact-btn' href='mailto:AdrianaDValero@gmail.com'>Contact</a>
    <p>{post.views} Views</p>
    <img src="" alt="" />
    <h5>Adriana Valero</h5>
    <p>Undergraduate Student at FIU</p>
    <div id='home-footer'>
        <h2>Um...</h2>
        <p>Thanks for visiting!</p>
    </div>
    </section>
    </>
  )
}

export default Blog