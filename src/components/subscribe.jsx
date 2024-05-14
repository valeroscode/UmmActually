import React, {useRef} from 'react'
import './styles/home.css'

function Subscribe () {
  const emailInput = useRef();
  function handleSubscribing(e, email) {

    fetch(`https://ummactuallyblog.onrender.com/api/Posts/sub`, {
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
      }).catch(e => {
        console.error(e.error)
      })

      document.cookie = `sub=true; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; Secure`;
      e.target.textContent = `You're Subscribed!`
      e.target.previousElementSibling.style.display = 'none'
    
  }

  return (
    <>
    {
      document.cookie.indexOf("sub") === -1 ?
    <div id='new-content-parent'>
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
    </div>
      :
      <div id='new-content-parent'>
      <div id='new-contnet'>
      <div id='sub'>
      <h2>Um... Thanks for Subscribing!</h2>
      <p>You'll be notified whenever a new blog post is up!</p>
      </div>
      </div>
      </div>
    }
    
    </>
  )
}

export default Subscribe