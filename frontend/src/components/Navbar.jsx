import React, { useState } from 'react';
import { 
  Sprout, 
  BarChart3, 
  History, 
  Info, 
  Menu, 
  X, 
  AlertCircle,
  Home,
  Sparkles,
  Brain,
  Layers,
  Sliders,
  Sun,
  Moon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar({ activeTab, setActiveTab, backendStatus, isDarkMode, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: 'overview', label: t('nav_overview', 'Overview'), icon: Home },
    { id: 'catalogue', label: t('nav_catalogue', 'Crop Catalogue'), icon: Layers },
    { id: 'recommend', label: t('nav_recommend', 'Recommend Crop'), icon: Sparkles, highlight: true },
    { id: 'explain', label: t('nav_explain', 'Explain AI'), icon: Brain },
    { id: 'analytics', label: t('nav_analytics', 'Analytics'), icon: BarChart3 },
    { id: 'history', label: t('nav_history', 'History'), icon: History },
    { id: 'about', label: t('nav_about', 'About'), icon: Info },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-stone-200/80 shadow-ios-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-forest-900 to-forest-800 flex items-center justify-center text-white shadow-ios-sm group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-5 h-5 stroke-[2.2] text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-charcoal-900 font-sans">
                  AgriSmart<span className="text-forest-800 font-extrabold ml-0.5">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-sage-100 text-forest-900 border border-sage-200">
                  {t('accuracy_badge', '97.5% Acc')}
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block font-medium">
                {t('brand_subtitle', 'Intelligent Agricultural Decision Platform')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs transition-all duration-200 shadow-ios-sm ${
                      isActive 
                        ? 'bg-forest-900 text-white shadow-ios ring-2 ring-emerald-500/30' 
                        : 'bg-emerald-50 text-forest-900 hover:bg-emerald-100 border border-emerald-200/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-semibold text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-forest-900 text-white shadow-ios-sm'
                      : 'text-stone-600 hover:text-charcoal-900 hover:bg-stone-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Backend Health Badge & Preferences */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              title={backendStatus.connected ? "Flask AI API Connected & Model Ready" : "Connecting to Flask API..."}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                backendStatus.connected 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                backendStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <span>{backendStatus.connected ? 'Model Online' : 'Connecting'}</span>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-stone-600 hover:text-charcoal-900 hover:bg-stone-100 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDarkMode}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Global Language Selector (India & Nepal) */}
            <LanguageSelector />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-charcoal-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-stone-200 px-4 pt-2 pb-5 space-y-2 shadow-ios-lg backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="py-2 border-b border-stone-200/80 mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Language / भाषा</span>
            <LanguageSelector />
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-forest-900 text-white shadow-ios-sm' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-stone-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
