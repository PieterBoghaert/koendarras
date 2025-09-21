import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, Play, Menu, X, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react'
import './App.css'
import './hero-cta-styles.css'
import { useTouchGestures } from './mobile-carousel.js'

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
  const [currentMilestone, setCurrentMilestone] = useState(0)
  
  // Touch gestures for mobile carousel
  const touchGestures = useTouchGestures(currentMilestone, setCurrentMilestone, 3)
  
  // Intersection observers for animations
  const [socialRef, socialInView] = useInView()
  const [viralRef, viralInView] = useInView()
  const [milestonesRef, milestonesInView] = useInView()
  const [pressRef, pressInView] = useInView()
  
  // Counter animations
  const instagramCount = useCountUp(20, 2000, socialInView)
  const facebookCount = useCountUp(278, 2000, socialInView)
  const youtubeCount = useCountUp(10, 2000, socialInView)
  const tiktokCount = useCountUp(31, 2000, socialInView)
  
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

  // Body lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }
  
  const playShowreel = () => {
    const thumbnail = document.getElementById('thumbnail')
    const vimeoEmbed = document.getElementById('vimeo-embed')
    
    if (thumbnail && vimeoEmbed) {
      thumbnail.style.display = 'none'
      vimeoEmbed.style.display = 'block'
    }
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
            className={`text-2xl md:text-3xl font-primary font-black tracking-wider transition-colors duration-300 ${
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
                className={`text-nav font-primary hover:opacity-70 transition-all duration-300 ${
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
          <>
            <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}></div>
            <div className="md:hidden fixed top-0 right-0 w-80 h-full bg-white z-50 overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-5 z-10">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      scrollToSection('hero')
                      setIsMenuOpen(false)
                    }}
                    className="text-2xl font-primary font-black text-black"
                  >
                    KOEN DARRAS
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-black"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-6">
                {['MISSION', 'ADVENTURES', 'SPEAKING', 'PRESS', 'CONNECT'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase())
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left py-3 text-xl font-primary font-bold text-black hover:text-gray-600 transition-colors min-h-[44px]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${headerImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <h1 className="hero-title font-primary text-white mb-4 font-extrabold tracking-tight">
            LIMITATIONS ARE INVITATIONS
          </h1>
          <p className="hero-subtitle font-primary text-white/80 mb-8 font-medium">
            Keynote Speaker · Entrepreneur · Adventurer
          </p>
          <Button 
            onClick={() => scrollToSection('mission')}
            className="cta-button"
          >
            DISCOVER MORE
          </Button>
          <div className="mt-8 flex flex-col items-center">
            <ChevronDown className="text-white animate-bounce" size={24} />
            <span className="text-white text-label font-secondary">SCROLL</span>
          </div>
        </div>
      </section>

      {/* Who Is Koen Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-8 text-tight tracking-wider">WHO IS KOEN DARRAS</h2>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-body-lg font-primary text-gray-800 text-relaxed mb-6">
              Darras is the first person in history to climb the ten highest mountains of South America and Africa in a row, and also conquered the iconic peaks Mont Blanc, Matterhorn and Eiger in just nine days to prove that limits are only invitations.
            </p>
            <p className="text-body-lg font-primary text-gray-800 text-relaxed">
              From summiting Denali in Alaska to kitesurfing extreme crossings and riding huge continents, Koen turns raw adventure into cinematic storytelling. With multiple viral videos reaching millions of views, Koen inspires a global audience to chase dreams without limits and to discover the soul of the journey.
            </p>
          </div>
          
          {/* Showreel */}
          <div className="mb-12">
            <div 
              id="showreel-wrapper" 
              className="relative w-full max-w-4xl mx-auto cursor-pointer"
              onClick={() => playShowreel()}
            >
              {/* Thumbnail */}
              <img 
                id="thumbnail"
                src={showreelImg} 
                alt="Play Showreel" 
                className="w-full block rounded-xl"
                style={{display: 'block'}}
              />



              {/* Hidden Vimeo embed */}
              <div 
                id="vimeo-embed" 
                className="relative"
                style={{padding: '56.25% 0 0 0', position: 'relative', display: 'none'}}
              >
                <iframe 
                  src="https://player.vimeo.com/video/1120469511?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  title="Koen Darras Showreel 2025"
                />
              </div>
            </div>
          </div>
          
          <p className="text-body-lg font-primary text-gray-700 mb-12 max-w-2xl mx-auto text-relaxed">
            With multiple viral videos reaching millions of views, Koen inspires a global audience to chase dreams without limits and to discover the soul of the journey.
          </p>
          
          {/* Social Reach */}
          <div ref={socialRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Instagram className="w-6 h-6 text-gray-700" />
              <div className="text-stat font-secondary text-black">
                {instagramCount}.75K
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Facebook className="w-6 h-6 text-gray-700" />
              <div className="text-stat font-secondary text-black">
                {facebookCount}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Youtube className="w-6 h-6 text-gray-700" />
              <div className="text-stat font-secondary text-black">
                {youtubeCount}.59K
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              <div className="text-stat font-secondary text-black">
                {tiktokCount}.59K
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Quote */}
      <section className="py-20 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-5">
          <blockquote className="text-section font-primary text-white mb-6 text-tight">
            "HE MADE THE IMPOSSIBLE FEEL POSSIBLE"
          </blockquote>
          <cite className="text-label font-secondary text-white/80">— THE NORTH FACE</cite>
        </div>
        </section>

      {/* Future Adventures */}
      <section id="adventures" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-8 text-tight tracking-wider">FUTURE ADVENTURES</h2>
          <p className="text-body-lg font-primary text-gray-700 mb-12 max-w-3xl mx-auto text-relaxed">
            Darras wants to see the world through the eyes of the mountains and the oceans, while crossing every continent. In the pipeline are many more adventures.
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
              <p className="text-gray-600 text-sm">This means climbing the highest mountain of each continent. Everest, Himalaya…</p>
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
              <p className="text-gray-600 text-sm">Revolutionary adventure combining multiple extreme disciplines. #worldfirst #neverdonebefore</p>
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
              <p className="text-gray-600 text-sm">Epic overland expeditions crossing entire continents by foot, bike, and adventure sports.</p>
            </div>
          </div>
          

        </div>
      </section>

      {/* Viral Impact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-8 text-tight tracking-wider">VIRAL IMPACT AND AWARENESS</h2>
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
            className="cta-button"
          >
            BECOME A PARTNER
          </Button>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-8 text-tight tracking-wider">MILESTONES</h2>
          <p className="text-body-lg font-primary text-gray-700 mb-12 max-w-3xl mx-auto text-relaxed">
            For over 20 years, Darras has explored the world as an adventurous entrepreneur and storyteller, turning extreme expeditions into compelling narratives that inspire millions to push beyond their perceived limitations and discover what's truly possible.
          </p>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
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
              <p className="text-xs text-gray-600">Conquered Denali (6,190m), the coldest mountain in the world and one of the Seven Summits, first team at the summit, -30°C.</p>
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
              <p className="text-xs text-gray-600">Epic 45,000 kilometer journey by road across 27 countries, conquering the 10 highest mountains in Africa in a row.</p>
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
              <p className="text-xs text-gray-600">Conquered 10 mountains over 6,000 meters, including Aconcagua (6,962m) - one of the Seven Summits and the highest peak in Argentina.</p>
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
              <p className="text-xs text-gray-600">Climbing iconic mountains Mont Blanc, Matterhorn and Eiger in nine days.</p>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-12">
            <div className="relative overflow-hidden" {...touchGestures}>
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentMilestone * 100}%)` }}
              >
                {/* Denali Alaska */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                      <img 
                        src={denaliImg} 
                        alt="Denali Alaska" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold tracking-wider mb-3">DENALI ALASKA</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Conquered Denali (6,190m), the coldest mountain in the world and one of the Seven Summits, first team at the summit, -30°C.</p>
                  </div>
                </div>

                {/* Peaks of Africa */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                      <img 
                        src={peaksImg} 
                        alt="Peaks of Africa" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold tracking-wider mb-3">PEAKS OF AFRICA</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Epic 45,000 kilometer journey by road across 27 countries, conquering the 10 highest mountains in Africa in a row.</p>
                  </div>
                </div>

                {/* Peaks of South America */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                      <img 
                        src={americaImg} 
                        alt="Peaks of South America" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold tracking-wider mb-3">PEAKS OF SOUTH AMERICA</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Conquered 10 mountains over 6,000 meters, including Aconcagua (6,962m) - one of the Seven Summits and the highest peak in Argentina.</p>
                  </div>
                </div>

                {/* Alpine Trilogy */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                      <img 
                        src={ontopImg} 
                        alt="Alpine Trilogy" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold tracking-wider mb-3">ALPINE TRILOGY</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Climbing iconic mountains Mont Blanc, Matterhorn and Eiger in nine days.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMilestone(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentMilestone === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to milestone ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div ref={milestonesRef} className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                102
              </div>
              <div className="text-sm text-gray-600 tracking-wider">COUNTRIES EXPLORED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                2
              </div>
              <div className="text-sm text-gray-600 tracking-wider">YEARS WORLD TRIP</div>
              <div className="text-xs text-gray-500">36,000 km, 20 countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                1M+
              </div>
              <div className="text-sm text-gray-600 tracking-wider">VIEWS FOR 3 VIDEOS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                3
              </div>
              <div className="text-sm text-gray-600 tracking-wider">KIDS</div>
              <div className="text-xs text-gray-500">Nina, Lio & Ziggy</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-black text-black mb-2">
                60K
              </div>
              <div className="text-sm text-gray-600 tracking-wider">SATISFIED TRAVELLERS</div>
              <div className="text-xs text-gray-500">Partner Travelbase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Media */}
      <section id="press" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-8 text-tight tracking-wider">PRESS AND MEDIA</h2>
          <p className="text-body-lg font-primary text-gray-700 mb-12 max-w-3xl mx-auto text-relaxed">
            Koen's extraordinary adventures have captured global attention, inspiring millions through international media coverage and viral content. Featured across major international outlets including BBC, CNN, The New York Times, and leading Belgian networks HLN, Het Laatste Nieuws, VRT NWS, Nieuwsblad, with coverage spanning Europe, America, and Africa.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <img src={cnnLogo} alt="CNN" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={bbcLogo} alt="BBC" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={timesLogo} alt="Times" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={vrtLogo} alt="VRT" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={nieuwsbladLogo} alt="Nieuwsblad" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
            <img src={hlnLogo} alt="HLN" className="h-12 object-contain mx-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          
          <blockquote className="text-body-lg font-primary text-black mb-6 max-w-3xl mx-auto text-relaxed italic">
            "In 2024, after climbing the 10 highest peaks of Africa, the Alpine Trilogy, and the South American summits, my mission is clear: limits are invitations."
          </blockquote>
          <cite className="text-label font-secondary text-gray-600">— KOEN DARRAS</cite>
          
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-8 text-tight tracking-wider">KEYNOTE SPEAKING</h2>
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
            className="cta-button"
          >
            BOOK KOEN
          </Button>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-12 text-tight tracking-wider">PARTNERS</h2>
          <div className="mb-8">
            <a 
              href="https://www.skylux.eu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:scale-105 transition-transform duration-300"
            >
              <img src={skyluxLogo} alt="Skylux" className="h-32 md:h-40 mx-auto" />
            </a>
          </div>
          <blockquote className="text-body-lg font-primary text-gray-700 mb-6 text-relaxed italic">
            "Skylux, Hello Daylight: daylight as the beginning of every great adventure of Koen"
          </blockquote>
          <cite className="text-label font-secondary text-gray-500 mb-8 block">— SKYLUX</cite>
          <p className="text-body font-primary text-gray-600 mb-8 max-w-3xl mx-auto text-relaxed">
            Koen partners with leading brands that share his passion for adventure, innovation, and pushing limits. From aviation and travel to outdoor gear and technology, these partnerships enable extraordinary expeditions while delivering authentic brand exposure to global audiences.
          </p>
          <Button 
            onClick={() => scrollToSection('connect')}
            className="cta-button inline-flex items-center gap-2"
          >
            REACH OUT
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black mb-12 text-center text-tight tracking-wider">CONNECT</h2>
          
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
                className="cta-button"
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
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/koendarras" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com/koendarras.be" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com/@darraskoen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://tiktok.com/@koendarras" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
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
