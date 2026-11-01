import React, { useState } from 'react';
import { 
  Stethoscope, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Leaf, 
  Pill, 
  HelpCircle, 
  ChevronRight,
  Send,
  MessageCircle,
  FlaskConical,
  Award
} from 'lucide-react';

const DOCTOR_QA = [
  {
    q_en: "How do I fix soil that is too acidic (pH < 6.0)?",
    q_hi: "अगर मिट्टी बहुत अम्लीय (pH < 6.0) हो तो क्या करें?",
    a_en: "Apply agricultural limestone (calcium carbonate) or dolomite lime 2-3 weeks before planting. Also incorporate well-decomposed farmyard manure (FYM) to buffer soil acidity naturally.",
    a_hi: "बुवाई से 2-3 सप्ताह पहले खेत में चूना (Agricultural Lime) या डोलोमाइट मिलाएं और साथ ही अच्छी तरह सड़ी हुई गोबर की खाद (FYM) का प्रयोग करें।"
  },
  {
    q_en: "What should I do if Nitrogen (N) is critically low?",
    q_hi: "अगर मिट्टी में नाइट्रोजन की बहुत कमी हो तो क्या उपाय है?",
    a_en: "Split application of Urea (46% N) across vegetative stages. For organic farming, plant nitrogen-fixing green manure crops like Dhaincha or Sunn hemp before your main crop.",
    a_hi: "यूरिया की सही मात्रा को फसल की विभिन्न अवस्थाओं में बांटकर डालें। जैविक रूप से ढैंचा या सनई जैसी हरी खाद की फसल लगाकर मिट्टी में पलटें।"
  },
  {
    q_en: "Which crops thrive best in high rainfall (> 200 mm)?",
    q_hi: "200 मिमी से अधिक बारिश में कौन सी फसलें सबसे अच्छी होती हैं?",
    a_en: "Rice (Paddy) and Jute are naturally adapted to standing water and high monsoon precipitation. Coconut and Coffee also favor consistent tropical rainfall.",
    a_hi: "धान (चावल) और जूट अत्यधिक वर्षा और जलभराव को आसानी से सहन करते हैं। नारियल और कॉफी को भी नियमित वर्षा की आवश्यकता होती है।"
  },
  {
    q_en: "Why is Potassium (K) so vital for crop resilience?",
    q_hi: "फसलों की सेहत के लिए पोटाश (K) क्यों इतना जरूरी है?",
    a_en: "Potassium regulates stomatal water opening, preventing moisture loss during dry spells. It strengthens plant stems, minimizing lodging during storms.",
    a_hi: "पोटाश पत्तियों के रंध्रों को नियंत्रित करके सूखे से बचाता है और तने को मजबूत कर फसल को आंधी-तूफान में गिरने (lodging) से रोकता है।"
  }
];

