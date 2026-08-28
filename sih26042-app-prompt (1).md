# Build Prompt: Vernacular Classroom Companion (SIH26042)

## Context
Build a web application (React frontend + Supabase backend) that helps Hindi-speaking teachers in tribal-majority primary schools (Jharkhand, Grades 1–5) deliver lessons with correct vernacular (Santhali / Mundari) vocabulary and phrasing they don't natively have. The app supports the state's PALASH initiative rather than replacing it. Target users are non-technical teachers and PALASH resource persons (bilingual reviewers), used on shared classroom tablets/laptops with unreliable connectivity.

This is a hackathon prototype (SIH 2026) — prioritize a working, demoable core flow over exhaustive features.

## Tech stack
- Frontend: React (functional components, hooks), clean component structure
- Backend/DB: Supabase (Postgres + Storage + Auth)
- Translation: pluggable adapter — stub an API layer that can call Gemini or Bhashini's MT API; don't hardcode to one provider
- TTS: pluggable adapter similarly — generate once, cache the result, never call TTS live during class playback
- Offline support: cache lesson content (text + audio) client-side (IndexedDB or Cache API) so a lesson opened once works without network during class
- Audio: store compressed (Opus/AAC, ~32–48kbps mono), never raw WAV

## Users & roles
1. **PALASH Resource Person (Reviewer)** — bilingual, reviews/corrects AI-translated lessons before they enter the verified bank. Also reviews the "pending queue" of unverified quick-translate logs.
2. **Teacher** — uses verified lessons live in class; can also use a clearly-separated "Quick Translate" tool for off-script questions.
3. (Optional/stretch) **Admin** — sees usage stats across schools, manages lesson catalogue (grade/subject/lesson metadata).

## Core data model (Supabase)
- `lessons`: id, grade, subject, title, source_language (default Hindi), status (draft/verified), created_at
- `lesson_checkpoints`: id, lesson_id, order_index, source_text, target_language, translated_text, audio_url, verified_by, verified_at, icon/image_url (optional)
- `languages`: id, name, code (e.g. Santhali, Mundari)
- `quick_translate_log`: id, teacher_id (or session), source_text, target_language, translated_text, status (unverified/reviewed/promoted), created_at
- `schools` / `teachers` (lightweight — just enough to scope sessions, not a full HR system)

## Screens to build

### 1. Teacher Prep Dashboard (before class)
- Browse/search lesson bank by grade + subject
- Pick a lesson → see its checkpoints listed with translation status (verified/pending)
- Button: "Prepare for class" → triggers client-side caching of that lesson's text + audio for offline use
- If a needed lesson doesn't exist yet: simple form to draft a new one (Hindi text per checkpoint), submitted into `status: draft` for a reviewer to translate/verify later — teacher does NOT do translation herself

### 2. Reviewer Dashboard (PALASH resource person)
- Queue of draft/unverified lessons and checkpoints awaiting review
- For each checkpoint: shows Hindi source + AI-suggested translation, editable text field, "Approve" / "Correct & Approve" actions
- Separate queue: `quick_translate_log` entries flagged for review — reviewer can mark "promote to lesson bank" (turns it into a new checkpoint) or dismiss
- Once approved, trigger TTS generation for the checkpoint (stubbed function is fine) and store the resulting audio_url

### 3. Classroom Live View (the main teacher-facing screen, used during class)
Three visually distinct zones on one screen:

**Zone A + B (top, side-by-side, majority of screen space, large readable text):**
- Left: Hindi textbook checkpoint text, current checkpoint highlighted
- Right: verified vernacular translation (text) + a play button for cached audio + optional icon/image
- Navigation: simple next/previous checkpoint controls, large tap targets (this runs on a shared tablet from a few feet away)

**Zone C (bottom, clearly separated — different background color/border, small "Unverified — AI generated" label):**
- Small "Quick Translate" input (speech-to-text mic button + text field)
- Teacher speaks/types an off-script sentence (question from a student, spontaneous example) → live AI translation call → result shown immediately, tagged unverified, visually distinct font/color from Zone A/B
- This entry auto-saves to `quick_translate_log` for later reviewer triage — no teacher action needed to log it

Design must make it visually impossible to confuse Zone C output with Zone A/B verified content — different card style, border, and a persistent "unverified" badge, not just a one-time tooltip.

### 4. (Optional/stretch) Admin/Usage view
- Simple table/chart: lessons by status, most-used lessons, quick-translate volume by language — nothing elaborate, just enough to demo "this is trackable."

## UI/design requirements
- Clean, high-contrast, large text and touch targets — this is read from a few feet away on a shared classroom screen, often by young children too
- Bilingual-first visual hierarchy — Hindi and vernacular text should feel like equal, parallel columns, not primary/secondary
- Use simple icons alongside vocabulary where possible (plant, root, stem, etc.) to support pre-literate learners
- Avoid dense admin-tool aesthetics for the Classroom Live View specifically — it should feel closer to a calm, focused presentation screen than a dashboard
- Follow modern, intentional visual design (not default Bootstrap/Material look) — thoughtful typography, restrained color palette, purposeful whitespace
- Must remain usable on a low-end Android tablet browser, not just desktop

## Non-functional requirements
- Offline-first for the Classroom Live View: once a lesson is "prepared," it must fully function (text + audio playback) with no network
- Quick Translate (Zone C) is the only feature allowed to require live network access
- Keep initial page load and lesson-switch interactions fast — no visible spinner-heavy waits during class

## Explicitly out of scope for this prototype
- Full user auth/permissions system (basic role selection is enough for a demo)
- Real integration with an actual Bhashini/Gemini account (mock/stub the API call, structure the code so a real key can be dropped in later)
- Multi-state/multi-language-family generalization — hardcode Jharkhand, Grades 1–5, Santhali + Mundari as the demo scope

## Deliverable
A working prototype demonstrating: Reviewer approves a lesson → Teacher prepares it offline → Teacher runs the Classroom Live View with cached playback → Teacher uses Quick Translate for an off-script question → that entry appears in the reviewer's pending queue.
