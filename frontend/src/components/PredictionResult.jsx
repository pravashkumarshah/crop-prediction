import React from 'react';
import { 
  Sprout, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Droplet, 
  Thermometer, 
  Layers, 
  Lightbulb, 
  BarChart3, 
  Printer, 
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Compass,
  Brain,
  Stethoscope,
  Pill,
  Award,
  Leaf,
  FileText,
  ShieldCheck
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';
import ContextualHelp from './ContextualHelp';
import { useLanguage } from '../context/LanguageContext';
import CropVideoPlayer from './CropVideoPlayer';
import { getCropVideoData } from '../data/cropVideos';

export default function PredictionResult({ 
  result, 
  onTryAgain, 
  onModifyInputs,
  onExplain,
  setActiveTab 
}) {
  const { t } = useLanguage();
  if (!result) return null;

  const {
    predicted_crop,
    confidence,
    top_3 = [],
    crop_info = {},
    input_summary = [],
    timestamp
  } = result;

  const handlePrint = () => {
    window.print();
  };

  // Color determination based on confidence
  const getConfidenceBadge = (conf) => {
    if (conf >= 85) return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'High Statistical Match' };
    if (conf >= 50) return { bg: 'bg-blue-100 text-blue-800 border-blue-300', text: 'Moderate Match' };
    return { bg: 'bg-amber-100 text-amber-800 border-amber-300', text: 'Multi-Crop Viability' };
  };

  const badgeInfo = getConfidenceBadge(confidence);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300 print:m-0 print:p-0">
      
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          onClick={onModifyInputs}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modify Inputs</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          {setActiveTab && (
            <button
              onClick={() => setActiveTab('catalogue')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-agri-300 bg-agri-50 hover:bg-agri-100 text-agri-800 text-xs font-bold shadow-sm transition-all"
            >
              <Sprout className="w-3.5 h-3.5 text-agri-600" />
              <span>{t('btn_explore', 'Explore All 22 Crops')}</span>
            </button>
          )}
          {onExplain && (
            <button
              onClick={onExplain}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold shadow-sm transition-all"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>{t('btn_explain', 'Explain Prediction')}</span>
            </button>
          )}
          <button
            onClick={onTryAgain}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold shadow-md shadow-agri-600/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('btn_try_again', 'Try Another Soil Sample')}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card for Recommended Crop */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-agri-950 text-white p-8 sm:p-10 shadow-2xl border border-forest-800">
        
        {/* Ambient background blur */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-agri-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-500/20 border border-agri-400/30 text-agri-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-agri-400" />
              <span>{t('res_title', 'Optimal Neural Recommendation')}</span>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeInfo.bg}`}>
              {badgeInfo.text} ({confidence}%)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                {crop_info.category || 'Agricultural Crop'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight capitalize">
                {crop_info.displayName || predicted_crop}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {crop_info.description || 'This crop shows the highest statistical suitability matching your entered soil nutrients and environmental parameters.'}
              </p>
            </div>

            {/* Confidence Gauge Card */}
            <div className="md:col-span-4 bg-forest-900/90 border border-forest-700/80 rounded-2xl p-5 text-center space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
                <span>{t('res_confidence', 'Model Confidence')}</span>
                <ContextualHelp topicId="prediction_probability" size="sm" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                <AnimatedCounter value={confidence} decimals={2} suffix="%" />
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-forest-950 rounded-full h-3 overflow-hidden p-0.5 border border-forest-800">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-agri-400 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(confidence, 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-300 leading-tight">
                Softmax classification probability across 22 crops. Not a guaranteed harvest yield.
              </p>
            </div>

          </div>

          {/* Model Note */}
          <div className="pt-4 border-t border-forest-800 flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Real-time inference generated by trained Keras sequential neural network model (Test Accuracy: 97.5%).
            </span>
          </div>

        </div>
      </div>

      {/* Top 3 Crop Probabilistic Ranking with 3D Scroll Reveal */}
      <ScrollReveal>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-agri-600" />
                <span>{t('res_top_alt', 'Top 3 Ranked Alternative Recommendations')}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparative suitability probabilities calculated across all 22 trained classes.
              </p>
            </div>
            <span className="text-xs text-slate-400">Softmax Normalization</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {top_3.map((rec) => {
              const isWinner = rec.rank === 1;
              return (
                <div
                  key={rec.crop}
                  className={`rounded-2xl p-5 border transition-all ${
                    isWinner 
                      ? 'bg-agri-50/70 border-agri-300 ring-2 ring-agri-400/20 shadow-md hover:-translate-y-1' 
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      isWinner 
                        ? 'bg-agri-600 text-white' 
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      Rank #{rec.rank}
                    </span>
                    <span className="font-extrabold text-base text-forest-950">
                      <AnimatedCounter value={rec.confidence} decimals={1} suffix="%" />
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-forest-950 capitalize mb-1">
                    {rec.displayName || rec.crop}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">{rec.category}</p>

                  {/* Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isWinner ? 'bg-agri-600' : 'bg-slate-500'
                      }`}
                      style={{ width: `${Math.min(rec.confidence, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Agro Specialist Pravaash Kumar Shah's Official Agronomic Prescription (Rx पर्ची) */}
      {(() => {
        const videoData = getCropVideoData(predicted_crop);
        const rx = videoData?.prescription || {};

        return (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-agri-950 text-white p-6 sm:p-9 border-2 border-agri-400/50 shadow-2xl space-y-6">
              
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-agri-500/15 blur-3xl pointer-events-none" />

              {/* Prescription Slip Header */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-forest-800">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-agri-400 shadow-xl bg-forest-950 flex-shrink-0 animate-float-gentle">
                    <img 
                      src="/agro_doctor_avatar.jpg" 
                      alt="Agro Specialist Pravaash Kumar Shah" 
                      className="w-full h-full object-cover object-top" 
                    />
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-forest-950"></span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-500 text-forest-950 font-mono">
                        Rx PRESCRIPTION
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        Agro Specialist Pravaash Kumar Shah
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        AI Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Official Agronomic Health Prescription & Treatment Regimen (कृषि डॉक्टर की पर्ची)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <div className="p-2.5 rounded-xl bg-forest-900/90 border border-forest-700/80">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">Rx Code</span>
                    <span className="text-xs sm:text-sm font-mono font-black text-emerald-400">{rx.rxCode || 'AGRO-RX-2027'}</span>
                  </div>
                  <Award className="w-9 h-9 text-emerald-400 flex-shrink-0 opacity-90 hidden sm:block" />
                </div>
              </div>

              {/* Patient / Field Diagnosis Summary Bar */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-forest-900/70 border border-forest-700/60 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Recommended Crop (लक्षित फसल):</span>
                  <span className="text-base font-extrabold text-white capitalize">{crop_info.displayName || predicted_crop}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Clinical Stage (वृद्धि अवस्था):</span>
                  <span className="text-sm font-bold text-emerald-300">{rx.stage || 'Sowing to Harvest'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Neural Match Confidence:</span>
                  <span className="text-sm font-mono font-bold text-agri-300">{confidence}% Match</span>
                </div>
              </div>

              {/* Detailed Prescription Directives */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Rx 1: Basal Dose */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <Pill className="w-4 h-4" />
                      <span>Basal Dose (आधार खाद)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">Step 1</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    {rx.basalDose || crop_info.npkProfile || 'Apply balanced basal NPK complex with Farmyard Manure.'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Apply at soil preparation / final plowing before seed sowing.
                  </p>
                </div>

                {/* Rx 2: First Top Dressing */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2 hover:border-agri-400/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-agri-300 text-xs font-bold uppercase tracking-wider">
                      <Leaf className="w-4 h-4" />
                      <span>1st Top Dressing (प्रथम पोषण)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-agri-500/20 text-agri-300 font-mono">Step 2</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    {rx.firstTopDressing || 'Apply Nitrogen booster 20-30 days after germination.'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Active vegetative branching phase nutrient intake.
                  </p>
                </div>

                {/* Rx 3: Second Top Dressing */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2 hover:border-amber-400/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>2nd Top Dressing (द्वितीय पोषण)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">Step 3</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    {rx.secondTopDressing || 'Foliar spray of water-soluble Potash (0:52:34 or 0:0:50) at flowering.'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Promotes robust flower retention and dense grain/fruit filling.
                  </p>
                </div>

                {/* Rx 4: Irrigation Dosage */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2 hover:border-cyan-400/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      <Droplet className="w-4 h-4" />
                      <span>Water Schedule (सिंचाई समय)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">Water</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    {rx.irrigationSchedule || crop_info.waterNeed || 'Moderate irrigation matching soil drainage capacity.'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Regulate water delivery to avoid root rot and nutrient leaching.
                  </p>
                </div>

                {/* Rx 5: Plant Protection */}
                <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2 hover:border-rose-400/50 transition-colors md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-rose-300 text-xs font-bold uppercase tracking-wider">
                      <Stethoscope className="w-4 h-4" />
                      <span>Plant Protection & Pest Defense (कीट एवं रोग सुरक्षा कवच)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">Protection</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    {rx.plantProtection || 'Apply preventive neem seed kernel extract (NSKE 5%) or Trichoderma seed treatment.'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Inspect leaves weekly for early vector presence. Practice integrated pest management (IPM).
                  </p>
                </div>

              </div>

              {/* Doctor's Special Clinical Remarks */}
              {rx.doctorRemarks && (
                <div className="relative z-10 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300">
                      Doctor's Clinical Notes (विशेष कृषि चिकित्सक परामर्श)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {rx.doctorRemarks}
                    </p>
                  </div>
                </div>
              )}

              {/* Doctor's Signature Note */}
              <div className="relative z-10 pt-4 border-t border-forest-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-[11px]">
                    Prescription issued by AI Agroscientist system trained on ICAR & Agriculture University protocols.
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-forest-950 border border-forest-800 text-[11px] text-emerald-400 font-mono shadow-inner">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dr. Pravaash Kumar Shah, Lead AI Agronomist</span>
                </div>
              </div>

            </div>

            {/* In-Website Embedded YouTube Video Masterclass Player */}
            <CropVideoPlayer 
              cropName={predicted_crop} 
              displayName={crop_info.displayName || predicted_crop} 
            />
          </div>
        );
      })()}

      {/* Comprehensive Agronomic Guide Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
            <Compass className="w-5 h-5 text-agri-600" />
            <span>Agronomic Profile & Cultivation Guide for {crop_info.displayName || predicted_crop}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key cultivation parameters, seasonal windows, and field management recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Season */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-agri-700">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('res_season', 'Optimal Season')}</span>
            </div>
            <p className="text-sm font-bold text-forest-950">
              {crop_info.season || 'Seasonal Crop'}
            </p>
          </div>

          {/* Harvest Duration */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-agri-700">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('res_harvest', 'Harvest Duration')}</span>
            </div>
            <p className="text-sm font-bold text-forest-950">
              {crop_info.harvestTime || 'Standard growth cycle'}
            </p>
          </div>

          {/* Water Needs */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Droplet className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('res_water', 'Water & Irrigation')}</span>
            </div>
            <p className="text-sm font-bold text-forest-950">
              {crop_info.waterNeed || 'Moderate irrigation required'}
            </p>
          </div>

          {/* Soil Type */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 sm:col-span-2">
            <div className="flex items-center gap-2 text-amber-700">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('res_soil', 'Ideal Soil Profile')}</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {crop_info.soilType || 'Well-drained arable loam soils.'}
            </p>
          </div>

          {/* Climate */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-600">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Climate Conditions</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {crop_info.climate || 'Subtropical to tropical climate'}
            </p>
          </div>

        </div>

        {/* Farmer Tips Banner */}
        {crop_info.farmerTips && (
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3.5">
            <Lightbulb className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Agronomic Field Advisory & Best Practice
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                {crop_info.farmerTips}
              </p>
            </div>
          </div>
        )}

        {/* NPK Analysis */}
        {crop_info.npkProfile && (
          <div className="p-5 rounded-2xl bg-agri-50/60 border border-agri-200/80 flex items-start gap-3.5">
            <Layers className="w-5 h-5 text-agri-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900">
                Nutrient Demand Profile (NPK)
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {crop_info.npkProfile}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Submitted Parameters Summary Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-forest-950">
              Submitted Soil & Climate Parameters
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact feature values transformed via StandardScaler and evaluated by the neural network.
            </p>
          </div>
          {timestamp && (
            <span className="text-xs text-slate-400 font-mono">
              {timestamp}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {input_summary.map((item) => (
            <div 
              key={item.key} 
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 block truncate">
                {item.name}
              </span>
              <span className="text-base font-black text-forest-950 block">
                {item.value} <span className="text-[10px] font-normal text-slate-500">{item.unit}</span>
              </span>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                item.status === 'Optimal Range' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : item.status === 'Above Average'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers & Next Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>
            Predictions are statistical indicators based on laboratory benchmark records. Consult local soil testing agencies and extension offices prior to commercial planting.
          </span>
        </div>

        <button
          onClick={() => setActiveTab('analytics')}
          className="whitespace-nowrap font-bold text-agri-700 hover:text-agri-800 transition-colors"
        >
          Explore Dataset Analytics →
        </button>
      </div>

    </div>
  );
}