export default function AgroDoctorConsultant({ currentFormData, onApplyPreset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('prescription'); // 'prescription' | 'qa'
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [selectedQA, setSelectedQA] = useState(0);

  const form = currentFormData || {
    N: 90, P: 42, K: 43, temperature: 20.87, humidity: 82.0, ph: 6.5, rainfall: 202.93
  };

  // Compute Soil Vitality Score (0-100)
  const computeHealth = () => {
    let score = 100;
    const issues = [];
    const prescriptions = [];

    // Nitrogen check
    if (form.N < 30) {
      score -= 15;
      issues.push(lang === 'en' ? 'Nitrogen Deficient (Low vegetative drive)' : 'नाइट्रोजन की कमी (कम बढ़वार)');
      prescriptions.push(lang === 'en' ? 'Prescribe: Top-dress 20-30 kg/ha Urea or compost' : 'सलाह: 20-30 किग्रा/हेक्टेयर यूरिया या वर्मीकम्पोस्ट दें');
    } else if (form.N > 140) {
      score -= 10;
      issues.push(lang === 'en' ? 'Excessive Nitrogen (Risk of lodging/pest attack)' : 'अधिक नाइट्रोजन (कीट प्रकोप का खतरा)');
      prescriptions.push(lang === 'en' ? 'Prescribe: Withhold synthetic N; flush soil or balance with Potassium' : 'सलाह: यूरिया बंद करें और पोटाश से संतुलित करें');
    }

    // Phosphorus check
    if (form.P < 20) {
      score -= 15;
      issues.push(lang === 'en' ? 'Low Phosphorus (Weak root development)' : 'फॉस्फोरस की कमी (कमजोर जड़ें)');
      prescriptions.push(lang === 'en' ? 'Prescribe: Apply Single Super Phosphate (SSP) or DAP at basal sowing' : 'सलाह: बुवाई के समय SSP या DAP खाद का प्रयोग करें');
    }

    // Potassium check
    if (form.K < 20) {
      score -= 15;
      issues.push(lang === 'en' ? 'Low Potassium (Reduced drought & pest immunity)' : 'पोटाश की कमी (कम रोग प्रतिरोधक क्षमता)');
      prescriptions.push(lang === 'en' ? 'Prescribe: Apply Muriate of Potash (MOP) 15-25 kg/ha' : 'सलाह: 15-25 किग्रा म्यूरेट ऑफ पोटाश (MOP) डालें');
    }

    // pH check
    if (form.ph < 5.5) {
      score -= 20;
      issues.push(lang === 'en' ? 'Severe Soil Acidity (Al toxic risk, poor nutrient uptake)' : 'अत्यधिक अम्लीय मिट्टी (पोषक तत्व नहीं मिल पाएंगे)');
      prescriptions.push(lang === 'en' ? 'Prescribe: Apply 200-400 kg/ha Agricultural Lime before planting' : 'सलाह: बुवाई से पहले 200-400 किग्रा कृषि चूना मिलाएं');
    } else if (form.ph > 8.2) {
      score -= 20;
      issues.push(lang === 'en' ? 'Alkaline/Saline Soil (Iron/Zinc lockout)' : 'क्षारीय मिट्टी (जिंक और आयरन की कमी)');
      prescriptions.push(lang === 'en' ? 'Prescribe: Apply Agricultural Gypsum and bio-fertilizers' : 'सलाह: खेत में जिप्सम और जैव उर्वरक का उपयोग करें');
    }

    if (issues.length === 0) {
      issues.push(lang === 'en' ? 'Balanced macronutrient equilibrium' : 'मिट्टी के सभी पोषक तत्व संतुलित हैं');
      prescriptions.push(lang === 'en' ? 'Prescribe: Maintenance dosage of balanced NPK 19:19:19' : 'सलाह: सामान्य संतुलित खाद 19:19:19 का प्रयोग जारी रखें');
    }

    return {
      score: Math.max(score, 35),
      issues,
      prescriptions
    };
  };

  const health = computeHealth();

  return (
    <>
      {/* Floating 3D Doctor Avatar Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gradient-to-r from-forest-900 via-forest-800 to-agri-900 border-2 border-agri-400/60 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          title="Consult Agro Specialist Pravaash Kumar Shah / कृषि विशेषज्ञ प्रभाष कुमार शाह से सलाह लें"
        >
          {/* Animated pulsing outer halo */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-agri-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* 3D Doctor Avatar Photo */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-forest-950 flex-shrink-0">
            <img 
              src="/agro_doctor_avatar.jpg" 
              alt="Agro Specialist Pravaash Kumar Shah" 
              className="w-full h-full object-cover object-top"
            />
            {/* Green Online Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-forest-900" />
          </div>

          <div className="relative text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">Pravaash Kumar Shah</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                AGRO SPECIALIST
              </span>
            </div>
            <p className="text-[10px] text-agri-200 font-medium">
              {lang === 'en' ? 'Live Agro Advisory' : 'कृषि विशेषज्ञ परामर्श'}
            </p>
          </div>
        </button>
      </div>

      {/* Slide-out / Pop-up 3D Clinic Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[82vh] flex flex-col rounded-3xl bg-forest-950/95 border-2 border-agri-400/50 shadow-2xl backdrop-blur-xl text-white overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Clinic Header */}
          <div className="relative p-4 sm:p-5 border-b border-forest-800 bg-gradient-to-r from-forest-900 to-forest-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-agri-400/50 shadow-md">
                <img 
                  src="/agro_doctor_avatar.jpg" 
                  alt="Agro Specialist Pravaash Kumar Shah" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white">Pravaash Kumar Shah's Agro Advisory</h3>
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">Chief Agricultural Health Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-2 py-0.5 rounded-lg bg-forest-800 text-[10px] font-bold text-agri-300 border border-forest-700 hover:bg-forest-700 transition-colors"
              >
                {lang === 'en' ? 'हिन्दी' : 'ENG'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-forest-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs inside Clinic */}
          <div className="grid grid-cols-2 border-b border-forest-800 bg-forest-950 text-xs font-bold text-center">
            <button
              onClick={() => setActiveTab('prescription')}
              className={`py-2.5 transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'prescription' 
                  ? 'border-emerald-400 text-emerald-400 bg-forest-900/40' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Dr. Prescription' : 'डॉक्टर की पर्ची'}</span>
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`py-2.5 transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'qa' 
                  ? 'border-emerald-400 text-emerald-400 bg-forest-900/40' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Doctor Q&A' : 'सवाल-जवाब'}</span>
            </button>
          </div>

          {/* Scrollable Clinic Body */}
          <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[55vh]">
            
            {activeTab === 'prescription' && (
              <div className="space-y-4">
                
                {/* Health Stethoscope Meter */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-agri-300">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'en' ? 'Soil Vitality Index' : 'मिट्टी स्वास्थ्य सूचकांक'}</span>
                    </span>
                    <span className={`text-sm font-black ${
                      health.score >= 80 ? 'text-emerald-400' : health.score >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {health.score}/100
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-forest-950 overflow-hidden">
                    <div 
                      style={{ width: `${health.score}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        health.score >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : health.score >= 60 ? 'bg-amber-400' : 'bg-red-500'
                      }`}
                    />
                  </div>

                  <p className="text-[11px] text-slate-300 pt-1">
                    {health.score >= 80 
                      ? (lang === 'en' ? 'Excellent agronomic balance. High germination potential.' : 'उत्कृष्ट मिट्टी संतुलन। उच्च अंकुरण क्षमता।')
                      : (lang === 'en' ? 'Nutrient or pH imbalance detected. Follow Agro Specialist Pravaash Kumar Shah’s advisory below.' : 'पोषक तत्वों में असंतुलन है। कृषि विशेषज्ञ प्रभाष कुमार शाह द्वारा नीचे दी गई सलाह का पालन करें।')
                    }
                  </p>
                </div>

                {/* Clinical Diagnosis & Treatment */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'en' ? 'Clinical Findings & Prescription' : 'डॉक्टर की जांच व उपचार'}
                  </span>

                  <div className="space-y-2">
                    {health.issues.map((iss, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 text-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-emerald-300">
                          <Leaf className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span>{iss}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 pl-5">
                          {health.prescriptions[idx]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Summary Pill */}
                <div className="p-3 rounded-xl bg-forest-950 border border-forest-800 text-[10px] text-slate-400 flex flex-wrap gap-2">
                  <span>N: <strong className="text-white">{form.N}</strong></span>
                  <span>P: <strong className="text-white">{form.P}</strong></span>
                  <span>K: <strong className="text-white">{form.K}</strong></span>
                  <span>pH: <strong className="text-white">{form.ph}</strong></span>
                  <span>Temp: <strong className="text-white">{form.temperature}°C</strong></span>
                  <span>Rain: <strong className="text-white">{form.rainfall}mm</strong></span>
                </div>

              </div>
            )}

            {activeTab === 'qa' && (
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {lang === 'en' ? 'Ask Agro Specialist Pravaash Kumar Shah' : 'कृषि विशेषज्ञ प्रभाष कुमार शाह से पूछें'}
                </span>

                <div className="space-y-2">
                  {DOCTOR_QA.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedQA(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                        selectedQA === idx 
                          ? 'bg-forest-900 border-emerald-400/60 text-white shadow-md' 
                          : 'bg-forest-950/60 border-forest-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lang === 'en' ? item.q_en : item.q_hi}</span>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${selectedQA === idx ? 'rotate-90 text-emerald-400' : ''}`} />
                      </div>

                      {selectedQA === idx && (
                        <div className="mt-2.5 pt-2.5 border-t border-forest-800 text-[11px] font-normal text-emerald-300 leading-relaxed">
                          "{lang === 'en' ? item.a_en : item.a_hi}"
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="p-3 bg-forest-950 border-t border-forest-800 text-center text-[10px] text-slate-500">
            {lang === 'en' ? 'AgriSmart AI • Agro Specialist Pravaash Kumar Shah Advisory' : 'एग्रीस्मार्ट AI • कृषि विशेषज्ञ प्रभाष कुमार शाह परामर्श'}
          </div>

        </div>
      )}
    </>
  );
}
