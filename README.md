# JoharSetu (जोहारसेतु) 🌿
### AI-Powered Vernacular Dual-Screen Classroom Companion for Tribal Education in Jharkhand
**Project XENON** • *Empowering Multilingual Primary Classrooms (Santhali & Mundari)*

---

## 🌟 Overview

**JoharSetu** is an offline-first, dual-screen pedagogical platform designed to bridge the language gap in Jharkhand's primary schools. By connecting state curriculum textbooks (Hindi/English) with certified tribal languages (**Santhali • ᱥᱟᱱᱛᱟᱲᱤ** and **Mundari • 𑴤𑴴𑴟𑴝𑴱𑴦𑴲 / मुण्डारी**), JoharSetu empowers teachers to deliver interactive, audio-synchronized, and culturally localized classroom learning.

---

## 🚀 Key Features

### 1. 🏛️ Dual-Zone Interactive Classroom Controller
- **Zone A (Left Column - Original Textbook)**: Displays the authentic state curriculum textbook (e.g. *Class 1 Math-Magic: Shapes and Space*, *Raindrops*, *Marigold*), including story dialogues, exercise items, and visual cues.
- **Zone B (Right Column - Verified Vernacular Translation)**: Displays the verified tribal language translation (Mundari / Santhali) with character dialogue panels, romanized phonetic bridges, and an instant **"Play Audio Sync"** button.
- **Zone C (Spontaneous Classroom Translation)**: Enables teachers to ask spontaneous questions in Hindi or vernacular via Web Speech Recognition and cast them to the student projector in real-time.

### 2. 📺 Real-Time Dual-Screen Projector Sync (`/?view=student`)
- Separate **Teacher Controller** and **Student Display View** synchronized in real time via WebSockets and BroadcastChannel.
- Page turns, audio playback, flashcards, and live questions cast by the teacher appear immediately on the classroom projector with animated soundwaves.

### 3. 🔊 High-Reliability Dual-Layer Audio Synthesizer
- **Live Web Audio Synthesizer**: Direct oscillator & formant tone generation to `AudioContext.destination` ensuring audible physical sound output on every device.
- **Phonetic Speech Engine with Watchdog**: Sanitizes tribal text into speakable phonetic bridges (Devanagari/Romanized) and prevents Chromium speech pauses with an active 150ms resume watchdog.

### 4. 🔒 Certified PALASH RP Verification Station
- **Zero-Friction Access**: Teachers and Students have zero-barrier access without login.
- **Certified Reviewer Role**: Only official **PALASH Resource Persons (RPs)** log in to review, approve, correct, or reject tribal translation drafts and generate pre-cached audio.

### 5. ⚡ 100% Offline-First Architecture
- Pre-caches entire lessons, textbook pages, flashcards, and synthetic audio blobs into **IndexedDB (`idb-keyval`)**.
- Built with a Service Worker caching pipeline capable of operating with zero internet connectivity in remote tribal schools.

### 6. 📚 Full JCERT Primary Curriculum (Classes 1–5)
- Complete breakdown for Class 1 to Class 5:
  - **Class 1 & 2**: *Math-Magic (Mathematics)*, *Marigold (English)*, *Raindrops (English Reader - 19 Chapters)*.
  - **Class 3, 4 & 5**: *Math-Magic (Mathematics)*, *Looking Around (EVS)*, *Marigold (English)*.
- 1-Click **Basic Worksheet** and **Advance Bilingual Guide** PDF generation.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons, Canvas Confetti
- **Audio & Speech**: Web Audio API Synthesizer, Web Speech Synthesis & Recognition API
- **Offline Storage**: IndexedDB (`idb-keyval`), Service Worker Cache Storage
- **Real-Time Sync**: BroadcastChannel API, WebSocket Sync Engine
- **Backend / Database**: Supabase (PostgreSQL, Row Level Security) with offline fallback
- **Export & PDF**: Dynamic bilingual HTML/PDF printable engine

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/harshavardhan-raj/XENON.git
cd XENON

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser and navigate to:
- **Teacher Dashboard**: `http://localhost:5173/`
- **Student Projector View**: `http://localhost:5173/?view=student`
- **Printable 4-Page Mundari Textbook**: `http://localhost:5173/Class1_Math_Ch1_Shapes_and_Space_Mundari.html`

---

## 📖 PALASH RP Demo Credentials

| Role | Name | Email / ID | PIN | District |
| :--- | :--- | :--- | :--- | :--- |
| **Santhali Reviewer** | Jaipal Murmu | `jaipal.murmu@palash.gov.in` | `2026` | Dumka |
| **Mundari Specialist** | Soma Munda | `soma.munda@palash.gov.in` | `2026` | Khunti |

---

## 📄 License
This project is developed for the **Smart India Hackathon (SIH 2026)**.
Licensed under the [MIT License](LICENSE).
