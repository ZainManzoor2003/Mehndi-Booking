import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import ChoosePath from './components/ChoosePath.jsx'
import CategoryCarousel from './components/CategoryCarousel.jsx'
import TabbedShowcase from './components/TabbedShowcase.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const navigate = useNavigate()
  const goGetStarted = () => navigate('/get-started')

  return (
    <>
      <Header onGetStarted={goGetStarted} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero onRequestArtist={goGetStarted}  />
              <TabbedShowcase />
              <CategoryCarousel/>
            </>
          }
        />
        <Route path="/get-started" element={<ChoosePath />} />
        <Route path="/categories" element={<CategoryCarousel />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
