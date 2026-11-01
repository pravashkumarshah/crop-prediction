import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  CheckCircle2, 
  MessageSquare, 
  RefreshCw, 
  Volume2, 
  ChevronRight,
  ShieldCheck,
  Leaf,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const DOCTOR_TIPS = [
  {
    en: "Balanced Nitrogen (N) is crucial for vegetative growth, but excess can burn young seedlings and promote vegetative overgrowth!",
    hi: "नाइट्रोजन (N) पौधे की बढ़वार के लिए जरूरी है, लेकिन अधिक मात्रा जड़ों को नुकसान पहुंचा सकती है!",
    ne: "नाइट्रोजन (N) बोटबिरुवाको वृद्धिको लागि आवश्यक छ, तर धेरै भएमा जरालाई हानी पुर्याउन सक्छ!",
    mai: "नाइट्रोजन (N) गाछक विकास लेल जरूरी अछि, मुदा बेसी भेल तँ जड़िके नोकसान कऽ सकैत अछि!",
    bho: "नाइट्रोजन (N) पौधा के बढ़वार खातिर जरूरी बा, बाकी जादे भइला पर जड़ के नोकसान पहुँचावेला!",
    tag: "Soil Nutrition"
  },
  {
    en: "Always calibrate soil pH before sowing. A pH between 6.0 and 7.5 unlocks maximum micro-nutrient absorption for cereal and pulse crops.",
    hi: "बुवाई से पहले मिट्टी के pH की जांच अवश्य करें। 6.0 से 7.5 का pH अनाज और दलहनी फसलों के लिए सबसे उत्तम होता है।",
    ne: "बाली लगाउनु अघि माटोको pH जाँच गर्नुहोस्। ६.० देखि ७.५ को pH अन्न र दाल बालीको लागि सबैभन्दा राम्रो हुन्छ।",
    mai: "बीया बोबय सँ पहिने माटिक pH जरूर जाँचू। ६.० सँ ७.५ क pH दलहन आ अनाज लेल सर्वोत्तम अछि।",
    bho: "बोआई से पहिले माटी के pH जरूर नापीं। ६.० से ७.५ के बीच pH अनाज आ दाल खातिर सबसे नीक होला।",
    tag: "pH Calibration"
  },
  {
    en: "High atmospheric moisture (>80%) paired with heavy precipitation creates the ideal environment for Rice and Jute cultivation.",
    hi: "80% से अधिक नमी और अच्छी बारिश धान (चावल) और जूट की खेती के लिए सबसे अनुकूल माहौल बनाती है।",
    ne: "८०% भन्दा बढी आर्द्रता र धेरै वर्षा धान र जुट खेतीको लागि सबैभन्दा उत्तम वातावरण मानिन्छ।",
    mai: "८०% सँ बेसी नमी आ बढ़िया बरखा धान आ पटुआ खेती लेल वरदान सन होइत अछि।",
    bho: "८०% से जादे नमी आ बढ़िया पानी धान आ पटुआ के खेती खातिर सबसे बढ़िया होला।",
    tag: "Climate Advisory"
  },
  {
    en: "Potassium (K) acts like plant immunity! It fortifies cellular walls, protecting your harvest against sudden drought and crop diseases.",
    hi: "पोटाश (K) पौधे की रोग प्रतिरोधक क्षमता बढ़ाता है और सूखे व बीमारियों से फसल की रक्षा करता है!",
    ne: "पोटासियम (K) ले बिरुवाको रोग प्रतिरोधात्मक क्षमता बढाउँछ र खडेरीबाट जोगाउँछ!",
    mai: "पोटाश (K) गाछके रोग सँ लड़बाक ताकत दैत अछि आ सुखार सँ फसलके बचबैत अछि!",
    bho: "पोटाश (K) पौधा के बीमारी से लड़े के ताकत देवेला आ सुखाड़ से फसल के बचावेला!",
    tag: "Crop Immunity"
  }
];

