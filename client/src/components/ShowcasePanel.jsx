import './ShowcasePanel.css'

function ShowcasePanel({ title, data1, data2 }) {
  


  return (
    <div className="panel how-root">
      <h2 className="panel-title">{title}</h2>
      <p className="panel-subtitle">A detailed, flowing journey with henna-style vines and motifs.</p>

      <div className="steps">
        <div className="step1">

          {data1.map((step, idx) => (
            <div data-aos="zoom-in" key={step.id} className={`step-card step-${step.id}`}>
              <span className="step-badge">{step.id}</span>
              <div className="step-icon" aria-hidden="true">🧡</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="step2">
          {data2.map((step) => (
            <div data-aos="zoom-in" key={step.id} className={`step-card step-${step.id}`}>
              <span className="step-badge">{step.id}</span>
              <div className="step-icon" aria-hidden="true">🧡</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowcasePanel


