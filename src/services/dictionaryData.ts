import { VocabularyItem } from '../types';

export const PRIMARY_VOCABULARY: VocabularyItem[] = [
  // Pronouns & Questions (Conversational / Student queries)
  {
    id: 'v_who',
    hindi: 'कौन / हु / who',
    santhali: 'ᱚᱠᱚᱭ (ओकोय)',
    santhali_olchiki: 'ᱚᱠᱚᱭ',
    santhali_phonetic: 'Okoy',
    mundari: 'ओकोय (Okoy)',
    mundari_phonetic: 'Okoy',
    category: 'daily',
    icon: 'Smile'
  },
  {
    id: 'v_what',
    hindi: 'क्या / what',
    santhali: 'ᱪᱮᱫ (चेद्)',
    santhali_olchiki: 'ᱪᱮᱫ',
    santhali_phonetic: 'Ched',
    mundari: 'चिनाः / चिकाना (Chinah)',
    mundari_phonetic: 'Chinah',
    category: 'daily',
    icon: 'MessageCircle'
  },
  {
    id: 'v_why',
    hindi: 'क्यों / why',
    santhali: 'ᱪᱮᱫᱟᱜ (चेदाग्)',
    santhali_olchiki: 'ᱪᱮᱫᱟᱜ',
    santhali_phonetic: 'Chedag',
    mundari: 'चिनाः लागित (Chinah lagit)',
    mundari_phonetic: 'Chinah lagit',
    category: 'daily',
    icon: 'MessageCircle'
  },
  {
    id: 'v_how',
    hindi: 'कैसे / how',
    santhali: 'ᱪᱮᱫ ᱞᱮᱠᱟ (चेद् लेका)',
    santhali_olchiki: 'ᱪᱮᱫ ᱞᱮᱠᱟ',
    santhali_phonetic: 'Ched leka',
    mundari: 'चिलके (Chilke)',
    mundari_phonetic: 'Chilke',
    category: 'daily',
    icon: 'Smile'
  },
  {
    id: 'v_where',
    hindi: 'कहाँ / where',
    santhali: 'ᱚᱠᱟᱨᱮ (ओकारे)',
    santhali_olchiki: 'ᱚᱠᱟᱨᱮ',
    santhali_phonetic: 'Okare',
    mundari: 'ओकोरे (Okore)',
    mundari_phonetic: 'Okore',
    category: 'daily',
    icon: 'Globe'
  },
  {
    id: 'v_you',
    hindi: 'आप / तुम / यू / you',
    santhali: 'ᱟᱢ / ᱟᱯᱮ (आम / आपे)',
    santhali_olchiki: 'ᱟᱢ',
    santhali_phonetic: 'Am / Ape',
    mundari: 'आम / आपे (Aam / Aape)',
    mundari_phonetic: 'Aam',
    category: 'daily',
    icon: 'Smile'
  },
  {
    id: 'v_i_me',
    hindi: 'मैं / मुझे / i / me',
    santhali: 'ᱤᱧ (इञ)',
    santhali_olchiki: 'ᱤᱧ',
    santhali_phonetic: 'Inj',
    mundari: 'आइं / आइङ (Aing)',
    mundari_phonetic: 'Aing',
    category: 'daily',
    icon: 'Smile'
  },
  {
    id: 'v_name',
    hindi: 'नाम / name',
    santhali: 'ᱧᱩᱛᱩᱢ (ञुतुम)',
    santhali_olchiki: 'ᱧᱩᱛᱩᱢ',
    santhali_phonetic: 'Nutum',
    mundari: 'नुतुम (Nutum)',
    mundari_phonetic: 'Nutum',
    category: 'daily',
    icon: 'Smile'
  },
  {
    id: 'v_teacher',
    hindi: 'शिक्षक / शिक्षिका / teacher',
    santhali: 'ᱢᱟᱪᱮᱛ (माचेत)',
    santhali_olchiki: 'ᱢᱟᱪᱮᱛ',
    santhali_phonetic: 'Machet',
    mundari: 'मास्टर / शिक्षक (Master)',
    mundari_phonetic: 'Master',
    category: 'school',
    icon: 'BookOpen'
  },
  {
    id: 'v_student',
    hindi: 'छात्र / विद्यार्थी / student',
    santhali: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ (पाथुवा)',
    santhali_olchiki: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
    santhali_phonetic: 'Pathuwa',
    mundari: 'पड़ुआ / चेला (Padua)',
    mundari_phonetic: 'Padua',
    category: 'school',
    icon: 'UserCheck'
  },

  // Plants and Nature (EVS)
  {
    id: 'v_plant',
    hindi: 'पौधा / पेड़ / tree / plant',
    santhali: 'ᱫᱟᱨᱮ (दारे)',
    santhali_olchiki: 'ᱫᱟᱨᱮ',
    santhali_phonetic: 'Dare',
    mundari: 'दारू / दारु (Daru)',
    mundari_phonetic: 'Daaru',
    category: 'plants',
    icon: 'Sprout'
  },
  {
    id: 'v_root',
    hindi: 'जड़ / roots / root',
    santhali: 'ᱨᱮᱦᱮᱫ (रेहेद)',
    santhali_olchiki: 'ᱨᱮᱦᱮᱫ',
    santhali_phonetic: 'Rehed',
    mundari: 'दातु / रेहेद (Datu / Rehed)',
    mundari_phonetic: 'Daatu',
    category: 'plants',
    icon: 'Anchor'
  },
  {
    id: 'v_leaf',
    hindi: 'पत्ता / पत्ती / leaf / leaves',
    santhali: 'ᱥᱟᱠᱟᱢ (साकाम)',
    santhali_olchiki: 'ᱥᱟᱠᱟᱢ',
    santhali_phonetic: 'Sakam',
    mundari: 'साकम (Sakam)',
    mundari_phonetic: 'Sakam',
    category: 'plants',
    icon: 'Leaf'
  },
  {
    id: 'v_flower',
    hindi: 'फूल / flower',
    santhali: 'ᱵᱟᱦᱟ (बाहा)',
    santhali_olchiki: 'ᱵᱟᱦᱟ',
    santhali_phonetic: 'Baha',
    mundari: 'बा / बाहा (Baa)',
    mundari_phonetic: 'Baha',
    category: 'plants',
    icon: 'Flower2'
  },
  {
    id: 'v_fruit',
    hindi: 'फल / fruit',
    santhali: 'ᱡᱚ (जो)',
    santhali_olchiki: 'ᱡᱚ',
    santhali_phonetic: 'Jo',
    mundari: 'जोः (Joh)',
    mundari_phonetic: 'Joh',
    category: 'plants',
    icon: 'Apple'
  },
  {
    id: 'v_seed',
    hindi: 'बीज / seed',
    santhali: 'ᱡᱟᱝ (जांग)',
    santhali_olchiki: 'ᱡᱟᱝ',
    santhali_phonetic: 'Jang',
    mundari: 'जांग (Jang)',
    mundari_phonetic: 'Jang',
    category: 'plants',
    icon: 'Sparkles'
  },
  {
    id: 'v_water',
    hindi: 'पानी / जल / water',
    santhali: 'ᱫᱟᱜ (दाग)',
    santhali_olchiki: 'ᱫᱟᱜ',
    santhali_phonetic: 'Daag',
    mundari: 'दाः (Daah)',
    mundari_phonetic: 'Daah',
    category: 'water',
    icon: 'Droplets'
  },
  {
    id: 'v_river',
    hindi: 'नदी / river',
    santhali: 'ᱜᱟᱰᱟ (गाडा)',
    santhali_olchiki: 'ᱜᱟᱰᱟ',
    santhali_phonetic: 'Gada',
    mundari: 'गड़ा (Gada)',
    mundari_phonetic: 'Gada',
    category: 'water',
    icon: 'Waves'
  },
  {
    id: 'v_rain',
    hindi: 'बारिश / वर्षा / rain',
    santhali: 'ᱫᱟᱜ ᱡᱟᱹᱲᱤ (दाग जाड़ी)',
    santhali_olchiki: 'ᱫᱟᱜ ᱡᱟᱹᱲᱤ',
    santhali_phonetic: 'Daag Jari',
    mundari: 'गामा दाः (Gama Daah)',
    mundari_phonetic: 'Gama Daah',
    category: 'water',
    icon: 'CloudRain'
  },
  {
    id: 'v_sun',
    hindi: 'सूरज / सूर्य / sun',
    santhali: 'ᱥᱤᱧ ᱵᱮᱲᱟ (सिञ बेड़ा)',
    santhali_olchiki: 'ᱥᱤᱧ ᱵᱮᱲᱟ',
    santhali_phonetic: 'Sinj Bera',
    mundari: 'सिंगी / सिंगी बोङ्गा (Singi)',
    mundari_phonetic: 'Singi',
    category: 'nature',
    icon: 'Sun'
  },
  {
    id: 'v_earth',
    hindi: 'मिट्टी / ज़मीन / soil / earth',
    santhali: 'ᱦᱟᱥᱟ (हासा)',
    santhali_olchiki: 'ᱦᱟᱥᱟ',
    santhali_phonetic: 'Hasa',
    mundari: 'हासा (Hasa)',
    mundari_phonetic: 'Hasa',
    category: 'nature',
    icon: 'Globe'
  },

  // Body Parts (Grade 1-2)
  {
    id: 'v_eye',
    hindi: 'आँख / eye',
    santhali: 'ᱢᱮᱫ (मेद)',
    santhali_olchiki: 'ᱢᱮᱫ',
    santhali_phonetic: 'Med',
    mundari: 'मेद (Med)',
    mundari_phonetic: 'Med',
    category: 'body',
    icon: 'Eye'
  },
  {
    id: 'v_ear',
    hindi: 'कान / ear',
    santhali: 'ᱞᱩᱛᱩᱨ (लुतुर)',
    santhali_olchiki: 'ᱞᱩᱛᱩᱨ',
    santhali_phonetic: 'Lutur',
    mundari: 'लुतुर (Lutur)',
    mundari_phonetic: 'Lutur',
    category: 'body',
    icon: 'Ear'
  },
  {
    id: 'v_hand',
    hindi: 'हाथ / hand',
    santhali: 'ᱛᱤ (ती)',
    santhali_olchiki: 'ᱛᱤ',
    santhali_phonetic: 'Ti',
    mundari: 'ती (Ti)',
    mundari_phonetic: 'Ti',
    category: 'body',
    icon: 'Hand'
  },
  {
    id: 'v_mouth',
    hindi: 'मुँह / mouth',
    santhali: 'ᱢᱚᱪᱟ (मोचा)',
    santhali_olchiki: 'ᱢᱚᱪᱟ',
    santhali_phonetic: 'Mocha',
    mundari: 'मोचा / आ (Mocha / Aa)',
    mundari_phonetic: 'Mocha',
    category: 'body',
    icon: 'Smile'
  },

  // Math & Numbers (Grade 1-3)
  {
    id: 'v_one',
    hindi: 'एक (1) / one',
    santhali: 'ᱢᱤᱫ (मिद)',
    santhali_olchiki: 'ᱢᱤᱫ',
    santhali_phonetic: 'Mid',
    mundari: 'मियाद (Miyad)',
    mundari_phonetic: 'Miyad',
    category: 'math',
    icon: 'Binary'
  },
  {
    id: 'v_two',
    hindi: 'दो (2) / two',
    santhali: 'ᱵᱟᱨ (बार)',
    santhali_olchiki: 'ᱵᱟᱨ',
    santhali_phonetic: 'Bar',
    mundari: 'बारिया (Bariya)',
    mundari_phonetic: 'Bariya',
    category: 'math',
    icon: 'Binary'
  },
  {
    id: 'v_three',
    hindi: 'तीन (3) / three',
    santhali: 'ᱯᱮ (पे)',
    santhali_olchiki: 'ᱯᱮ',
    santhali_phonetic: 'Pe',
    mundari: 'आपिया (Apiya)',
    mundari_phonetic: 'Apiya',
    category: 'math',
    icon: 'Binary'
  },
  {
    id: 'v_add',
    hindi: 'जोड़ना / मिलाना / add',
    santhali: 'ᱢᱮᱥᱟ (मेसा)',
    santhali_olchiki: 'ᱢᱮᱥᱟ',
    santhali_phonetic: 'Mesa',
    mundari: 'मेसा (Mesa)',
    mundari_phonetic: 'Mesa',
    category: 'math',
    icon: 'PlusCircle'
  },

  // Classroom Commands & Daily interactions
  {
    id: 'v_read',
    hindi: 'पढ़ो / पढ़ना / read',
    santhali: 'ᱯᱟᱲᱦᱟᱣ (पढ़ाव)',
    santhali_olchiki: 'ᱯᱟᱲᱦᱟᱣ',
    santhali_phonetic: 'Parhaw',
    mundari: 'पढ़ाव / पाड़ (Padhaw)',
    mundari_phonetic: 'Parhao',
    category: 'school',
    icon: 'BookOpen'
  },
  {
    id: 'v_write',
    hindi: 'लिखो / लिखना / write',
    santhali: 'ᱚᱞ (ओल)',
    santhali_olchiki: 'ᱚᱞ',
    santhali_phonetic: 'Ol',
    mundari: 'ओल (Ol)',
    mundari_phonetic: 'Ol',
    category: 'school',
    icon: 'PenTool'
  },
  {
    id: 'v_sit',
    hindi: 'बैठ जाओ / sit down',
    santhali: 'ᱫᱩᱲᱩᱵ ᱢᱮ (दुड़ुब मे)',
    santhali_olchiki: 'ᱫᱩᱲᱩᱵ ᱢᱮ',
    santhali_phonetic: 'Durub me',
    mundari: 'दुबुंग मे (Dubung me)',
    mundari_phonetic: 'Dubung me',
    category: 'school',
    icon: 'UserCheck'
  },
  {
    id: 'v_listen',
    hindi: 'ध्यान से सुनो / listen',
    santhali: 'ᱢᱚᱱ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ (मोन लागाव काते आञजोम मे)',
    santhali_olchiki: 'ᱢᱚᱱ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ',
    santhali_phonetic: 'Mon lagaw kate anjom me',
    mundari: 'मोन लगाके आयुम मे (Mon lagake aayum me)',
    mundari_phonetic: 'Aayum me',
    category: 'school',
    icon: 'Volume2'
  }
];

export const COMMON_PHRASE_TRANSLATIONS: Record<string, { santhali: string; santhali_phonetic: string; mundari: string; mundari_phonetic: string }> = {
  'आप सब कैसे हैं?': {
    santhali: 'ᱟᱯᱮ ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱜ ᱯᱮᱭᱟ? (आपे चेद लेका मेनाग पेया?)',
    santhali_phonetic: 'Ape ched leka menag peya?',
    mundari: 'आपे चिलके मेनापेया? (Ape chilke menapeya?)',
    mundari_phonetic: 'Ape chilke menapeya?'
  },
  'how are you': {
    santhali: 'ᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ? (आम चेद लेका मेनामा?)',
    santhali_phonetic: 'Am ched leka menama?',
    mundari: 'आम चिलके मेनामा? (Aam chilke menama?)',
    mundari_phonetic: 'Aam chilke menama?'
  },
  'tum kaun ho': {
    santhali: 'ᱟᱢ ᱫᱚ ᱚᱠᱚᱭ ᱠᱟᱱᱟᱢ? (आम दो ओकोय कानाम?)',
    santhali_phonetic: 'Am do okoy kanam?',
    mundari: 'आम दो ओकोय तनाम? (Aam do okoy tanam?)',
    mundari_phonetic: 'Aam do okoy tanam?'
  },
  'aap kaun hain': {
    santhali: 'ᱟᱯᱮ ᱫᱚ ᱚᱠᱚᱭ ᱠᱟᱱᱟᱯᱮ? (आपे दो ओकोय कानापे?)',
    santhali_phonetic: 'Ape do okoy kanape?',
    mundari: 'आपे दो ओकोय तानापे? (Aape do okoy tanape?)',
    mundari_phonetic: 'Aape do okoy tanape?'
  },
  'हु आर यू': {
    santhali: 'ᱟᱢ ᱫᱚ ᱚᱠᱚᱭ ᱠᱟᱱᱟᱢ? (आम दो ओकोय कानाम?)',
    santhali_phonetic: 'Am do okoy kanam?',
    mundari: 'आम दो ओकोय तनाम? (Aam do okoy tanam?)',
    mundari_phonetic: 'Aam do okoy tanam?'
  },
  'who are you': {
    santhali: 'ᱟᱢ ᱫᱚ ᱚᱠᱚᱭ ᱠᱟᱱᱟᱢ? (आम दो ओकोय कानाम?)',
    santhali_phonetic: 'Am do okoy kanam?',
    mundari: 'आम दो ओकोय तनाम? (Aam do okoy tanam?)',
    mundari_phonetic: 'Aam do okoy tanam?'
  },
  'आप कौन हैं?': {
    santhali: 'ᱟᱯᱮ ᱫᱚ ᱚᱠᱚᱭ ᱠᱟᱱᱟᱯᱮ? (आपे दो ओकोय कानापे?)',
    santhali_phonetic: 'Ape do okoy kanape?',
    mundari: 'आपे दो ओकोय तानापे? (Aape do okoy tanape?)',
    mundari_phonetic: 'Aape do okoy tanape?'
  },
  'तुम कौन हो?': {
    santhali: 'ᱟᱢ ᱫᱚ ᱚᱠᱚᱭ ᱠᱟᱱᱟᱢ? (आम दो ओकोय कानाम?)',
    santhali_phonetic: 'Am do okoy kanam?',
    mundari: 'आम दो ओकोय तनाम? (Aam do okoy tanam?)',
    mundari_phonetic: 'Aam do okoy tanam?'
  },
  'आपका नाम क्या है?': {
    santhali: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ? (आमाग ञुतुम दो चेद्?)',
    santhali_phonetic: 'Amag nutum do ched?',
    mundari: 'आमाः नुतुम चिनाः? (Aamah nutum chinah?)',
    mundari_phonetic: 'Aamah nutum chinah?'
  },
  'what is your name': {
    santhali: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ? (आमाग ञुतुम दो चेद्?)',
    santhali_phonetic: 'Amag nutum do ched?',
    mundari: 'आमाः नुतुम चिनाः? (Aamah nutum chinah?)',
    mundari_phonetic: 'Aamah nutum chinah?'
  },
  'यह क्या है?': {
    santhali: 'ᱱᱚᱶᱟ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ? (नोवा दो चेद् काना?)',
    santhali_phonetic: 'Nowa do ched kana?',
    mundari: 'नेया चिनाः तना? (Neya chinah tana?)',
    mundari_phonetic: 'Neya chinah tana?'
  },
  'what is this': {
    santhali: 'ᱱᱚᱶᱟ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ? (नोवा दो चेद् काना?)',
    santhali_phonetic: 'Nowa do ched kana?',
    mundari: 'नेया चिनाः तना? (Neya chinah tana?)',
    mundari_phonetic: 'Neya chinah tana?'
  },
  'किताब खोलो': {
    santhali: 'ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ (पुथी झीज मे)',
    santhali_phonetic: 'Puthi jhij me',
    mundari: 'पुथी ओड़ोङ मे (Puthi odong me)',
    mundari_phonetic: 'Puthi odong me'
  },
  'ब्लैकबोर्ड पर देखो': {
    santhali: 'ᱵᱳᱨᱰ ᱨᱮ ᱧᱮᱞ ᱢᱮ (बोर्ड रे ञेल मे)',
    santhali_phonetic: 'Board re njel me',
    mundari: 'बोर्ड रे नेल मे (Board re nel me)',
    mundari_phonetic: 'Board re nel me'
  },
  'शाबाश बहुत अच्छा': {
    santhali: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ (आडी नापाय)',
    santhali_phonetic: 'Adi napay',
    mundari: 'एनांग बोगी (Enang bogi)',
    mundari_phonetic: 'Enang bogi'
  },
  'बारिश क्यों होती है?': {
    santhali: 'ᱫᱟᱜ ᱡᱟᱹᱲᱤ ᱪᱮᱫᱟᱜ ᱦᱩᱭᱩᱜᱼᱟ? (दाग जाड़ी चेदाग हुयुग-आ?)',
    santhali_phonetic: 'Daag jari chedag huyug-a?',
    mundari: 'गामा दाः चिनाः लागित होबोअः? (Gama daah chinah lagit hobowah?)',
    mundari_phonetic: 'Gama daah chinah lagit hobowah?'
  },
  'पेड़ हमें क्या देते हैं?': {
    santhali: 'ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚ ᱪᱮᱫ ᱮ ᱮᱢᱟ ᱵᱚᱱᱟ? (दारे दो आबो चेद ए एमा बोना?)',
    santhali_phonetic: 'Dare do abo ched e ema bona?',
    mundari: 'दारू आबु के चिनाः एमाबुआ? (Daaru abu ke chinah emabuah?)',
    mundari_phonetic: 'Daaru abu ke chinah emabuah?'
  }
};
