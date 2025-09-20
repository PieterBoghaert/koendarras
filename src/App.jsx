import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, Play, Menu, X, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react'
import './App.css'

// Import all images
import headerImg from './assets/Header.jpg'
import showreelImg from './assets/showreel.jpg'
import summitsImg from './assets/7summits.jpg'
import kitsurfImg from './assets/Kitsurf.jpg'
import continentsImg from './assets/Continents.jpg'
import cannondaleImg from './assets/Cannondale.jpg'
import denaliImg from './assets/Denali.jpg'
import peaksImg from './assets/Peaks.jpg'
import americaImg from './assets/America.jpg'
import ontopImg from './assets/Ontopofthemountains.jpg'
import cnnLogo from './assets/cnn.png'
import bbcLogo from './assets/bbc.png'
import timesLogo from './assets/times.png'
import vrtLogo from './assets/vrt.png'
import nieuwsbladLogo from './assets/nieuwsblad.png'
import hlnLogo from './assets/hln.png'
import skyluxLogo from './assets/skylux.png'
import instaIcon from './assets/insta.png'
import fbIcon from './assets/fb.png'
import youtubeIcon from './assets/youtube.png'
import tiktokIcon from './assets/tiktok.png'
import whatsappIcon from './assets/whatsapp.png'

// Counter animation hook
const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!shouldStart) return
    
    let startTime = null
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration, shouldStart])
  
  return count
}

