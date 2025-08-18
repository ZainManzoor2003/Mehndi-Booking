import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Header.css'

function Header({ onGetStarted }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const brandRef = useRef(null)
  const actionsRef = useRef(null)
  const menuListRef = useRef(null)

  // Intro reveal for brand and header buttons (explicit end states)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elementsToReveal = [brandRef.current, ...(actionsRef.current ? Array.from(actionsRef.current.children) : [])]
      gsap.fromTo(
        elementsToReveal,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Prepare a timeline for menu items stagger
  const menuTl = useMemo(() => gsap.timeline({ paused: true }), [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!menuListRef.current) return
      const items = menuListRef.current.querySelectorAll('li')
      menuTl.clear()
      menuTl.fromTo(
        items,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.08 }
      )
    })
    return () => ctx.revert()
  }, [menuTl])

  const toggleMenu = () => setMenuOpen((v) => !v)
  useEffect(() => {
    if (menuOpen) menuTl.play(0)
    else menuTl.reverse()
  }, [menuOpen, menuTl])

  return (
    <header className={`mm-header ${menuOpen ? 'open' : ''}`}>
      <div className="mm-header-inner">
        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          type="button"
        >
          <span className="line line1" />
          <span className="line line2" />
          <span className="line line3" />
          <span className="henna" aria-hidden="true">
            <span className="petal p1" />
            <span className="petal p2" />
            <span className="petal p3" />
            <span className="petal p4" />
            <span className="center-dot" />
          </span>
        </button>

        <div ref={brandRef} className="brand">Mehndi Me</div>

        <nav ref={actionsRef} className="actions">
          <button className="btn ghost" type="button">Sign in</button>
          <button className="btn cta" type="button" onClick={onGetStarted}>Get Started</button>
        </nav>
      </div>

      <div className="menu-overlay">
        <ul ref={menuListRef} className="menu-list">
          <li><button type="button" className="menu-link" onClick={() => setMenuOpen(false)}>Home</button></li>
          <li><button type="button" className="menu-link" onClick={() => setMenuOpen(false)}>How it works</button></li>
          <li><button type="button" className="menu-link" onClick={() => setMenuOpen(false)}>Artists</button></li>
          <li><button type="button" className="menu-link" onClick={() => setMenuOpen(false)}>Pricing</button></li>
        </ul>
      </div>
    </header>
  )
}

export default Header


