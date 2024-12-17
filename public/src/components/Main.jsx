import React from 'react'
import './Main.css'
import Topbar from './Topbar'
import Events from './Events'
import Blogs from './Blogs'
import Query from './Query'
const Main = () => {
  return (
    <>
    <div className='hero-section'>
      <Topbar/>
      <div className='main-box'>
      <h1 className='main-heading'>Welcome to SoulSpace</h1>
      <h2 className='main-second-heading'>Connect with others who understand, share your journey, and find comfort in companionship.</h2>
      <button className='join-btn'>Join Us</button>
    </div>
    </div>
    <div className='main-second-sec'>
        <div className='main-second-inside'>
          <div className='main-second-first'>
            <h1 className='main-second-first-heading'>Express Yourself through Journals</h1>
            <p className='main-second-first-p'> Your thoughts and feelings are important, and there's no better way to explore them than by writing in a journal. Begin your journey to self-discovery, one entry at a time.</p>
          </div>
          <div className='main-second-second'>
            <div className='jimg'></div>
          </div>
        </div>
    </div>
    <div className='main-third-sec'>
        <div className='main-third-inside'>
        <div className='main-third-second'>
            <div className='jimg2'></div>
          </div>
          <div className='main-third-first'>
            <h1 className='main-third-first-heading'>Express Yourself through Journals</h1>
            <p className='main-third-first-p'> Your thoughts and feelings are important, and there's no better way to explore them than by writing in a journal. Begin your journey to self-discovery, one entry at a time.</p>
          </div>
        </div>
    </div>
    <div className='main-fourth-sec'>
      <h1 className='up-events'>Join Upcoming Events</h1>
    <Events/>
    </div>
    <div className='main-fifth-sec'>
      <div className='about-blog'>
          <h1>Explore Interesting Blogs</h1>
          <p>Discover a collection of personal stories, reflections, and insights from individuals navigating the challenges of anxiety, depression, and the journey of self-expression. These blogs offer a safe and supportive space to connect, reflect, and find comfort in shared experiences.</p>
      </div>
      <div className='blog-div'>
      <Blogs/>
      </div>
    </div>
    <div className='main-sixth-sec'>
    <h1 className='mood-heading'>Track Your Mood with Ease</h1>
    <p className='mood-p'>Monitor your emotional well-being with our intuitive mood tracker. Easily record your feelings, identify patterns, and gain insights to better understand your mood and mental health over time</p>
      <div className='mood'></div>
    </div>
    <div className='query-sec'>
        <Query/>
    </div>
    </>
  )
}

export default Main;
