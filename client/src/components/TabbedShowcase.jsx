import { useState } from 'react'
import './TabbedShowcase.css'
import ShowcasePanel from './ShowcasePanel.jsx'

function TabbedShowcase() {
  const [activeTab, setActiveTab] = useState('clients');
  const client1 = [
    { id: 1, title: 'Post Your Booking', desc: 'Date, style, budget, location.' },
    { id: 2, title: 'Artists Come to You', desc: 'No chasing, no ghosting.' }
  ]
  const client2 = [
    { id: 3, title: 'Chat & Compare', desc: 'Portfolios and offers in one place.' },
    { id: 4, title: 'Your Mehndi Me Moment', desc: 'From first click to final stain, stress-free.' },
  ]

  const artist1 = [
    {
      id: 1,
      title: 'Create Your Profile',
      desc: 'Show off your best work.',
    },
    {
      id: 2,
      title: 'See Real Bookings',
      desc: 'Browse jobs near you.',
    }
  ]
  const artist2= [
    {
      id: 3,
      title: 'Send Your  Offers',
      desc: 'Price and portfolio in seconds',
    },
    {
      id: 4,
      title: 'Booked, Done, Paid',
      desc: 'You create, we handle the rest',
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


