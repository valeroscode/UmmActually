import React, { useEffect } from 'react'
import HomeHeader from "./homeheader.jsx"
import './styles/about.css'
import { useRef } from 'react'
import countries from '../assets/countries.jpg'
import quoteImg from '../assets/quote-img.png'

function About() {

    const aboutSection = useRef()

    useEffect(() => {
        aboutSection.current.style.opacity = 1;
        aboutSection.current.style.top = '3rem';
    }, [])

  return (
    <>
    <HomeHeader/>
    <section id='about-section' ref={aboutSection}>
    <div id='about-me-top'>
        <div id='interests'>
            <p>World History.</p>
            <p>Levantine Studies.</p>
            <p>Critical Theory.</p>
        </div>
        <div id='about-me-info'>
        <h1>ABOUT ME</h1>
        <p>The sun dipped low on the horizon, casting long shadows across the tranquil meadow. A gentle breeze rustled through the tall grass, carrying the sweet scent of wildflowers. In the distance, a lone figure could be seen, silhouetted against the fading light. Birds chirped softly as they settled in for the night, their melodic songs echoing through the air. As the evening descended, the world seemed to slow down, enveloped in a serene stillness that spoke of peace and contentment.</p>
        </div>
    </div>

    <img id='about-me-banner' src={countries} alt="" />

    <div id='about-me-bottom'>
        <div id='quote'>
            OUr work fnvokrvnkosvnosjvbsakhcbsjdk
        </div>
        <img src={quoteImg} alt="" />
    </div>
    </section>
    </>
  )
}

export default About