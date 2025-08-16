import './ChoosePath.css'

function ChoosePath() {
  return (
    <div className="choose-root">
      <div className="choose-container">
        <div className="choose-header">
          <span className="choose-subtitle">GET STARTED</span>
          <h1 className="choose-title">Choose your path</h1>
        </div>

        <div className="choose-cards">
          <div className="choose-card">
            <div className="choose-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#c3702d" strokeWidth="1.8">
                <circle cx="12" cy="7" r="4" />
                <path d="M3 21c1.5-4 5-6 9-6s7.5 2 9 6" />
              </svg>
            </div>
            <h2 className="choose-card-title">For Clients</h2>
            <p className="choose-card-desc">Post a request, compare offers, and book with confidence.</p>
            <button className="choose-button" type="button">Continue</button>
          </div>

          <div className="choose-card">
            <div className="choose-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#c3702d" strokeWidth="1.8">
                <path d="M8 3h8l-1 6h-6L8 3z" />
                <circle cx="12" cy="16" r="4" />
              </svg>
            </div>
            <h2 className="choose-card-title">For Artists</h2>
            <p className="choose-card-desc">Create a profile, apply to bookings, and get paid securely.</p>
            <button className="choose-button" type="button">Continue</button>
          </div>
        </div>

        <div className="choose-login">
          <span>Already have an account?</span>
          <a href="#" className="choose-login-link">Log in</a>
        </div>
      </div>
    </div>
  )
}

export default ChoosePath


