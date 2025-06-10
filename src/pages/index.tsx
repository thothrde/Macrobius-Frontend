import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { ChevronDown, Book, Map, Star, Globe, Users, Scroll, GraduationCap } from 'lucide-react'

// Translation strings
const translations = {
  de: {
    title: "Eine antike Flaschenpost",
    subtitle: "Macrobius und die Überlieferung antiken Wissens",
    description: `Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius, ein führender Verwaltungsbeamter und Gelehrter im Norden Italiens, eine Flaschenpost an die Zukunft an. Diese Flaschenpost bestand aus zwei Texten: Einer ungezwungenen Gesprächsrunde gebildeter Römer und einem Traumkommentar. In beidem versuchte Macrobius das, was ihm an der untergehenden Zivilisation der Antike wichtig war, in einer Weise zu verpacken, die die heranziehenden dunklen Jahrhunderte überstand und zukünftige Leser anregte, den Zivilisationsprozess wieder in Gang zu setzen mit der Erinnerung an die antike Zivilisation als Ermutigung und Materialquelle. Vor 500 Jahren begann dieser Neuanfang. In Dänemark durch astronomische Beobachtungen Tycho Brahes, der damit den Grundstein für Keplers Arbeit und das Entstehen moderner Naturwissenschaften legte. Ein Assistent Tychos erinnerte sich an Macrobius Flaschenpost und stellte erstmals eine zuverlässige und kommentierte Gesamtausgabe zusammen. Dieses Buch kam in meine Hände und auf die Idee, eine kleine App für euch zu dieser Geschichte zu basteln.... Viel Spaß!`,
    quiz: "Interaktives Quiz",
    worldmap: "Weltkarte",
    cosmos: "Kosmos",
    banquet: "Gastmahl",
    texts: "Textsuche", 
    learning: "Lernen",
    exploreBtn: "Entdecken"
  },
  en: {
    title: "An Ancient Message in a Bottle",
    subtitle: "Macrobius and the Transmission of Ancient Knowledge",
    description: `1500 years ago, as the Roman Empire was approaching its end, Macrobius, a leading administrator and scholar in northern Italy, crafted a message in a bottle to the future. This message consisted of two texts: a casual conversation among educated Romans and a dream commentary. In both, Macrobius tried to package what was important to him about the declining civilization of antiquity in a way that would survive the approaching dark centuries and inspire future readers to restart the process of civilization, with the memory of ancient civilization as encouragement and source material. 500 years ago, this new beginning started. In Denmark through astronomical observations by Tycho Brahe, who thus laid the foundation for Kepler's work and the emergence of modern natural sciences. An assistant of Tycho remembered Macrobius' message in a bottle and compiled the first reliable and annotated complete edition. This book came into my hands and gave me the idea to create a small app for you about this story.... Have fun!`,
    quiz: "Interactive Quiz",
    worldmap: "World Map", 
    cosmos: "Cosmos",
    banquet: "Banquet",
    texts: "Text Search",
    learning: "Learning",
    exploreBtn: "Explore"
  },
  la: {
    title: "Antiqua Epistula in Ampulla",
    subtitle: "Macrobius et Traditio Sapientiae Antiquae",
    description: `Ante mille quingentos annos, cum Imperium Romanum ad occasum vergeret, Macrobius, praefectus doctusque in Italia septentrionali, epistulam in ampulla ad futuram aetatem confecit. Haec epistula duobus textibus constabat: colloquio libero eruditorum Romanorum et commentario somnii. In utroque Macrobius id quod de cadente antiquitatis civilizatione sibi carum erat ita includere conatus est ut tenebricosa saecula ventura superaret futurosque lectores ad civilizationis processum renovandum incitaret, memoria antiquae civilizationis ut hortamento materiaque fonte. Ante quingentos annos hic novus initium coepit. In Dania per observationes astronomicas Tychonis Brahe, qui sic fundamentum Kepleri operibus modernaeque scientiae naturalis ortu posuit. Tychonis adiutor Macrobii ampullae recordatus est primamque fidelem annotatamque editionem completam composuit. Hic liber in meas manus venit ideamque dedit parvam applicationem vobis de hac historia facere.... Fruamini!`,
    quiz: "Certamen Interactivum", 
    worldmap: "Mappa Mundi",
    cosmos: "Cosmos",
    banquet: "Convivium",
    texts: "Textuum Investigatio",
    learning: "Discendi Ratio",
    exploreBtn: "Explora"
  }
}

const sections = [
  { id: 'quiz', icon: Book, nameKey: 'quiz' },
  { id: 'worldmap', icon: Map, nameKey: 'worldmap' },
  { id: 'cosmos', icon: Star, nameKey: 'cosmos' },
  { id: 'banquet', icon: Users, nameKey: 'banquet' },
  { id: 'texts', icon: Scroll, nameKey: 'texts' },
  { id: 'learning', icon: GraduationCap, nameKey: 'learning' }
]

