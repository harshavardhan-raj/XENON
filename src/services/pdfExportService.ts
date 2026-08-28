import { ChapterItem, SubjectBook } from './curriculumData';

export const generateChapterPDF = (
  chapter: ChapterItem, 
  subject: SubjectBook, 
  grade: number, 
  tier: 'basic' | 'advance'
) => {
  const isAdvance = tier === 'advance';
  const docTitle = `${subject.title} - Ch${chapter.chapterNumber} ${chapter.title} (${isAdvance ? 'Advance Bilingual Guide' : 'Basic Worksheet'})`;

  // Create formatted printable HTML document
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${docTitle}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1e293b;
          line-height: 1.5;
          margin: 0;
          padding: 20px;
        }
        .header-bar {
          border-bottom: 3px solid #15803d;
          padding-bottom: 12px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-title {
          font-size: 20px;
          font-weight: 800;
          color: #14532d;
        }
        .board-tag {
          font-size: 11px;
          font-weight: 700;
          color: #15803d;
          background: #dcfce7;
          padding: 3px 8px;
          border-radius: 6px;
          display: inline-block;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 12px;
        }
        .meta-item strong { display: block; color: #64748b; text-transform: uppercase; font-size: 10px; }
        .chapter-hero {
          background: ${isAdvance ? '#f0fdf4' : '#fffbeb'};
          border: 1px solid ${isAdvance ? '#bbf7d0' : '#fef08a'};
          border-left: 5px solid ${isAdvance ? '#15803d' : '#d97706'};
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .chapter-hero h1 {
          margin: 0 0 6px 0;
          font-size: 22px;
          color: #0f172a;
        }
        .vocab-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0 25px 0;
          font-size: 13px;
        }
        .vocab-table th, .vocab-table td {
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          text-align: left;
        }
        .vocab-table th {
          background: #f1f5f9;
          font-weight: 700;
          color: #334155;
        }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
          margin-top: 24px;
        }
        .activity-box {
          border: 1px dashed #94a3b8;
          border-radius: 8px;
          padding: 14px;
          margin-top: 10px;
          background: #fafafa;
        }
        .footer {
          margin-top: 40px;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
          font-size: 10px;
          color: #94a3b8;
          display: flex;
          justify-content: space-between;
        }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #15803d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div class="header-bar">
        <div>
          <div class="logo-title">Jharkhand State Primary Education • PALASH Initiative</div>
          <div style="font-size: 12px; color: #64748b;">JCERT State Board Curriculum • Bilingual Vernacular Companion</div>
        </div>
        <div class="board-tag">
          ${isAdvance ? 'ADVANCE BILINGUAL GUIDE' : 'CLASSROOM BASIC WORKSHEET'}
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <strong>Class / Grade</strong>
          Class ${grade}
        </div>
        <div class="meta-item">
          <strong>Textbook</strong>
          ${subject.title}
        </div>
        <div class="meta-item">
          <strong>Chapter</strong>
          Chapter #${chapter.chapterNumber}
        </div>
        <div class="meta-item">
          <strong>Estimated Time</strong>
          45 Mins • 2 Periods
        </div>
      </div>

      <div class="chapter-hero">
        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Chapter ${chapter.chapterNumber}</div>
        <h1>${chapter.title} ${chapter.hindiTitle ? `(${chapter.hindiTitle})` : ''}</h1>
        <p style="margin: 0; font-size: 13px; color: #475569;">${chapter.description}</p>
      </div>

      <div class="section-title">1. Vernacular Language Bridge (Santhali & Mundari Vocabulary)</div>
      <table class="vocab-table">
        <thead>
          <tr>
            <th>Concept / Hindi Word</th>
            <th>Santhali (ᱥᱟᱱᱛᱟᱲᱤ / Ol Chiki & Devanagari)</th>
            <th>Mundari (मुण्डारी)</th>
            <th>Phonetic Pronunciation Guide</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${chapter.title}</strong></td>
            <td>${chapter.vernacularConcepts.santhali}</td>
            <td>${chapter.vernacularConcepts.mundari}</td>
            <td><em>${chapter.vernacularConcepts.romanized}</em></td>
          </tr>
          <tr>
            <td>Classroom Command (Read/Repeat)</td>
            <td>ᱯᱟᱲᱦᱟᱣ ᱢᱮ (पढ़ाव मे)</td>
            <td>पढ़ाव मे (Padhaw me)</td>
            <td><em>Parhaw me</em></td>
          </tr>
          <tr>
            <td>Interactive Action (Listen Carefully)</td>
            <td>ᱢᱚᱱ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ</td>
            <td>मोन लगाके आयुम मे</td>
            <td><em>Mon lagaw kate anjom me</em></td>
          </tr>
        </tbody>
      </table>

      ${isAdvance ? `
        <div class="section-title">2. Pedagogical Activity & Audio Checkpoint Guide</div>
        <div class="activity-box">
          <h4 style="margin: 0 0 8px 0; color: #14532d;">Checkpoint Flow for Teachers:</h4>
          <ol style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155;">
            <li><strong>Zone A Introduction (Hindi/English Source):</strong> Read the sentence aloud to the class: <em>"${chapter.title}"</em>.</li>
            <li><strong>Zone B Vernacular Bridge:</strong> Play the pre-cached native audio in <strong>${chapter.vernacularConcepts.santhali}</strong> and encourage students to recite in chorus.</li>
            <li><strong>Visual Association:</strong> Point to the flashcard illustration corresponding to the chapter keywords.</li>
            <li><strong>Formative Assessment:</strong> Ask students to write the keyword in both Devanagari and Ol Chiki script.</li>
          </ol>
        </div>

        <div class="section-title">3. Student Evaluation Exercise</div>
        <div class="activity-box" style="margin-top: 10px;">
          <p style="font-size: 12px; margin: 0 0 10px 0;"><strong>Q1. Match the English/Hindi word with its authentic vernacular counterpart:</strong></p>
          <div style="display: flex; justify-content: space-between; font-size: 12px; padding: 0 20px;">
            <div>1. ${chapter.title}<br>2. Tree / पौधा<br>3. Water / पानी</div>
            <div>[ &nbsp; ] ᱫᱟᱜ (Daag)<br>[ &nbsp; ] ᱫᱟᱨᱮ (Dare)<br>[ &nbsp; ] ${chapter.vernacularConcepts.santhali.split(' ')[0]}</div>
          </div>
        </div>
      ` : `
        <div class="section-title">2. Student Practice Exercise</div>
        <div class="activity-box">
          <p style="font-size: 12px; margin: 0 0 12px 0;"><strong>Instructions:</strong> Read the words aloud with teacher and trace the tribal pronunciation below:</p>
          <div style="border-bottom: 1px dotted #94a3b8; height: 30px; margin-bottom: 15px;"></div>
          <div style="border-bottom: 1px dotted #94a3b8; height: 30px; margin-bottom: 15px;"></div>
          <div style="border-bottom: 1px dotted #94a3b8; height: 30px;"></div>
        </div>
      `}

      <div class="footer">
        <div>PALASH Initiative • Smart India Hackathon Prototype (SIH26042)</div>
        <div>Page 1 of 1 • Approved for Primary School Bilingual Curriculum</div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
