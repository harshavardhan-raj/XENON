import fs from 'fs';

const htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>Class 1 Math-Magic - Chapter 1: Shapes and Space (Mundari Translation - मुण्डारी अनुवाद)</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.4;
      margin: 0;
      padding: 0;
      background: #f8fafc;
    }
    .page-container {
      background: white;
      max-width: 210mm;
      margin: 0 auto 20px auto;
      padding: 20mm 18mm;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      page-break-after: always;
      position: relative;
      min-height: 250mm;
    }
    @media print {
      body { background: white; }
      .page-container {
        box-shadow: none;
        margin: 0;
        padding: 0;
        max-width: 100%;
        border-radius: 0;
      }
      .no-print { display: none; }
    }
    .header-bar {
      border-bottom: 2.5px solid #15803d;
      padding-bottom: 8px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-title {
      font-size: 16px;
      font-weight: 800;
      color: #14532d;
    }
    .board-tag {
      font-size: 11px;
      font-weight: 700;
      color: #15803d;
      background: #dcfce7;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .ch-title-box {
      background: #f0fdf4;
      border-left: 5px solid #15803d;
      padding: 10px 14px;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    .ch-title-box h1 {
      margin: 0;
      font-size: 20px;
      color: #0f172a;
    }
    .ch-title-box p {
      margin: 3px 0 0 0;
      font-size: 13px;
      color: #15803d;
      font-weight: 700;
    }
    .section-card {
      border: 1px solid #e2e8f0;
      background: #ffffff;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 12px;
    }
    .section-header {
      font-size: 14px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-page {
      background: #f1f5f9;
      color: #475569;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .dialogue-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      margin: 8px 0;
    }
    .dialogue-bubble {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12.5px;
    }
    .camel-bubble {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-left: 4px solid #d97706;
    }
    .arab-bubble {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 4px solid #2563eb;
    }
    .vocab-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 11.5px;
    }
    .vocab-table th, .vocab-table td {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      text-align: left;
    }
    .vocab-table th {
      background: #f8fafc;
      color: #334155;
      font-weight: 700;
    }
    .mundari-text {
      font-size: 14px;
      font-weight: 700;
      color: #15803d;
    }
    .phonetic-text {
      font-size: 11px;
      color: #64748b;
      font-style: italic;
    }
    .page-footer {
      position: absolute;
      bottom: 8mm;
      left: 18mm;
      right: 18mm;
      border-top: 1px solid #e2e8f0;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
    }
    .btn-print {
      position: fixed;
      top: 15px;
      right: 15px;
      background: #15803d;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 800;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(21, 128, 61, 0.4);
      z-index: 100;
    }
    .btn-print:hover { background: #166534; }
  </style>
</head>
<body>

  <button onclick="window.print()" class="btn-print no-print">🖨️ Print / Save as PDF</button>

  <!-- ========================================================================= -->
  <!-- PAGE 1: COVER & OVERVIEW -->
  <!-- ========================================================================= -->
  <div class="page-container">
    <div class="header-bar">
      <div class="header-title">Jharkhand State Primary Curriculum • JoharSetu / PALASH</div>
      <div class="board-tag">MUNDARI VERNACULAR EDITION (मुण्डारी अनुवाद)</div>
    </div>

    <div class="ch-title-box">
      <h1>अध्याय 1: आकार आर ठाई (Shapes and Space)</h1>
      <p>Class 1 • Math-Magic (गणित का जादू) • JCERT Jharkhand</p>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>📖 मुख्य शब्दावली एवं संकल्पनाएँ (Core Mundari Concepts)</span>
        <span class="badge-page">Dictionary Reference</span>
      </div>
      <table class="vocab-table">
        <thead>
          <tr>
            <th>अंग्रेज़ी (English)</th>
            <th>हिन्दी (Hindi)</th>
            <th>मुण्डारी (Mundari Script / Devanagari)</th>
            <th>उच्चारण (Phonetics)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Inside - Outside</strong></td>
            <td>अंदर - बाहर</td>
            <td class="mundari-text">भितर - बाहरे</td>
            <td class="phonetic-text">Bhitar - Bahare</td>
          </tr>
          <tr>
            <td><strong>Bigger - Smaller</strong></td>
            <td>बड़ा - छोटा</td>
            <td class="mundari-text">मराङ - हुरुन</td>
            <td class="phonetic-text">Marang - Hurun</td>
          </tr>
          <tr>
            <td><strong>Biggest - Smallest</strong></td>
            <td>सबसे बड़ा - सबसे छोटा</td>
            <td class="mundari-text">सबते मराङ - सबते हुरुन</td>
            <td class="phonetic-text">Sobte Marang - Sobte Hurun</td>
          </tr>
          <tr>
            <td><strong>Top - Bottom</strong></td>
            <td>ऊपर - नीचे</td>
            <td class="mundari-text">चेतान - लताड़ (फेद)</td>
            <td class="phonetic-text">Chetan - Latar (Phed)</td>
          </tr>
          <tr>
            <td><strong>Nearer - Farther</strong></td>
            <td>पास - दूर</td>
            <td class="mundari-text">जपाः (नेड़े) - संगीन</td>
            <td class="phonetic-text">Japah (Nere) - Sangin</td>
          </tr>
          <tr>
            <td><strong>Nearest - Farthest</strong></td>
            <td>सबसे पास - सबसे दूर</td>
            <td class="mundari-text">सबते जपाः - सबते संगीन</td>
            <td class="phonetic-text">Sobte Japah - Sobte Sangin</td>
          </tr>
          <tr>
            <td><strong>On - Under</strong></td>
            <td>ऊपर - नीचे</td>
            <td class="mundari-text">चेतान रे - लताड़ रे</td>
            <td class="phonetic-text">Chetan re - Latar re</td>
          </tr>
          <tr>
            <td><strong>Above - Below</strong></td>
            <td>ऊपर - नीचे</td>
            <td class="mundari-text">चेतान - लताड़</td>
            <td class="phonetic-text">Chetan - Latar</td>
          </tr>
          <tr>
            <td><strong>Rolling - Sliding</strong></td>
            <td>लुढ़कना - फिसलना</td>
            <td class="mundari-text">गुदरांव - घिसड़ांव (सिपिड़)</td>
            <td class="phonetic-text">Gudrang - Ghisrang (Sipid)</td>
          </tr>
          <tr>
            <td><strong>Shapes</strong></td>
            <td>आकृतियाँ / रूप</td>
            <td class="mundari-text">आकार / गड़होन (रूप)</td>
            <td class="phonetic-text">Aakar / Gorhon (Roop)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🐪 पृष्ठ 1 & 2: अरब होड़ो आर अयाः ऊँट (The Arab and his Camel)</span>
        <span class="badge-page">Page 1-2</span>
      </div>
      <p style="font-size: 12px; margin: 0 0 8px 0; color: #475569;">
        <strong>कहानी का संदर्भ:</strong> रबाङ दिन (सर्दी का दिन) रे मियाद अरब होड़ो ऊँट चेतान रे सेन-बारा तनाय ताएकेना। निदा (रात) रे अयाः तंबू (डेरा) तियाड़ केते भितर बोलोयेना। ऊँट दो बाहरे रे ताएकेना।
      </p>
      
      <div class="dialogue-grid">
        <div class="dialogue-bubble camel-bubble">
          <strong>ऊँट (Camel):</strong> "आइं अमः तंबू भितर हॉटोक (गर्दन) बोलो दायेया? बाहरे रे पुर रबाङा।"<br>
          <span class="phonetic-text">("May I put my neck inside? It is too cold outside.")</span>
        </div>
        <div class="dialogue-bubble arab-bubble">
          <strong>अरब (Arab):</strong> "ठीक गेया! अम अमः हॉटोक भितर दोहो दायेयम।"<br>
          <span class="phonetic-text">("Okay! You may put your neck inside.")</span>
        </div>
        <div class="dialogue-bubble camel-bubble">
          <strong>ऊँट (Camel):</strong> "आइं माड़ंग जाङ्गा (आगे के पैर) भितर दोहो दायेया? बाहरे रे पुर रबाङा।"<br>
          <span class="phonetic-text">("May I put my front legs inside? It is too cold outside.")</span>
        </div>
        <div class="dialogue-bubble arab-bubble">
          <strong>अरब (Arab):</strong> "ठीक गेया! अम अमः माड़ंग जाङ्गा भितर दोहो दायेयम।"<br>
          <span class="phonetic-text">("Okay! You may put your front legs inside.")</span>
        </div>
        <div class="dialogue-bubble camel-bubble">
          <strong>ऊँट (Camel):</strong> "आइं पूरा भितर हिजुः दायेया? बाहरे रे पुर सुबुन रबाङा।"<br>
          <span class="phonetic-text">("Can I come inside? It is too cold outside.")</span>
        </div>
        <div class="dialogue-bubble arab-bubble">
          <strong>अरब (Arab):</strong> "ओहो! का! तंबू दो आलं बारोन (हम दोनों) लागित पुर हुरुन गेया।"<br>
          <span class="phonetic-text">("Oh! No the tent is too small for both of us.")</span>
        </div>
        <div class="dialogue-bubble camel-bubble">
          <strong>ऊँट (Camel):</strong> "एनरेदो आइं भितरिं हिजुः तना, आर अम बाहरे सेनोः मे!"<br>
          <span class="phonetic-text">("So I am coming inside and you go outside.")</span>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Class 1 Mathematics • Mundari Bilingual Edition</span>
      <span>Page 1 of 3</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 2: EXERCISES & COMPARISONS (Pages 3 to 12) -->
  <!-- ========================================================================= -->
  <div class="page-container">
    <div class="header-bar">
      <div class="header-title">अध्याय 1: अभ्यास आर कामी को (Classroom Activities)</div>
      <div class="board-tag">MUNDARI WORKBOOK GUIDE</div>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🐘 पृष्ठ 3 & 4: मराङ - हुरुन (Bigger - Smaller & Biggest - Smallest)</span>
        <span class="badge-page">Page 3-4</span>
      </div>
      <ul style="font-size: 12px; margin: 4px 0 0 16px; padding: 0; color: #334155;">
        <li><strong>Tick (✓) the bigger:</strong> मराङ जिनिस / जीव रे टिक (✓) चिनहा लगावे मे। (जैसे: दरियाई घोड़ा vs सेता/कुत्ता $\rightarrow$ दरियाई घोड़ा मराङ गेया)।</li>
        <li><strong>Tick (✓) the smaller:</strong> हुरुन जिनिस रे टिक (✓) लगावे मे। (जैसे: साकम/पत्ता vs हुरुन साकम $\rightarrow$ हुरुन साकम)।</li>
        <li><strong>Tick (✓) the smaller tyre:</strong> हुरुन पहिया / टायर रे टिक लगावे मे।</li>
        <li><strong>Tick (✓) the smallest tree:</strong> सबते हुरुन दारू रे टिक (✓) लगावे मे।</li>
        <li><strong>Tick (✓) the biggest animal:</strong> सबते मराङ जीव (हाथी) रे टिक (✓) लगावे मे।</li>
        <li><strong>Tick (✓) the smallest fruit:</strong> सबते हुरुन जोः (चेरी) रे टिक (✓) लगावे मे।</li>
        <li><strong>Tick (✓) the biggest bubble:</strong> सबते मराङ दाः फोतका (बुलबुला) रे टिक लगावे मे।</li>
      </ul>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🧗 पृष्ठ 5: चेतान - लताड़ (Top - Bottom)</span>
        <span class="badge-page">Page 5</span>
      </div>
      <ul style="font-size: 12px; margin: 4px 0 0 16px; padding: 0; color: #334155;">
        <li><strong>Slide & Tree Top/Bottom:</strong> फिसलपट्टी चेतान रे दुब आकन होन (Top) आर लताड़ रे तिंगू आकन होन (Bottom)। दारू चेतान रे चेणे (Top) आर लताड़ रे पुसी (Bottom)।</li>
        <li><strong>Tick (✓) the pot on the top:</strong> सबते चेतान रे दोहो आकन चटु / घड़ा रे टिक लगावे मे।</li>
        <li><strong>Tick (✓) the animal at the bottom of the stairs:</strong> सिढ़ी लताड़ रेयाः जीव (सेता होन) रे टिक लगावे मे।</li>
      </ul>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🏡 पृष्ठ 6 & 7: जपाः - संगीन (Nearer - Farther & Nearest - Farthest)</span>
        <span class="badge-page">Page 6-7</span>
      </div>
      <ul style="font-size: 12px; margin: 4px 0 0 16px; padding: 0; color: #334155;">
        <li><strong>Tick (✓) the bird nearer to home:</strong> ओड़ाः जपाः रेयाः गुलाबी चेणे रे टिक (✓) लगावे मे।</li>
        <li><strong>Tick (✓) the cat farther from the tree:</strong> दारू खोन संगीन रेयाः पुसी रे टिक (✓) लगावे मे।</li>
        <li><strong>Nearest & Farthest to Swing:</strong> झूला जपाः रे दौड़ा तनाय होन (Nearest) आर झूला खोन संगीन रे तिंगू आकन कुड़ी (Farthest)।</li>
        <li><strong>Tick (✓) the puppy farthest from the tree:</strong> दारू खोन सबते संगीन रेयाः सेता होन रे टिक लगावे मे।</li>
        <li><strong>Tick (✓) the tree nearest to the bird:</strong> चेणे जपाः रेयाः दारू रे टिक लगावे मे।</li>
      </ul>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🪑 पृष्ठ 8 & 9: चेतान - लताड़ (On - Under & Above - Below)</span>
        <span class="badge-page">Page 8-9</span>
      </div>
      <ul style="font-size: 12px; margin: 4px 0 0 16px; padding: 0; color: #334155;">
        <li><strong>Classroom Concepts:</strong> मेज चेतान रे पुसी (On the table), मेज लताड़ रे चेंदू/चूहा (Under the table), पंखा लताड़ रे होन को (Below the fan), मेज चेतान पंखा (Above the table)।</li>
        <li><strong>Activity:</strong> मेज चेतान रे दुब आकन होन को रे टिक (✓) आर मेज लताड़ रेनाः होन को रे क्रॉस (✗) चिनहा लगावे मे।</li>
        <li><strong>Page 9 Village Scene Discussion:</strong> इनारा (कुआं) जपाः दाः अदु तनाय माई को, दारू चेतान रे चेणे, आर ओड़ाः जपाः बियान।</li>
      </ul>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>⚽ पृष्ठ 10, 11, 12: आकार को, भेगार, आर गुदरांव-घिसड़ांव</span>
        <span class="badge-page">Page 10-12</span>
      </div>
      <ul style="font-size: 12px; margin: 4px 0 0 16px; padding: 0; color: #334155;">
        <li><strong>Shapes around us (आकार को):</strong> गोल जिनिस (फुटबॉल, टमाटर, संतरा, गुब्बारा) पीला बाक्सा रे आर चौकोन जिनिस (चॉक बाक्सा, गिफ्ट बॉक्स) गुलाबी बाक्सा रे दाग तान ते जोड़ावे मे।</li>
        <li><strong>Sorting (भेगार):</strong> मियाद लेकान आकार कोराः जोड़ा बाई मे (जैसे: गोल, तिकोन, चौकोन, बेलनाकार)।</li>
        <li><strong>Rolling (गुदरांव - लुढ़कना):</strong> बॉल, पेंसिल, प्याज $\rightarrow$ गुदरांव-गुदरांव सेनोजा।</li>
        <li><strong>Sliding (घिसड़ांव - फिसलना):</strong> बाक्सा, सूटकेस, खीरा, बैटरी $\rightarrow$ घिसड़ांव ते सेनोःआ।</li>
      </ul>
    </div>

    <div class="page-footer">
      <span>Class 1 Mathematics • Mundari Bilingual Edition</span>
      <span>Page 2 of 3</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 3: STORY & GEOMETRIC SHAPES (Pages 13 to 20) -->
  <!-- ========================================================================= -->
  <div class="page-container">
    <div class="header-bar">
      <div class="header-title">कहानी: सयान बुढ़ी (Wise Grandmother) एवं आकार अभ्यास</div>
      <div class="board-tag">STORY & GEOMETRY EXERCISES</div>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🥁 पृष्ठ 13 & 14: सयान बुढ़ी आर मेंढ़ा होन (The Wise Grandmother & The Lamb)</span>
        <span class="badge-page">Page 13-14</span>
      </div>
      <p style="font-size: 12px; margin: 0 0 8px 0; color: #334155;">
        <strong>कहानी का मुण्डारी अनुवाद (Mundari Story Summary):</strong><br>
        1. मियाद मेंढ़ा होन (मेमना) अयाः बुढ़ी (नानी/दादी) नेल लागित सेनोः तनाय ताएकेना।<br>
        2. बीर (जंगल) होर रे मियाद हुंडर (भेड़िया) ताकेद किया: <em>"आइं अमके जोमेया!"</em><br>
        3. मेंढ़ा होन काजी किया: <em>"दया केते आड़ाञ मे! आइं बुढ़ी नेल सेनोः तनां। रूवाड़ हिजुः रे अम जोमिन मे।"</em> हुंडर राजी येना।<br>
        4. रूवाड़ दिपिलंग बुढ़ी के हुंडर बियान काजी किया। सयान बुढ़ी मियाद बुद्धि बाई किया: <em>"सेन मे, आर ढोलक भितर उकुन मे!"</em><br>
        5. बुढ़ी ढोलक के सड़क रे गुदरांव (लुढ़का) केदा। ढोलक गुदरांव-गुदरांव सेना।<br>
        6. हुंडर कुली किया: <em>"अम मियाद मेंढ़ा होन नेल कियीम?"</em> ढोलक खोन आवाज हिजुः येना: <em>"का!"</em><br>
        7. हुंडर शक केते ढोलक पीछे-पीछे दौड़ा केदा, लेकिन मेंढ़ा होन ओड़ाः भितर बोलोयेना आर बुढ़ी के जोहार/धन्यवाद काजी किया।
      </p>
    </div>

    <div class="section-card">
      <div class="section-header">
        <span>🔺 पृष्ठ 15 से 20: आकार को, रंग आर मूरत बाई (Geometric Shapes & Colors)</span>
        <span class="badge-page">Page 15-20</span>
      </div>
      <table class="vocab-table">
        <thead>
          <tr>
            <th>आकार (Shape)</th>
            <th>मुण्डारी नाम (Mundari Term)</th>
            <th>रंग (Colors in Mundari)</th>
            <th>अभ्यास कार्य (Activity)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Triangle (त्रिभुज)</strong></td>
            <td class="mundari-text">तिकोन (Tikon)</td>
            <td>हरियर (Hariyar / Green)</td>
            <td>बराबर माप रेनाः तिकोन को जोड़ावे मे (Match same sizes)।</td>
          </tr>
          <tr>
            <td><strong>Circle (वृत्त/गोल)</strong></td>
            <td class="mundari-text">गोल (Gol / Gulay)</td>
            <td>आराः (Aarah / Red) & गुलाबी (Pink)</td>
            <td>सबते हुरुन गोल रे रंग लगावे मे (Colour smallest circle)।</td>
          </tr>
          <tr>
            <td><strong>Rectangle / Square (चौकोन)</strong></td>
            <td class="mundari-text">चौकोन (Chaukon)</td>
            <td>लिल (Lil / Blue) & ससांग (Sasang / Yellow)</td>
            <td>नाव आर घर रे दिए गए रंग लगावे मे।</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 12px; margin-top: 8px; color: #475569;">
        <strong>पृष्ठ 20 (Shape Kit):</strong> किताब रेयाः पीछे दे आकन आकार किट (तिकोन, गोल, चौकोन) व्यवहार केते तितली (फुतुकड़ी) आर हाकु (मछली) लेकान मूरत बाई मे।
      </div>
    </div>

    <div class="section-card" style="background: #fdf6b2; border: 1px solid #fde047;">
      <div style="font-size: 13px; font-weight: 800; color: #723b10;">
        💡 शिक्षक निर्देश (Teacher's Pedagogical Note)
      </div>
      <div style="font-size: 11.5px; color: #723b10; margin-top: 4px;">
        होन को के स्थानीय मुण्डारी परिवेश (ओड़ाः, दारू, गाड़ा, इनारा, ढोलक) रेयाः उदाहरण दे केते <strong>भितर-बाहरे</strong>, <strong>मराङ-हुरुन</strong>, <strong>चेतान-लताड़</strong>, आर <strong>गुदरांव-घिसड़ांव</strong> रेयाः समझ तियाड़ पे।
      </div>
    </div>

    <div class="page-footer">
      <span>Class 1 Mathematics • Mundari Bilingual Edition • SIH 2026</span>
      <span>Page 3 of 3</span>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('public/Class1_Math_Ch1_Shapes_and_Space_Mundari.html', htmlContent);
console.log('Successfully generated Mundari textbook translation document!');
