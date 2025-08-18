import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './AboutUs.css'

function AboutUs() {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)
  const imagesRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(titleRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 })
        .fromTo(textRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.2')
        .fromTo(buttonRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, '-=0.2')
        .fromTo(imagesRef.current?.children || [], { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="about-root">
      <div className="about-inner">
        <div className="about-content">
          <h2 ref={titleRef} className="about-title">
            More Information About The Best Mehndi Artists
          </h2>
          <p ref={textRef} className="about-text">
            You can find the most skilled and talented mehndi artists at the best prices with special discounts. 
            Choose your preferred artist and we will guide you all the way through the booking process. 
            Get your perfect mehndi design now with our curated selection of professional artists.
          </p>
          <button ref={buttonRef} className="btn about-btn" type="button">
            Book an Artist
          </button>
        </div>
        
        <div ref={imagesRef} className="about-images">
          <div className="about-image about-image-left">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xt8QDEDM7bWSAXIOpQQxFi394SpsxFOjAQ&s" 
              alt="Beautiful traditional mehndi design on hands"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
          </div>
          
          <div className="about-image about-image-right">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqktzULpOOQwMFufuEsvjGQdN4uE6J1Cj-ag&s" 
              alt="Modern bridal mehndi design with intricate patterns"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
