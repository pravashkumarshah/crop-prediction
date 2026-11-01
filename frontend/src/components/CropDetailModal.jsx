import React, { useEffect } from 'react';
import { 
  X, 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Layers, 
  Droplets, 
  Sun, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  BarChart3,
  Info,
  Beaker,
  Thermometer,
  CloudRain
} from 'lucide-react';
import ContextualHelp from './ContextualHelp';

const CROP_ICONS = {
  apple: '🍎', banana: '🍌', blackgram: '🌱', chickpea: '🧆',
  coconut: '🥥', coffee: '☕', cotton: '☁️', grapes: '🍇',
  jute: '🌾', kidneybeans: '🫘', lentil: '🥣', maize: '🌽',
  mango: '🥭', mothbeans: '🌿', mungbean: '🥗', muskmelon: '🍈',
  orange: '🍊', papaya: '🍈', pigeonpeas: '🌾', pomegranate: '🪴',
  rice: '🌾', watermelon: '🍉'
};

const FEATURE_CONFIG = {
  N: { name: 'Nitrogen (N)', unit: 'kg/ha', globalMin: 0, globalMax: 140, icon: Layers, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  P: { name: 'Phosphorus (P)', unit: 'kg/ha', globalMin: 5, globalMax: 145, icon: Layers, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  K: { name: 'Potassium (K)', unit: 'kg/ha', globalMin: 5, globalMax: 205, icon: Layers, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  temperature: { name: 'Temperature', unit: '°C', globalMin: 8.8, globalMax: 43.7, icon: Thermometer, color: 'text-amber-600', barColor: 'bg-amber-500' },
  humidity: { name: 'Relative Humidity', unit: '%', globalMin: 14.3, globalMax: 99.8, icon: Droplets, color: 'text-blue-600', barColor: 'bg-blue-500' },
  ph: { name: 'Soil pH', unit: 'scale', globalMin: 3.5, globalMax: 9.9, icon: Beaker, color: 'text-purple-600', barColor: 'bg-purple-500' },
  rainfall: { name: 'Rainfall', unit: 'mm', globalMin: 20.2, globalMax: 298.6, icon: CloudRain, color: 'text-blue-600', barColor: 'bg-blue-500' }
};

export default function CropDetailModal({
  crop,
  onClose,
  currentFormData,
  predictionResult,
  onApplyCropParameters
}) {
  if (!crop) return null;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Extract model prediction probability for this specific crop if user previously ran inference
  const predictionMatch = predictionResult?.all_probabilities?.find(
    (p) => p.crop?.toLowerCase() === crop.crop?.toLowerCase()
  );

  const cropIcon = CROP_ICONS[crop.crop?.toLowerCase()] || '🌱';
  const dists = crop.feature_distributions || {};

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white border border-agri-100 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-forest-950 via-forest-900 to-agri-950 text-white overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-forest-900/90 border border-agri-400/40 flex items-center justify-center text-4xl sm:text-5xl shadow-lg flex-shrink-0">
                {cropIcon}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-agri-500/25 text-agri-300 border border-agri-400/40">
                    {crop.category || 'Agricultural Crop'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Neural Model Supported</span>
                  </span>
                </div>
                <h2 id="crop-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {crop.displayName || crop.crop}
                </h2>
                <p className="text-xs text-agri-200 mt-0.5 font-medium">
                  Canonical Dataset Class: <code className="bg-forest-900/80 px-1.5 py-0.5 rounded text-emerald-300">{crop.crop}</code>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-forest-800 transition-colors"
              aria-label="Close Crop Details"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* CRITICAL: Explicit Scientific Metric Disclaimers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Dataset Representation */}
            <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Dataset Representation</span>
                <ContextualHelp topicId="dataset" size="sm" />
              </div>
              <div className="text-2xl font-black text-forest-950">
                {crop.dataset_percentage || '4.55'}%
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                <strong>{crop.dataset_count || 100}</strong> records out of 2,200 training observations. Represents balanced class frequency, <em>not</em> farming yield.
              </p>
            </div>

            {/* 2. Model Prediction Probability */}
            <div className="rounded-2xl p-4 bg-emerald-50/70 border border-emerald-200 space-y-1">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <span>Model Confidence</span>
                <ContextualHelp topicId="prediction_probability" size="sm" />
              </div>
              {predictionMatch ? (
                <>
                  <div className="text-2xl font-black text-emerald-700">
                    {predictionMatch.confidence}%
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-tight">
                    Genuine softmax probability calculated by Keras model for your last submitted soil sample.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-sm font-bold text-slate-600 mt-1">
                    No active input vector
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Enter soil and environmental parameters to obtain a model-based crop recommendation.
                  </p>
                </>
              )}
            </div>

            {/* 3. Real-World Yield Distinction */}
            <div className="rounded-2xl p-4 bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase tracking-wider">
                <span>Real-World Yield</span>
                <ContextualHelp 
                  customTitle="Yield vs Classification"
                  customText="No crop-yield target or validated yield model exists. This model predicts categorical crop classification suitability, not harvest tonnage."
                  size="sm" 
                />
              </div>
              <div className="text-sm font-black text-amber-900 mt-0.5">
                Not Fabricated (Unmeasured)
              </div>
              <p className="text-[11px] text-amber-700 leading-tight">
                Model confidence is NOT a guaranteed yield. Field harvest depends on seed varieties, local rainfall anomalies, and agronomic management.
              </p>
            </div>

          </div>

          {/* Descriptive Statistics from Actual Dataset */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-agri-600" />
                  <span>Verified Dataset Statistics ({crop.dataset_count || 100} Historical Records)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Actual empirical feature distributions calculated from the 2,200-sample dataset.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(FEATURE_CONFIG).map(([key, cfg]) => {
                const stat = dists[key];
                if (!stat) return null;

                // Compare with current form input if available
                const userVal = currentFormData ? currentFormData[key] : null;
                const Icon = cfg.icon;

                return (
                  <div key={key} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                        <span>{cfg.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {cfg.unit}
                      </span>
                    </div>

                    {/* Stats summary row */}
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-1">
                      <span>Min: <strong className="text-slate-800">{stat.min}</strong></span>
                      <span className="px-2 py-0.5 rounded-md bg-agri-50 text-agri-800 font-extrabold border border-agri-200/70">
                        Mean: {stat.mean}
                      </span>
                      <span>Max: <strong className="text-slate-800">{stat.max}</strong></span>
                      <span className="text-[10px] text-slate-400">σ={stat.std}</span>
                    </div>

                    {/* Visual Range Bar */}
                    <div className="relative w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      {/* Crop range bar */}
                      <div 
                        style={{
                          left: `${Math.max(0, ((stat.min - cfg.globalMin) / (cfg.globalMax - cfg.globalMin)) * 100)}%`,
                          width: `${Math.min(100, Math.max(8, ((stat.max - stat.min) / (cfg.globalMax - cfg.globalMin)) * 100))}%`
                        }}
                        className={`absolute top-0 bottom-0 rounded-full ${cfg.barColor} opacity-75`}
                      />
                    </div>

                    {/* Comparison with user current form input */}
                    {userVal !== null && userVal !== undefined && (
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                        <span className="text-slate-500">Your Current Input: <strong className="text-slate-700">{userVal} {cfg.unit}</strong></span>
                        {userVal >= stat.min && userVal <= stat.max ? (
                          <span className="font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>In Typical Range</span>
                          </span>
                        ) : userVal < stat.min ? (
                          <span className="font-bold text-blue-600">Below Typical</span>
                        ) : (
                          <span className="font-bold text-amber-600">Above Typical</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Agronomic Knowledge & Farming Profile */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sprout className="w-5 h-5 text-agri-600" />
              <span>Agronomic Cultivation Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Cropping Season</span>
                <span className="font-bold text-slate-800">{crop.season || 'Standard growing season'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Harvest Time</span>
                <span className="font-bold text-slate-800">{crop.harvestTime || 'Cultivar dependent'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Water Need</span>
                <span className="font-bold text-slate-800">{crop.waterNeed || 'Moderate'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Ideal Climate</span>
                <span className="font-bold text-slate-800">{crop.climate || 'Tropical / Temperate'}</span>
              </div>
            </div>

            {/* Description & Soil */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 leading-relaxed">
              <p><strong>Description:</strong> {crop.description || 'Verified agricultural cultivar in the AgriSmart AI repository.'}</p>
              <p><strong>Preferred Soil Type:</strong> {crop.soilType || 'Deep loamy or well-drained fertile soil.'}</p>
              <p><strong>Nutrient Profile:</strong> {crop.npkProfile || 'Balanced NPK nutrition.'}</p>
            </div>

            {/* Farmer Advisory Tips */}
            {crop.farmerTips && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Extension Officer Advisory:</span>
                </div>
                <p>{crop.farmerTips}</p>
              </div>
            )}

            {/* Documented Limitations */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
              <span className="font-bold text-slate-700 block">Documented Limitations:</span>
              <p>{crop.limitations || "Dataset values reflect historical research trials. Always cross-reference with official on-ground agricultural university advisories."}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            Close Details
          </button>

          {onApplyCropParameters && (
            <button
              onClick={() => {
                // Construct parameters from crop mean values
                if (crop.feature_distributions) {
                  onApplyCropParameters({
                    N: crop.feature_distributions.N.mean,
                    P: crop.feature_distributions.P.mean,
                    K: crop.feature_distributions.K.mean,
                    temperature: crop.feature_distributions.temperature.mean,
                    humidity: crop.feature_distributions.humidity.mean,
                    ph: crop.feature_distributions.ph.mean,
                    rainfall: crop.feature_distributions.rainfall.mean
                  });
                }
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold shadow-md shadow-agri-600/25 transition-all"
            >
              <Sparkles className="w-4 h-4 text-agri-200" />
              <span>Apply Typical {crop.displayName || crop.crop} Conditions to Recommender</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
