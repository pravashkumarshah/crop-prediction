import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Settings2, 
  Minimize2, 
  Maximize2, 
  X, 
  HelpCircle, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Brain,
  Sprout,
  Users,
  Wheat,
  UserCheck
} from 'lucide-react';

/**
 * CONTEXTUAL DIALOGUES FOR BOTH CHARACTERS
 * - kisan: Focuses on practical field agriculture, seasonal sowing, soil feel, and farmer wisdom.
 * - specialist: Agro Specialist Pravaash Kumar Shah — precision telemetry, neural network metrics, and XAI Shapley values.
 */
const MASCOT_DIALOGUES = {
  kisan: {
    name: 'Kisan Balram',
    title: 'Farmer Guide',
    avatarTag: '🌾 Field Companion',
    overview: {
      state: 'greeting',
      title: 'Ram Ram & Welcome!',
      speech: "Namaste! I'm Kisan Balram. I'll guide you through testing your soil conditions, picking the right season, and finding the best crop for your fields.",
      actionLabel: 'Recommend Crop',
      actionTab: 'recommend'
    },
    catalogue: {
      state: 'explaining',
      title: '22 Traditional & Cash Crops',
      speech: "Every crop here has been grown on Indian soils. Notice each crop needs different rainfall and heat—from flooded Rice to dry Chickpea!",
      actionLabel: 'Check Pulses',
      filterCategory: 'Pulse / Legume'
    },
    recommend: {
      state: 'pointing',
      title: 'Enter Your Soil & Rain',
      speech: "Enter your lab test numbers: Nitrogen (N) for lush green growth, Phosphorus (P) for deep roots, and Potassium (K) to protect against dry spells.",
      actionLabel: '1-Click Presets',
      actionTab: 'overview'
    },
    recommend_result: {
      state: 'success',
      title: 'Field Recommendation Ready!',
      speech: "Shabash! The AI found a strong match for your land. Remember: always verify with your local weather and seed quality before sowing!",
      actionLabel: 'See Why',
      actionTab: 'explain'
    },
    explain: {
      state: 'thinking',
      title: 'What Influenced This Pick?',
      speech: "Here you can see which soil nutrient or rainfall amount had the biggest say in picking this crop for your land.",
      actionLabel: 'Inspect Metrics',
      actionTab: 'analytics'
    },
    analytics: {
      state: 'explaining',
      title: 'Fair & Balanced Data',
      speech: "The computer was taught with 100 careful farm records for each of the 22 crops—so no single crop gets unfair favor!",
      actionLabel: 'Browse All 22 Crops',
      actionTab: 'catalogue'
    },
    history: {
      state: 'idle',
      title: 'Your Farm Logbook',
      speech: "Here are all the soil tests you've run today. You can reload any previous field test with one click.",
      actionLabel: 'New Test',
      actionTab: 'recommend'
    },
    about: {
      state: 'idle',
      title: 'How AgriSmart Works',
      speech: "Built with university precision to put deep machine learning into the hands of farmers, students, and agronomists.",
      actionLabel: 'Dashboard',
      actionTab: 'overview'
    }
  },

  specialist: {
    name: 'Agro Specialist Pravaash Kumar Shah',
    title: 'Precision Agronomist',
    avatarTag: '🔬 ML & Soil AI',
    overview: {
      state: 'greeting',
      title: 'AgriSmart Neural Engine',
      speech: "Welcome! I'm Agro Specialist Pravaash Kumar Shah. I analyze multidimensional soil chemistry vectors through our 97.5% accurate Keras sequential network.",
      actionLabel: 'Run Inference',
      actionTab: 'recommend'
    },
    catalogue: {
      state: 'explaining',
      title: 'Canonical 22-Class Benchmark',
      speech: "Our dataset contains exactly 2,200 empirical field observations (100 per class = 4.55% representation). Note: this representation percentage is not a yield guarantee.",
      actionLabel: 'Filter Categories',
      filterCategory: 'Cereal Grain / Staple'
    },
    recommend: {
      state: 'pointing',
      title: '7-Dimensional Feature Vector',
      speech: "We calibrate R^7: N, P, K (kg/ha), temperature (°C), humidity (%), pH (1-14), and rainfall (mm). Values are normalized via fitted StandardScaler.",
      actionLabel: 'Feature Distributions',
      actionTab: 'analytics'
    },
    recommend_result: {
      state: 'success',
      title: 'Softmax Probability Generated',
      speech: "Inference completed! Top-3 probabilities reflect empirical statistical class probabilities across historical data, verified alongside agronomic bounds.",
      actionLabel: 'Feature Attributions',
      actionTab: 'explain'
    },
    explain: {
      state: 'explaining',
      title: 'Feature Attribution & SHAP',
      speech: "We calculate directional feature gradients. Positive attributions indicate the feature nudged the decision boundary toward the predicted crop.",
      actionLabel: 'Benchmark Curves',
      actionTab: 'analytics'
    },
    analytics: {
      state: 'research',
      title: 'Held-Out Test Set Verification',
      speech: "Evaluated on 440 held-out samples. Overall accuracy: 97.5%, test loss: 0.0563, with Macro-F1 of 0.97 across all 22 distinct botanical classes.",
      actionLabel: 'Open Catalogue',
      actionTab: 'catalogue'
    },
    history: {
      state: 'idle',
      title: 'Prediction Audit Trail',
      speech: "Persistent JSON history log. Load any past 7-feature state directly back into the inference pipeline for longitudinal comparative studies.",
      actionLabel: 'New Recommendation',
      actionTab: 'recommend'
    },
    about: {
      state: 'research',
      title: 'Mathematical Architecture',
      speech: "Layer architecture: StandardScaler → Dense(128, ReLU) → Dropout(0.2) → Dense(64, ReLU) → Dense(22, Softmax) → LabelEncoder inverse mapping.",
      actionLabel: 'System Overview',
      actionTab: 'overview'
    }
  }
};

