import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import './index.css'
import App from './App.jsx'

// init AOS once on load
AOS.init({ duration: 600, easing: 'ease-out-quart', once: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
