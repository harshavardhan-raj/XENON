import React, { useState } from 'react';
import { Flashcard } from '../../types';
import { FLASHCARD_BANK } from '../../services/flashcardData';
import { syncEngine } from '../../services/syncEngine';
import { ttsAdapter } from '../../services/ttsAdapter';
import { 
  Sprout, 
  Anchor, 
  Leaf, 
  Flower2, 
  Apple, 
  Droplets, 
  Waves, 
  CloudRain, 
  Sun, 
  Eye, 
  Ear, 
  Hand, 
  Binary, 
  PlusCircle, 
  BookOpen, 
  PenTool, 
  Volume2, 
  Tv, 
  RotateCw, 
  Sparkles, 
  X
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sprout,
  Anchor,
  Leaf,
  Flower2,
  Apple,
  Droplets,
  Waves,
  CloudRain,
  Sun,
  Eye,
  Ear,
  Hand,
  Binary,
  PlusCircle,
  BookOpen,
  PenTool
};

interface FlashcardDeckProps {
  onCastCard?: (card: Flashcard) => void;
  standalone?: boolean;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ onCastCard, standalone = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [flippedCardIds, setFlippedCardIds] = useState<Record<string, boolean>>({});
  const [activeCardForCast, setActiveCardForCast] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Filter flashcards
  const filteredCards = FLASHCARD_BANK.filter((card) => {
    if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;
    if (selectedLang !== 'all' && card.target_language !== selectedLang) return false;
    if (selectedGrade !== 'all' && card.grade !== selectedGrade) return false;
    return true;
  });

  const toggleFlip = (cardId: string) => {
    setFlippedCardIds((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handlePlayAudio = async (e: React.MouseEvent, card: Flashcard) => {
    e.stopPropagation();
    setPlayingAudioId(card.id);
    await ttsAdapter.playAudio(card.id, card.vernacular_word, 1.0, () => {
      setPlayingAudioId(null);
    });
  };

  const handleCastToStudent = (e: React.MouseEvent, card: Flashcard) => {
    e.stopPropagation();
    setActiveCardForCast(card.id);
    syncEngine.sendCastFlashcard(card);
    if (onCastCard) {
      onCastCard(card);
    }
  };

  const handleClearCast = () => {
    setActiveCardForCast(null);
    syncEngine.sendClearFlashcard();
  };

  return (
    <div className={standalone ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" : "space-y-4"}>
      
      {/* Header if Standalone */}
      {standalone && (
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Visual Early-Grade Learning Aids (Grades 1–3)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Vernacular Visual Flashcards
            </h1>
            <p className="text-emerald-200 text-sm max-w-2xl">
              High-contrast visual cards pairing tribal vocabulary (Santhali / Mundari) with illustrations and pre-cached audio. Click card to flip, or cast to the student projector!
            </p>
          </div>

          {activeCardForCast && (
            <button
              onClick={handleClearCast}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg transition-all text-xs self-start md:self-auto"
            >
              <X className="w-4 h-4" />
              <span>Clear Projected Flashcard</span>
            </button>
          )}
        </div>
      )}

      {/* Filter Chips Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Chips */}
          <span className="text-xs font-bold text-slate-400 mr-1">Category:</span>
          {['all', 'plants', 'water', 'body', 'math', 'school'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-forest-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Filter */}
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="all">All Languages</option>
            <option value="santhali">Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
            <option value="mundari">Mundari (मुण्डारी)</option>
          </select>

          {/* Grade Filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="all">All Grades</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
          </select>
        </div>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredCards.map((card) => {
          const isFlipped = !!flippedCardIds[card.id];
          const isCast = activeCardForCast === card.id;
          const IconComp = ICON_MAP[card.icon_name] || Sparkles;

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className={`group min-h-[260px] rounded-3xl p-5 border cursor-pointer transition-all duration-300 transform perspective hover:-translate-y-1 relative flex flex-col justify-between select-none ${
                isCast
                  ? 'border-amber-400 ring-4 ring-amber-400/30 bg-amber-50/50 shadow-xl'
                  : isFlipped
                  ? 'bg-forest-900 text-white border-forest-700 shadow-xl'
                  : 'bg-white text-slate-900 border-slate-200 hover:shadow-lg'
              }`}
            >
              {/* Card Top: Category badge + Language */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  isFlipped ? 'bg-forest-800 text-emerald-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  Grade {card.grade} • {card.category}
                </span>

                <div className="flex items-center space-x-1">
                  <span className={`text-[10px] font-bold uppercase ${
                    isFlipped ? 'text-amber-300' : 'text-ochre-700'
                  }`}>
                    {card.target_language}
                  </span>
                  <RotateCw className={`w-3.5 h-3.5 transition-transform ${isFlipped ? 'rotate-180 text-forest-300' : 'text-slate-400'}`} />
                </div>
              </div>

              {/* Card Center: Icon & Word */}
              {!isFlipped ? (
                // FRONT: Hindi & Icon
                <div className="text-center py-4 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 shadow-inner group-hover:scale-110 transition-transform">
                    <IconComp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{card.hindi_word}</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Click to reveal vernacular translation</p>
                  </div>
                </div>
              ) : (
                // BACK: Vernacular & Ol Chiki & Phonetics
                <div className="text-center py-2 space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-forest-800 flex items-center justify-center text-amber-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-xl font-black text-amber-300 leading-snug">
                    {card.vernacular_word}
                  </div>
                  <div className="text-xs text-forest-200 italic font-mono">
                    "{card.romanized}"
                  </div>
                  {card.example_sentence_vernacular && (
                    <div className="text-[11px] text-forest-100 bg-forest-950/70 p-2 rounded-xl border border-forest-800 line-clamp-2">
                      {card.example_sentence_vernacular}
                    </div>
                  )}
                </div>
              )}

              {/* Card Bottom Controls: Play Audio & Cast to Student Screen */}
              <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
                isFlipped ? 'border-forest-800' : 'border-slate-100'
              }`}>
                <button
                  onClick={(e) => handlePlayAudio(e, card)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isFlipped
                      ? 'bg-forest-800 hover:bg-forest-700 text-white'
                      : 'bg-slate-100 hover:bg-forest-50 text-forest-800'
                  }`}
                  title="Pronounce word"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingAudioId === card.id ? 'animate-bounce text-amber-400' : ''}`} />
                  <span>Audio</span>
                </button>

                <button
                  onClick={(e) => handleCastToStudent(e, card)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    isCast
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-ochre-500 hover:bg-ochre-400 text-slate-950'
                  }`}
                  title="Cast this card to classroom projector"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>{isCast ? 'Casting' : 'Cast to Screen'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