/**
 * SECTION-LEVEL SCROLL AWARE DIALOGUES
 */
const SECTION_DIALOGUES = {
  kisan: {
    'overview-hero': {
      state: 'greeting',
      title: 'Welcome to AgriSmart 2027!',
      speech: "Namaste! I'm Kisan Balram. Here you can test your field soil, pick the best crops, and protect your family's harvest.",
      actionLabel: 'Recommend Crop',
      actionTab: 'recommend'
    },
    'overview-badges': {
      state: 'explaining',
      title: 'Tested Across 2,200 Fields',
      speech: "Every number here comes from verified Indian soil records! 22 traditional and cash crops tested with 97.5% real accuracy.",
      actionLabel: 'Explore 22 Crops',
      actionTab: 'catalogue'
    },
    'overview-presets': {
      state: 'pointing',
      title: "Pravaash's Quick Soil Profiles",
      speech: "Click any profile like Rice, Chickpea, or Coffee to see how the AI predicts in seconds for different lands!",
      actionLabel: 'Test Rice',
      actionTab: 'recommend'
    },
    'overview-steps': {
      state: 'explaining',
      title: 'Simple 3-Step Journey',
      speech: "Just 3 steps: enter your soil test, let the neural computer calculate, and see your best crop with confidence percentages!",
      actionLabel: 'Start Now',
      actionTab: 'recommend'
    },
    'recommend-inputs': {
      state: 'pointing',
      title: 'Measure Your Soil Correctly',
      speech: "Fill in your lab soil readings. Tap any question mark if you need guidance on Nitrogen, Phosphorus, or rain requirements!",
      actionLabel: null
    },
    'catalogue-search': {
      state: 'greeting',
      title: 'Explore All 22 Crops',
      speech: "Browse our complete crop repository! Search by crop name, or filter by Pulses, Cereals, Fruits, or Commercial crops.",
      actionLabel: null
    },
    'catalogue-grid': {
      state: 'explaining',
      title: 'Compare Crop Soil Needs',
      speech: "Click any crop card to inspect its typical Nitrogen, rain, and heat requirements before you sow!",
      actionLabel: null
    },
    'analytics-summary': {
      state: 'explaining',
      title: 'Fair & Balanced Data',
      speech: "The AI was trained on exactly 100 field observations for each of the 22 crops, so no single crop is favored unfairly.",
      actionLabel: null
    }
  },
  specialist: {
    'overview-hero': {
      state: 'greeting',
      title: 'AgriSmart Neural Engine',
      speech: "Welcome! I'm Agro Specialist Pravaash Kumar Shah. Our Keras neural model is online with 97.5% validated test accuracy.",
      actionLabel: 'Run Inference',
      actionTab: 'recommend'
    },
    'overview-badges': {
      state: 'explaining',
      title: 'Verified Model Telemetry',
      speech: "Real evaluation metrics: 97.5% accuracy, 7 input dimensions, 22 classes, and 2,200 empirical field observations (100 per class = 4.55% share).",
      actionLabel: 'View Analytics',
      actionTab: 'analytics'
    },
    'overview-presets': {
      state: 'pointing',
      title: '1-Click Soil Telemetry Profiles',
      speech: "Select any soil profile to instantly load calibrated NPK and microclimate vectors into our inference pipeline.",
      actionLabel: 'Run Recommendation',
      actionTab: 'recommend'
    },
    'overview-steps': {
      state: 'explaining',
      title: 'Sequential Pipeline Flow',
      speech: "Inputs are standardized via fitted StandardScaler, passed through 128-node and 64-node ReLU hidden layers, and resolved via Softmax.",
      actionLabel: 'Architecture Specs',
      actionTab: 'about'
    },
    'recommend-inputs': {
      state: 'pointing',
      title: '7-Dimensional Agronomic Vector',
      speech: "Calibrate Nitrogen, Phosphorus, Potassium (kg/ha), temperature (°C), relative humidity (%), pH (1-14), and rainfall (mm).",
      actionLabel: null
    },
    'catalogue-search': {
      state: 'explaining',
      title: 'Canonical Class Registry',
      speech: "Dataset representation is exactly 100 observations (4.55%) per crop class. Note: representation share is not a harvest yield guarantee.",
      actionLabel: null
    },
    'catalogue-grid': {
      state: 'pointing',
      title: 'Empirical Distribution Profiles',
      speech: "Select any crop card to inspect parametric bounds, dataset distribution statistics, and model support indicators.",
      actionLabel: null
    },
    'analytics-summary': {
      state: 'research',
      title: 'Held-Out Test Set Verification',
      speech: "Evaluated on 440 held-out samples. Overall accuracy: 97.5%, test loss: 0.0563, with Macro-F1 of 0.97 across all 22 distinct botanical classes.",
      actionLabel: null
    }
  }
};

