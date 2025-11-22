import React from 'react'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import About from './About/page'
import Academics from './AcademicsPage/page'
import FacultyPage from './Faculty/page'
import Facilities from './Facilities/page'
import Admission from './Admission/page'
import Events from './EventsAndNewsPage/page'
import Gallery from './Gallery/page'
import FeedbackPage from './ParentsFeedBack/page'
import Contact from './Contact/page'
import Footer from './component/Footer'

const Page = () => {
  return (
    <>
      

      {/* Hero Section */}
      <Hero />

      {/* About */}
      <About />

      {/* Academics */}
      <Academics />

      {/* Faculty */}
      <FacultyPage />

      {/* Facilities */}
      <Facilities />

      {/* Admission */}
      <Admission />

      {/* Events & News */}
      <Events />

      {/* Gallery */}
      <Gallery />

      {/* Parents Feedback */}
      <FeedbackPage />

      {/* Contact */}
      <Contact />

    
    </>
  )
}

export default Page
