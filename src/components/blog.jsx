import React, { useEffect, useState } from 'react'
import "./styles/blog.css"

function Blog() {

  const [post, setPost] = useState({
    title: "",
    date: "",
    text: "",
    quote: "",
  })

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let id = params.get("post")
    fetch(`http://localhost:3000/blog/post/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ data }) => {
        setPost(data)
        console.log(data)
      }).catch(e => {
        console.error(e.error)
      })

  }, [])

  return (
    <>
    <div id='blog-header'>
        <h3>Umm Actually...</h3>
        <hr />
    </div>
    <section id='post-section'>
    <p id='post-category'>{post.category}</p>
    <h1>{post.title}</h1>
    <div id='author-date'>
    <p className='author'>BY ADRIANA</p>
    <p>/</p>
    <p className='date'>{post.date}</p>
    </div>
    <div id='post-body'>
    <div id='quote-in-post'>
    <h1 className='quote-h1'>"</h1>
    <h2>{post.quote}</h2>
    </div>
    <p id='post-text'>
    {post.text}</p>
    </div>
    </section>

    <section id='footer'>
    <a id='contact-btn' href='mailto:AdrianaDValero@gmail.com'>Contact</a>
    <p>{post.views} Views</p>
    <img src="" alt="" />
    <h5>Adriana Valero</h5>
    <p>Undergraduate Student at FIU</p>
    </section>
    </>
  )
}

export default Blog