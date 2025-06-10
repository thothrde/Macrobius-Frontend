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

      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 3 + 's'
        star.style.animationDuration = (Math.random() * 3 + 2) + 's'
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

      <div className="min-h-screen bg-azure overflow-hidden relative">
        {/* Animated Stars Background */}
        <div id="stars-container" className="fixed inset-0 z-0"></div>

        {/* Astrolab Background */}
        <div 
          className="fixed inset-0 z-10 opacity-10 flex items-center justify-center"
          style={{ 
            transform: `rotate(${astrolabRotation}deg)`,
            transition: 'transform 500ms ease-in-out'
          }}
        >
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] relative">
            <Image
              src="/astrolab.jpg"
              alt="Astrolab"
              fill
              className="object-contain opacity-30"
              priority
            />
          </div>
        </div>

        {/* Language Selector */}
        <div className="fixed top-4 right-4 z-40 flex gap-2">
          {(['de', 'en', 'la'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                language === lang
                  ? 'bg-wine text-gold scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex flex-col">
          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl mx-auto text-center text-white">
              {/* Bottle Image */}
              <div className="mb-8 relative">
                <div className="w-32 h-32 mx-auto relative animate-float">
                  <Image
                    src="/MacrobiusBottle.jpg"
                    alt="Macrobius Flaschenpost"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gold animate-text-reveal">
                {t.title}
              </h1>
              
              <h2 className="text-xl md:text-2xl mb-8 opacity-90 animate-text-reveal-delay">
                {t.subtitle}
              </h2>

              {/* Story Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8 animate-fade-in">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {/* Rome Under */}
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src="/Rome-under.jpg"
                      alt="Untergang Roms"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Macrobius */}
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src="/Macrobius-and-Eustachius.jpg"
                      alt="Macrobius und Eustachius"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Tycho Assistant */}
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src="/TychoAssistent.jpg"
                      alt="Tychos Assistent"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                <p className="text-sm md:text-base leading-relaxed text-left">
                  {t.description}
                </p>

                {/* Book Images */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src="/MacrobiI.JPG"
                      alt="Macrobius Buch"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src="/MacrobiRegal.jpg"
                      alt="Buch im Regal"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className="btn-wine group relative overflow-hidden"
                    >
                      <div className="flex flex-col items-center gap-2 relative z-10">
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium">
                          {t[section.nameKey as keyof typeof t]}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )
                })}
              </div>

              {/* Explore Button */}
              <button className="btn-wine-large group">
                <span className="mr-2">{t.exploreBtn}</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </section>

          {/* Additional Sections Preview */}
          {activeSection && (
            <section className="bg-white/5 backdrop-blur-sm border-t border-white/20 p-8 animate-slide-up">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h3 className="text-2xl font-bold mb-4 text-gold">
                  {t[sections.find(s => s.id === activeSection)?.nameKey as keyof typeof t]}
                </h3>
                
                {/* Section-specific content preview */}
                {activeSection === 'worldmap' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/Macrobius-Erdkarte.jpg"
                        alt="Macrobius Erdkarte"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/mappa-mundi.jpg"
                        alt="Mappa Mundi"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'cosmos' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/Macrobius-universe.jpg"
                        alt="Macrobius Universum"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/Macrobius-Zeichnung-Eklipse.jpg"
                        alt="Macrobius Eklipse"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'banquet' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/WandSymposion.jpg"
                        alt="Wandgemälde Symposion"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/Symposion-2.jpg"
                        alt="Symposion"
                        fill
                        className="object-cover"
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
        .bg-azure {
          background: #007BC7;
          background: linear-gradient(135deg, #007BC7 0%, #005A9C 100%);
        }

        .btn-wine {
          @apply px-6 py-3 bg-wine text-gold rounded-lg font-medium;
          @apply hover:scale-105 active:scale-95;
          @apply transition-all duration-300;
          @apply shadow-lg hover:shadow-xl;
          background-color: #722F37;
          color: #FFD700;
        }

        .btn-wine-large {
          @apply px-8 py-4 bg-wine text-gold rounded-lg font-medium text-lg;
          @apply hover:scale-105 active:scale-95;
          @apply transition-all duration-300;
          @apply shadow-lg hover:shadow-xl;
          @apply flex items-center justify-center;
          background-color: #722F37;
          color: #FFD700;
        }

        .text-gold {
          color: #FFD700;
        }

        .text-wine {
          color: #722F37;
        }

        .bg-wine {
          background-color: #722F37;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle infinite ease-in-out;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-text-reveal {
          animation: text-reveal 1s ease-out;
        }

        .animate-text-reveal-delay {
          animation: text-reveal 1s ease-out 0.3s both;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>
    </>
  )
}