export default function AgroDoctorHero({ onConsultClick }) {
  const [tipIndex, setTipIndex] = useState(0);
  const { language, t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % DOCTOR_TIPS.length);
  };

  const currentTip = DOCTOR_TIPS[tipIndex];

  // 3D Tilt calculation
  const rotateX = mousePos.y * -14;
  const rotateY = mousePos.x * 14;

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative perspective-1000 select-none group"
    >
      {/* Outer 3D Card Container */}
      <div 
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative rounded-3xl bg-gradient-to-br from-forest-900 via-forest-950 to-agri-950 border border-agri-500/40 shadow-2xl p-6 sm:p-7 text-white overflow-hidden preserve-3d"
      >
        {/* Dynamic Holographic Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-agri-400/20 blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative z-20 flex items-center justify-between pb-4 border-b border-forest-800">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-agri-600/30 border border-agri-400/40 text-agri-300">
              <Stethoscope className="w-4 h-4 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-forest-950"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black tracking-wider uppercase text-white">{t('doctor_name', 'Agro Specialist Pravaash Kumar Shah')}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  AI AGRO SPECIALIST
                </span>
              </div>
              <p className="text-[10px] text-slate-400">{t('doctor_title', 'Chief Agronomist & Crop Health Specialist')}</p>
            </div>
          </div>

          {/* Regional Language Selector */}
          <LanguageSelector variant="hero" />
        </div>

        {/* Main 3D Agro Doctor Character Display */}
        <div className="relative z-10 my-3 flex flex-col sm:flex-row items-center gap-4">
          
          {/* 3D Character Visual with Floating Halo and Scan Line */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 animate-float-3d">
            {/* Pulsing ring aura */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/40 to-agri-400/20 blur-xl transform scale-105" />
            
            {/* Main Character Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-agri-400/50 shadow-xl bg-forest-950">
              <img 
                src="/agro_doctor_avatar.jpg" 
                alt="Agro Doctor 3D Character" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              {/* Holographic Scanline */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan shadow-[0_0_8px_#34d399]" />
            </div>

            {/* Floating Doctor Badge */}
            <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-lg bg-forest-900/95 border border-agri-400/60 text-[9px] font-black text-agri-300 shadow-lg flex items-center gap-1">
              <Leaf className="w-2.5 h-2.5 text-emerald-400" />
              <span>Plant Rx</span>
            </div>
          </div>

          {/* Interactive Speech Bubble & Live Advisory */}
          <div className="flex-1 space-y-2.5 w-full">
            <div className="relative rounded-2xl bg-forest-950/80 border border-forest-700/80 p-4 shadow-inner backdrop-blur-md">
              {/* Speech bubble pointer */}
              <div className="hidden sm:block absolute -left-2 top-6 w-3 h-3 bg-forest-950 border-l border-b border-forest-700/80 transform rotate-45" />

              <div className="flex items-center justify-between pb-1.5 border-b border-forest-800">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  <MessageSquare className="w-3 h-3" />
                  <span>{currentTip.tag}</span>
                </span>
                <button
                  onClick={nextTip}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Next Advice</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed pt-2">
                "{currentTip[language] || currentTip.hi || currentTip.en}"
              </p>
            </div>

            {/* Quick Metrics from Doctor */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-forest-900/70 border border-forest-800">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Diagnostic AI</span>
                <span className="text-xs font-black text-emerald-400">97.5% Acc</span>
              </div>
              <div className="p-2 rounded-xl bg-forest-900/70 border border-forest-800">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Soil Targets</span>
                <span className="text-xs font-black text-agri-300">22 Crops</span>
              </div>
              <div className="p-2 rounded-xl bg-forest-900/70 border border-forest-800">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Prescription</span>
                <span className="text-xs font-black text-amber-300">Instant Rx</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA to consult Agro Doctor */}
        <div className="relative z-20 pt-3 border-t border-forest-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Ready to prescribe the best crop for your soil</span>
          </div>

          <button
            onClick={onConsultClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-agri-600 hover:from-emerald-400 hover:to-agri-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start Free Soil Diagnosis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
