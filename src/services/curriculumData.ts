export interface ChapterItem {
  id: string;
  chapterNumber: number;
  title: string;
  hindiTitle?: string;
  description: string;
  vernacularConcepts: {
    santhali: string;
    mundari: string;
    romanized: string;
  };
  totalPages: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

export interface SubjectBook {
  id: string;
  title: string;
  codeName: string;
  category: 'Mathematics' | 'English' | 'English Reader' | 'EVS';
  description: string;
  coverColor: string;
  accentColor: string;
  iconName: string;
  chapters: ChapterItem[];
}

export interface ClassCurriculum {
  grade: number;
  className: string;
  stateBoard: string;
  description: string;
  subjects: SubjectBook[];
}

export const JHARKHAND_STATE_CURRICULUM: ClassCurriculum[] = [
  // ==========================================
  // CLASS 1
  // ==========================================
  {
    grade: 1,
    className: 'Class 1 (Grade 1)',
    stateBoard: 'JCERT • Jharkhand Academic Council',
    description: 'Foundational stage bilingual curriculum focusing on phonetics, numbers, shapes, and everyday vocabulary.',
    subjects: [
      {
        id: 'c1_raindrops',
        title: 'Raindrops (English Reader)',
        codeName: 'RD-01',
        category: 'English Reader',
        description: 'Primary reader textbook featuring rhymes, actions, animals, fruits, and interactive songs with vernacular bridges.',
        coverColor: 'from-sky-700 to-blue-900',
        accentColor: 'text-sky-600',
        iconName: 'Droplets',
        chapters: [
          {
            id: 'c1_rd_01',
            chapterNumber: 1,
            title: 'Clap, Clap, Clap',
            hindiTitle: 'ताली बजाओ (Clap Hands)',
            description: 'Action rhyme introducing body coordination, clapping, and rhythm for early learners.',
            vernacularConcepts: { santhali: 'ᱛᱷᱟᱹᱭᱟᱹ ᱛᱷᱟᱹᱭᱟᱹ (थायो थायो)', mundari: 'थापो मे (Thapo me)', romanized: 'Thayo / Thapo' },
            totalPages: 4,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_02',
            chapterNumber: 2,
            title: 'One, Two',
            hindiTitle: 'एक, दो (Counting Rhyme)',
            description: 'Introductory number counting and simple phonetic pairings.',
            vernacularConcepts: { santhali: 'ᱢᱤᱫ, ᱵᱟᱨ (मिद, बार)', mundari: 'मियाद, बारिया (Miyad, Bariya)', romanized: 'Mid, Bar / Miyad, Bariya' },
            totalPages: 4,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_03',
            chapterNumber: 3,
            title: 'The Little Bird',
            hindiTitle: 'छोटी चिड़िया (Small Bird)',
            description: 'Observing birds in nature, flying movements, and local wildlife.',
            vernacularConcepts: { santhali: 'ᱦᱩᱰᱤᱧ ᱪᱮᱬᱮ (हुडिंग चेंगे)', mundari: 'हुडिंग चेणे (Huding Chene)', romanized: 'Hudinj Chene' },
            totalPages: 6,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_04',
            chapterNumber: 4,
            title: 'Bubbles',
            hindiTitle: 'बुलबुले (Soap Bubbles)',
            description: 'Water and air concept through colorful soap bubbles exploration.',
            vernacularConcepts: { santhali: 'ᱫᱟᱜ ᱯᱷᱚᱠᱟ (दाग फोका)', mundari: 'दाः फोतका (Daah Photka)', romanized: 'Daag Phoka / Daah Photka' },
            totalPages: 5,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_05',
            chapterNumber: 5,
            title: 'Chhotu',
            hindiTitle: 'छोटू (The Little Mouse)',
            description: 'A story about a curious small mouse and household animals.',
            vernacularConcepts: { santhali: 'ᱦᱩᱰᱤᱧ ᱜᱩᱛᱩ (हुडिंग गुतु)', mundari: 'हुरुन चेंदू (Hurun Chendu)', romanized: 'Hudinj Gutu' },
            totalPages: 6,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_06',
            chapterNumber: 6,
            title: 'Animals And Birds',
            hindiTitle: 'जानवर और पक्षी (Fauna)',
            description: 'Identifying domestic and forest animals, cows, birds, and sounds.',
            vernacularConcepts: { santhali: 'ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨ ᱪᱮᱬᱮ (जियाली आर चेंगे)', mundari: 'जीव-जंतु (Jiv-Jantu)', romanized: 'Jiyali ar Chene' },
            totalPages: 8,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_07',
            chapterNumber: 7,
            title: 'Fruits And Vegetables',
            hindiTitle: 'फल और सब्जियां (Food & Plants)',
            description: 'Healthy seasonal fruits like mangoes, guavas, and edible leaves.',
            vernacularConcepts: { santhali: 'ᱡᱚ ᱟᱨ ᱟᱲᱟᱜ (जो आर आड़ाग)', mundari: 'जोः आर आड़ाः (Joh ar Aadah)', romanized: 'Jo ar Arang / Joh ar Aadah' },
            totalPages: 6,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_08',
            chapterNumber: 8,
            title: 'Who Am I',
            hindiTitle: 'मैं कौन हूँ? (Self Identity)',
            description: 'Self-awareness, personal names, family relations, and expressing identity.',
            vernacularConcepts: { santhali: 'ᱤᱧ ᱫᱚ ᱚᱠᱚᱭ? (इञ दो ओकोय?)', mundari: 'आइं दो ओकोय? (Aing do okoy?)', romanized: 'Inj do okoy?' },
            totalPages: 5,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_09',
            chapterNumber: 9,
            title: 'Hide and Seek',
            hindiTitle: 'लुका-छिपी (Classroom Play)',
            description: 'Spatial awareness, behind, under, inside, and classroom games.',
            vernacularConcepts: { santhali: 'ᱩᱠᱩ ᱮᱱᱮᱡ (उकु एनेज)', mundari: 'उकु एने (Uku Ene)', romanized: 'Uku Enej' },
            totalPages: 5,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_10',
            chapterNumber: 10,
            title: 'Fun with Numbers',
            hindiTitle: 'संख्याओं का खेल (Counting Fun)',
            description: 'Counting up to ten using pebbles, fingers, and vernacular chants.',
            vernacularConcepts: { santhali: 'ᱞᱮᱠᱷᱟ ᱮᱱᱮᱡ (लेखा एनेज)', mundari: 'लेखा एने (Lekha Ene)', romanized: 'Lekha Enej' },
            totalPages: 6,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_11',
            chapterNumber: 11,
            title: 'Shapes',
            hindiTitle: 'आकृतियाँ (Circles, Squares, Triangles)',
            description: 'Recognizing geometric shapes in sun, plates, hut roofs, and wheels.',
            vernacularConcepts: { santhali: 'ᱜᱚᱲᱦᱚᱱ (गड़होन)', mundari: 'रूप-आकार (Roop-Aakar)', romanized: 'Gorhon' },
            totalPages: 6,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_12',
            chapterNumber: 12,
            title: 'Cats',
            hindiTitle: 'बिल्ली (Pets)',
            description: 'A charming poem about cats sleeping in unusual warm places.',
            vernacularConcepts: { santhali: 'ᱯᱩᱥᱤ (पुसी)', mundari: 'पुसी (Pusi)', romanized: 'Pusi' },
            totalPages: 4,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_13',
            chapterNumber: 13,
            title: 'Colours',
            hindiTitle: 'रंग (Colors of Nature)',
            description: 'Green leaves, red flowers, yellow sun, blue river water.',
            vernacularConcepts: { santhali: 'ᱨᱚᱝ (रोंग)', mundari: 'रंग (Rang)', romanized: 'Rong / Rang' },
            totalPages: 6,
            difficulty: 'Easy'
          },
          {
            id: 'c1_rd_14',
            chapterNumber: 14,
            title: 'Actions We Do',
            hindiTitle: 'हमारे कार्य (Walking, Running, Reading)',
            description: 'Action verbs: jump, sit, stand, smile, read, write.',
            vernacularConcepts: { santhali: 'ᱠᱟᱹᱢᱤ ᱠᱚ (कामी को)', mundari: 'कामी को (Kami ko)', romanized: 'Kami ko' },
            totalPages: 5,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_15',
            chapterNumber: 15,
            title: 'Left And Right',
            hindiTitle: 'बायां और दायां (Directions)',
            description: 'Directional understanding of hands, classroom seating, and road awareness.',
            vernacularConcepts: { santhali: 'ᱞᱮᱸᱜᱟ ᱟᱨ ᱡᱚᱡᱚᱢ (लेंगा आर जोजोम)', mundari: 'लेंगा आर जोजोम (Lenga ar Jojom)', romanized: 'Lenga ar Jojom' },
            totalPages: 4,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_16',
            chapterNumber: 16,
            title: 'The Lion And the Mouse',
            hindiTitle: 'शेर और चूहा (Classic Moral Tale)',
            description: 'A story demonstrating that small friends can provide great help.',
            vernacularConcepts: { santhali: 'ᱛᱟᱹᱨᱩᱵ ᱟᱨ ᱜᱩᱛᱩ (तारुब आर गुतु)', mundari: 'कुला आर चेंदू (Kula ar Chendu)', romanized: 'Tarub ar Gutu / Kula ar Chendu' },
            totalPages: 8,
            difficulty: 'Advanced'
          },
          {
            id: 'c1_rd_17',
            chapterNumber: 17,
            title: 'Morning And Evening',
            hindiTitle: 'सुबह और शाम (Daily Routine)',
            description: 'Sunrise, waking up, school time, sunset, and family evening gather.',
            vernacularConcepts: { santhali: 'ᱥᱮᱛᱟᱜ ᱟᱨ ᱟᱹᱭᱩᱵ (सेताग आर आयुब)', mundari: 'सेताः आर अयुब (Setaah ar Ayub)', romanized: 'Setag ar Ayub' },
            totalPages: 6,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_18',
            chapterNumber: 18,
            title: 'May I Come In',
            hindiTitle: 'क्या मैं अंदर आ सकता हूँ? (Polite Classroom Expressions)',
            description: 'Classroom manners, greeting teachers, asking permission politely.',
            vernacularConcepts: { santhali: 'ᱤᱧ ᱵᱷᱤᱛᱨᱤᱧ ᱵᱚᱞᱚ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ? (इञ भित्रीञ बोलो दाड़ेयाग-आ?)', mundari: 'आइं भितर बोलो दायेया? (Aing bhitar bolo dayeya?)', romanized: 'Inj bhitrinj bolo dareyag-a?' },
            totalPages: 5,
            difficulty: 'Medium'
          },
          {
            id: 'c1_rd_19',
            chapterNumber: 19,
            title: 'Action Song',
            hindiTitle: 'अभिनय गीत (Action Song & Dance)',
            description: 'Joyful collective dance and singing integrating all acquired vocabulary.',
            vernacularConcepts: { santhali: 'ᱮᱱᱮᱡ ᱥᱮᱨᱮᱧ (एनेज सेरेंगे)', mundari: 'दुरंग-सुसुन (Durang-Susun)', romanized: 'Enej Serenj' },
            totalPages: 6,
            difficulty: 'Easy'
          }
        ]
      },
      {
        id: 'c1_math_magic',
        title: 'Math-Magic (Mathematics)',
        codeName: 'MM-01',
        category: 'Mathematics',
        description: 'Foundational numeracy, shape classification, early addition, and measurement.',
        coverColor: 'from-amber-700 to-orange-900',
        accentColor: 'text-amber-600',
        iconName: 'Binary',
        chapters: [
          { id: 'c1_mm_01', chapterNumber: 1, title: 'Shapes and Space', hindiTitle: 'आकृतियाँ और स्थान', description: 'Inside/outside, bigger/smaller, top/bottom concepts.', vernacularConcepts: { santhali: 'ᱜᱚᱲᱦᱚᱱ ᱟᱨ ᱡᱟᱭᱜᱟ (गड़होन आर जायगा)', mundari: 'आकार आर ठाई (Aakar ar Thai)', romanized: 'Gorhon ar Jayga' }, totalPages: 12, difficulty: 'Easy' },
          { id: 'c1_mm_02', chapterNumber: 2, title: 'Numbers from One to Nine', hindiTitle: 'एक से नौ तक की संख्याएँ', description: 'Counting and writing numbers 1 to 9 with visual sets.', vernacularConcepts: { santhali: 'ᱢᱤᱫ ᱠᱷᱚᱱ ᱟᱨᱮ ᱫᱷᱟᱹᱵᱤᱡ (मिद खोन आरे धाबिज)', mundari: 'मियाद ते अया (Miyad te Aya)', romanized: 'Mid khon are dhabij' }, totalPages: 14, difficulty: 'Easy' },
          { id: 'c1_mm_03', chapterNumber: 3, title: 'Addition (1 to 9)', hindiTitle: 'जोड़ (Addition)', description: 'Putting objects together using leaves, pebbles, and beads.', vernacularConcepts: { santhali: 'ᱢᱮᱥᱟ (मेसा)', mundari: 'मेसा (Mesa)', romanized: 'Mesa' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c1_mm_04', chapterNumber: 4, title: 'Subtraction (1 to 9)', hindiTitle: 'घटाव (Subtraction)', description: 'Taking away objects from a collection.', vernacularConcepts: { santhali: 'ᱠᱚᱢ / ᱵᱷᱮᱜᱟᱨ (कोम / भेगार)', mundari: 'घटाव (Ghatao)', romanized: 'Kom / Bhegar' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c1_mm_05', chapterNumber: 5, title: 'Numbers from Ten to Twenty', hindiTitle: 'दस से बीस तक की संख्याएँ', description: 'Tens and ones grouping with bundles of sticks.', vernacularConcepts: { santhali: 'ᱜᱮᱞ ᱠᱷᱚᱱ ᱤᱥᱤ (गेल खोन इसि)', mundari: 'गेल ते हिसी (Gel te Hisi)', romanized: 'Gel khon Isi' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c1_mm_06', chapterNumber: 6, title: 'Time and Daily Routine', hindiTitle: 'समय (Daily Routine)', description: 'Morning, afternoon, evening activities and sequential events.', vernacularConcepts: { santhali: 'ᱚᱠᱛᱚ (ओकतो)', mundari: 'दिपिलंग (Dipilang)', romanized: 'Okto / Dipilang' }, totalPages: 8, difficulty: 'Easy' },
          { id: 'c1_mm_07', chapterNumber: 7, title: 'Measurement (Longer & Shorter)', hindiTitle: 'माप (लंबा और छोटा)', description: 'Comparing lengths using hand-spans, strides, and rods.', vernacularConcepts: { santhali: 'ᱡᱤᱞᱤᱧ ᱟᱨ ᱠᱷᱟᱴᱚ (जिलिंग आर खाटो)', mundari: 'जिलिंग आर खाटो (Jiling ar Khato)', romanized: 'Jilinj ar Khato' }, totalPages: 8, difficulty: 'Medium' },
          { id: 'c1_mm_08', chapterNumber: 8, title: 'Numbers from 21 to 50', hindiTitle: 'इक्कीस से पचास तक की संख्याएँ', description: 'Groupings of tens and single units.', vernacularConcepts: { santhali: 'ᱤᱥᱤ ᱢᱤᱫ ᱠᱷᱚᱱ ᱢᱚᱬᱮ ᱜᱮᱞ (इसि मिद खोन मोणे गेल)', mundari: 'हिसी मियाद ते मोणे गेल (Hisi miyad te Mone gel)', romanized: 'Isi mid khon Mone gel' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c1_mm_09', chapterNumber: 9, title: 'Data Handling (Counting Objects)', hindiTitle: 'आँकड़ों का चित्र (Data Handling)', description: 'Organizing and counting distinct animals and toys in pictures.', vernacularConcepts: { santhali: 'ᱞᱮᱠᱷᱟ ᱪᱤᱛᱟᱹᱨ (लेखा चितार)', mundari: 'लेखा चित्र (Lekha Chitra)', romanized: 'Lekha Chitar' }, totalPages: 6, difficulty: 'Easy' },
          { id: 'c1_mm_10', chapterNumber: 10, title: 'Patterns', hindiTitle: 'पैटर्न (Patterns in Nature)', description: 'Color, shape, and block alternating sequences.', vernacularConcepts: { santhali: 'ᱜᱚᱲᱦᱚᱱ ᱪᱤᱱᱦᱟᱹ (गड़होन चिन्ह)', mundari: 'सजवाट (Sajwat)', romanized: 'Gorhon Chinha' }, totalPages: 8, difficulty: 'Easy' }
        ]
      },
      {
        id: 'c1_marigold',
        title: 'Marigold (English)',
        codeName: 'MG-01',
        category: 'English',
        description: 'Story and poetry book introducing simple English sentences with pictorial storytelling.',
        coverColor: 'from-emerald-700 to-teal-900',
        accentColor: 'text-emerald-600',
        iconName: 'BookOpen',
        chapters: [
          { id: 'c1_mg_01', chapterNumber: 1, title: 'A Happy Child & Three Little Pigs', hindiTitle: 'एक खुशहाल बच्चा और तीन छोटे सूअर', description: 'Family home, playing under green tree, brick houses.', vernacularConcepts: { santhali: 'ᱨᱟᱹᱥᱠᱟᱹ ᱜᱤᱫᱽᱨᱟᱹ (रास्का गिदरा)', mundari: 'रस्का होन (Raska Hon)', romanized: 'Raska Gidra' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c1_mg_02', chapterNumber: 2, title: 'After a Bath & The Bubble, the Straw and the Shoe', hindiTitle: 'नहाने के बाद और तीन दोस्त', description: 'Hygiene, drying hands, friendship adventure.', vernacularConcepts: { santhali: 'ᱩᱢᱩᱜ (उमुग)', mundari: 'रेयाड़ दाः उमु (Reyad daah umu)', romanized: 'Umug' }, totalPages: 8, difficulty: 'Easy' },
          { id: 'c1_mg_03', chapterNumber: 3, title: 'One Little Kitten & Lalu and Peelu', hindiTitle: 'एक छोटा बिलाव और लालू-पीलू', description: 'Animal numbers and yellow mango vs red chilly story.', vernacularConcepts: { santhali: 'ᱢᱤᱫᱴᱟᱝ ᱯᱩᱥᱤ (मिदटांग पुसी)', mundari: 'मियाद पुसी (Miyad Pusi)', romanized: 'Midtang Pusi' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c1_mg_04', chapterNumber: 4, title: 'Once I Saw a Little Bird & Mittu and the Yellow Mango', hindiTitle: 'मैंने देखी छोटी चिड़िया और मिट्ठू तोता', description: 'Parrots, yellow mango in tree, clever crows.', vernacularConcepts: { santhali: 'ᱢᱤᱨᱩ ᱪᱮᱬᱮ (मिरु चेंगे)', mundari: 'मिठू चेणे (Mithu Chene)', romanized: 'Miru Chene' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c1_mg_05', chapterNumber: 5, title: 'Merry-Go-Round & Circle', hindiTitle: 'गोल झूला और गोलाकार', description: 'Fair rides, drawing shapes with grandmother.', vernacularConcepts: { santhali: 'ᱜᱩᱞᱟᱹᱭ (गुलाय)', mundari: 'गोल (Gol)', romanized: 'Gulay' }, totalPages: 8, difficulty: 'Easy' }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 2
  // ==========================================
  {
    grade: 2,
    className: 'Class 2 (Grade 2)',
    stateBoard: 'JCERT • Jharkhand Academic Council',
    description: 'Expanding vocabulary, two-digit arithmetic, money, weights, and environmental readers.',
    subjects: [
      {
        id: 'c2_math_magic',
        title: 'Math-Magic (Mathematics)',
        codeName: 'MM-02',
        category: 'Mathematics',
        description: '2-digit place values, addition with carrying, currency coins, and weight estimation.',
        coverColor: 'from-amber-700 to-orange-900',
        accentColor: 'text-amber-600',
        iconName: 'Binary',
        chapters: [
          { id: 'c2_mm_01', chapterNumber: 1, title: 'What is Long, What is Round?', hindiTitle: 'क्या है लंबा, क्या है गोल?', description: 'Roll and slide properties of spherical and cylindrical objects.', vernacularConcepts: { santhali: 'ᱡᱤᱞᱤᱧ ᱟᱨ ᱜᱩᱞᱟᱹᱭ (जिलिंग आर गुलाय)', mundari: 'जिलिंग आर गोल (Jiling ar Gol)', romanized: 'Jilinj ar Gulay' }, totalPages: 8, difficulty: 'Easy' },
          { id: 'c2_mm_02', chapterNumber: 2, title: 'Counting in Groups', hindiTitle: 'समूहों में गिनना (Counting in Pairs & Tens)', description: 'Pair counting, estimation, and grouped sets.', vernacularConcepts: { santhali: 'ᱜᱩᱴ ᱨᱮ ᱞᱮᱠᱷᱟ (गुट रे लेखा)', mundari: 'गुट रे लेखा (Gut re lekha)', romanized: 'Gut re lekha' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c2_mm_03', chapterNumber: 3, title: 'How Much Can You Carry?', hindiTitle: 'तुम कितना वजन उठा सकते हो?', description: 'Heavy and light comparisons and simple balance scales.', vernacularConcepts: { santhali: 'ᱦᱟᱢᱟᱞ ᱟᱨ ᱨᱟᱣᱟᱞ (हामाल आर रावाल)', mundari: 'हाबल आर रावल (Hambal ar Rawal)', romanized: 'Hamal ar Rawal' }, totalPages: 8, difficulty: 'Easy' },
          { id: 'c2_mm_04', chapterNumber: 4, title: 'Counting in Tens', hindiTitle: 'दहाई में गिनना', description: 'Concept of bundles of 10s and leftover loose sticks.', vernacularConcepts: { santhali: 'ᱜᱮᱞ ᱠᱟᱛᱮ ᱞᱮᱠᱷᱟ (गेल काते लेखा)', mundari: 'गेल-गेल लेखा (Gel-gel lekha)', romanized: 'Gel kate lekha' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c2_mm_05', chapterNumber: 5, title: 'Footprints and Shapes', hindiTitle: 'पैरों के निशान (Animal Footprints)', description: 'Tracing outlines of leaves, cups, and animal feet.', vernacularConcepts: { santhali: 'ᱡᱟᱝᱜᱟ ᱪᱤᱱᱦᱟᱹ (जांगा चिन्ह)', mundari: 'जांगा चिनहा (Janga chinha)', romanized: 'Janga Chinha' }, totalPages: 8, difficulty: 'Easy' }
        ]
      },
      {
        id: 'c2_marigold',
        title: 'Marigold (English)',
        codeName: 'MG-02',
        category: 'English',
        description: 'Level 2 English literature covering friendly animal stories, poems, and short dialogues.',
        coverColor: 'from-emerald-700 to-teal-900',
        accentColor: 'text-emerald-600',
        iconName: 'BookOpen',
        chapters: [
          { id: 'c2_mg_01', chapterNumber: 1, title: 'First Day at School & Haldi’s Adventure', hindiTitle: 'स्कूल का पहला दिन और हल्दी की सैर', description: 'Meeting friendly giraffes, carrying school bags with joy.', vernacularConcepts: { santhali: 'ᱤᱥᱠᱩᱞ ᱨᱮᱭᱟᱜ ᱯᱩᱭᱞᱩ ᱢᱟᱦᱟᱸ (इस्कुल रेयाग पुयलु माहां)', mundari: 'इस्कुल रेयाः पइला दिन (Iskul reyah pahila din)', romanized: 'Iskul reyag Puylu Maha' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c2_mg_02', chapterNumber: 2, title: 'I am Lucky! & I Want', hindiTitle: 'मैं भाग्यशाली हूँ और मैं चाहता हूँ', description: 'Gratitude for nature and animals wishes.', vernacularConcepts: { santhali: 'ᱨᱟᱹᱥᱠᱟᱹ ᱡᱤᱣᱤ (रास्का जीवी)', mundari: 'सुकुर जीव (Sukur Jeev)', romanized: 'Raska Jiwi' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c2_mg_03', chapterNumber: 3, title: 'A Smile & The Wind and the Sun', hindiTitle: 'एक मुस्कान और हवा और सूरज की शर्त', description: 'Strength of gentle warmth versus strong cold wind.', vernacularConcepts: { santhali: 'ᱞᱟᱸᱫᱟ ᱟᱨ ᱥᱤᱧ ᱵᱮᱲᱟ (लांदा आर सिञ बेड़ा)', mundari: 'लांदा आर सिंगी (Landa ar Singi)', romanized: 'Landa ar Sinj Bera' }, totalPages: 10, difficulty: 'Medium' }
        ]
      },
      {
        id: 'c2_raindrops',
        title: 'Raindrops (English Reader 2)',
        codeName: 'RD-02',
        category: 'English Reader',
        description: 'Conversational reader with dialogues, rhyming words, and local storytelling.',
        coverColor: 'from-sky-700 to-blue-900',
        accentColor: 'text-sky-600',
        iconName: 'Droplets',
        chapters: [
          { id: 'c2_rd_01', chapterNumber: 1, title: 'Our Day (Sunrise to Sunset)', hindiTitle: 'हमारा दिन', description: 'Daily village activities, morning bells, school time.', vernacularConcepts: { santhali: 'ᱟᱵᱚᱣᱟᱜ ᱫᱤᱱ (आबोवाग दिन)', mundari: 'आबुवाः दिन (Abuwah din)', romanized: 'Abowag Din' }, totalPages: 6, difficulty: 'Easy' },
          { id: 'c2_rd_02', chapterNumber: 2, title: 'My Family', hindiTitle: 'मेरा परिवार (Parents & Elders)', description: 'Grandparents, parents, sisters, and communal farming.', vernacularConcepts: { santhali: 'ᱟᱵᱚᱣᱟᱜ ᱜᱷᱟᱨᱚᱸᱡᱽ (आबोवाग घारोंज)', mundari: 'आबुवाः ओड़ाः-होन (Abuwah Orah-hon)', romanized: 'Abowag Gharonj' }, totalPages: 8, difficulty: 'Easy' },
          { id: 'c2_rd_03', chapterNumber: 3, title: 'Water for Life', hindiTitle: 'जीवन के लिए जल', description: 'Wells, streams, ponds, rain collection in Jharkhand.', vernacularConcepts: { santhali: 'ᱡᱤᱣᱤ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱜ (जीवी लागिद दाग)', mundari: 'जीव लागित दाः (Jeev lagit daah)', romanized: 'Jiwi lagid Daag' }, totalPages: 8, difficulty: 'Medium' }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 3
  // ==========================================
  {
    grade: 3,
    className: 'Class 3 (Grade 3)',
    stateBoard: 'JCERT • Jharkhand Academic Council',
    description: 'Introduction of formal Environmental Studies (Looking Around), 3-digit multiplication, and English prose.',
    subjects: [
      {
        id: 'c3_looking_around',
        title: 'Looking Around (EVS / आसपास)',
        codeName: 'EVS-03',
        category: 'EVS',
        description: 'Living organisms, plant parts, water cycles, shelter, and cultural festivals of Jharkhand.',
        coverColor: 'from-forest-700 to-emerald-950',
        accentColor: 'text-forest-600',
        iconName: 'Sprout',
        chapters: [
          { id: 'c3_evs_01', chapterNumber: 1, title: 'Poonam’s Day Out (Animals & Habitats)', hindiTitle: 'पूनम की छुट्टी (जंतु और उनके आवास)', description: 'Identifying birds and animals sitting on trees and near pond.', vernacularConcepts: { santhali: 'ᱫᱟᱨᱮ ᱟᱨ ᱡᱤᱭᱟᱹᱞᱤ (दारे आर जियाली)', mundari: 'दारू आर जीव-जंतु (Daru ar Jiv)', romanized: 'Dare ar Jiyali' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c3_evs_02', chapterNumber: 2, title: 'The Plant Fairy (Leaves & Stems)', hindiTitle: 'पौधों की परी (पत्ते, तने और जड़ें)', description: 'Texture, scent, shapes of leaves: neem, peepal, tulsi, mango.', vernacularConcepts: { santhali: 'ᱥᱟᱠᱟᱢ ᱟᱨ ᱨᱮᱦᱮᱫ (साकाम आर रेहेद)', mundari: 'साकम आर दातु (Sakam ar Datu)', romanized: 'Sakam ar Rehed' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c3_evs_03', chapterNumber: 3, title: 'Water O Water! (Rivers & Rain)', hindiTitle: 'पानी रे पानी! (नदियाँ, झरने और तालाब)', description: 'Sources of water: Subarnarekha river, waterfalls, village wells.', vernacularConcepts: { santhali: 'ᱜᱟᱰᱟ ᱟᱨ ᱫᱟᱜ (गाडा आर दाग)', mundari: 'गड़ा आर दाः (Gada ar Daah)', romanized: 'Gada ar Daag' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c3_evs_04', chapterNumber: 4, title: 'Our First School (The Family)', hindiTitle: 'हमारा पहला स्कूल (परिवार और रिश्ते)', description: 'Learning values, vernacular mother tongue, elder respect at home.', vernacularConcepts: { santhali: 'ᱟᱵᱚᱣᱟᱜ ᱯᱩᱭᱞᱩ ᱤᱥᱠᱩᱞ (आबोवाग पुयलु इस्कुल)', mundari: 'आबुवाः पइला इस्कुल (Abuwah pahila iskul)', romanized: 'Abowag Puylu Iskul' }, totalPages: 8, difficulty: 'Easy' },
          { id: 'c3_evs_05', chapterNumber: 5, title: 'Chhotu’s House (Shelters)', hindiTitle: 'छोटू का घर (विभिन्न प्रकार के आवास)', description: 'Mud huts, thatched roofs, courtyard division, keeping houses clean.', vernacularConcepts: { santhali: 'ᱚᱲᱟᱜ (ओड़ाग)', mundari: 'ओड़ाः (Orah)', romanized: 'Orah / Orah' }, totalPages: 10, difficulty: 'Medium' },
          { id: 'c3_evs_06', chapterNumber: 6, title: 'Foods We Eat (Nutritious Crops)', hindiTitle: 'खाना अपना अपना (अनाज और भोजन)', description: 'Rice, ragi (marua), lentils, mahua, and local tribal nutrition.', vernacularConcepts: { santhali: 'ᱫᱟᱠᱟ ᱟᱨ ᱡᱚᱢᱟᱜ (दाका आर जोमाग)', mundari: 'मंडी आर जोमेया (Mandi ar Jomeya)', romanized: 'Daka ar Jomag' }, totalPages: 12, difficulty: 'Medium' }
        ]
      },
      {
        id: 'c3_math_magic',
        title: 'Math-Magic (Mathematics)',
        codeName: 'MM-03',
        category: 'Mathematics',
        description: '3-digit numbers, mental arithmetic, column multiplication, and 2D geometry.',
        coverColor: 'from-amber-700 to-orange-900',
        accentColor: 'text-amber-600',
        iconName: 'Binary',
        chapters: [
          { id: 'c3_mm_01', chapterNumber: 1, title: 'Where to Look From (Top, Side, Front Views)', hindiTitle: 'कहाँ से देखें (विभिन्न दृश्य)', description: 'Spatial projections: car, table, stairs viewed from different angles.', vernacularConcepts: { santhali: 'ᱪᱮᱛᱟᱱ ᱟᱨ ᱥᱟᱢᱟᱝ ᱧᱮᱞ (चेतान आर सामांग ञेल)', mundari: 'चेतान आर समंग नेल (Chetan ar Samang nel)', romanized: 'Chetan ar Samang njel' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c3_mm_02', chapterNumber: 2, title: 'Fun with Numbers (Hundreds & Place Value)', hindiTitle: 'संख्याओं की उछलकूद (सैकड़ा और स्थानीय मान)', description: 'Cricket scores, centuries, counting 100 to 999.', vernacularConcepts: { santhali: 'ᱥᱟᱭ ᱞᱮᱠᱷᱟ (साय लेखा)', mundari: 'सौ लेखा (Sau lekha)', romanized: 'Say Lekha' }, totalPages: 14, difficulty: 'Medium' },
          { id: 'c3_mm_03', chapterNumber: 3, title: 'Give and Take (Addition with Regrouping)', hindiTitle: 'कुछ लेना, कुछ देना (जोड़)', description: 'Adding 2-digit and 3-digit numbers mentally.', vernacularConcepts: { santhali: 'ᱮᱢ ᱟᱨ ᱦᱟᱛᱟᱣ (एम आर हाताव)', mundari: 'एमा आर हाताव (Ema ar Hatao)', romanized: 'Em ar Hataw' }, totalPages: 12, difficulty: 'Medium' }
        ]
      },
      {
        id: 'c3_marigold',
        title: 'Marigold (English)',
        codeName: 'MG-03',
        category: 'English',
        description: 'Nature poems, friendship stories, and creative writing exercises.',
        coverColor: 'from-emerald-700 to-teal-900',
        accentColor: 'text-emerald-600',
        iconName: 'BookOpen',
        chapters: [
          { id: 'c3_mg_01', chapterNumber: 1, title: 'Good Morning & The Magic Garden', hindiTitle: 'शुभ प्रभात और जादुई बगीचा', description: 'Greeting birds, bees, and sunflowers in school garden.', vernacularConcepts: { santhali: 'ᱥᱮᱛᱟᱜ ᱡᱚᱦᱟᱨ (सेताग जोहार)', mundari: 'सेताः जोहार (Setaah Johar)', romanized: 'Setag Johar' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c3_mg_02', chapterNumber: 2, title: 'Bird Talk & Nina and the Baby Sparrows', hindiTitle: 'पक्षियों की बातचीत और नीना की चिड़ियाँ', description: 'Compassion for baby birds nested in bedroom bookshelves.', vernacularConcepts: { santhali: 'ᱪᱮᱬᱮ ᱠᱟᱛᱷᱟ (चेंगे काथा)', mundari: 'चेणे काजी (Chene Kaji)', romanized: 'Chene Katha' }, totalPages: 12, difficulty: 'Medium' }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 4
  // ==========================================
  {
    grade: 4,
    className: 'Class 4 (Grade 4)',
    stateBoard: 'JCERT • Jharkhand Academic Council',
    description: 'Advanced community studies, river pollution awareness, fractions, time tables, and poetry.',
    subjects: [
      {
        id: 'c4_looking_around',
        title: 'Looking Around (EVS / आसपास)',
        codeName: 'EVS-04',
        category: 'EVS',
        description: 'Transport bridges, bird nests, river cleanliness, roots, and traditional crafts.',
        coverColor: 'from-forest-700 to-emerald-950',
        accentColor: 'text-forest-600',
        iconName: 'Sprout',
        chapters: [
          { id: 'c4_evs_01', chapterNumber: 1, title: 'Going to School (Bridges, Boats & Paths)', hindiTitle: 'चलो, चलें स्कूल! (रास्ते और पुल)', description: 'Walking across bamboo bridges, rocky village trails to reach school.', vernacularConcepts: { santhali: 'ᱤᱥᱠᱩᱞ ᱥᱮᱱᱚᱜ (इस्कुल सेनोग)', mundari: 'इस्कुल सेन (Iskul Sen)', romanized: 'Iskul Senog' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c4_evs_02', chapterNumber: 2, title: 'Ear to Ear (Animal Ears & Patterns)', hindiTitle: 'कान-कान में (पक्षियों और पशुओं के कान)', description: 'Animals with visible ears vs animals with internal hearing holes.', vernacularConcepts: { santhali: 'ᱞᱩᱛᱩᱨ ᱠᱷᱚᱱ ᱞᱩᱛᱩᱨ (लुतुर खोन लुतुर)', mundari: 'लुतुर ते लुतुर (Lutur te Lutur)', romanized: 'Lutur khon Lutur' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c4_evs_03', chapterNumber: 3, title: 'A Day with Nandu (Elephant Herds)', hindiTitle: 'नंदू हाथी का एक दिन (हाथियों का झुंड)', description: 'Elephants living in matriarchal herds and forest protection.', vernacularConcepts: { santhali: 'ᱦᱟᱹᱛᱤ ᱜᱩᱴ (हाती गुट)', mundari: 'हाती गुट (Haathi Gut)', romanized: 'Hati Gut' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c4_evs_04', chapterNumber: 4, title: 'The Story of Amrita (Tree Protection)', hindiTitle: 'अमृता की कहानी (पेड़ों की रक्षा - चिपको)', description: 'Tribal respect for sacred groves (Jaherthan / Sarna Sthal) and forests.', vernacularConcepts: { santhali: 'ᱫᱟᱨᱮ ᱵᱟᱧᱪᱟᱣ (दारे बांचाव - जाहेरथान)', mundari: 'दारू बंचाव - सरना (Daru Banchao)', romanized: 'Dare Banchaw (Jaherthan)' }, totalPages: 14, difficulty: 'Advanced' },
          { id: 'c4_evs_05', chapterNumber: 5, title: 'Anita and the Honeybees', hindiTitle: 'अनिता की मधुमक्खियाँ (मधुमक्खी पालन)', description: 'Beekeeping, girl child education, and rural empowerment.', vernacularConcepts: { santhali: 'ᱧᱮᱞᱮ ᱟᱹᱥᱩᱞ (ञेले आसुल)', mundari: 'नेले असुल (Nele Asul)', romanized: 'Njele Asul' }, totalPages: 12, difficulty: 'Medium' }
        ]
      },
      {
        id: 'c4_math_magic',
        title: 'Math-Magic (Mathematics)',
        codeName: 'MM-04',
        category: 'Mathematics',
        description: 'Building with bricks, long distances, tick-tock clocks, tables and shares.',
        coverColor: 'from-amber-700 to-orange-900',
        accentColor: 'text-amber-600',
        iconName: 'Binary',
        chapters: [
          { id: 'c4_mm_01', chapterNumber: 1, title: 'Building with Bricks (Floor Patterns & Arches)', hindiTitle: 'ईंटों से बनी इमारत', description: 'Brick patterns, symmetry, kiln baking process.', vernacularConcepts: { santhali: 'ᱤᱴᱟᱹ ᱛᱮ ᱚᱲᱟᱜ (इटा ते ओड़ाग)', mundari: 'ईटाः ओड़ाः (Itaah Orah)', romanized: 'Ita te Orah' }, totalPages: 14, difficulty: 'Medium' },
          { id: 'c4_mm_02', chapterNumber: 2, title: 'Long and Short (Kilometers & Meters)', hindiTitle: 'लंबा और छोटा (किलोमीटर और मीटर)', description: 'Measuring running tracks and distances between Jharkhand towns.', vernacularConcepts: { santhali: 'ᱥᱟᱺᱜᱤᱧ ᱟᱨ ᱥᱩᱨ (सांगिञ आर सुर)', mundari: 'संगीन आर सुर (Sangin ar Sur)', romanized: 'Sanginj ar Sur' }, totalPages: 12, difficulty: 'Medium' }
        ]
      },
      {
        id: 'c4_marigold',
        title: 'Marigold (English)',
        codeName: 'MG-04',
        category: 'English',
        description: 'Stories of courage, curiosity, and world cultural folk tales.',
        coverColor: 'from-emerald-700 to-teal-900',
        accentColor: 'text-emerald-600',
        iconName: 'BookOpen',
        chapters: [
          { id: 'c4_mg_01', chapterNumber: 1, title: 'Wake Up! & Neha’s Alarm Clock', hindiTitle: 'जागो! और नेहा की अलार्म घड़ी', description: 'Birds chirping, morning breeze, internal biological clock.', vernacularConcepts: { santhali: 'ᱵᱮᱨᱮᱫ ᱢᱮ! (बेरेद मे!)', mundari: 'बिरिद मे! (Birid me!)', romanized: 'Bered Me!' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c4_mg_02', chapterNumber: 2, title: 'Noses & The Little Fir Tree', hindiTitle: 'नाक और छोटा देवदार का पेड़', description: 'Self-acceptance and appreciating unique qualities in everyone.', vernacularConcepts: { santhali: 'ᱢᱩ (मु / नाक)', mundari: 'मुः (Muh / नाक)', romanized: 'Mu / Muh' }, totalPages: 12, difficulty: 'Medium' }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 5
  // ==========================================
  {
    grade: 5,
    className: 'Class 5 (Grade 5)',
    stateBoard: 'JCERT • Jharkhand Academic Council',
    description: 'Upper primary transition: Super senses of animals, water harvesting (Ghadsisar), maps, fractions, and ecological stewardship.',
    subjects: [
      {
        id: 'c5_looking_around',
        title: 'Looking Around (EVS / आसपास)',
        codeName: 'EVS-05',
        category: 'EVS',
        description: 'Super senses of wildlife, snake charmers, digestive systems, seeds dispersal, and water preservation.',
        coverColor: 'from-forest-700 to-emerald-950',
        accentColor: 'text-forest-600',
        iconName: 'Sprout',
        chapters: [
          { id: 'c5_evs_01', chapterNumber: 1, title: 'Super Senses (Vision, Scent & Hearing of Animals)', hindiTitle: 'कैसे पहचाना चींटी ने दोस्त को? (ज्ञानेंद्रियाँ)', description: 'Ant pheromones, tiger night vision, eagle distance sight, dog scent.', vernacularConcepts: { santhali: 'ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚᱣᱟᱜ ᱢᱮᱫ-ᱞᱩᱛᱩᱨ (जियाली कोवाग मेद-लुतुर)', mundari: 'जीव कोवाः सेन्स (Jiv kowah sense)', romanized: 'Jiyali kowag Med-Lutur' }, totalPages: 14, difficulty: 'Medium' },
          { id: 'c5_evs_02', chapterNumber: 2, title: 'A Snake Charmer’s Story (Reptiles & Medicine)', hindiTitle: 'सपेरों की कहानी (कालबेलिया एवं साँप)', description: 'Poisonous vs non-poisonous snakes, traditional herbal remedies.', vernacularConcepts: { santhali: 'ᱵᱤᱧ ᱟᱨ ᱨᱟᱱ (बिंग आर रान)', mundari: 'बिंग आर रानू (Bing ar Ranu)', romanized: 'Binj ar Ran' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c5_evs_03', chapterNumber: 3, title: 'From Tasting to Digesting', hindiTitle: 'चखने से पचने तक (पाचन क्रिया)', description: 'Tongue taste buds, glucose energy, balanced nutrition.', vernacularConcepts: { santhali: 'ᱡᱚᱢ ᱟᱨ ᱦᱚᱲᱢᱚ (जोम आर होड़मो)', mundari: 'जोमेया आर होड़मो (Jomeya ar Hormo)', romanized: 'Jom ar Hormo' }, totalPages: 14, difficulty: 'Advanced' },
          { id: 'c5_evs_04', chapterNumber: 4, title: 'Mangoes Round the Year (Food Preservation)', hindiTitle: 'खाएं आम बारहों महीने (संरक्षण)', description: 'Pickling, drying, mamidi tandra, preventing bacterial spoilage.', vernacularConcepts: { santhali: 'ᱩᱞ ᱫᱚᱦᱚ (उल दोहो / आम संरक्षण)', mundari: 'उली दोहो (Uli doho)', romanized: 'Ul doho / Uli doho' }, totalPages: 10, difficulty: 'Easy' },
          { id: 'c5_evs_05', chapterNumber: 5, title: 'Seeds and Seeds (Germination & Dispersal)', hindiTitle: 'बीज, बीज, बीज (अंकुरण एवं फैलाव)', description: 'Water, air, warmth required for sprouts, wind & animal seed carriers.', vernacularConcepts: { santhali: 'ᱡᱟᱝ ᱚᱢᱚᱱ (जांग ओमोन)', mundari: 'जांग रोवा (Jang Rowa)', romanized: 'Jang Omon' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c5_evs_06', chapterNumber: 6, title: 'Every Drop Counts (Water Architecture)', hindiTitle: 'बूँद-बूँद, दरिया-दरिया (जल संचयन)', description: 'Stepwells (Baolis), Johads, rainwater rooftop harvesting in Jharkhand.', vernacularConcepts: { santhali: 'ᱫᱟᱜ ᱥᱟᱧᱪᱟᱣ (दाग सांचाव)', mundari: 'दाः संचाव (Daah Sanchao)', romanized: 'Daag Sanchaw' }, totalPages: 14, difficulty: 'Advanced' }
        ]
      },
      {
        id: 'c5_math_magic',
        title: 'Math-Magic (Mathematics)',
        codeName: 'MM-05',
        category: 'Mathematics',
        description: 'The Fish Tale, Shapes & Angles, How Many Squares, Parts and Wholes (Fractions).',
        coverColor: 'from-amber-700 to-orange-900',
        accentColor: 'text-amber-600',
        iconName: 'Binary',
        chapters: [
          { id: 'c5_mm_01', chapterNumber: 1, title: 'The Fish Tale (Lakhs & Crores, Boat Speeds)', hindiTitle: 'मछली उछली (बड़ी संख्याएँ और नाव की गति)', description: 'Large number calculations, speed = distance / time in fishing boats.', vernacularConcepts: { santhali: 'ᱦᱟᱹᱠᱩ ᱠᱟᱛᱷᱟ (हाकु काथा)', mundari: 'हाकु काजी (Haku Kaji)', romanized: 'Haku Katha' }, totalPages: 16, difficulty: 'Advanced' },
          { id: 'c5_mm_02', chapterNumber: 2, title: 'Shapes and Angles (Right, Acute, Obtuse Angles)', hindiTitle: 'आकृतियाँ और कोण (समकोण, न्यूनकोण)', description: 'Clock hand angles, yoga poses, rooftop angles.', vernacularConcepts: { santhali: 'ᱠᱳᱬ ᱟᱨ ᱜᱚᱲᱦᱚᱱ (कोण आर गड़होन)', mundari: 'कोण (Kona)', romanized: 'Kon ar Gorhon' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c5_mm_03', chapterNumber: 3, title: 'Parts and Wholes (Fractions & Decimal Basics)', hindiTitle: 'हिस्से और पूरे (भिन्न)', description: 'Flag proportions, chocolate division, half and quarter representation.', vernacularConcepts: { santhali: 'ᱦᱟᱹᱴᱤᱧ (हाटिंग / भिन्न)', mundari: 'हाटिंग (Hating)', romanized: 'Hatinj' }, totalPages: 14, difficulty: 'Advanced' }
        ]
      },
      {
        id: 'c5_marigold',
        title: 'Marigold (English)',
        codeName: 'MG-05',
        category: 'English',
        description: 'Adventure prose, Teamwork, Robinson Crusoe, Shadow poems, and Flying Together.',
        coverColor: 'from-emerald-700 to-teal-900',
        accentColor: 'text-emerald-600',
        iconName: 'BookOpen',
        chapters: [
          { id: 'c5_mg_01', chapterNumber: 1, title: 'Ice-Cream Man & Wonderful Waste!', hindiTitle: 'आइसक्रीम वाला और कचरे से स्वादिष्ट पकवान', description: 'Avial dish from vegetable scraps, summer cooling treats.', vernacularConcepts: { santhali: 'ᱥᱤᱵᱤᱞ ᱡᱚᱢᱟᱜ (सिबिल जोमाग)', mundari: 'रसिक जोमेया (Rasik Jomeya)', romanized: 'Sibil Jomag' }, totalPages: 12, difficulty: 'Medium' },
          { id: 'c5_mg_02', chapterNumber: 2, title: 'Teamwork & Flying Together', hindiTitle: 'मिलकर काम करना और साथ उड़ना', description: 'Flock of geese escaping hunter net together through unity.', vernacularConcepts: { santhali: 'ᱢᱤᱫ ᱛᱮ ᱠᱟᱹᱢᱤ (मिद ते कामी - एकजुटा)', mundari: 'मियाद ते कामी (Miyad te Kami)', romanized: 'Mid te Kami (Jumid)' }, totalPages: 14, difficulty: 'Medium' }
        ]
      }
    ]
  }
];
