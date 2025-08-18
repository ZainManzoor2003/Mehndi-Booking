import { useNavigate } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">Mehndi Me</div>
          <p className="tagline">Book mehndi artists with confidence — all in one place.</p>
          <div className="socials" aria-label="Social links">
            <a className="social" href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a className="social" href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 3a5.5 5.5 0 0 0 5 5v3a8.5 8.5 0 0 1-5-1.6V15a6 6 0 1 1-6-6h1.5v3H10a3 3 0 1 0 3 3V3h3z"/></svg>
            </a>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <div className="col">
            <h4 className="col-title">Explore</h4>
            <ul>
              <li><button className="link" type="button" onClick={() => navigate('/')}>Home</button></li>
              <li><button className="link" type="button" onClick={() => navigate('/how-it-works')}>How it works</button></li>
              <li><button className="link" type="button" onClick={() => navigate('/categories')}>Categories</button></li>
            </ul>
          </div>
          <div className="col">
            <h4 className="col-title">For Clients</h4>
            <ul>
              <li><button className="link" type="button" onClick={() => navigate('/get-started')}>Request an Artist</button></li>
            </ul>
          </div>
          <div className="col cta">
            <button className="footer-btn primary" type="button" onClick={() => navigate('/get-started')}>Request an Artist</button>
            <button className="footer-btn secondary" type="button" onClick={() => navigate('/get-started')}>Get Started</button>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {year} Mehndi Me</span>
        <div className="legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer


