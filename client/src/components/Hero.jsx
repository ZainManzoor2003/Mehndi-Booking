import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

function Hero({ onRequestArtist }) {
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const ctasRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(titleRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo(ctasRef.current?.children || [], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-root">
      <div className="hero-inner">
        <h1 ref={titleRef} className="hero-title">A Global First
          <br />
          A Platform Built For Mehndi.</h1>
        <p ref={subRef} className="hero-sub">Say goodbye to DMs, no-shows, and endless scrolling. Post your request with all the details, receive offers from mehndi artists, and book with confidence — all in one place.</p>

        <div ref={ctasRef} className="hero-ctas">
          <button className="btn request" onClick={onRequestArtist} type="button">Request an Artist</button>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="henna-bloom" />
        <div className="henna-wave" />
      </div>
    </section>
  )
}

export default Hero


