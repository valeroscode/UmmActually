import React, {useRef} from 'react'
import './styles/home.css'

function Subscribe () {
  const emailInput = useRef();
  function handleSubscribing(e, email) {

    fetch(`https://ummactuallyblog.onrender.com/blog/sub`, {
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
        document.cookie = `sub=true; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; Secure`;
        e.target.textContent = `You're Subscribed!`
        e.target.previousElementSibling.style.display = 'none'
      }).catch(e => {
        alert("something went wrong...")
        console.error(e.error)
      })
    
  }

  return (
    <>
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
    </>
  )
}

export default Subscribe