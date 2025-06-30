/**
 * 🏛️ MACROBIUS - ENHANCED WITH RICH STARFIELD & COMPLETE TRANSLATIONS
 * ✅ RESTORED: Rich starfield background with moving stars
 * ✅ ENHANCED: Full English and Latin modal content
 * ✅ MAINTAINED: All fixes (German navigation, performance, translations)
 */

import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Eye, Maximize } from 'lucide-react';
import Image from 'next/image';

// Enhanced Image System
import ImageModal from '../components/ui/ImageModal';
import { getImagesBySection, ImageInfo } from '../data/imageData';

// Oracle Cloud-integrated components
import CosmosSection from '../components/sections/CosmosSection';
import TextSearchSection from '../components/sections/TextSearchSection';  
import VisualizationsSection from '../components/sections/VisualizationsSection';
import BanquetSection from '../components/sections/BanquetSection';
import WorldMapSection from '../components/sections/WorldMapSection';
import LearningSection from '../components/sections/LearningSection-enhanced-complete';
import QuizSection from '../components/sections/QuizSection';

// AI Systems Components
import AICulturalAnalysisSection from '../components/sections/AICulturalAnalysisSection';
import PersonalizedLearningPathsSection from '../components/sections/PersonalizedLearningPathsSection';
import AITutoringSystemSection from '../components/sections/AITutoringSystemSection';
import AdvancedCulturalModulesSection from '../components/sections/AdvancedCulturalModulesSection';

// FIXED: Direct German text in navigation (no translation keys)
const GERMAN_NAV_TEXTS = {
  nav_intro: 'Einführung',
  nav_quiz: 'Quiz', 
  nav_worldmap: 'Weltkarte',
  nav_cosmos: 'Kosmos',
  nav_banquet: 'Gastmahl',
  nav_textsearch: 'Textsuche',
  nav_learning: 'Lernen',
  nav_visualizations: 'Visualisierungen',
  nav_ai_systems: 'KI-SYSTEME',
  nav_ai_cultural: 'KI-Kulturanalyse',
  nav_ai_learning: 'Lernpfade',
  nav_ai_tutoring: 'KI-Tutor',
  nav_ai_modules: 'Kulturmodule',
  nav_oracle_status: '1.401 Kulturelle Texte'
};

