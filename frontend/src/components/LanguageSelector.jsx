import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, Search, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ variant = 'navbar', className = '' }) {
  const { language, setLanguage, currentLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'nepal' | 'india'
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter languages
  const filteredLanguages = languages.filter((lang) => {
    // Search match
    const matchesSearch = 
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      lang.region.toLowerCase().includes(search.toLowerCase()) ||
      lang.code.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // Tab filter
    if (activeTab === 'nepal') {
      return lang.country.includes('Nepal');
    }
    if (activeTab === 'india') {
      return lang.country.includes('India') && lang.code !== 'en';
    }
    return true;
  });

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
    setSearch('');
  };

  if (variant === 'hero') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-900/90 hover:bg-forest-800 text-agri-300 text-xs font-bold border border-forest-700 shadow-sm transition-all hover:scale-105 active:scale-95"
          title="Switch Language / भाषा परिवर्तन गर्नुहोस्"
          aria-label="Language Selector"
        >
          <span className="text-sm">{currentLanguage.flag}</span>
          <span className="font-sans font-bold">{currentLanguage.nativeName}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && renderModal()}
      </div>
    );
  }

  // Default navbar variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-forest-950 text-white hover:bg-forest-900 border border-emerald-500/30 text-xs font-bold transition-all shadow-ios-sm hover:ring-2 hover:ring-emerald-400/40"
        title="Change Language / भाषा बदलें / भाषा छान्नुहोस्"
        aria-label="Language Switcher"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="hidden sm:inline-block max-w-[90px] truncate">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && renderModal()}
    </div>
  );

  function renderModal() {
    return (
      <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[400px] rounded-3xl bg-forest-950/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl z-50 text-white p-4 animate-in fade-in slide-in-from-top-2 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-forest-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {t('lang_select_title', 'Regional Languages (India & Nepal)')}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative my-3">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('lang_search_placeholder', 'Search language (e.g. Nepali, Maithili, Hindi)...')}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-forest-900/90 border border-forest-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
            autoFocus
          />
        </div>

        {/* Region Filter Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-forest-900/80 border border-forest-800 mb-3 text-[11px]">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-1 rounded-lg font-bold transition-all ${
              activeTab === 'all' ? 'bg-emerald-500 text-forest-950 shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            All (17)
          </button>
          <button
            onClick={() => setActiveTab('nepal')}
            className={`py-1 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'nepal' ? 'bg-emerald-500 text-forest-950 shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <span>🇳🇵 Nepal (5)</span>
          </button>
          <button
            onClick={() => setActiveTab('india')}
            className={`py-1 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'india' ? 'bg-emerald-500 text-forest-950 shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <span>🇮🇳 India (11)</span>
          </button>
        </div>

        {/* Language Grid List */}
        <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-emerald-600">
          {filteredLanguages.length === 0 ? (
            <div className="py-6 text-center text-xs text-stone-400">
              No matching regional language found.
            </div>
          ) : (
            filteredLanguages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l.code)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400/60 text-white shadow-sm'
                      : 'bg-forest-900/60 hover:bg-forest-900 border-forest-800/80 text-stone-200 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl leading-none">{l.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{l.nativeName}</span>
                        <span className="text-[10px] text-stone-400">({l.name})</span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-medium">{l.region}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-forest-950 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="mt-3 pt-2 border-t border-forest-800 text-[10px] text-stone-400 flex items-center justify-between">
          <span>Covers official languages across India & Nepal</span>
          <span className="text-emerald-400 font-bold">17 Languages</span>
        </div>
      </div>
    );
  }
}