export default function Home() {
  const [language, setLanguage] = useState<'de' | 'en' | 'la'>('de')
  const [activeSection, setActiveSection] = useState<string>('')
  const [astrolabRotation, setAstrolabRotation] = useState(0)

  // Animated stars effect
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container')
      if (!starsContainer) return

      // Clear existing stars
      starsContainer.innerHTML = ''

      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div')
        star.style.cssText = `
          position: absolute;
          width: ${Math.random() > 0.5 ? '2px' : '1px'};
          height: ${Math.random() > 0.5 ? '2px' : '1px'};
          background: ${Math.random() > 0.7 ? '#FFD700' : 'white'};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
          animation-delay: ${Math.random() * 3}s;
        `
        starsContainer.appendChild(star)
      }
    }

    createStars()
  }, [])

  // Astrolab rotation on section change
  useEffect(() => {
    setAstrolabRotation(prev => prev + 45)
  }, [activeSection])

  const t = translations[language]

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description.slice(0, 160)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #007BC7 0%, #005A9C 100%)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Animated Stars Background */}
        <div 
          id="stars-container" 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1
          }}
        ></div>

        {/* Astrolab Background */}
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2,
            opacity: 0.15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${astrolabRotation}deg)`,
            transition: 'transform 500ms ease-in-out'
          }}
        >
          <div style={{ width: '80vw', height: '80vw', maxWidth: '800px', maxHeight: '800px', position: 'relative' }}>
            <Image
              src="/Astrolab.jpg"
              alt="Astrolab"
              fill
              style={{ objectFit: 'contain', opacity: 0.6 }}
              priority
            />
          </div>
        </div>

        {/* Language Selector */}
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 50, display: 'flex', gap: '0.5rem' }}>
          {(['de', 'en', 'la'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 300ms',
                border: 'none',
                cursor: 'pointer',
                ...(language === lang 
                  ? {
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                      transform: 'scale(1.05)'
                    }
                  : {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }
                )
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Hero Section */}
          <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
            <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', color: 'white' }}>
              {/* Bottle Image */}
              <div style={{ marginBottom: '2rem', position: 'relative' }}>
                <div 
                  style={{
                    width: '8rem',
                    height: '8rem',
                    margin: '0 auto',
                    position: 'relative',
                    animation: 'float 4s ease-in-out infinite'
                  }}
                >
                  <Image
                    src="/MacrobiusBottle.jpg"
                    alt="Macrobius Flaschenpost"
                    fill
                    style={{ objectFit: 'contain', borderRadius: '50%' }}
                  />
                </div>
              </div>

              <h1 
                style={{
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#FFD700',
                  animation: 'textReveal 1s ease-out'
                }}
              >
                {t.title}
              </h1>
              
              <h2 
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                  marginBottom: '2rem',
                  opacity: 0.9,
                  animation: 'textReveal 1s ease-out 0.3s both'
                }}
              >
                {t.subtitle}
              </h2>

              {/* Story Section */}
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                  marginBottom: '2rem',
                  animation: 'fadeIn 1s ease-out 0.6s both'
                }}
              >
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {/* Rome Under */}
                  <div style={{ position: 'relative', height: '8rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <Image
                      src="/Rome-under.jpg"
                      alt="Untergang Roms"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                  </div>

                  {/* Macrobius */}
                  <div style={{ position: 'relative', height: '8rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <Image
                      src="/Macrobius-and-Eustachius.jpg"
                      alt="Macrobius und Eustachius"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                  </div>

                  {/* Tycho Assistant */}
                  <div style={{ position: 'relative', height: '8rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <Image
                      src="/TychoAssistent.jpg"
                      alt="Tychos Assistent"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, textAlign: 'left' }}>
                  {t.description}
                </p>

                {/* Book Images */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ position: 'relative', height: '6rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <Image
                      src="/MacrobiI.JPG"
                      alt="Macrobius Buch"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ position: 'relative', height: '6rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <Image
                      src="/MacrobiRegal.jpg"
                      alt="Buch im Regal"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Sections */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      style={{
                        padding: '1.5rem 1rem',
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                        borderRadius: '0.5rem',
                        fontWeight: '500',
                        border: '2px solid #FFD700',
                        cursor: 'pointer',
                        transition: 'all 300ms',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                        e.currentTarget.style.backgroundColor = '#8B3A42'
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(114, 47, 55, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.backgroundColor = '#722F37'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 10 }}>
                        <Icon size={24} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                          {t[section.nameKey as keyof typeof t]}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explore Button */}
              <button 
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1.125rem',
                  border: '2px solid #FFD700',
                  cursor: 'pointer',
                  transition: 'all 300ms',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.backgroundColor = '#8B3A42'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(114, 47, 55, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.backgroundColor = '#722F37'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>{t.exploreBtn}</span>
                <ChevronDown size={20} />
              </button>
            </div>
          </section>

          {/* Additional Sections Preview */}
          {activeSection && (
            <section 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '2rem',
                animation: 'slideUp 0.5s ease-out'
              }}
            >
              <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', color: 'white' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FFD700' }}>
                  {t[sections.find(s => s.id === activeSection)?.nameKey as keyof typeof t]}
                </h3>
                
                {/* Section-specific content preview */}
                {activeSection === 'worldmap' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    <div style={{ position: 'relative', height: '12rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <Image
                        src="/Macrobius-Erdkarte.jpg"
                        alt="Macrobius Erdkarte"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ position: 'relative', height: '12rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <Image
                        src="/mappa-mundi.jpg"
                        alt="Mappa Mundi"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'cosmos' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    <div style={{ position: 'relative', height: '12rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <Image
                        src="/Macrobius-universe.jpg"
                        alt="Macrobius Universum"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ position: 'relative', height: '12rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <Image
                        src="/Macrobius-Zeichnung-Eklipse.jpg"
                        alt="Macrobius Eklipse"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'banquet' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    <div style={{ position: 'relative', height: '12rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <Image
                        src="/WandSymposion.jpg"
                        alt="Wandgemälde Symposion"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ position: 'relative', height: '12rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <Image
                        src="/Symposion-2.jpg"
                        alt="Symposion"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes textReveal {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}