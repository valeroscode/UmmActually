import React, { useEffect } from 'react'
import HomeHeader from "./homeheader.jsx"
import './styles/about.css'
import { useRef } from 'react'
import countries from '../assets/countries.jpg'

function About() {

    const observer = new IntersectionObserver(entries => {
        let num = 0
        setTimeout(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                function reportStats() {
                    if (entry.target.getAttribute('max') < num) {
                        return
                    } else {
                        setTimeout(() => {
                            entry.target.textContent = num
                            num++
                            reportStats()
                        }, 20)
                    }
                }
                reportStats()
            }
        })
    }, 1000)
    })

    const aboutSection = useRef()
    const Num1 = useRef()
    const Num2 = useRef()
    const Num3 = useRef()

    useEffect(() => {
        setTimeout(() => {
        aboutSection.current.style.opacity = 1;
        aboutSection.current.style.top = '3rem';
    }, 100)

    observer.observe(Num2.current)
    observer.observe(Num3.current)
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
        <h1 className='playfair-display-text'>ABOUT ME</h1>
        <p>The sun dipped low on the horizon, casting long shadows across the tranquil meadow. A gentle breeze rustled through the tall grass, carrying the sweet scent of wildflowers. In the distance, a lone figure could be seen, silhouetted against the fading light. Birds chirped softly as they settled in for the night, their melodic songs echoing through the air. As the evening descended, the world seemed to slow down, enveloped in a serene stillness that spoke of peace and contentment.</p>
        <br/>
        <p>The sun dipped low on the horizon, casting long shadows across the tranquil meadow. A gentle breeze rustled through the tall grass, carrying the sweet scent of wildflowers. In the distance, a lone figure could be seen, silhouetted against the fading light. Birds chirped softly as they settled in for the night, their melodic songs echoing through the air. As the evening descended, the world seemed to slow down, enveloped in a serene stillness that spoke of peace and contentment.</p>
        </div>
    </div>

    <img id='about-me-banner' src={countries} alt="" />

    <div id='about-middle'>
    <h3 className='playfair-display-text'><a className='q1'>"</a>Nuance is the art of embracing complexity, finding beauty in the shades between black and white, and understanding that depth often lies in the spaces between the lines.<a className='q2'>"</a></h3>
    <img src="working.jpg" alt="" />
    </div>

    <div id='about-bottom'>
    <div id='about-bottom-images'>
        <div className='left-column'>
        <img src="woman.jpg" alt="" />
        <img src="desert.jpg" alt="" />
        </div>
        <div className="right-column">
        <img src="syria.jpg" alt="" />
        </div>
    </div>
    <div id='why-care'>
  
    <h3 id='why-care-text' className='playfair-display-text'>Why is it important?</h3>
    <p className='why-text-p'>The sun dipped low on the horizon, casting long shadows across the tranquil meadow. A gentle breeze rustled through the tall grass, carrying the sweet scent of wildflowers. In the distance, a lone figure could be seen, silhouetted against the fading light. Birds chirped softly as they settled in for the night, their melodic songs echoing through the air. As the evening descended, the world seemed to slow down, enveloped in a serene stillness that spoke of peace and contentment.</p>
  
    <div id='stats'>
        <div id='stat1' className='stat'>
        <h2 ref={Num1}>195</h2>
        <p>counrties in the world</p>
        </div>

        <div id='stat2' className='stat'>
        <div className='percent'>
        <h2 ref={Num2} max={40}>0</h2>
        <h2>%</h2>
        </div>
        <p>are never reported on</p>
        </div>

        <div id='stat3' className='stat'>
        <h2 ref={Num3} max={100}>0</h2>
        <p>have had a significant event this year</p>
        </div>
    </div>
    </div>
    </div>
  
    </section>

    <div id='about-footer'>
        <h2 className='playfair-display-text'>Um...</h2>
        <p>Thanks for visiting!</p>
    </div>
    </>
  )
}

export default About