// COMPLETE: Rich translations with full content for all languages
const translations = {
  DE: {
    // Hero section
    hero_title: 'Eine antike Flaschenpost',
    hero_subtitle: 'Eine Nachricht aus der Antike an die Zukunft',
    cultural_treasures: 'Kulturelle Schätze entdecken',
    click_images_info: 'Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe',
    explore_works: 'ERKUNDEN SIE DIE WERKE DES MACROBIUS',
    more_about_macrobius: 'Mehr über Macrobius',
    more_about_pontanus: 'Mehr über Pontanus',
    close_modal: 'Schließen',
    
    // Cultural story
    cultural_story_1: 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese „Flaschenpost" waren seine beiden großen Werke: die „Saturnalia" und der „Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie.',
    cultural_story_2: 'Diese App ist unsere moderne Antwort auf Macrobius\' Vision: Durch KI-gestützte Textanalyse, interaktive Visualisierungen und multilinguale Zugänge machen wir seine „Flaschenpost" für das 21. Jahrhundert erlebbar. Entdecken Sie, wie ein spätantiker Gelehrter zur Brücke zwischen der antiken und der modernen Welt wurde.',
    
    // RICH MODAL CONTENT - MACROBIUS
    about_title: 'Macrobius Ambrosius Theodosius',
    about_subtitle: 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    about_biography: 'Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher Verwaltungsbeamter des untergehenden Weströmischen Reiches und gleichzeitig als leidenschaftlicher Gelehrter verkörperte er die dramatische Spannung seiner Zeit: den Versuch, die klassische Kultur vor dem Untergang zu bewahren. Geboren um 385 n. Chr., erlebte er die letzten Jahre der römischen Herrschaft in Westeuropa und den unwiderruflichen Niedergang einer tausendjährigen Zivilisation.',
    about_works: 'Macrobius\' zwei Hauptwerke „Saturnalia" und „Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit. Die „Saturnalia" präsentieren sich als lebendige Tischgespräche während der römischen Winterfeste, in denen die gebildete Elite Roms über Literatur, Philosophie, Religion und Naturwissenschaften diskutiert. Die „Commentarii" bieten eine systematische Einführung in die antike Kosmologie und Traumdeutung, basierend auf Ciceros berühmtem „Somnium Scipionis".',
    about_legacy: 'Macrobius\' kulturelle „Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte. Seine Werke überdauerten den Untergang Roms, wurden von mittelalterlichen Klöstern bewahrt und prägten das geistige Leben des Mittelalters und der Renaissance nachhaltig. Durch ihn blieben zentrale Texte Ciceros, Vergils und der antiken Philosophie für die Nachwelt erhalten.',
    
    // RICH MODAL CONTENT - PONTANUS & TYCHO  
    pontanus_title: 'Johannes Isaac Pontanus & Tycho Brahe',
    pontanus_subtitle: 'Astronomische Renaissance und die Wiederentdeckung antiker Weisheit (1571-1639)',
    pontanus_bio: 'Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft. Geboren 1571 in Dänemark, wurde er zum Zeitzeugen einer der dramatischsten Epochen der Wissenschaftsgeschichte: der astronomischen Revolution. Als enger Mitarbeiter Tychos auf der legendären Insel Hven erlebte er hautnah die Geburt der modernen Astronomie mit.',
    pontanus_work: 'Die editorische Leistung des Pontanus war bahnbrechend. Seine kommentierten Ausgaben der Macrobius-Werke vereinten philologische Präzision mit astronomischem Fachwissen. Er erkannte als einer der ersten, dass Macrobius\' kosmologische Texte nicht nur literarische Curiosa waren, sondern wertvolle Zeugnisse antiker Wissenschaft. Seine Edition von 1597 folgte dem gedruckten Text mit 117 Seiten voller eigener gelehrter Notizen.',
    pontanus_legacy: 'Durch Pontanus\' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Editionen machten Macrobius\' Werke für die Gelehrtenwelt der frühen Neuzeit zugänglich und trugen zur „Wiedergeburt" der antiken Wissenschaften bei. Die Verbindung von Tycho Brahes revolutionären Beobachtungen mit Macrobius\' antiker Kosmologie schuf eine einzigartige Synthese.',
    pontanus_historical_details: 'Die Edition des Pontanus folgt dem gedruckten Text mit 117 Seiten voller eigener gelehrter Notizen, die das astronomische Wissen seiner Zeit mit den antiken Texten verknüpfen. Diese Arbeit entstand in direkter Zusammenarbeit mit Tycho Brahe auf Hven und repräsentiert eine der ersten systematischen Versuche, antike und moderne Astronomie zu synthetisieren.',
    
    // RICH MODAL CONTENT - DECLINING ROME
    declining_rome_title: 'Das untergehende Römische Reich',
    declining_rome_subtitle: 'Kultureller Niedergang und die Mission der Gelehrten (4.-5. Jahrhundert n. Chr.)',
    declining_rome_content: 'Die Zeit des Macrobius war geprägt vom dramatischen Niedergang des Weströmischen Reiches. Barbareneinfälle, politische Instabilität und wirtschaftlicher Kollaps bedrohten nicht nur die politische Ordnung, sondern auch das gesamte kulturelle Erbe der Antike. Bibliotheken wurden zerstört, Schulen geschlossen, und jahrhundertealtes Wissen drohte für immer verloren zu gehen. Der Sack Roms durch Alarich (410) und Geiserich (455) markierte symbolisch das Ende einer Ära.',
    declining_rome_mission: 'Die Mission der Kulturbewahrer',
    declining_rome_mission_content: 'In dieser Krisenzeit erkannten Gelehrte wie Macrobius ihre historische Verantwortung: Sie mussten das kulturelle Erbe für kommende Generationen retten. Durch systematische Sammlung, Kommentierung und Übertragung der klassischen Texte schufen sie eine Art „kulturelle Arche", die das Wissen der Antike über die dunklen Jahrhunderte hinweg bewahren sollte.',
    declining_rome_significance: 'Macrobius\' Zeit war eine der dramatischsten Wendepunkte der Weltgeschichte. Seine Antwort - die systematische Bewahrung der klassischen Kultur in seinen zwei Hauptwerken - wurde zum Modell für alle späteren „kulturellen Rettungsaktionen" in Krisenzeiten. Von den mittelalterlichen Klöstern bis zu modernen digitalen Archiven folgen Kulturbewahrer seinem Beispiel.'
  },
  EN: {
    hero_title: 'An ancient message in a bottle',
    hero_subtitle: 'A message from antiquity to the future',
    cultural_treasures: 'Discover Cultural Treasures',
    click_images_info: 'Click on images for detailed cultural backgrounds',
    explore_works: 'EXPLORE MACROBIUS\' WORKS',
    more_about_macrobius: 'More about Macrobius',
    more_about_pontanus: 'More about Pontanus',
    close_modal: 'Close',
    
    cultural_story_1: '1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the best of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy. His mission: to save the cultural heritage for future generations.',
    cultural_story_2: 'This app is our modern response to Macrobius\' vision: Through AI-powered text analysis, interactive visualizations and multilingual access, we make his "message in a bottle" accessible for the 21st century. Discover how a late antique scholar became the bridge between the ancient and modern worlds.',
    
    // EXPANDED: Full English content for Macrobius
    about_title: 'Macrobius Ambrosius Theodosius',
    about_subtitle: 'Cultural Preserver of the Late Antique World (ca. 385-430 AD)',
    about_biography: 'Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds. As a high administrative official of the declining Western Roman Empire and simultaneously as a passionate scholar, he embodied the dramatic tension of his time: the attempt to preserve classical culture from destruction. Born around 385 AD, he witnessed the final years of Roman rule in Western Europe and the irreversible decline of a thousand-year civilization. His life spanned the crucial period when barbarian invasions, political chaos, and economic collapse threatened to erase forever the intellectual achievements of the ancient world.',
    about_works: 'Macrobius\' two major works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship that served as cultural lifelines for future generations. The "Saturnalia" present themselves as vivid table conversations during the Roman winter festivals, where the educated elite of Rome discuss literature, philosophy, religion, and natural sciences with remarkable sophistication. The "Commentarii" offer a systematic introduction to ancient cosmology and dream interpretation, based on Cicero\'s famous "Somnium Scipionis." Both works demonstrate Macrobius\' genius for making complex classical knowledge accessible while preserving its depth and authenticity.',
    about_legacy: 'Macrobius\' cultural "message in a bottle" proved to be one of the most successful rescue operations in world history. His works survived the fall of Rome, were preserved by medieval monasteries, and profoundly influenced the intellectual life of the Middle Ages and Renaissance. Through him, central texts of Cicero, Virgil, and ancient philosophy remained available to posterity. Medieval scholars called him "the gateway to the ancients," and Renaissance humanists considered his works essential bridges to classical antiquity. His method of systematic cultural preservation became the model for all later "rescue operations" during times of crisis, from monastic scriptoriums to modern digital archives.',
    
    // EXPANDED: Full English content for Pontanus
    pontanus_title: 'Johannes Isaac Pontanus & Tycho Brahe',
    pontanus_subtitle: 'Astronomical Renaissance and the Rediscovery of Ancient Wisdom (1571-1639)',
    pontanus_bio: 'Johannes Isaac Pontanus was far more than just an assistant to the great Tycho Brahe - he was a bridge-builder between the worlds of ancient wisdom and modern science. Born in 1571 in Denmark, he became a witness to one of the most dramatic epochs in the history of science: the astronomical revolution. As a close collaborator of Tycho on the legendary island of Hven, he experienced firsthand the birth of modern astronomy. Yet Pontanus understood that the new science needed to be connected with the wisdom of the ancients, not replace it entirely. His unique position allowed him to synthesize cutting-edge observational astronomy with the profound cosmological insights preserved in classical texts.',
    pontanus_work: 'Pontanus\' editorial achievement was truly groundbreaking and represents one of the first successful attempts to unite ancient and modern scientific knowledge. His annotated editions of Macrobius\' works combined rigorous philological precision with astronomical expertise of the highest caliber. He was among the first to recognize that Macrobius\' cosmological texts were not merely literary curiosities, but valuable testimonies of ancient scientific knowledge that could inform contemporary understanding. His 1597 edition followed the printed text with 117 pages of his own learned annotations, creating a dialogue between Ciceronian cosmology and Tychonic astronomy that enriched both traditions.',
    pontanus_legacy: 'Through Pontanus\' work, the crucial bridge between ancient culture and Renaissance scholarship was firmly established, creating a model for scholarly synthesis that influenced generations of humanist scientists. His editions made Macrobius\' works accessible to the learned world of the early modern period and contributed significantly to the "rebirth" of ancient sciences. The connection between Tycho Brahe\'s revolutionary observations and Macrobius\' ancient cosmology created a unique synthesis that demonstrated how classical wisdom could enhance rather than hinder scientific progress. This approach became fundamental to the humanistic tradition in science.',
    pontanus_historical_details: 'The Pontanus edition follows the printed text with 117 pages of his own learned annotations that link the astronomical knowledge of his time with ancient texts. This work was created in direct collaboration with Tycho Brahe on Hven and represents one of the first systematic attempts to synthesize ancient and modern astronomy. The annotations demonstrate how Renaissance scholars could respectfully engage with classical authorities while advancing contemporary knowledge through careful observation and mathematical analysis.',
    
    // EXPANDED: Full English content for Declining Rome
    declining_rome_title: 'The Declining Roman Empire',
    declining_rome_subtitle: 'Cultural Decline and the Mission of Scholars (4th-5th Century AD)',
    declining_rome_content: 'The time of Macrobius was marked by the dramatic and irreversible decline of the Western Roman Empire, a civilization that had dominated the Mediterranean world for over a thousand years. Barbarian invasions, political instability, and economic collapse threatened not only the political order but also the entire cultural heritage of antiquity. Libraries were destroyed, schools were closed, and centuries-old knowledge was in danger of being lost forever. The sack of Rome by Alaric (410) and Genseric (455) symbolically marked the end of an era. In this apocalyptic atmosphere, it became clear that the classical culture that had shaped the ancient world was facing complete extinction unless extraordinary measures were taken to preserve it.',
    declining_rome_mission: 'The Mission of Cultural Preservers',
    declining_rome_mission_content: 'In this time of unprecedented crisis, scholars like Macrobius recognized their historic responsibility: they had to save the cultural heritage for future generations, becoming the guardians of civilization itself. Through systematic collection, commentary, and transmission of classical texts, they created a kind of "cultural ark" that would preserve the knowledge of antiquity through the dark centuries ahead. These scholar-preservers understood that they were living through a historical catastrophe and responded with remarkable courage and foresight, dedicating their lives to ensuring that the intellectual achievements of Greece and Rome would not perish with the political structures that had created them.',
    declining_rome_significance: 'Macrobius\' time was one of the most dramatic turning points in world history, a moment when the continuity of Western civilization hung in the balance. His response - the systematic preservation of classical culture in his two major works - became the foundational model for all later "cultural rescue operations" in times of crisis. From medieval monasteries preserving manuscripts through the Dark Ages to modern digital archives protecting cultural heritage, all follow the example he established. His understanding that cultural transmission requires both preservation and creative engagement has remained the gold standard for cultural continuity across historical disruptions.'
  },
  LA: {
    hero_title: 'Epistula antiqua in lagena',
    hero_subtitle: 'Nuntius ab antiquitate ad futurum',
    cultural_treasures: 'Thesauros Culturales Invenire',
    click_images_info: 'Clicca imagines pro contextu culturali',
    explore_works: 'OPERA MACROBII EXPLORARE',
    more_about_macrobius: 'Magis de Macrobio',
    more_about_pontanus: 'Magis de Pontano',
    close_modal: 'Claudere',
    
    cultural_story_1: 'Ante mille quingentos annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum composuit. Haec "epistula in lagena" duo opera magna eius erant: "Saturnalia" et "Commentarius in Somnium Scipionis". In his optimum culturae antiquae servavit - a rhetorica Ciceronis usque ad mysteria astronomiae. Missio eius: patrimonium culturale futuris generationibus salvare.',
    cultural_story_2: 'Haec applicatio responsio nostra moderna ad visionem Macrobii est: per analysin textuum ab intelligentia artificiali adiutam, visualizationes interactivas et accessus multilingues, "epistulam in lagena" eius saeculo XXI accessibilem facimus. Invenite quomodo eruditus antiquitatis serae pons inter mundum antiquum et modernum factus sit.',
    
    // EXPANDED: Full Latin content for Macrobius
    about_title: 'Macrobius Ambrosius Theodosius',
    about_subtitle: 'Custos Culturae Mundi Antiquitatis Serae (ca. 385-430 p. Chr.)',
    about_biography: 'Macrobius Ambrosius Theodosius inter figuras fascinantissimas antiquitatis serae fuit - vir qui in limine inter duos mundos stabat. Ut administrativus officialis altus Imperii Romani Occidentalis cadentis et simul ut eruditus passionatus, tensionem dramaticam temporis sui incorporabat: conatum culturam classicam ab interitu servandi. Circiter anno 385 post Christum natus, ultimos annos dominationis Romanae in Europa Occidentali et declinationem irrevocabilem civilizationis millennalis expertus est. Vita eius periodum crucialem tegebat quando invasiones barbarorum, chaos politicum, et collapsus oeconomicus intellectuales triumphos mundi antiqui in perpetuum delere minabantur.',
    about_works: 'Duo opera principalia Macrobii "Saturnalia" et "Commentarii in Somnium Scipionis" sunt opera magistralia eruditionis antiquitatis serae quae tamquam lineae vitales culturales futuris generationibus serviebant. "Saturnalia" se tamquam colloquia vivida mensae durante festis hiemis Romanis praebent, ubi elites eruditae Romae de literatura, philosophia, religione, et scientiis naturalibus cum sophisticatione mirabili disputant. "Commentarii" introductionem systematicam ad cosmologiam antiquam et interpretationem somniorum offerunt, in "Somnio Scipionis" Ciceronis famoso basatam. Ambo opera ingenium Macrobii demonstrant pro cognitione classica complexa accessibili facienda dum profunditatem et authenticitatem eius servat.',
    about_legacy: 'Culturalis "epistula in lagena" Macrobii una ex operationibus salvationis successuris in historia mundi probata est. Opera eius interitum Romae supervixerunt, a monasteriis medievalibus servata sunt, et vitam intellectualem Medii Aevi et Renascentiae profunde influebant. Per eum, textus centrales Ciceronis, Vergilii, et philosophiae antiquae posteritati disponibiles manebant. Eruditi medievales eum "portam ad antiquos" vocabant, et humanistae Renascentiae opera eius pontes essentiales ad antiquitatem classicam considerabant. Methodus eius preservationis culturalis systematicae exemplar omnium posteriorum "operationum salvationis" durante temporibus crisis facta est.',
    
    // EXPANDED: Full Latin content for Pontanus
    pontanus_title: 'Johannes Isaac Pontanus et Tycho Brahe',
    pontanus_subtitle: 'Renascentia Astronomica et Inventio Nova Sapientiae Antiquae (1571-1639)',
    pontanus_bio: 'Johannes Isaac Pontanus longe plus erat quam solum adiutor magni Tychonis Brahe - constructor pontis inter mundos sapientiae antiquae et scientiae modernae erat. Anno 1571 in Dania natus, testis unius ex epochis dramaticissimis in historia scientiae factus est: revolutionis astronomicae. Ut collaborator propinquus Tychonis in insula legendaria Hven, ortum astronomiae modernae ex propinquo expertus est. Tamen Pontanus intellegebat scientiam novam cum sapientia antiquorum conectendam esse, non omnino substituendam. Positio eius unica ei permittebat astronomiam observationalem recentissimam cum profundis intellectibus cosmologicis in textibus classicis servatis synthetizare.',
    pontanus_work: 'Opus editoriale Pontani vere fundamentale erat et unam ex primis tentationibus successuris scientiam antiquam et modernam unire representat. Editiones eius annotatae operum Macrobii praecisionem philologicam rigorosam cum peritia astronomica altissimi calibri combinabant. Inter primos erat qui recognoscebat textus cosmologicos Macrobii non mere curiositates literarias esse, sed testimonia pretiosa cognitionis scientificae antiquae quae intellectum contemporaneum informare poterant. Editio eius anni 1597 textum impressum cum 117 paginis notationum eruditionis suae sequebatur, dialogum inter cosmologiam Ciceronianam et astronomiam Tychonicam creans qui ambas traditiones ditabat.',
    pontanus_legacy: 'Per laborem Pontani, pons crucialis inter culturam antiquam et eruditionem Renascentiae firmiter aedificatus est, exemplar syntheseos eruditae creans quod generationes humanistorum scientificorum influebat. Editiones eius opera Macrobii mundo erudito periodi modernae primae accessibilia fecerunt et ad "renascentiam" scientiarum antiquarum significanter contribuerunt. Conexio inter observationes revolutionarias Tychonis Brahe et cosmologiam antiquam Macrobii synthesin unicam creavit quae demonstrabat quomodo sapientia classica progressum scientificum augere potius quam impedire posset.',
    pontanus_historical_details: 'Editio Pontani textum impressum cum 117 paginis notationum eruditionis suae sequitur quae cognitionem astronomicam temporis sui cum textibus antiquis conectunt. Hoc opus in collaboratione directa cum Tychone Brahe in Hven creatum est et unam ex primis tentationibus systematicis astronomiam antiquam et modernam synthetizandi representat. Annotationes demonstrant quomodo eruditi Renascentiae cum auctoritatibus classicis respectuose tractare possent dum cognitionem contemporaneam per observationem accuratam et analysim mathematicam promovebant.',
    
    // EXPANDED: Full Latin content for Declining Rome
    declining_rome_title: 'Imperium Romanum Cadens',
    declining_rome_subtitle: 'Declinatio Culturalis et Missio Eruditorum (saec. IV-V p. Chr.)',
    declining_rome_content: 'Tempus Macrobii declinio dramatico et irrevocabili Imperii Romani Occidentalis signatum erat, civilizationis quae mundum Mediterraneum per plus quam mille annos dominata erat. Invasiones barbarorum, instabilitas politica, et collapsus oeconomicus non solum ordinem politicum sed etiam totum patrimonium culturale antiquitatis minabatur. Bibliothecae destructae sunt, scholae clausae sunt, et cognitio saeculorum in perpetuum perdendi periculo erat. Direptio Romae ab Alarico (410) et Geiserico (455) symbolice finem aetatis significabat. In hac atmosphaera apocalyptica, clarum factum est culturam classicam quae mundum antiquum formaverat extinctionem completam frontem facere nisi mensura extraordinaria ad eam servandam caperetur.',
    declining_rome_mission: 'Missio Custodum Culturae',
    declining_rome_mission_content: 'In hoc tempore crisis sine praecedenti, eruditi sicut Macrobius responsabilitatem suam historicam recognoverunt: patrimonium culturale futuris generationibus salvare debebant, custodes ipsius civilizationis facti. Per collectionem systematicam, commentarium, et transmissionem textuum classicorum, genus "arcae culturalis" creaverunt quae cognitionem antiquitatis per saecula tenebricosa futura servaret. Hi eruditi-preservatores intellegebant se per catastrophen historicam vivere et cum fortitudine et providentia mirabili responderunt, vitas suas dedicantes ad assecurandum ne triumphi intellectuales Graeciae et Romae cum structuris politicis quae eos creaverant perirent.',
    declining_rome_significance: 'Tempus Macrobii unum ex momentis conversionis dramaticissimis in historia mundi erat, momentum quando continuitas civilizationis Occidentalis in libra pendebat. Responsio eius - preservatio systematica culturae classicae in duobus operibus principalibus suis - exemplar fundamentale omnium posteriorum "operationum salvationis culturalis" temporibus crisis factum est. A monasteriis medievalibus manuscripta per Saecula Tenebricosa servantibus usque ad archiva digitalia moderna patrimonium culturale protegentia, omnia exemplum ab eo stabilitum sequuntur. Intellectus eius transmissionem culturarum et preservationem et conflictum creativum requirere standard aureum continuitatis culturalis trans disruptiones historicas permansit.'
  }
};