// Intersection Observer hook
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false)
  const ref = useRef()
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [threshold])
  
  return [ref, inView]
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Intersection observers for animations
  const [socialRef, socialInView] = useInView()
  const [viralRef, viralInView] = useInView()
  const [milestonesRef, milestonesInView] = useInView()
  const [pressRef, pressInView] = useInView()
  
  // Counter animations
  const instagramCount = useCountUp(8.89, 2000, socialInView)
  const facebookCount = useCountUp(654.62, 2000, socialInView)
  const youtubeCount = useCountUp(10.59, 2000, socialInView)
  const tiktokCount = useCountUp(31.59, 2000, socialInView)
  
  const viewsCount = useCountUp(1.3, 2000, viralInView)
  const reachCount = useCountUp(902, 2000, viralInView)
  const likesCount = useCountUp(32, 2000, viralInView)
  const savesCount = useCountUp(3.8, 2000, viralInView)
  
  const countriesCount = useCountUp(102, 2000, milestonesInView)
  const yearsCount = useCountUp(2, 2000, milestonesInView)
  const kmCount = useCountUp(36000, 2000, milestonesInView)
  const daughtersCount = useCountUp(3, 2000, milestonesInView)
  const travellersCount = useCountUp(60, 2000, milestonesInView)
  
  const reachPressCount = useCountUp(50, 2000, pressInView)
  const countriesPressCount = useCountUp(25, 2000, pressInView)
  const publicationsCount = useCountUp(100, 2000, pressInView)
  const viralViewsCount = useCountUp(1, 2000, pressInView)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    
    try {
      const response = await fetch('https://www.koendarras.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        alert('Message sent successfully!')
        e.target.reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      alert('Failed to send message. Please email directly to info@koendarras.com')
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-4xl mx-auto px-5 py-4 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('hero')}
            className={`text-xl font-bold tracking-wider transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            KOEN DARRAS
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['MISSION', 'ADVENTURES', 'SPEAKING', 'PRESS', 'CONNECT'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium tracking-wider hover:opacity-70 transition-all duration-300 ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8">
            {['MISSION', 'ADVENTURES', 'SPEAKING', 'PRESS', 'CONNECT'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-2xl font-bold tracking-wider text-black hover:opacity-70 transition-opacity"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${headerImg})` }}
        >
          <div className="absolute inset-0 bg-white/20"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wider text-white mb-6">
            LIMITS ARE INVITATIONS
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide">
            Adventurer | Entrepreneur | Speaker
          </p>
          <Button 
            onClick={() => scrollToSection('mission')}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 text-sm font-bold tracking-wider rounded-lg"
          >
            DISCOVER MORE
          </Button>
          <div className="mt-8 flex flex-col items-center">
            <ChevronDown className="text-white animate-bounce" size={24} />
            <span className="text-white text-sm mt-2 tracking-wider">SCROLL</span>
          </div>
        </div>
      </section>

      {/* Who Is Koen Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
              Darras is the first person in history to climb the ten highest mountains of South America and Africa in a row, and also conquered the iconic peaks Mont Blanc, Matterhorn and Eiger in just nine days to prove that limits are only invitations. From summiting Denali in Alaska to kitesurfing extreme crossings and riding huge continents, Koen turns raw adventure into cinematic storytelling.
            </p>
          </div>
          
          {/* Showreel */}
          <div className="mb-12">
            <div className="relative inline-block group cursor-pointer">
              <img 
                src={showreelImg} 
                alt="Showreel" 
                className="w-full max-w-4xl h-64 md:h-96 lg:h-[500px] object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
                onClick={() => window.open('https://youtu.be/kIPwJ6jtCdY', '_blank')}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4 group-hover:bg-black/70 transition-all duration-300">
                  <Play className="text-white" size={32} fill="white" />
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            With multiple viral videos reaching millions of views, Koen inspires a global audience to chase dreams without limits and to discover the soul of the journey.
          </p>
          
          {/* Social Reach */}
          <div ref={socialRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {instagramCount}.89M
              </div>
              <div className="text-sm text-gray-600 tracking-wider">INSTAGRAM</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {facebookCount}.62K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">FACEBOOK</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {youtubeCount}.59K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">YOUTUBE</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {tiktokCount}.59K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">TIKTOK</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-wider">
            "HE MADE THE IMPOSSIBLE FEEL POSSIBLE"
          </h2>
          <p className="text-lg mt-4 tracking-wider">— THE NORTH FACE</p>
        </div>
      </section>

      {/* Future Adventures */}
      <section id="adventures" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wider mb-4">FUTURE ADVENTURES</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Koen's upcoming goals and expeditions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={summitsImg} 
                  alt="7 Summits" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-lg font-bold mt-4 tracking-wider">CLIMBING THE 7 SUMMITS</h3>
              <p className="text-gray-600 text-sm">Everest, Himalaya…</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={kitsurfImg} 
                  alt="Kitesurfing Project" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-lg font-bold mt-4 tracking-wider">BIG NEW PROJECT</h3>
              <p className="text-gray-600 text-sm">#worldfirst #neverdonebefore</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={continentsImg} 
                  alt="Continents" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-lg font-bold mt-4 tracking-wider">TRAVERSING CONTINENTS</h3>
              <p className="text-gray-600 text-sm">Overland journeys</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Darras wants to see the world through the eyes of the mountains and the oceans, while crossing every continent. In the pipeline are many more adventures.
          </p>
        </div>
      </section>

      {/* Viral Impact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="mb-8">
            <img 
              src={cannondaleImg} 
              alt="Cannondale Viral Video" 
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-700 mb-8">
            Baby wild boar using a Cannondale bike as a scratcher → instant viral exposure.
          </p>
          
          <div ref={viralRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {viewsCount}.3M
              </div>
              <div className="text-sm text-gray-600 tracking-wider">VIEWS</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {reachCount}K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">REACH</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {likesCount}K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">LIKES</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {savesCount}.8K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">SAVES</div>
            </div>
          </div>
          
          <Button 
            onClick={() => scrollToSection('connect')}
            className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-3 text-sm font-bold tracking-wider rounded-lg"
          >
            BECOME A PARTNER
          </Button>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            For over 20 years, Darras has explored the world as an adventurer, entrepreneur, and storyteller…
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img 
                  src={denaliImg} 
                  alt="Denali Alaska" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-sm font-bold tracking-wider">DENALI ALASKA</h3>
              <p className="text-xs text-gray-600">6,190m, First team on summit 2025, -30°</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img 
                  src={peaksImg} 
                  alt="Peaks of Africa" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-sm font-bold tracking-wider">PEAKS OF AFRICA</h3>
              <p className="text-xs text-gray-600">45,000 km, 27 countries, 10 peaks</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img 
                  src={americaImg} 
                  alt="Peaks of South America" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-sm font-bold tracking-wider">PEAKS OF SOUTH AMERICA</h3>
              <p className="text-xs text-gray-600">10x 6,000m+ incl. Aconcagua</p>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img 
                  src={ontopImg} 
                  alt="Alpine Trilogy" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <h3 className="text-sm font-bold tracking-wider">ALPINE TRILOGY</h3>
              <p className="text-xs text-gray-600">Mont Blanc, Matterhorn, Eiger</p>
            </div>
          </div>
          
          <div ref={milestonesRef} className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {countriesCount}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">COUNTRIES EXPLORED</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {yearsCount}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">YEARS WORLD TRIP</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {Math.floor(kmCount / 1000)}K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">KM TRAVELED</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {daughtersCount}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">DAUGHTERS</div>
              <div className="text-xs text-gray-500">(Nina, Lio, Ziggy)</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                {travellersCount}K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">SATISFIED TRAVELLERS</div>
              <div className="text-xs text-gray-500">(Travelbase)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Media */}
      <section id="press" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="text-lg text-gray-700 mb-12">
            Koen's adventures featured by BBC, CNN, NYT, HLN, VRT, Nieuwsblad.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <img src={cnnLogo} alt="CNN" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={bbcLogo} alt="BBC" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={timesLogo} alt="Times" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={vrtLogo} alt="VRT" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={nieuwsbladLogo} alt="Nieuwsblad" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={hlnLogo} alt="HLN" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          
          <blockquote className="text-xl md:text-2xl font-bold text-black mb-8 max-w-3xl mx-auto">
            "In 2024, after climbing the 10 highest peaks of Africa, the Alpine Trilogy, and the South American summits, my mission is clear: limits are invitations."
          </blockquote>
          <cite className="text-sm text-gray-600 tracking-wider">— KOEN DARRAS</cite>
          
          <div ref={pressRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {reachPressCount}M+
              </div>
              <div className="text-sm text-gray-600 tracking-wider">TOTAL REACH</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {countriesPressCount}+
              </div>
              <div className="text-sm text-gray-600 tracking-wider">COUNTRIES</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {publicationsCount}+
              </div>
              <div className="text-sm text-gray-600 tracking-wider">PUBLICATIONS</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-black mb-2">
                {viralViewsCount}M+
              </div>
              <div className="text-sm text-gray-600 tracking-wider">VIRAL VIEWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Speaking */}
      <section id="speaking" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wider mb-8">KEYNOTE SPEAKING</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Transform your team with lessons learned from the world's most extreme environments. He's ready to inspire your team/company to chase your dreams. Available for corporate events, conferences and leadership retreats worldwide.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold tracking-wider">REDEFINING LIMITS</h3>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold tracking-wider">LEADERSHIP UNDER PRESSURE</h3>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold tracking-wider">TEAM RESILIENCE</h3>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold tracking-wider">INNOVATION THROUGH ADVENTURE</h3>
            </div>
          </div>
          
          <Button 
            onClick={() => scrollToSection('connect')}
            className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-3 text-sm font-bold tracking-wider rounded-lg"
          >
            BOOK KOEN
          </Button>
        </div>
      </section>

      {/* Supported By */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="mb-8">
            <img src={skyluxLogo} alt="Skylux" className="h-16 mx-auto" />
          </div>
          <p className="text-lg text-gray-700 mb-8">
            "Skylux, Hello Daylight: daylight as the beginning of every great adventure of Koen"
          </p>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Koen partners with leading brands that share his passion for adventure, innovation, and pushing limits. From aviation and travel to outdoor gear and technology, these partnerships enable extraordinary expeditions while delivering authentic brand exposure to global audiences.
          </p>
          <p className="text-lg font-medium">Feel free to reach out!</p>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-black tracking-wider mb-12 text-center">CONNECT</h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
              />
            </div>
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
            
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
            
            <select
              name="inquiry_type"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            >
              <option value="">Select inquiry type</option>
              <option value="speaking">Speaking Inquiry</option>
              <option value="partnership">Partnership</option>
              <option value="media">Media Request</option>
              <option value="general">General</option>
            </select>
            
            <textarea
              name="note"
              placeholder="Extra note"
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
            ></textarea>
            
            <div className="text-center">
              <Button 
                type="submit"
                className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-3 text-sm font-bold tracking-wider rounded-lg"
              >
                SEND MESSAGE
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">or send a direct email:</p>
            <a 
              href="mailto:info@koendarras.com" 
              className="text-black font-bold tracking-wider hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              INFO@KOENDARRAS.COM
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <nav className="flex justify-center space-x-8 mb-8">
            <button 
              onClick={() => scrollToSection('mission')}
              className="text-sm tracking-wider hover:opacity-70 transition-opacity"
            >
              WHO IS KOEN
            </button>
            <button 
              onClick={() => scrollToSection('adventures')}
              className="text-sm tracking-wider hover:opacity-70 transition-opacity"
            >
              ADVENTURES
            </button>
            <button 
              onClick={() => scrollToSection('connect')}
              className="text-sm tracking-wider hover:opacity-70 transition-opacity"
            >
              CONNECT
            </button>
          </nav>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://api.whatsapp.com/send/?phone=32479293872&text&type=phone_number&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://instagram.com/koendarras" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://facebook.com/koendarras.be" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://youtube.com/@darraskoen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://tiktok.com/@koendarras" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <div className="w-5 h-5 text-white flex items-center justify-center font-bold text-xs">
                TT
              </div>
            </a>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mb-6">
            <span className="text-2xl">🇧🇪</span>
            <span className="text-gray-400">|</span>
            <span className="text-2xl">🇬🇧</span>
          </div>
          
          <p className="text-sm text-gray-400 mb-2">© 2025 Koen Darras</p>
          <p className="text-xs text-gray-500">Website design by WellSee Creative Lab</p>
        </div>
      </footer>
    </div>
  )
}

export default App
