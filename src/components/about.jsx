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
    }, 200)
    })

    const aboutSection = useRef()
    const Num1 = useRef()
    const Num2 = useRef()
    const Num3 = useRef()

    useEffect(() => {

        
        setTimeout(() => {
        aboutSection.current.style.opacity = 1;
    }, 100)

    observer.observe(Num2.current)
    observer.observe(Num3.current)

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <p>My name is Adriana Valero, I'm a Cuban-American scholar & masters candidate at King's College specializing in Global Affairs. My interest in politics & all things International reaches far back into my country of origin, the immigrant experience in America, and the many conversations we had at the dinner table about Cuban politics.</p>
        <br/>
        <p>Naturally, this interest extended to many other places in the world, with a specified interest in history, Levantine studies, and critical theory. My objective is to present topics not commonly talked about in a practical and honest way. This is also an outlet for ideas, opinions, and speculations.</p>
        </div>
    </div>

    <img id='about-me-banner' src={countries} alt="" />

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

    <div id='about-footer'>
        <h2 className='playfair-display-text'>Um...</h2>
        <p>Thanks for visiting!</p>
    </div>
  
    </section>
    </>
  )
}

export default About