// ROBUST: Simple, fail-safe translation function
const getTranslation = (key: string, language: string = 'DE'): string => {
  if (!translations[language as keyof typeof translations]) {
    return key;
  }
  
  const langObj = translations[language as keyof typeof translations];
  return langObj[key as keyof typeof langObj] || key;
};

// Clickable Image Component
interface ClickableImageProps {
  imageInfo: ImageInfo;
  onClick: (imageInfo: ImageInfo) => void;
  className?: string;
  fullSize?: boolean;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ imageInfo, onClick, className = '', fullSize = false }) => {
  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-lg ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(imageInfo)}
    >
      <div className="relative">
        <Image
          src={imageInfo.src}
          alt={imageInfo.title}
          width={fullSize ? 600 : 300}
          height={fullSize ? 450 : 200}
          className={`${fullSize ? 'w-full h-auto' : 'w-full h-48'} object-${fullSize ? 'contain' : 'cover'} transition-transform duration-500 group-hover:scale-110`}
          style={fullSize ? { 
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            maxHeight: '450px'
          } : {}}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1">{imageInfo.title}</h3>
            {imageInfo.subtitle && (
              <p className="text-white/90 text-sm">{imageInfo.subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="p-3 bg-white/10 backdrop-blur-sm">
        <p className="text-white/80 text-xs line-clamp-2">{imageInfo.description}</p>
      </div>
    </motion.div>
  );
};

// Main Application Component
export default function MacrobiusCulturalApp() {
  // State management
  const [currentLang, setCurrentLang] = useState<'DE' | 'EN' | 'LA'>('DE');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [astrolabeRotation, setAstrolabeRotation] = useState<number>(0);
  
  // Modal states
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPontanusModal, setShowPontanusModal] = useState(false);
  const [showRomeModal, setShowRomeModal] = useState(false);
  
  // Image modal state
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Translation function
  const t = (key: string): string => {
    return getTranslation(key, currentLang);
  };

  // Event handlers
  const handleLanguageChange = (lang: 'DE' | 'EN' | 'LA') => {
    setCurrentLang(lang);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setAstrolabeRotation(prev => prev + 45);
  };

  const handleImageClick = (imageInfo: ImageInfo) => {
    setSelectedImage(imageInfo);
    setShowImageModal(true);
  };

  const handleImageModalClose = () => {
    setShowImageModal(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  return (
    <>
      <Head>
        <title>Macrobius - Kulturelle Schätze der Antike</title>
        <meta name="description" content="Entdecken Sie die Kulturschätze der Antike" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Enhanced Evening Sky Background */}
      <div className="min-h-screen relative overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 15%, #16213e 30%, #0d1b2a 50%, #0c1821 70%, #0a0e1a 100%)'
      }}>
        {/* RESTORED: Rich starfield background with moving stars */}
        <div className="fixed inset-0 z-0">
          {/* Static twinkling stars (30 stars) */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`static-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          
          {/* Larger stars and planets (15 stars) */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`large-star-${i}`}
              className={`absolute w-2 h-2 rounded-full opacity-70 ${
                i % 3 === 0 ? 'bg-yellow-300' : 
                i % 3 === 1 ? 'bg-blue-300' : 'bg-red-300'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          
          {/* MOVING STARS: Right to left movement (5 stars) */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`moving-star-${i}`}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-50"
              style={{
                right: '-10px',
                top: `${20 + Math.random() * 60}%`,
                animation: `moveRightToLeft ${15 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
          
          {/* Occasional shooting star */}
          <div
            className="shooting-star opacity-30"
            style={{
              top: `${30 + Math.random() * 40}%`,
              animationDelay: `${15 + Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          />
        </div>

        {/* Rotating Astrolabe Background */}
        <div className="fixed inset-0 z-1 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="opacity-40"
            animate={{ 
              rotate: astrolabeRotation,
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-[2000px] h-[2000px]">
              <Image 
                src="/Astrolab.jpg" 
                alt="Historical Astrolabe"
                width={2000}
                height={2000}
                className="w-full h-full object-contain"
                style={{
                  filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.5) contrast(1.2)',
                  mixBlendMode: 'overlay'
                }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Macrobius Circle */}
        {activeSection === 'hero' && (
          <motion.div 
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
            animate={{ 
              y: [0, -15, 0],
              x: [0, -8, 8, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8,
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-400 to-orange-500">
              <Image 
                src="/MacrobiusBottle.jpg" 
                alt="Macrobius with Bottle"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Language Selector */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-2">
            <div className="flex space-x-1">
              {(['DE', 'EN', 'LA'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                    currentLang === lang
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FIXED: Navigation with Direct German Text */}
        <nav className="fixed top-4 left-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex flex-col space-y-2">
              {/* Core Sections - Uses GERMAN_NAV_TEXTS */}
              {[
                { id: 'hero', text: GERMAN_NAV_TEXTS.nav_intro, icon: '🏛️' },
                { id: 'quiz', text: GERMAN_NAV_TEXTS.nav_quiz, icon: '📝' },
                { id: 'worldmap', text: GERMAN_NAV_TEXTS.nav_worldmap, icon: '🗺️' },
                { id: 'cosmos', text: GERMAN_NAV_TEXTS.nav_cosmos, icon: '🌌' },
                { id: 'banquet', text: GERMAN_NAV_TEXTS.nav_banquet, icon: '🍷' },
                { id: 'search', text: GERMAN_NAV_TEXTS.nav_textsearch, icon: '🔍' },
                { id: 'learning', text: GERMAN_NAV_TEXTS.nav_learning, icon: '📚' },
                { id: 'visualizations', text: GERMAN_NAV_TEXTS.nav_visualizations, icon: '📊' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-left flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-gray-800 shadow-lg'
                      : 'text-yellow-300 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#FFD700' : '#722F37',
                    color: activeSection === section.id ? '#1a1a1a' : '#FFD700',
                  }}
                >
                  <span>{section.icon}</span>
                  <span>{section.text}</span>
                </button>
              ))}
              
              {/* AI Systems Separator */}
              <div className="border-t border-white/20 pt-2 mt-2">
                <p className="text-yellow-200/60 text-xs px-2 mb-2">
                  {GERMAN_NAV_TEXTS.nav_ai_systems}
                </p>
                {[
                  { id: 'ai-cultural', text: GERMAN_NAV_TEXTS.nav_ai_cultural, icon: '🧠' },
                  { id: 'ai-learning', text: GERMAN_NAV_TEXTS.nav_ai_learning, icon: '🎯' },
                  { id: 'ai-tutoring', text: GERMAN_NAV_TEXTS.nav_ai_tutoring, icon: '📖' },
                  { id: 'ai-modules', text: GERMAN_NAV_TEXTS.nav_ai_modules, icon: '✨' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-left flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-blue-400 text-gray-800 shadow-lg'
                        : 'text-blue-300 hover:bg-white/20'
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#60A5FA' : 'rgba(59, 130, 246, 0.2)',
                      color: activeSection === section.id ? '#1a1a1a' : '#93C5FD',
                    }}
                  >
                    <span>{section.icon}</span>
                    <span>{section.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Oracle Cloud Status */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Oracle Cloud</span>
              </div>
              <p className="text-white/60 text-xs mt-1">
                {GERMAN_NAV_TEXTS.nav_oracle_status}
              </p>
            </div>

            {/* Pontanus Button */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setShowPontanusModal(true)}
                className="w-full px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 mb-2"
                style={{
                  backgroundColor: '#722F37',
                  color: '#FFD700',
                }}
              >
                {t('more_about_pontanus')}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          {activeSection === 'hero' && (
            <section className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '200px' }}>
              <div className="text-center max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8">
                  
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                      Macrobius
                    </h1>
                    
                    <h2 className="text-2xl md:text-4xl text-yellow-300 mb-6 font-light">
                      {t('hero_title')}
                    </h2>
                    
                    <h3 className="text-lg md:text-xl text-yellow-200 mb-8 font-medium">
                      {t('hero_subtitle')}
                    </h3>
                  </div>

                  {/* Picture gallery */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-yellow-300" />
                      <h4 className="text-xl font-semibold text-yellow-200">
                        {t('cultural_treasures')}
                      </h4>
                      <Eye className="w-6 h-6 text-yellow-300" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {/* Das untergehende Rom */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-orange-400/60 shadow-2xl"
                          whileHover={{ scale: 1.02, y: -8 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowRomeModal(true)}
                        >
                          <div className="relative">
                            <Image
                              src="/Rome-under.jpg"
                              alt={t('declining_rome_title')}
                              width={400}
                              height={300}
                              className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                              style={{ 
                                objectPosition: 'center 30%'
                              }}
                            />
                            
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="p-4">
                                <h3 className="text-white font-bold text-xl mb-1">
                                  {t('declining_rome_title')}
                                </h3>
                                <p className="text-white/95 text-sm">
                                  {t('declining_rome_subtitle')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="absolute top-3 right-3 bg-orange-500/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Macrobius Portrait */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-yellow-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAboutModal(true)}
                        >
                          <div className="relative">
                            <div className="w-full relative overflow-hidden" style={{ minHeight: '320px' }}>
                              <Image
                                src="/MacrobiusBottle.jpg"
                                alt={t('about_title')}
                                width={400}
                                height={500}
                                className="w-full h-auto object-contain"
                                style={{
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: 'auto',
                                  minHeight: '320px'
                                }}
                              />
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg mb-1">
                                  {t('about_title')}
                                </h3>
                                <p className="text-white/90 text-sm">
                                  {t('about_subtitle')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Tycho & Pontanus */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <motion.div
                          className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-blue-400/60 shadow-xl"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPontanusModal(true)}
                        >
                          <div className="relative">
                            <div className="w-full relative overflow-hidden" style={{ minHeight: '320px' }}>
                              <Image
                                src="/TychoAssistent.jpg"
                                alt={t('pontanus_title')}
                                width={400}
                                height={500}
                                className="w-full h-auto object-contain"
                                style={{
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: 'auto',
                                  minHeight: '320px'
                                }}
                              />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold text-lg mb-1">
                                  {t('pontanus_title')}
                                </h3>
                                <p className="text-white/90 text-sm">
                                  {t('pontanus_subtitle')}
                                </p>
                              </div>
                            </div>
                          </div>
                            
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Maximize className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Macrobius and Son picture */}
                    <div className="mt-8 flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="max-w-2xl"
                      >
                        <ClickableImage
                          imageInfo={{
                            id: 'macrobius-eustachius',
                            src: '/Macrobius-and-Eustachius.jpg',
                            title: currentLang === 'DE' ? 'Macrobius und sein Sohn Eustachius' :
                                   currentLang === 'EN' ? 'Macrobius and his son Eustachius' :
                                   'Macrobius et filius eius Eustachius',
                            subtitle: currentLang === 'DE' ? 'Familiäre Überlieferung des Wissens' :
                                      currentLang === 'EN' ? 'Familial transmission of knowledge' :
                                      'Traditio familiaris scientiae',
                            description: currentLang === 'DE' ? 'Macrobius mit seinem Sohn, dem er seine Werke widmete' :
                                         currentLang === 'EN' ? 'Macrobius with his son, to whom he dedicated his works' :
                                         'Macrobius cum filio suo, cui opera sua dedicavit',
                            section: 'intro'
                          }}
                          onClick={handleImageClick}
                          className="max-w-2xl border-2 border-amber-400/60 shadow-xl"
                          fullSize={true}
                        />
                      </motion.div>
                    </div>
                    
                    <p className="text-yellow-200/80 text-sm mt-6 italic">
                      📸 {t('click_images_info')}
                    </p>
                  </div>

                  {/* Cultural story */}
                  <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify mb-6">
                      {t('cultural_story_1')}
                    </p>
                    
                    <p className="text-base md:text-lg text-yellow-100/80 leading-relaxed text-justify">
                      {t('cultural_story_2')}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => handleSectionChange('banquet')}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('explore_works')}
                  </button>
                  
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('more_about_macrobius')}
                  </button>

                  <button
                    onClick={() => setShowPontanusModal(true)}
                    className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: '#722F37',
                      color: '#FFD700',
                    }}
                  >
                    {t('more_about_pontanus')}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Other sections */}
          {activeSection === 'search' && (
            <TextSearchSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'cosmos' && (
            <CosmosSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'banquet' && (
            <BanquetSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'worldmap' && (
            <WorldMapSection isActive={true} t={t} language={currentLang} />
          )}

          {activeSection === 'quiz' && (
            <QuizSection isActive={true} language={currentLang} />
          )}

          {activeSection === 'learning' && (
            <LearningSection />
          )}

          {activeSection === 'visualizations' && (
            <VisualizationsSection isActive={true} t={t} language={currentLang} />
          )}

          {/* AI Systems Sections */}
          {activeSection === 'ai-cultural' && (
            <AICulturalAnalysisSection language={currentLang} />
          )}

          {activeSection === 'ai-learning' && (
            <PersonalizedLearningPathsSection language={currentLang} />
          )}

          {activeSection === 'ai-tutoring' && (
            <AITutoringSystemSection language={currentLang} />
          )}

          {activeSection === 'ai-modules' && (
            <AdvancedCulturalModulesSection language={currentLang} />
          )}
        </main>

        {/* Image Modal */}
        <ImageModal
          imageInfo={selectedImage}
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          language={currentLang}
        />

        {/* EXPANDED CONTENT: About Macrobius Modal */}
        <AnimatePresence>
          {showAboutModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                      {t('about_title')}
                    </h2>
                    <p className="text-xl text-yellow-300/90 font-medium">
                      {t('about_subtitle')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="relative">
                      <Image 
                        src="/MacrobiusBottle.jpg" 
                        alt="Macrobius Portrait"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-yellow-400 shadow-xl"
                      />
                    </div>
                    
                    <div className="relative">
                      <Image 
                        src="/MacrobI.JPG" 
                        alt="Macrobius Book Volume I"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-amber-400 shadow-xl"
                      />
                    </div>
                    
                    <div className="relative">
                      <Image 
                        src="/MacrobiRegal.jpg" 
                        alt="Macrobius Books on Shelf"
                        width={256}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl border-4 border-amber-400 shadow-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        🏛️ {currentLang === 'DE' ? 'Biographie & Kontext' :
                              currentLang === 'EN' ? 'Biography & Context' :
                              'Biographia et Contextus'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_biography')}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                        📚 {currentLang === 'DE' ? 'Die zwei Hauptwerke' :
                              currentLang === 'EN' ? 'The Two Major Works' :
                              'Duo Opera Principalia'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('about_works')}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                      🌍 {currentLang === 'DE' ? 'Vermächtnis & Wirkung' :
                            currentLang === 'EN' ? 'Legacy & Impact' :
                            'Legatum et Effectus'}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-justify">{t('about_legacy')}</p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowAboutModal(false)}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPANDED CONTENT: Pontanus & Tycho Modal */}
        <AnimatePresence>
          {showPontanusModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPontanusModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPontanusModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-blue-400 mb-2">
                      {t('pontanus_title')}
                    </h2>
                    <p className="text-xl text-blue-300/90 font-medium">
                      {t('pontanus_subtitle')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                        🌟 {currentLang === 'DE' ? 'Brückenbauer der Wissenschaften' :
                              currentLang === 'EN' ? 'Bridge-Builder of Sciences' :
                              'Constructor Pontis Scientiarum'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('pontanus_bio')}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                        📖 {currentLang === 'DE' ? 'Editorische Meisterleistung' :
                              currentLang === 'EN' ? 'Editorial Masterpiece' :
                              'Opus Editoriale Eximium'}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-justify">{t('pontanus_work')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <Image 
                          src="/TychoAssistent.jpg" 
                          alt="Tycho Brahe Observatory with Pontanus"
                          width={192}
                          height={256}
                          className="w-48 h-64 object-cover rounded-xl border-4 border-blue-400 shadow-xl mx-auto"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="relative mb-4">
                        <Image 
                          src="/Astrolab.jpg" 
                          alt="Astronomical Instruments"
                          width={192}
                          height={256}
                          className="w-48 h-64 object-cover rounded-xl border-4 border-purple-400 shadow-xl mx-auto"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                      🌍 {currentLang === 'DE' ? 'Historisches Vermächtnis' :
                            currentLang === 'EN' ? 'Historical Legacy' :
                            'Legatum Historicum'}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-justify">{t('pontanus_legacy')}</p>
                    <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                      <p className="text-white/90 text-sm leading-relaxed">{t('pontanus_historical_details')}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowPontanusModal(false)}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPANDED CONTENT: Das untergehende Rom Modal */}
        <AnimatePresence>
          {showRomeModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRomeModal(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-6xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowRomeModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
                >
                  ×
                </button>

                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-400 mb-2">
                      {t('declining_rome_title')}
                    </h2>
                    <p className="text-xl text-red-300/90 font-medium">
                      {t('declining_rome_subtitle')}
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <Image 
                        src="/Rome-under.jpg" 
                        alt={t('declining_rome_title')}
                        width={400}
                        height={300}
                        className="w-96 h-72 object-cover rounded-xl border-4 border-red-400 shadow-xl"
                        style={{ objectPosition: 'center 30%' }}
                      />
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <div className="text-white/90 leading-relaxed space-y-6 text-justify">
                      <p>{t('declining_rome_content')}</p>
                      
                      <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4">
                        <h4 className="text-red-300 font-bold text-lg mb-2">
                          {t('declining_rome_mission')}
                        </h4>
                        <p>{t('declining_rome_mission_content')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-300 mb-3">
                      🏛️ {currentLang === 'DE' ? 'Historische Bedeutung' :
                            currentLang === 'EN' ? 'Historical Significance' :
                            'Significatio Historica'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {t('declining_rome_significance')}
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowRomeModal(false)}
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#722F37',
                        color: '#FFD700',
                      }}
                    >
                      {t('close_modal')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CSS Styles */}
        <style jsx global>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }

          @keyframes moveRightToLeft {
            0% { 
              transform: translateX(0);
              opacity: 0.3; 
            }
            25% { 
              opacity: 0.8;
            }
            50% { 
              opacity: 1;
            }
            75% { 
              opacity: 0.6;
            }
            100% { 
              transform: translateX(calc(-100vw - 20px));
              opacity: 0; 
            }
          }

          .shooting-star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(45deg, #fff, #00f);
            border-radius: 50%;
            animation: shootingStar 20s linear infinite;
          }

          @keyframes shootingStar {
            0% {
              transform: translateX(100vw) translateY(0);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              transform: translateX(-100px) translateY(50px);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}