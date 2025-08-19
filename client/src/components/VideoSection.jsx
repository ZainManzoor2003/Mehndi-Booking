import './VideoSection.css'

function VideoSection() {

  return (
    <section className="video-root">
      <div className="video-inner">
        <div className="video-content">
          <h2 className="video-title">
            Video Tour
          </h2>
          <p className="video-description">
            FIND OUT MORE WITH OUR VLOG OF THE MOST BEAUTIFUL AND PLEASANT PLACES FOR YOU AND YOUR FAMILY.
          </p>
        </div>
        
        <div className="video-player-container">
          <div className="video-player">
            <iframe
              className="video-element"
              src="https://www.youtube.com/embed/Fo06gokbCr0"
              title="Mehndi Artistry Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
