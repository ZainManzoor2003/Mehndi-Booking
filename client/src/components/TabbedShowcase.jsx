import { useState } from 'react'
import './TabbedShowcase.css'
import ShowcasePanel from './ShowcasePanel.jsx'

function TabbedShowcase() {
  const [activeTab, setActiveTab] = useState('clients');
  const client1 = [
    { id: 1, title: 'Post Your Request', desc: 'Tell us the date, location, style, and coverage.' },
    { id: 2, title: 'Receive Offers', desc: 'Artists send tailored proposals with pricing ranges.' }
  ]
  const client2 = [
    { id: 3, title: 'Compare & Chat', desc: 'View portfolios, message artists, and refine details.' },
    { id: 4, title: 'Book Securely', desc: 'Confirm the artist you love and pay safely.' },
  ]

  const artist1 = [
    {
      id: 1,
      title: 'Create Your Profile',
      desc: 'Add styles, coverage, portfolio, and pricing ranges.',
    },
    {
      id: 2,
      title: 'Discover Requests',
      desc: 'Find bookings matched to your style and location.',
    }
  ]
  const artist2= [
    {
      id: 3,
      title: 'Send Offers',
      desc: 'Share availability, approach, and price range.',
    },
    {
      id: 4,
      title: 'Get Hired & Paid',
      desc: 'Get confirmed, complete the job, and receive payment.',
    }
  ]

  return (
    <section className="tabs-root">
      <div className="tabs-switch" role="tablist" aria-label="Audience selector">
        <button
          role="tab"
          aria-selected={activeTab === 'clients'}
          className={`tabs-btn ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
          type="button"
        >
          <span className="tabs-dot" aria-hidden="true">•</span>
          Clients
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'artists'}
          className={`tabs-btn ${activeTab === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveTab('artists')}
          type="button"
        >
          <span className="tabs-dot" aria-hidden="true">•</span>
          Artists
        </button>
      </div>

      <div className="tabs-content" role="tabpanel">
        {activeTab === 'clients' && (
          <ShowcasePanel title="How It Works — For Clients" data1={client1} data2={client2} variant="clients" />
        )}
        {activeTab === 'artists' && (
          <ShowcasePanel title="How It Works — For Artists" data1={artist1} data2={artist2} variant="artists" />
        )}
      </div>
    </section>
  )
}

export default TabbedShowcase