export default function AgriMascot({
  activeTab = 'overview',
  setActiveTab = () => {},
  predictionResult = null,
  isLoading = false,
  errorMessage = null,
  externalExplanation = null,
  onClearExplanation = () => {}
}) {
  // Mascot character preference: 'kisan' | 'specialist'
  const [activeCharacter, setActiveCharacter] = useState(() => {
    try {
      return localStorage.getItem('agrismart_mascot_char') || 'kisan';
    } catch {
      return 'kisan';
    }
  });

  // Mascot UI preferences
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      return localStorage.getItem('agrismart_mascot_minimized') === 'true';
    } catch {
      return false;
    }
  });

  const [speechDisabled, setSpeechDisabled] = useState(() => {
    try {
      return localStorage.getItem('agrismart_mascot_speech_muted') === 'true';
    } catch {
      return false;
    }
  });

  const [speechDismissed, setSpeechDismissed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);

  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Automatic character assignment based on page role (Requirement 4)
  useEffect(() => {
    if (activeTab === 'catalogue') {
      setActiveCharacter('kisan');
    } else if (['recommend', 'explain', 'analytics'].includes(activeTab)) {
      setActiveCharacter('specialist');
    }
  }, [activeTab]);

  // Scroll detection with debounce (Requirement 3: Scrolling state)
  const scrollTimeoutRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // IntersectionObserver to detect which page section is visible
  useEffect(() => {
    const elements = document.querySelectorAll('[data-mascot-section]');
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(e => e.isIntersecting && e.intersectionRatio >= 0.25);
        if (visibleEntry) {
          const sec = visibleEntry.target.getAttribute('data-mascot-section');
          if (sec && sec !== activeSectionId) {
            setActiveSectionId(sec);
            setSpeechDismissed(false);
          }
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [activeTab, activeSectionId]);

  // Save character changes
  const switchCharacter = (charKey) => {
    setActiveCharacter(charKey);
    setSpeechDismissed(false);
    try {
      localStorage.setItem('agrismart_mascot_char', charKey);
    } catch {
      // Ignore storage errors
    }
  };

  // Re-open speech bubble whenever the tab or prediction result changes
  useEffect(() => {
    setSpeechDismissed(false);
  }, [activeTab, predictionResult]);

  // Handle external contextual explanations from hover/focus
  useEffect(() => {
    if (externalExplanation) {
      setSpeechDismissed(false);
    }
  }, [externalExplanation]);

  // Compute active dialogue
  const charConfig = MASCOT_DIALOGUES[activeCharacter] || MASCOT_DIALOGUES.kisan;
  const sectionConfig = SECTION_DIALOGUES[activeCharacter] || SECTION_DIALOGUES.kisan;

  const activeDialogue = useMemo(() => {
    if (errorMessage) {
      return {
        state: 'error',
        title: 'Needs Attention',
        speech: `Notice: ${errorMessage}. Please verify your soil values are within normal agronomic ranges.`,
        actionLabel: 'Reset Form',
        actionTab: 'recommend'
      };
    }

    if (isLoading) {
      return {
        state: 'loading',
        title: 'Computing Recommendation...',
        speech: activeCharacter === 'kisan'
          ? "Consulting field data and historical harvests to find your best crop match..."
          : "Standardizing features and running feed-forward inference through 22 softmax nodes...",
        actionLabel: null
      };
    }

    if (externalExplanation) {
      return {
        state: 'pointing',
        title: externalExplanation.title || 'Contextual Advisory',
        speech: externalExplanation.text || externalExplanation,
        actionLabel: null
      };
    }

    if (activeTab === 'recommend' && predictionResult) {
      return charConfig.recommend_result;
    }

    // Check if a section-level dialogue is active
    if (activeSectionId && sectionConfig[activeSectionId]) {
      return sectionConfig[activeSectionId];
    }

    return charConfig[activeTab] || charConfig.overview;
  }, [activeTab, predictionResult, isLoading, errorMessage, externalExplanation, activeCharacter, charConfig, sectionConfig, activeSectionId]);

  // Active pose state
  const mascotState = isScrolling ? 'scrolling' : (activeDialogue.state || 'idle');

  return (
    <aside 
      aria-label="AgriSmart AI Interactive Companions"
      className="fixed bottom-5 left-4 sm:left-6 z-40 select-none pointer-events-auto"
    >
      {isMinimized ? (
        /* Minimized Floating Pill */
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 border border-stone-200 shadow-ios-lg hover:shadow-ios hover:scale-105 active:scale-95 transition-all text-charcoal-900 backdrop-blur-md"
          title="Open AI Agricultural Companion"
          aria-label="Open AI Agricultural Companion"
        >
          <div className="relative w-6 h-6 rounded-full bg-forest-900 flex items-center justify-center text-white text-xs">
            {activeCharacter === 'kisan' ? '🌾' : '🔬'}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-tight text-forest-900">
            {activeCharacter === 'kisan' ? 'Kisan Balram' : 'Agro Specialist Pravaash'}
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-forest-900 transition-colors" />
        </button>
      ) : (
        /* Expanded Mascot Container */
        <div className="relative flex flex-col items-start gap-2 max-w-[340px] sm:max-w-[380px]">
          
          {/* Contextual Speech Bubble */}
          {!speechDismissed && !speechDisabled && (
            <div 
              role="region"
              aria-live="polite"
              className="relative w-full rounded-3xl bg-white/95 border border-stone-200/90 shadow-ios-lg p-4 text-charcoal-900 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {/* Bottom speech pointer */}
              <div className="absolute -bottom-2 left-9 w-4 h-4 bg-white border-r border-b border-stone-200/90 transform rotate-45" />

              {/* Speech Header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs">{activeCharacter === 'kisan' ? '🌾' : '🔬'}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forest-800">
                    {activeDialogue.title}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1 rounded-lg text-stone-400 hover:text-charcoal-900 hover:bg-stone-100 transition-colors"
                    title="Companion Preferences"
                    aria-label="Companion Preferences"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSpeechDismissed(true);
                      if (externalExplanation) onClearExplanation();
                    }}
                    className="p-1 rounded-lg text-stone-400 hover:text-charcoal-900 hover:bg-stone-100 transition-colors"
                    title="Dismiss"
                    aria-label="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Speech Content */}
              <p className="text-xs text-charcoal-800 mt-2 leading-relaxed font-normal">
                "{activeDialogue.speech}"
              </p>

              {/* Optional Quick Action in Dialogue */}
              {activeDialogue.actionLabel && (
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400 font-medium">Quick Step</span>
                  <button
                    onClick={() => {
                      if (activeDialogue.actionTab) {
                        setActiveTab(activeDialogue.actionTab);
                      }
                      setSpeechDismissed(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-[11px] font-semibold shadow-ios-sm transition-all"
                  >
                    <span>{activeDialogue.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Preferences Drawer Popover */}
          {showSettings && (
            <div className="w-full rounded-3xl bg-forest-950/95 border border-forest-800 p-4 text-white shadow-ios-lg backdrop-blur-xl animate-in fade-in duration-200 space-y-3">
              <div className="flex items-center justify-between border-b border-forest-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Companion Settings
                </span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Character Switcher Inside Settings */}
              <div>
                <span className="text-[11px] text-stone-300 block mb-1.5 font-medium">Select Active Companion</span>
                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-forest-900/90 border border-forest-800 text-xs">
                  <button
                    onClick={() => switchCharacter('kisan')}
                    className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                      activeCharacter === 'kisan'
                        ? 'bg-emerald-500 text-forest-950 shadow-sm'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <span>🌾 Kisan Balram</span>
                  </button>
                  <button
                    onClick={() => switchCharacter('specialist')}
                    className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                      activeCharacter === 'specialist'
                        ? 'bg-emerald-500 text-forest-950 shadow-sm'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <span>🔬 Pravaash Shah</span>
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 text-xs pt-1">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-stone-300">Speech Bubble Hints</span>
                  <input
                    type="checkbox"
                    checked={!speechDisabled}
                    onChange={(e) => setSpeechDisabled(!e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-stone-300">Reduced Motion</span>
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={(e) => setReducedMotion(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Interactive Mascot Character & Dock Bar */}
          <div className="flex items-center gap-2">
            
            {/* The SVG Animated Character Body */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setSpeechDismissed(false)}
              className="relative cursor-pointer group"
              title={`Click ${activeCharacter === 'kisan' ? 'Kisan Balram' : 'Agro Specialist Pravaash Kumar Shah'} for advice`}
            >
              {/* Soft Ambient Halo */}
              <div 
                className={`absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500/30 to-sage-400/20 blur-md transition-opacity duration-300 ${
                  isHovered || mascotState === 'thinking' || mascotState === 'loading' ? 'opacity-100 scale-105' : 'opacity-40'
                }`} 
              />

              {/* Character Badge / Visual Container */}
              <div
                style={{
                  transform: reducedMotion 
                    ? 'none' 
                    : isScrolling
                      ? 'scale(0.98) rotate(3deg) translateY(-2px)'
                      : isHovered 
                        ? 'scale(1.05) translateY(-2px)' 
                        : 'translateY(0px)',
                  transition: reducedMotion ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-forest-950 border border-forest-800 shadow-ios-lg p-1.5 flex items-center justify-center overflow-visible"
              >
                {activeCharacter === 'kisan' ? (
                  <FarmerCharacterSVG state={mascotState} reducedMotion={reducedMotion} />
                ) : (
                  <SpecialistCharacterSVG state={mascotState} reducedMotion={reducedMotion} />
                )}

                {/* State Tag Pin */}
                <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-forest-900 border border-emerald-400/80 text-[10px] shadow-sm">
                  {mascotState === 'greeting' && '👋'}
                  {mascotState === 'success' && '🌟'}
                  {mascotState === 'error' && '❓'}
                  {mascotState === 'research' && '🔬'}
                  {mascotState === 'thinking' && '💭'}
                  {mascotState === 'loading' && '⚡'}
                  {mascotState === 'scrolling' && '📜'}
                  {mascotState === 'explaining' && '💡'}
                  {mascotState === 'pointing' && '👉'}
                  {mascotState === 'idle' && (activeCharacter === 'kisan' ? '🌾' : '🌱')}
                </span>
              </div>
            </div>

            {/* Quick Dock Control Capsule */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-ios-sm text-charcoal-800 backdrop-blur-md">
              {/* Character Switcher Pill */}
              <button
                onClick={() => switchCharacter(activeCharacter === 'kisan' ? 'specialist' : 'kisan')}
                className="flex items-center gap-1 px-2 py-1 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-forest-950 text-[11px] font-bold transition-all"
                title={`Switch to ${activeCharacter === 'kisan' ? 'Agro Specialist Pravaash' : 'Kisan Balram'}`}
              >
                <span>{activeCharacter === 'kisan' ? '🌾 Kisan' : '🔬 Pravaash'}</span>
              </button>

              <button
                onClick={() => setSpeechDisabled(!speechDisabled)}
                className={`p-1.5 rounded-xl transition-colors ${
                  speechDisabled ? 'text-stone-400 hover:text-stone-600' : 'text-emerald-700 hover:bg-stone-100'
                }`}
                title={speechDisabled ? 'Unmute speech bubble' : 'Mute speech bubble'}
                aria-label={speechDisabled ? 'Unmute speech bubble' : 'Mute speech bubble'}
              >
                {speechDisabled ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-charcoal-900 hover:bg-stone-100 transition-colors"
                title="Minimize companion"
                aria-label="Minimize companion"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}
    </aside>
  );
}

/**
 * 1. FARMER CHARACTER SVG (Kisan Balram)
 * - Subtle sage-green turban / pagri with fold details
 * - Simple traditional kurta & olive vest with wheat stalk detail
 * - Animated greeting wave, thinking head-tilt, smiling arch eyes, pointing arm, scrolling tilt
 */
function FarmerCharacterSVG({ state = 'idle', reducedMotion = false }) {
  const isGreeting = state === 'greeting';
  const isPointing = state === 'pointing';
  const isThinking = state === 'thinking';
  const isSuccess = state === 'success';
  const isScrolling = state === 'scrolling';
  const isLoading = state === 'loading';

  return (
    <svg 
      viewBox="0 0 64 64" 
      className={`w-full h-full select-none ${reducedMotion ? '' : 'animate-float-gentle'}`}
    >
      <defs>
        {/* Soft Turban Gradient */}
        <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A7C59" />
          <stop offset="50%" stopColor="#355E40" />
          <stop offset="100%" stopColor="#25462D" />
        </linearGradient>

        {/* Skin Tone Gradient */}
        <linearGradient id="farmerSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F1C27D" />
          <stop offset="100%" stopColor="#E0AC69" />
        </linearGradient>

        {/* Kurta & Vest Gradients */}
        <linearGradient id="vestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E5339" />
          <stop offset="100%" stopColor="#1B3824" />
        </linearGradient>
      </defs>

      {/* Background Soft Aura */}
      <circle cx="32" cy="32" r="30" fill="#0C2014" />

      {/* Body / Kurta & Nehru Vest */}
      <g>
        {/* Off-white Kurta shoulders */}
        <path d="M16 62 Q32 50 48 62 L48 64 L16 64 Z" fill="#F8F6F0" />
        {/* Olive Nehru Vest */}
        <path d="M20 54 Q32 48 44 54 L44 64 L20 64 Z" fill="url(#vestGrad)" stroke="#4A7C59" strokeWidth="0.8" />
        {/* Vest Collar */}
        <path d="M26 50 L32 54 L38 50" fill="none" stroke="#F8F6F0" strokeWidth="1.2" />
        {/* Wheat Stalk Brooch on Vest */}
        <path d="M40 56 Q42 53 43 50" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="43" cy="49" rx="1" ry="1.5" fill="#FBBF24" transform="rotate(25 43 49)" />
      </g>

      {/* Farmer Neck */}
      <rect x="28" y="42" width="8" height="6" rx="2" fill="url(#farmerSkin)" />

      {/* Farmer Face */}
      <circle cx="32" cy="32" r="14" fill="url(#farmerSkin)" />

      {/* Turban / Pagri (Subtle green folds) */}
      <g>
        {/* Main Turban Dome */}
        <ellipse cx="32" cy="22" rx="16" ry="11" fill="url(#turbanGrad)" />
        {/* Pagri Fold Swirls */}
        <path d="M17 24 Q32 16 47 24" fill="none" stroke="#689A77" strokeWidth="1.5" />
        <path d="M20 20 Q32 12 44 20" fill="none" stroke="#25462D" strokeWidth="1.2" />
        {/* Front Turban Knot / Brooch */}
        <circle cx="32" cy="18" r="2.2" fill="#FBBF24" stroke="#FFF" strokeWidth="0.5" />
        {/* Sprout motif tucked in turban */}
        <path d="M32 16 Q34 11 36 12 Q34 14 32 16" fill="#34D399" />
      </g>

      {/* Ears */}
      <circle cx="18" cy="33" r="2.5" fill="url(#farmerSkin)" />
      <circle cx="46" cy="33" r="2.5" fill="url(#farmerSkin)" />

      {/* Eyes based on state */}
      {isSuccess || isGreeting ? (
        /* Happy arch eyes */
        <g fill="none" stroke="#163324" strokeWidth="1.8" strokeLinecap="round">
          <path d="M25 31 Q28 28 30 31" />
          <path d="M34 31 Q36 28 39 31" />
        </g>
      ) : (
        /* Open warm friendly eyes */
        <g>
          <ellipse cx="27" cy="31" rx="2" ry="2.2" fill="#163324" />
          <ellipse cx="37" cy="31" rx="2" ry="2.2" fill="#163324" />
          <circle cx="27.8" cy="30.2" r="0.8" fill="#FFFFFF" />
          <circle cx="37.8" cy="30.2" r="0.8" fill="#FFFFFF" />
        </g>
      )}

      {/* Friendly Mustache & Smile */}
      <g>
        {/* Neat curved mustache */}
        <path d="M27 36 Q32 37 37 36 Q34 39 32 38 Q30 39 27 36" fill="#2E4433" />
        {/* Gentle smile */}
        <path d="M29 39 Q32 42 35 39" fill="none" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Animated Arm / Hand actions */}
      {isGreeting && (
        /* Waving right hand */
        <g className={reducedMotion ? '' : 'origin-[48px_48px] animate-bounce'}>
          <path d="M44 48 Q52 40 54 34" stroke="url(#farmerSkin)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="54" cy="33" r="3" fill="url(#farmerSkin)" />
          {/* Small wheat sprig in waving hand */}
          <path d="M55 33 L58 28" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      {isPointing && (
        /* Pointing hand toward data */
        <g>
          <path d="M44 50 Q54 48 58 46" stroke="url(#farmerSkin)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <circle cx="58" cy="46" r="2.8" fill="url(#farmerSkin)" />
        </g>
      )}

      {isScrolling && (
        /* Breeze / walking lines while scrolling through farm */
        <g stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
          <line x1="10" y1="26" x2="5" y2="28" />
          <line x1="8" y1="36" x2="3" y2="38" />
          <line x1="12" y1="46" x2="6" y2="48" />
        </g>
      )}

      {(isThinking || isLoading) && (
        /* Thought bubbles floating up */
        <g className={reducedMotion ? '' : 'animate-pulse'}>
          <circle cx="48" cy="18" r="1.5" fill="#34D399" />
          <circle cx="52" cy="13" r="2.2" fill="#34D399" />
          <circle cx="56" cy="8" r="3" fill="#34D399" />
        </g>
      )}
    </svg>
  );
}

/**
 * 2. AGRO SPECIALIST CHARACTER SVG (Agro Specialist Pravaash Kumar Shah)
 * - Modern Indian agronomist with styled hair & wireframe spectacles
 * - Deep forest-green field technician jacket with collar & ID badge
 * - Digital tablet displaying live soil wave & plant sensor
 * - Animated gestures: HUD analysis, pointer stylus, celebratory sparkles, scroll scan
 */
function SpecialistCharacterSVG({ state = 'idle', reducedMotion = false }) {
  const isGreeting = state === 'greeting';
  const isPointing = state === 'pointing';
  const isThinking = state === 'thinking';
  const isSuccess = state === 'success';
  const isResearch = state === 'research';
  const isScrolling = state === 'scrolling';
  const isLoading = state === 'loading';

  return (
    <svg 
      viewBox="0 0 64 64" 
      className={`w-full h-full select-none ${reducedMotion ? '' : 'animate-float-gentle'}`}
    >
      <defs>
        {/* Field Jacket Gradient */}
        <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E452C" />
          <stop offset="60%" stopColor="#143220" />
          <stop offset="100%" stopColor="#0B1E13" />
        </linearGradient>

        {/* Specialist Skin Tone */}
        <linearGradient id="specSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9CF95" />
          <stop offset="100%" stopColor="#E2AE70" />
        </linearGradient>

        {/* Digital Tablet Screen */}
        <linearGradient id="tabletScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>

      {/* Background Soft Aura */}
      <circle cx="32" cy="32" r="30" fill="#081A10" />

      {/* Field Jacket & Shoulders */}
      <g>
        <path d="M14 62 Q32 48 50 62 L50 64 L14 64 Z" fill="url(#jacketGrad)" stroke="#34D399" strokeWidth="0.8" />
        {/* Tech Zipper & Collar */}
        <line x1="32" y1="50" x2="32" y2="64" stroke="#34D399" strokeWidth="1.2" strokeDasharray="2 1" />
        <path d="M26 48 L32 53 L38 48" fill="none" stroke="#6EE7B7" strokeWidth="1.2" />
        {/* Agronomist ID Badge on lapel */}
        <rect x="20" y="54" width="6" height="4" rx="1" fill="#FFFFFF" />
        <circle cx="22" cy="56" r="1" fill="#10B981" />
        <line x1="24" y1="56" x2="25.5" y2="56" stroke="#064E3B" strokeWidth="0.8" />
      </g>

      {/* Neck */}
      <rect x="28" y="41" width="8" height="6" rx="2" fill="url(#specSkin)" />

      {/* Head / Face */}
      <circle cx="32" cy="30" r="13" fill="url(#specSkin)" />

      {/* Modern Haircut */}
      <path 
        d="M19 28 Q20 16 32 15 Q44 16 45 28 Q40 18 32 18 Q23 18 19 28 Z" 
        fill="#1C1917" 
      />
      {/* Hair styling texture */}
      <path d="M22 20 Q28 17 34 20" stroke="#292524" strokeWidth="1" fill="none" />

      {/* Ears */}
      <circle cx="19" cy="31" r="2" fill="url(#specSkin)" />
      <circle cx="45" cy="31" r="2" fill="url(#specSkin)" />

      {/* Smart Wireframe Spectacles / Analytical Lens */}
      <g stroke="#34D399" strokeWidth="1.2" fill="rgba(52, 211, 153, 0.15)">
        <rect x="22" y="27" width="8" height="6" rx="2" />
        <rect x="34" y="27" width="8" height="6" rx="2" />
        <line x1="30" y1="30" x2="34" y2="30" strokeWidth="1.2" />
      </g>

      {/* Eyes behind lenses */}
      {isSuccess ? (
        <g fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round">
          <path d="M24 30 Q26 28 28 30" />
          <path d="M36 30 Q38 28 40 30" />
        </g>
      ) : (
        <g>
          <circle cx="26" cy="30" r="1.6" fill="#064E3B" />
          <circle cx="38" cy="30" r="1.6" fill="#064E3B" />
          <circle cx="26.6" cy="29.4" r="0.6" fill="#FFFFFF" />
          <circle cx="38.6" cy="29.4" r="0.6" fill="#FFFFFF" />
        </g>
      )}

      {/* Smile */}
      <path d="M29 37 Q32 40 35 37" fill="none" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" />

      {/* Digital Field Tablet held by specialist */}
      <g>
        {/* Tablet Frame */}
        <rect x="38" y="44" width="16" height="18" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.8" />
        {/* Tablet Screen with Live Soil Readings */}
        <rect x="40" y="46" width="12" height="14" rx="1" fill="url(#tabletScreen)" />
        {/* Live wave telemetry line */}
        <path d="M41 53 L43 51 L45 55 L47 50 L49 53 L51 53" fill="none" stroke="#34D399" strokeWidth="0.8" />
        {/* Micro status LEDs */}
        <circle cx="42" cy="48" r="0.6" fill="#10B981" />
        <circle cx="44" cy="48" r="0.6" fill="#38BDF8" />
        {/* Holding hand thumb */}
        <circle cx="38" cy="52" r="1.8" fill="url(#specSkin)" />
      </g>

      {/* Active Research Hologram Beam */}
      {(isResearch || isThinking || isLoading) && (
        <g className={reducedMotion ? '' : 'animate-pulse'}>
          <line x1="46" y1="44" x2="48" y2="38" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="48" cy="36" r="2" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
        </g>
      )}

      {/* Pointing Gesture */}
      {isPointing && (
        <g>
          <line x1="18" y1="52" x2="8" y2="46" stroke="url(#specSkin)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="7" cy="45" r="2.5" fill="url(#specSkin)" />
        </g>
      )}

      {/* Scrolling Telemetry Scan */}
      {isScrolling && (
        <g stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.85">
          <line x1="8" y1="28" x2="3" y2="29" strokeDasharray="2 2" />
          <line x1="7" y1="38" x2="2" y2="40" strokeDasharray="2 2" />
          <line x1="9" y1="48" x2="4" y2="50" strokeDasharray="2 2" />
        </g>
      )}

      {/* Greeting wave with stylus */}
      {isGreeting && (
        <g className={reducedMotion ? '' : 'origin-[18px_50px] animate-bounce'}>
          <path d="M18 52 Q12 44 10 38" stroke="url(#specSkin)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <circle cx="10" cy="37" r="2.5" fill="url(#specSkin)" />
          {/* Stylus in hand */}
          <line x1="8" y1="39" x2="7" y2="32" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
