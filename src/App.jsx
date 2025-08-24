import Header from './components/common/Header'
import Hero from './components/sections/Hero'
import CatalinaSection from './components/sections/CatalinaSection'
import EventDetails from './components/sections/EventDetails'
import RSVP from './components/sections/RSVP'
import Footer from './components/common/Footer'
import OurStory from './components/sections/OurStory'

// Import wedding data
import { weddingData } from './data/weddingData'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="hero">
          <Hero data={weddingData} />
        </section>
        <section id="catalina">
          <CatalinaSection data={weddingData} />
        </section>
        <section id="story">
          <OurStory data={weddingData} />
        </section>
        <section id="detalles">
          <EventDetails data={weddingData} />
        </section>
        <section id="rsvp">
          <RSVP data={weddingData} />
        </section>
      </main>
      <Footer data={weddingData} />
    </div>
  )
}

export default App