import React from 'react'
import Hero from './component/Hero'
import About from './About/page'
import Academics from './AcademicsPage/page'
import FacultyPage from './Faculty/page'
import Facilities from './Facilities/page'
import Admission from './Admission/page'
import Events from './EventsAndNewsPage/page'
import Gallery from './Gallery/page'
import Contact from './Contact/page'

const Page = () => {
  return (
    <>
      

      {/* Hero Section */}
      <Hero />

      {/* About */}
      <About />

      {/* Academics */}
      <Academics />


      {/* Facilities */}
      <Facilities />


      {/* Faculty */}
      <FacultyPage />


      {/* Admission */}
      <Admission />

      {/* Events & News */}
      <Events />

      {/* Gallery */}
      <Gallery />

      {/* Contact */}
      <Contact />

    
    </>
  )
}

export default Page
