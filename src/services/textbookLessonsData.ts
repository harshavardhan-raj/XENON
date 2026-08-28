export interface TextbookPageData {
  id: string;
  pageNumber: number;
  chapterTitle: string;
  topicBadge: string;
  zoneA: {
    language: string;
    title: string;
    subtitle?: string;
    storyParagraph?: string;
    dialogues?: { speaker: string; icon: string; text: string; highlightWord?: string }[];
    exercises?: {
      question: string;
      items: { label: string; icon: string; isCorrect?: boolean }[];
    }[];
    visualNote?: string;
  };
  zoneB: {
    language: string;
    title: string;
    subtitle?: string;
    storyParagraph?: string;
    dialogues?: { speaker: string; icon: string; text: string; highlightWord?: string }[];
    exercises?: {
      question: string;
      items: { label: string; icon: string; isCorrect?: boolean }[];
    }[];
    romanizedPronunciation: string;
    speakableText: string;
    visualNote?: string;
  };
}

export const CLASS1_MATH_CHAPTER1_PAGES: TextbookPageData[] = [
  // ==========================================
  // PAGE 1: INSIDE - OUTSIDE & THE ARAB AND HIS CAMEL
  // ==========================================
  {
    id: 'c1_mm_ch1_p1',
    pageNumber: 1,
    chapterTitle: 'Chapter 1: Shapes and Space (Math-Magic)',
    topicBadge: 'Inside - Outside (भितर - बाहरे)',
    zoneA: {
      language: 'Original English Textbook (Zone A)',
      title: 'Inside - Outside',
      subtitle: 'Story: The Arab and his Camel',
      storyParagraph: 'It was a cold winter day. The Arab was travelling on the Camel\'s back. At night, the Arab pitched his tent and went inside it. The Camel was outside.',
      dialogues: [
        { speaker: 'Camel', icon: '🐪', text: 'May I put my neck inside? It is too cold outside.', highlightWord: 'inside' },
        { speaker: 'Arab', icon: '👳', text: 'Okay! You may put your neck inside.', highlightWord: 'inside' },
        { speaker: 'Camel', icon: '🐪', text: 'May I put my front legs inside? It is too cold outside.', highlightWord: 'inside' },
        { speaker: 'Arab', icon: '👳', text: 'Okay! You may put your front legs inside.', highlightWord: 'inside' },
        { speaker: 'Camel', icon: '🐪', text: 'Can I come inside? It is too cold outside.', highlightWord: 'inside' },
        { speaker: 'Arab', icon: '👳', text: 'Oh! No the tent is too small for both of us.', highlightWord: 'too small' },
        { speaker: 'Camel', icon: '🐪', text: 'So I am coming inside and you go outside!', highlightWord: 'outside' }
      ],
      visualNote: '⛺ Tent in desert • 🐪 Camel inside tent • 👳 Arab shivering outside'
    },
    zoneB: {
      language: 'Verified Mundari Translation (Zone B)',
      title: 'भितर - बाहरे (𑴎𑴲𑴛𑴦 - 𑴢𑴱𑴬𑴦𑴳)',
      subtitle: 'कहानी: अरब होड़ो आर अयाः ऊँट',
      storyParagraph: 'रबाङ दिन रे मियाद अरब होड़ो अयाः ऊँट चेतान रे सेन-बारा तनाय ताएकेना। निदा रे अरब होड़ो अयाः तंबू तियाड़ केदा आर भितर बोलोयेना। ऊँट दो बाहरे रे ताएकेना।',
      dialogues: [
        { speaker: 'ऊँट', icon: '🐪', text: 'आइं अमः तंबू भितर हॉटोक (गर्दन) बोलो दायेया? बाहरे रे पुर सुबुन रबाङा।', highlightWord: 'भितर' },
        { speaker: 'अरब', icon: '👳', text: 'ठीक गेया! अम अमः हॉटोक तंबू भितर दोहो दायेयम।', highlightWord: 'भितर' },
        { speaker: 'ऊँट', icon: '🐪', text: 'आइं माड़ंग जाङ्गा भितर दोहो दायेया? बाहरे रे पुर रबाङा।', highlightWord: 'भितर' },
        { speaker: 'अरब', icon: '👳', text: 'ठीक गेया! अम अमः माड़ंग जाङ्गा भितर दोहो दायेयम।', highlightWord: 'भितर' },
        { speaker: 'ऊँट', icon: '🐪', text: 'आइं पूरा भितर हिजुः दायेया? बाहरे रे पुर रबाङा।', highlightWord: 'भितर' },
        { speaker: 'अरब', icon: '👳', text: 'ओहो! का! तंबू दो आलं बारोन लागित पुर हुरुन गेया।', highlightWord: 'हुरुन गेया' },
        { speaker: 'ऊँट', icon: '🐪', text: 'एनरेदो आइं भितरिं हिजुः तना, आर अम बाहरे सेनोः मे!', highlightWord: 'बाहरे' }
      ],
      romanizedPronunciation: 'Aing aamah tambu bhitar hotok bolo dayeya? Bahare re pura rabanga. Enredo aing bhitarin hijuh tana, aar am bahare senoh me!',
      speakableText: 'रबाङ दिन रे मियाद अरब होड़ो अयाः ऊँट चेतान रे सेन-बारा तनाय ताएकेना। ऊँट भितर बोलोयेना आर अरब बाहरे सेना।',
      visualNote: '🐪 ऊँट = भितर (Inside) • ⛺ तंबू = डेरा • 👳 अरब = बाहरे (Outside)'
    }
  },

  // ==========================================
  // PAGE 2: BIGGER - SMALLER & BIGGEST - SMALLEST
  // ==========================================
  {
    id: 'c1_mm_ch1_p2',
    pageNumber: 2,
    chapterTitle: 'Chapter 1: Shapes and Space (Math-Magic)',
    topicBadge: 'Bigger - Smaller (मराङ - हुरुन)',
    zoneA: {
      language: 'Original English Textbook (Zone A)',
      title: 'Bigger - Smaller & Biggest - Smallest',
      exercises: [
        {
          question: '1. Tick (✓) the bigger animal:',
          items: [
            { label: 'Hippopotamus (Bigger)', icon: '🦛', isCorrect: true },
            { label: 'Puppy (Smaller)', icon: '🐶', isCorrect: false }
          ]
        },
        {
          question: '2. Tick (✓) the smaller leaf:',
          items: [
            { label: 'Banana Leaf (Bigger)', icon: '🍃', isCorrect: false },
            { label: 'Small Leaf (Smaller)', icon: '🌿', isCorrect: true }
          ]
        },
        {
          question: '3. Tick (✓) the smallest tree:',
          items: [
            { label: 'Small Tree', icon: '🌳', isCorrect: true },
            { label: 'Big Tree', icon: '🌳', isCorrect: false },
            { label: 'Medium Tree', icon: '🌳', isCorrect: false }
          ]
        },
        {
          question: '4. Biggest animal & Smallest fruit:',
          items: [
            { label: 'Elephant (Biggest Animal)', icon: '🐘', isCorrect: true },
            { label: 'Cherry (Smallest Fruit)', icon: '🍒', isCorrect: true }
          ]
        }
      ],
      visualNote: '🦛 Hippo is Bigger • 🌿 Small Leaf is Smaller • 🐘 Elephant is Biggest • 🍒 Cherry is Smallest'
    },
    zoneB: {
      language: 'Verified Mundari Translation (Zone B)',
      title: 'मराङ - हुरुन आर सबते मराङ - सबते हुरुन',
      exercises: [
        {
          question: '1. मराङ (Bigger) जीव रे टिक (✓) चिनहा लगावे मे:',
          items: [
            { label: 'दरियाई घोड़ा (मराङ)', icon: '🦛', isCorrect: true },
            { label: 'सेता होन (हुरुन)', icon: '🐶', isCorrect: false }
          ]
        },
        {
          question: '2. हुरुन (Smaller) साकम रे टिक (✓) लगावे मे:',
          items: [
            { label: 'मराङ साकम (पत्ता)', icon: '🍃', isCorrect: false },
            { label: 'हुरुन साकम (हुरुन)', icon: '🌿', isCorrect: true }
          ]
        },
        {
          question: '3. सबते हुरुन दारू (Smallest Tree) रे टिक लगावे मे:',
          items: [
            { label: 'हुरुन दारू (Smallest)', icon: '🌳', isCorrect: true },
            { label: 'मराङ दारू', icon: '🌳', isCorrect: false },
            { label: 'मांझी दारू', icon: '🌳', isCorrect: false }
          ]
        },
        {
          question: '4. सबते मराङ जीव आर सबते हुरुन जोः:',
          items: [
            { label: 'हाथी = सबते मराङ जीव', icon: '🐘', isCorrect: true },
            { label: 'चेरी = सबते हुरुन जोः', icon: '🍒', isCorrect: true }
          ]
        }
      ],
      romanizedPronunciation: 'Marang jontu re tick lagawe me. Sobte hurun daru re tick lagawe. Hathi do sobte marang jontu tana.',
      speakableText: 'मराङ जीव दरियाई घोड़ा गेया। सबते हुरुन दारू रे टिक लगावे मे। हाथी सबते मराङ जीव गेया।',
      visualNote: 'मराङ = बड़ा, हुरुन = छोटा, सबते मराङ = सबसे बड़ा, सबते हुरुन = सबसे छोटा।'
    }
  },

  // ==========================================
  // PAGE 3: TOP - BOTTOM & NEARER - FARTHER
  // ==========================================
  {
    id: 'c1_mm_ch1_p3',
    pageNumber: 3,
    chapterTitle: 'Chapter 1: Shapes and Space (Math-Magic)',
    topicBadge: 'Top - Bottom & Nearer - Farther',
    zoneA: {
      language: 'Original English Textbook (Zone A)',
      title: 'Top - Bottom & Nearer - Farther',
      exercises: [
        {
          question: '1. Top - Bottom (Slide & Stacked Pots):',
          items: [
            { label: 'Pot on the Top (Top)', icon: '🏺', isCorrect: true },
            { label: 'Animal at the bottom of stairs', icon: '🐶', isCorrect: true }
          ]
        },
        {
          question: '2. Nearer - Farther (House & Tree):',
          items: [
            { label: 'Bird nearer to house', icon: '🐦', isCorrect: true },
            { label: 'Cat farther from tree', icon: '🐱', isCorrect: true }
          ]
        }
      ],
      visualNote: 'Boy at top of slide • Bird near house • Cat far from tree'
    },
    zoneB: {
      language: 'Verified Mundari Translation (Zone B)',
      title: 'चेतान - लताड़ आर जपाः - संगीन',
      exercises: [
        {
          question: '1. चेतान - लताड़ (Top - Bottom):',
          items: [
            { label: 'सबते चेतान रेयाः चटु (घड़ा)', icon: '🏺', isCorrect: true },
            { label: 'सिढ़ी लताड़ रेयाः सेता होन', icon: '🐶', isCorrect: true }
          ]
        },
        {
          question: '2. जपाः - संगीन (Nearer - Farther):',
          items: [
            { label: 'ओड़ाः जपाः रेयाः चेणे (Near Bird)', icon: '🐦', isCorrect: true },
            { label: 'दारू खोन संगीन पुसी (Far Cat)', icon: '🐱', isCorrect: true }
          ]
        }
      ],
      romanizedPronunciation: 'Sobte chetan reyah chatu re tick lagawe. Orah japah reyah chene do nere geya.',
      speakableText: 'सबते चेतान रेयाः चटु रे टिक लगावे मे। ओड़ाः जपाः रेयाः चेणे जपाः गेया।',
      visualNote: 'चेतान = ऊपर, लताड़ = नीचे, जपाः = पास, संगीन = दूर।'
    }
  },

  // ==========================================
  // PAGE 4: ON - UNDER & ROLLING - SLIDING
  // ==========================================
  {
    id: 'c1_mm_ch1_p4',
    pageNumber: 4,
    chapterTitle: 'Chapter 1: Shapes and Space (Math-Magic)',
    topicBadge: 'On - Under & Rolling - Sliding',
    zoneA: {
      language: 'Original English Textbook (Zone A)',
      title: 'On - Under, Above - Below & Rolling - Sliding',
      exercises: [
        {
          question: '1. Classroom Table Scene (On vs Under):',
          items: [
            { label: 'Cat ON the table', icon: '🐱', isCorrect: true },
            { label: 'Rat UNDER the table', icon: '🐭', isCorrect: false },
            { label: 'Fan ABOVE the table', icon: '🌀', isCorrect: true }
          ]
        },
        {
          question: '2. Rolling vs Sliding objects:',
          items: [
            { label: 'Rolling: Ball, Pencil, Onion', icon: '⚽', isCorrect: true },
            { label: 'Sliding: Box, Suitcase, Battery', icon: '📦', isCorrect: true }
          ]
        }
      ],
      visualNote: 'Ball rolls down slide • Box slides down slide'
    },
    zoneB: {
      language: 'Verified Mundari Translation (Zone B)',
      title: 'चेतान - लताड़ आर गुदरांव - घिसड़ांव',
      exercises: [
        {
          question: '1. मेज चेतान आर लताड़ रे (On vs Under):',
          items: [
            { label: 'पुसी = मेज चेतान रे (On Table)', icon: '🐱', isCorrect: true },
            { label: 'चेंदू = मेज लताड़ रे (Under Table)', icon: '🐭', isCorrect: false },
            { label: 'पंखा = मेज चेतान (Above Table)', icon: '🌀', isCorrect: true }
          ]
        },
        {
          question: '2. गुदरांव आर घिसड़ांव जिनिस को:',
          items: [
            { label: 'गुदरांव जिनिस: बॉल, पेंसिल, प्याज', icon: '⚽', isCorrect: true },
            { label: 'घिसड़ांव जिनिस: बाक्सा, सूटकेस, बैटरी', icon: '📦', isCorrect: true }
          ]
        }
      ],
      romanizedPronunciation: 'Mej chetan re pusi menaya. Mej latar re chendu menaya. Ball do gudrang-gudrang senowa.',
      speakableText: 'मेज चेतान रे पुसी मेनाया। मेज लताड़ रे चेंदू मेनाया। बॉल दो गुदरांव-गुदरांव सेनोःआ।',
      visualNote: 'गुदरांव = लुढ़कना (Roll), घिसड़ांव = फिसलना (Slide)।'
    }
  },

  // ==========================================
  // PAGE 5: WISE GRANDMOTHER & GEOMETRIC SHAPES
  // ==========================================
  {
    id: 'c1_mm_ch1_p5',
    pageNumber: 5,
    chapterTitle: 'Chapter 1: Shapes and Space (Math-Magic)',
    topicBadge: 'Story: Wise Grandmother & Shapes',
    zoneA: {
      language: 'Original English Textbook (Zone A)',
      title: 'Story: The Wise Grandmother & Shapes Kit',
      storyParagraph: 'A Lamb went to meet his grandmother. A wolf tried to eat him. The wise grandmother hid him in a dholak. The dholak rolled down the road and the lamb reached home safely!',
      exercises: [
        {
          question: 'Geometric Shapes & Color Matching:',
          items: [
            { label: 'Triangle ▲ -> Green', icon: '▲', isCorrect: true },
            { label: 'Circle ● -> Red & Pink', icon: '●', isCorrect: true },
            { label: 'Rectangle ■ -> Blue & Yellow', icon: '■', isCorrect: true }
          ]
        },
        {
          question: 'Shape Kit Figures:',
          items: [
            { label: 'Butterfly (Triangles & Circles)', icon: '🦋', isCorrect: true },
            { label: 'Fish (Circle & Triangles)', icon: '🐟', isCorrect: true }
          ]
        }
      ],
      visualNote: '🥁 Dholak rolling home • 🦋 Shape Kit Butterfly • 🐟 Shape Kit Fish'
    },
    zoneB: {
      language: 'Verified Mundari Translation (Zone B)',
      title: 'कहानी: सयान बुढ़ी आर आकार को (Shapes Kit)',
      storyParagraph: 'मियाद मेंढ़ा होन अयाः बुढ़ी नेल बीर ते सेना। हुंडर जोमे काजी किया। सयान बुढ़ी ढोलक भितर उकुन काजी किया। ढोलक गुदरांव-गुदरांव सेना आर मेंढ़ा होन सुरक्षित ओड़ाः बोलोयेना!',
      exercises: [
        {
          question: 'आकार को आर रंग (Shapes & Colors):',
          items: [
            { label: 'तिकोन ▲ -> हरियर रंग (Green)', icon: '▲', isCorrect: true },
            { label: 'गोल ● -> आराः आर गुलाबी (Red)', icon: '●', isCorrect: true },
            { label: 'चौकोन ■ -> लिल आर ससांग (Blue/Yellow)', icon: '■', isCorrect: true }
          ]
        },
        {
          question: 'आकार किट ते मूरत बाई मे:',
          items: [
            { label: 'फुतुकड़ी (तितली) = तिकोन आर गोल', icon: '🦋', isCorrect: true },
            { label: 'हाकु (मछली) = गोल आर तिकोन', icon: '🐟', isCorrect: true }
          ]
        }
      ],
      romanizedPronunciation: 'Mendha hon budhi nel kena. Sayan budhi dholak bhitar ukun kazi kiya. Tikon, gol, chaukon aakar te murat bai me.',
      speakableText: 'सयान बुढ़ी मेंढ़ा होन के ढोलक भितर उकुन काजी किया। तिकोन, गोल आर चौकोन ते फुतुकड़ी आर हाकु बाई मे।',
      visualNote: 'तिकोन = त्रिभुज, गोल = वृत्त, चौकोन = वर्ग/आयत, फुतुकड़ी = तितली, हाकु = मछली।'
    }
  }
];
