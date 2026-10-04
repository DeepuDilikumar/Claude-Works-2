import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import AppPreview from './components/AppPreview'
import Features from './components/Features'
import Story from './components/Story'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import DemoDialog from './components/DemoDialog'

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false)
  const openDemo = () => setDemoOpen(true)

  return (
    // reducedMotion="user": framer-motion drops transform animations when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <Navbar onBookDemo={openDemo} />
      <main>
        <Hero onBookDemo={openDemo} />
        <HowItWorks />
        <AppPreview />
        <Features />
        <Story />
        <Pricing onBookDemo={openDemo} />
        <Faq />
        <FinalCta onBookDemo={openDemo} />
      </main>
      <Footer />
      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </MotionConfig>
  )
}
