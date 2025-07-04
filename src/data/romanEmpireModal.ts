/**
 * Das untergehende Römische Reich - Modal Content Data
 * Historical content for the Roman Empire's decline modal
 * ENHANCED: Complete 370-430 CE Historical Timeline Added
 */

export interface RomanEmpireModalData {
  title: string;
  subtitle: string;
  description: string;
  culturalContext: string;
  mission: {
    title: string;
    content: string;
  };
  significance: {
    title: string;
    content: string;
  };
  timeline: {
    title: string;
    events: Array<{
      year: string;
      event: string;
      description: string;
      category?: 'political' | 'cultural' | 'military' | 'religious';
    }>;
  };
}

export const romanEmpireModalData = {
  DE: {
    title: "Das untergehende Römische Reich",
    subtitle: "Kultureller Niedergang und die Mission der Gelehrten (370-430 n. Chr.)",
    description: "Die Zeit des Macrobius war geprägt vom dramatischen Niedergang des Weströmischen Reiches. Barbareneinfälle, politische Instabilität und wirtschaftlicher Kollaps bedrohten nicht nur die politische Ordnung, sondern auch das gesamte kulturelle Erbe der Antike. Bibliotheken wurden zerstört, Schulen geschlossen, und jahrhundertealtes Wissen drohte für immer verloren zu gehen.",
    culturalContext: "In dieser Krisenzeit erkannten Gelehrte wie Macrobius ihre historische Verantwortung: Sie mussten das kulturelle Erbe für kommende Generationen retten. Durch systematische Sammlung, Kommentierung und Übertragung der klassischen Texte schufen sie eine Art 'kulturelle Arche', die das Wissen der Antike über die dunklen Jahrhunderte hinweg bewahrte.",
    mission: {
      title: "Die Mission der Kulturbewahrer",
      content: "🏛️ In einer Zeit, als das Weströmische Reich zusammenbrach, Bibliotheken zerstört wurden und jahrhundertealtes Wissen zu verschwinden drohte, erkannten Gelehrte wie Macrobius ihre historische Mission: Sie mussten das kulturelle Erbe der Antike für die Nachwelt retten. Durch systematische Sammlung, Kommentierung und Übertragung der klassischen Texte schufen sie eine Art 'kulturelle Arche Noah', die das Wissen über die dunklen Jahrhunderte hinweg bewahrte."
    },
    significance: {
      title: "🏛️ Historische Bedeutung",
      content: "Macrobius' Antwort auf die Krise seiner Zeit - die Bewahrung der klassischen Kultur in seinen zwei Hauptwerken - wurde zum Modell für alle späteren Rettungsaktionen des kulturellen Erbes. Von den mittelalterlichen Mönchen bis zu modernen Digitalarchiven folgen Kulturbewahrer seinem Beispiel."
    },
    timeline: {
      title: "370–430 CE: Historischer Kontext des Macrobius",
      events: [
        {
          year: "c. 370–375 CE",
          event: "Hunnen beginnen ihre Westwanderung",
          description: "Druck auf gotische Stämme und Destabilisierung der Region.",
          category: "military"
        },
        {
          year: "376 CE",
          event: "Gotische Stämme überqueren die Donau",
          description: "Flucht vor den Hunnen und Ansiedlung als Foederati im römischen Gebiet. Spannungen entstehen.",
          category: "political"
        },
        {
          year: "378 CE",
          event: "Schlacht von Adrianople",
          description: "Oströmischer Kaiser Valens fällt durch die Westgoten. Katastrophale römische Niederlage, die die Schwächung der römischen Militärmacht zeigt.",
          category: "military"
        },
        {
          year: "380 CE",
          event: "Edikt von Thessaloniki",
          description: "Theodosius I. macht das nicänische Christentum zur Staatsreligion des Römischen Reiches.",
          category: "religious"
        },
        {
          year: "392–395 CE",
          event: "Tod des Theodosius I.",
          description: "Das Reich wird permanent zwischen seinen Söhnen Arcadius (Ost) und Honorius (West) geteilt.",
          category: "political"
        },
        {
          year: "c. 395–430 CE",
          event: "Macrobius verfasst seine Hauptwerke",
          description: "Saturnalia - gelehrter Dialog über römische Religion, Literatur und Philosophie. Commentarii in Somnium Scipionis - bewahrt und überträgt neoplatonische Kosmologie und lateinische philosophische Tradition.",
          category: "cultural"
        },
        {
          year: "410 CE",
          event: "Plünderung Roms durch Alarich",
          description: "Psychologischer Schlag für die römische Welt und zentrales Ereignis beim Fall des Weströmischen Reiches.",
          category: "military"
        },
        {
          year: "430 CE",
          event: "Tod des Heiligen Augustinus",
          description: "Während der Belagerung von Hippo Regius durch die Vandalen (Nordafrika).",
          category: "cultural"
        }
      ]
    }
  },
  EN: {
    title: "The Declining Roman Empire",
    subtitle: "Cultural Decline and the Mission of Scholars (370-430 CE)",
    description: "Macrobius lived during the dramatic decline of the Western Roman Empire. Barbarian invasions, political instability, and economic collapse threatened not only the political order but also the entire cultural heritage of antiquity. Libraries were destroyed, schools closed, and centuries-old knowledge threatened to be lost forever.",
    culturalContext: "In this time of crisis, scholars like Macrobius recognized their historic responsibility: they had to save the cultural heritage for future generations. Through systematic collection, commentary, and transmission of classical texts, they created a kind of 'cultural ark' that preserved ancient knowledge through the dark centuries.",
    mission: {
      title: "The Mission of Cultural Preservers",
      content: "🏛️ In a time when the Western Roman Empire was collapsing, libraries were being destroyed, and centuries-old knowledge threatened to disappear, scholars like Macrobius recognized their historic mission: they had to save the cultural heritage of antiquity for posterity. Through systematic collection, commentary, and transmission of classical texts, they created a kind of 'cultural Noah's ark' that preserved knowledge through the dark centuries."
    },
    significance: {
      title: "🏛️ Historical Significance",
      content: "Macrobius' response to the crisis of his time - the preservation of classical culture in his two major works - became the model for all later rescue operations of cultural heritage. From medieval monks to modern digital archives, cultural preservers follow his example."
    },
    timeline: {
      title: "370–430 CE: Historical Context of Macrobius",
      events: [
        {
          year: "c. 370–375 CE",
          event: "Huns begin their westward expansion",
          description: "Pressuring Gothic tribes and destabilizing the region.",
          category: "military"
        },
        {
          year: "376 CE",
          event: "Gothic tribes cross the Danube",
          description: "Fleeing the Huns, they are allowed to settle in Roman territory as foederati. Tensions rise.",
          category: "political"
        },
        {
          year: "378 CE",
          event: "Battle of Adrianople",
          description: "Eastern Roman Emperor Valens is killed by the Visigoths. A catastrophic Roman defeat, showing the weakening of Roman military power.",
          category: "military"
        },
        {
          year: "380 CE",
          event: "Edict of Thessalonica",
          description: "Theodosius I makes Nicene Christianity the state religion of the Roman Empire.",
          category: "religious"
        },
        {
          year: "392–395 CE",
          event: "Death of Theodosius I",
          description: "The empire is permanently divided between his sons Arcadius (East) and Honorius (West).",
          category: "political"
        },
        {
          year: "c. 395–430 CE",
          event: "Macrobius composes his major works",
          description: "Saturnalia - learned dialogue on Roman religion, literature, and philosophy. Commentary on the Dream of Scipio - preserves and transmits Neoplatonic cosmology and Latin philosophical tradition.",
          category: "cultural"
        },
        {
          year: "410 CE",
          event: "Sack of Rome by Alaric",
          description: "A psychological blow to the Roman world and a key event in the fall of the Western Empire.",
          category: "military"
        },
        {
          year: "430 CE",
          event: "Death of St. Augustine",
          description: "During the Vandal siege of Hippo Regius (North Africa).",
          category: "cultural"
        }
      ]
    }
  },
  LA: {
    title: "Imperium Romanum Cadens",
    subtitle: "Declinatio Culturalis et Missio Eruditorum (370-430 p. Chr. n.)",
    description: "Tempus Macrobii signatum erat dramatico casu Imperii Romani Occidentalis. Invasiones barbarorum, instabilitas politica, et collapsus oeconomicus non solum ordinem politicum, sed etiam totum hereditatem culturalem antiquitatis minabatur. Bibliothecae destructae sunt, scholae clausae, et scientia saeculorum periclitabatur ut in perpetuum periret.",
    culturalContext: "In hoc tempore crisis, eruditi sicut Macrobius suam responsabilitatem historicam agnoverunt: hereditatem culturalem pro generationibus futuris servare debebant. Per systematicam collectionem, commentationem, et transmissionem textuum classicorum, quandam 'arcam culturalem' creaverunt quae scientiam antiquam per saecula tenebrosa conservaret.",
    mission: {
      title: "Missio Conservatorum Culturae",
      content: "🏛️ Tempore quo Imperium Romanum Occidentale collabebatur, bibliothecae destruebantur, et scientia saeculorum periclitabatur ut dispareret, eruditi sicut Macrobius suam missionem historicam agnoverunt: hereditatem culturalem antiquitatis pro posteritate servare debebant. Per systematicam collectionem, commentationem, et transmissionem textuum classicorum, quandam 'arcam Noe culturalem' creaverunt quae scientiam per saecula tenebrosa conservaret."
    },
    significance: {
      title: "🏛️ Momentum Historicum",
      content: "Responsio Macrobii ad crisim sui temporis - conservatio culturae classicae in duobus operibus praecipuis - exemplar factum est omnium posteriorum actionum culturalis hereditatis. A monachis medievalibus ad archiva digitalia moderna, conservatores culturae exemplum eius sequuntur."
    },
    timeline: {
      title: "370–430 p. Chr. n.: Contextus Historicus Macrobii",
      events: [
        {
          year: "c. 370–375 p. Chr. n.",
          event: "Hunni expansionem occidentalem incipiunt",
          description: "Tribus Gothicas prementes et regionem destabilizantes.",
          category: "military"
        },
        {
          year: "376 p. Chr. n.",
          event: "Tribus Gothicae Danubium transeunt",
          description: "Hunos fugientes et ut foederati in territorio Romano considere permissi. Tensiones oriuntur.",
          category: "political"
        },
        {
          year: "378 p. Chr. n.",
          event: "Proelium Adrianopolitanum",
          description: "Imperator Romanus Orientalis Valens a Wisigothis occiditur. Clades Romana catastrophica, debilitationem potentiae militaris Romanae ostendens.",
          category: "military"
        },
        {
          year: "380 p. Chr. n.",
          event: "Edictum Thessalonicense",
          description: "Theodosius I Christianismum Nicaenum religionem civitatis Imperii Romani facit.",
          category: "religious"
        },
        {
          year: "392–395 p. Chr. n.",
          event: "Mors Theodosii I",
          description: "Imperium permanenter inter filios eius Arcadium (Oriens) et Honorium (Occidens) dividitur.",
          category: "political"
        },
        {
          year: "c. 395–430 p. Chr. n.",
          event: "Macrobius opera maiora componit",
          description: "Saturnalia - dialogus eruditus de religione, litteris, et philosophia Romana. Commentarii in Somnium Scipionis - cosmologiam Neoplatonicam et traditionem philosophicam Latinam conservat et transmittit.",
          category: "cultural"
        },
        {
          year: "410 p. Chr. n.",
          event: "Direptio Romae ab Alarico",
          description: "Ictus psychologicus mundo Romano et eventus centralis in casu Imperii Occidentalis.",
          category: "military"
        },
        {
          year: "430 p. Chr. n.",
          event: "Mors Sancti Augustini",
          description: "Durante obsidione Vandalorum Hipponis Regii (Africa Septentrionalis).",
          category: "cultural"
        }
      ]
    }
  }
};