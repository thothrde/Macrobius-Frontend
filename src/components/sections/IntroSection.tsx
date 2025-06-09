import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { BookOpen, Calendar, Globe, User } from 'lucide-react'

interface IntroSectionProps {
  language: 'DE' | 'EN' | 'LA'
}

const translations = {
  DE: {
    title: 'Wer War Macrobius?',
    subtitle: 'Entdecke Den Spätantiken Gelehrten Und Seine Werke',
    biography: {
      title: 'Biographie',
      content: 'Ambrosius Theodosius Macrobius (um 385-430 n. Chr.) war ein spätantiker römischer Gelehrter, Grammatiker und Philosoph. Er lebte während des Übergangs vom römischen Reich zum byzantinischen Reich und war bekannt für seine umfassende Bildung in Literatur, Philosophie und Naturwissenschaften.'
    },
    works: {
      title: 'Hauptwerke',
      saturnalia: {
        title: 'Saturnalia',
        description: 'Ein fiktives Symposium, das während der Saturnalien stattfindet. Das Werk behandelt Literatur, Philosophie, Antiquitäten und Naturwissenschaften in Form von Dialogen zwischen gelehrten Römern.'
      },
      commentary: {
        title: 'Commentarii in Somnium Scipionis',
        description: 'Ein Kommentar zu Ciceros "Traum des Scipio", der sich mit Kosmologie, Astronomie und der Struktur des Universums beschäftigt.'
      }
    },
    significance: {
      title: 'Bedeutung',
      content: 'Macrobius\'s Werke überbrückten die antike und mittelalterliche Welt und beeinflussten spätere Gelehrte erheblich. Seine Beschreibungen der Geographie und Kosmologie prägten das mittelalterliche Weltbild.'
    },
    explore: 'Werke Erkunden'
  },
  EN: {
    title: 'Who Was Macrobius?',
    subtitle: 'Discover The Late Antique Scholar And His Works',
    biography: {
      title: 'Biography',
      content: 'Ambrosius Theodosius Macrobius (c. 385-430 CE) was a late antique Roman scholar, grammarian, and philosopher. He lived during the transition from the Roman Empire to the Byzantine Empire and was known for his comprehensive education in literature, philosophy, and natural sciences.'
    },
    works: {
      title: 'Major Works',
      saturnalia: {
        title: 'Saturnalia',
        description: 'A fictional symposium taking place during the Saturnalia festival. The work covers literature, philosophy, antiquities, and natural sciences in the form of dialogues between learned Romans.'
      },
      commentary: {
        title: 'Commentary on Scipio\'s Dream',
        description: 'A commentary on Cicero\'s "Dream of Scipio" that deals with cosmology, astronomy, and the structure of the universe.'
      }
    },
    significance: {
      title: 'Significance',
      content: 'Macrobius\'s works bridged the ancient and medieval worlds, significantly influencing later scholars. His descriptions of geography and cosmology shaped the medieval worldview.'
    },
    explore: 'Explore Works'
  },
  LA: {
    title: 'Quis Erat Macrobius?',
    subtitle: 'Eruditum Antiquitatis Serae Et Opera Eius Disce',
    biography: {
      title: 'Vita',
      content: 'Ambrosius Theodosius Macrobius (c. 385-430 p. Chr. n.) fuit eruditus Romanus antiquitatis serae, grammaticus, et philosophus. Vixit tempore transitus ab Imperio Romano ad Imperium Byzantinum et notus erat propter educationem comprehensivam in litteris, philosophia, et scientiis naturalibus.'
    },
    works: {
      title: 'Opera Praecipua',
      saturnalia: {
        title: 'Saturnalia',
        description: 'Symposium fictum tempore Saturnalium celebratum. Opus complectitur litteras, philosophiam, antiquitates, et scientias naturales in forma dialogorum inter eruditos Romanos.'
      },
      commentary: {
        title: 'Commentarii in Somnium Scipionis',
        description: 'Commentarius in "Somnium Scipionis" Ciceronis qui tractat cosmologiam, astronomiam, et structuram universi.'
      }
    },
    significance: {
      title: 'Momentum',
      content: 'Opera Macrobii mundum antiquum et medievalem coniunxerunt, eruditos posteriores significanter influentia. Descriptiones eius geographiae et cosmologiae visionem mundi medievalis formaverunt.'
    },
    explore: 'Opera Explorare'
  }
}

export function IntroSection({ language }: IntroSectionProps) {
  const t = translations[language]

  return (
    <section id="intro" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Biography Card */}
          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.biography.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.biography.content}
            </p>
          </Card>

          {/* Significance Card */}
          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.significance.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.significance.content}
            </p>
          </Card>
        </div>

        {/* Major Works Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.works.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Saturnalia */}
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <h4 className="text-xl font-bold text-gray-900">{t.works.saturnalia.title}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t.works.saturnalia.description}
              </p>
            </Card>

            {/* Commentary */}
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-amber-500">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-amber-500 mr-3" />
                <h4 className="text-xl font-bold text-gray-900">{t.works.commentary.title}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t.works.commentary.description}
              </p>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const element = document.querySelector('#text-search')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            {t.explore}
          </Button>
        </div>
      </div>
    </section>
  )
}

// Add default export for compatibility with index.tsx
export default IntroSection;