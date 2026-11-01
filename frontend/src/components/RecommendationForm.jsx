import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Droplets, 
  Thermometer, 
  CloudRain, 
  Layers, 
  Sliders, 
  Info, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { fetchSampleCrops } from '../api';
import ContextualHelp from './ContextualHelp';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_VALUES = {
  N: 90,
  P: 42,
  K: 43,
  temperature: 20.87,
  humidity: 82.0,
  ph: 6.5,
  rainfall: 202.93
};

const FIELD_CONFIGS = [
  {
    id: 'N',
    label: 'Nitrogen (N)',
    category: 'Soil Macronutrient',
    unit: 'kg/ha',
    min: 0,
    max: 200,
    step: 1,
    defaultVal: 90,
    tooltip: 'Ratio of Nitrogen content in soil. Essential for vegetative leaf development and chlorophyll synthesis.',
    typicalRange: '20 - 140 kg/ha',
    icon: Layers,
    color: 'emerald'
  },
  {
    id: 'P',
    label: 'Phosphorus (P)',
    category: 'Soil Macronutrient',
    unit: 'kg/ha',
    min: 0,
    max: 200,
    step: 1,
    defaultVal: 42,
    tooltip: 'Ratio of Phosphorus content in soil. Promotes deep root establishment, seed development, and early flowering.',
    typicalRange: '10 - 145 kg/ha',
    icon: Layers,
    color: 'emerald'
  },
  {
    id: 'K',
    label: 'Potassium (K)',
    category: 'Soil Macronutrient',
    unit: 'kg/ha',
    min: 0,
    max: 250,
    step: 1,
    defaultVal: 43,
    tooltip: 'Ratio of Potassium content in soil. Regulates stomatal water balance, disease resistance, and fruit weight.',
    typicalRange: '15 - 205 kg/ha',
    icon: Layers,
    color: 'emerald'
  },
  {
    id: 'temperature',
    label: 'Temperature',
    category: 'Atmospheric Factor',
    unit: '°C',
    min: 0,
    max: 55,
    step: 0.1,
    defaultVal: 20.87,
    tooltip: 'Average ambient temperature in Celsius during the prospective vegetative season.',
    typicalRange: '10 - 45 °C',
    icon: Thermometer,
    color: 'amber'
  },
  {
    id: 'humidity',
    label: 'Relative Humidity',
    category: 'Atmospheric Factor',
    unit: '%',
    min: 0,
    max: 100,
    step: 0.1,
    defaultVal: 82.0,
    tooltip: 'Average atmospheric relative humidity percentage. Critical for transpiration rates.',
    typicalRange: '15 - 100 %',
    icon: Droplets,
    color: 'blue'
  },
  {
    id: 'ph',
    label: 'Soil pH Value',
    category: 'Soil Chemistry',
    unit: 'pH scale',
    min: 3.5,
    max: 10.0,
    step: 0.05,
    defaultVal: 6.5,
    tooltip: 'Soil acidity/alkalinity scale (1-14). Strongly influences micronutrient bioavailability to crop roots.',
    typicalRange: '4.5 - 8.5 pH',
    icon: Sliders,
    color: 'purple'
  },
  {
    id: 'rainfall',
    label: 'Rainfall / Precipitation',
    category: 'Precipitation',
    unit: 'mm',
    min: 0,
    max: 400,
    step: 0.5,
    defaultVal: 202.93,
    tooltip: 'Total expected or seasonal precipitation in millimeters.',
    typicalRange: '30 - 300 mm',
    icon: CloudRain,
    color: 'blue'
  }
];

const TOPIC_MAP = {
  N: 'nitrogen',
  P: 'phosphorus',
  K: 'potassium',
  temperature: 'temperature',
  humidity: 'humidity',
  ph: 'soil_ph',
  rainfall: 'rainfall'
};

export default function RecommendationForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading, 
  errorMessage,
  onMascotSpeak
}) {
  const { t } = useLanguage();
  const [samplePresets, setSamplePresets] = useState([]);
  const [selectedPresetName, setSelectedPresetName] = useState('');
  const [errors, setErrors] = useState({});

  // Load sample crops from API
  useEffect(() => {
    let isMounted = true;
    fetchSampleCrops()
      .then((data) => {
        if (isMounted && data && data.samples) {
          setSamplePresets(data.samples);
        }
      })
      .catch((err) => {
        console.warn('Could not load sample crop presets:', err);
      });
    return () => { isMounted = false; };
  }, []);

  // Validate inputs
  const validateField = (id, val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return 'Value must be a valid number';
    if (id === 'N' && (num < 0 || num > 300)) return 'Nitrogen should be between 0 and 300 kg/ha';
    if (id === 'P' && (num < 0 || num > 300)) return 'Phosphorus should be between 0 and 300 kg/ha';
    if (id === 'K' && (num < 0 || num > 350)) return 'Potassium should be between 0 and 350 kg/ha';
    if (id === 'temperature' && (num < -10 || num > 60)) return 'Temperature should be between -10°C and 60°C';
    if (id === 'humidity' && (num < 0 || num > 100)) return 'Relative humidity must be between 0% and 100%';
    if (id === 'ph' && (num < 1 || num > 14)) return 'Soil pH must be between 1.0 and 14.0';
    if (id === 'rainfall' && (num < 0 || num > 1000)) return 'Rainfall must be between 0 and 1000 mm';
    return null;
  };

  const handleInputChange = (id, val) => {
    const error = validateField(id, val);
    setErrors(prev => ({ ...prev, [id]: error }));
    setFormData(prev => ({ ...prev, [id]: val }));
    setSelectedPresetName('');
  };

  const handlePresetSelect = (crop) => {
    setSelectedPresetName(crop.crop);
    setFormData({
      N: crop.N,
      P: crop.P,
      K: crop.K,
      temperature: crop.temperature,
      humidity: crop.humidity,
      ph: crop.ph,
      rainfall: crop.rainfall
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData(DEFAULT_VALUES);
    setSelectedPresetName('');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all
    const newErrors = {};
    FIELD_CONFIGS.forEach(f => {
      const err = validateField(f.id, formData[f.id]);
      if (err) newErrors[f.id] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-agri-600" />
              <span>Multi-Factor Agronomic Input</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              {t('form_title', 'Crop Recommendation Dashboard')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t('form_subtitle', 'Provide the 7 measured parameters in the exact feature sequence evaluated by the trained neural network model.')}
            </p>
          </div>

          {/* Quick Actions: Sample Presets & Reset */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {samplePresets.length > 0 && (
              <div className="relative flex-1 md:flex-none">
                <select
                  value={selectedPresetName}
                  onChange={(e) => {
                    const found = samplePresets.find(s => s.crop === e.target.value);
                    if (found) handlePresetSelect(found);
                  }}
                  className="w-full md:w-auto text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-agri-200 bg-agri-50/70 text-forest-950 hover:bg-agri-100/70 focus:outline-none focus:ring-2 focus:ring-agri-500 cursor-pointer transition-colors"
                >
                  <option value="">⚡ Fill Sample Values...</option>
                  {samplePresets.map((crop) => (
                    <option key={crop.crop} value={crop.crop}>
                      Sample: {crop.displayName || crop.crop.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Reset all fields to standard baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('btn_reset', 'Reset')}</span>
            </button>
          </div>
        </div>

        {/* Global Error message if any */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Prediction Error</p>
              <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form id="recommend-inputs" data-mascot-section="recommend-inputs" onSubmit={handleSubmit} className="mt-8 space-y-8">
          
          {/* Macronutrients Group (N, P, K) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-forest-900">
                1. {t('soil_nutrients', 'Soil Macronutrients (NPK)')}
              </h3>
              <span className="text-xs text-slate-400 font-normal">
                Measured in kilograms per hectare (kg/ha)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FIELD_CONFIGS.slice(0, 3).map((field) => {
                const Icon = field.icon;
                const fieldError = errors[field.id];
                const val = formData[field.id];

                return (
                  <div 
                    key={field.id}
                    className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-agri-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-emerald-600" />
                        <label htmlFor={field.id} className="text-sm font-bold text-slate-800">
                          {field.label}
                        </label>
                      </div>
                      
                      <ContextualHelp 
                        topicId={TOPIC_MAP[field.id]} 
                        onMascotSpeak={onMascotSpeak} 
                      />
                    </div>

                    {/* Numeric Input & Unit */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          id={field.id}
                          type="number"
                          step={field.step}
                          min={field.min}
                          max={field.max}
                          value={val}
                          onFocus={() => onMascotSpeak && onMascotSpeak({ title: field.label, text: field.tooltip })}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-base bg-white border text-forest-950 focus:outline-none focus:ring-2 transition-all ${
                            fieldError 
                              ? 'border-red-400 focus:ring-red-300' 
                              : 'border-slate-200 focus:ring-agri-500/40 focus:border-agri-500'
                          }`}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-2.5 rounded-xl border border-slate-200 whitespace-nowrap min-w-[58px] text-center">
                        {field.unit}
                      </span>
                    </div>

                    {/* Slider Control */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={val || 0}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-agri-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{field.min}</span>
                        <span>Mid: {Math.round((field.min + field.max) / 2)}</span>
                        <span>{field.max}</span>
                      </div>
                    </div>

                    {fieldError && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {fieldError}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environmental Factors Group */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-forest-900">
                2. {t('environmental_factors', 'Environmental & Climate Parameters')}
              </h3>
              <span className="text-xs text-slate-400 font-normal">
                Temperature, Humidity, Soil pH, and Precipitation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FIELD_CONFIGS.slice(3).map((field) => {
                const Icon = field.icon;
                const fieldError = errors[field.id];
                const val = formData[field.id];

                return (
                  <div 
                    key={field.id}
                    className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-agri-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-600" />
                        <label htmlFor={field.id} className="text-sm font-bold text-slate-800">
                          {field.label}
                        </label>
                      </div>
                      
                      <ContextualHelp 
                        topicId={TOPIC_MAP[field.id]} 
                        onMascotSpeak={onMascotSpeak} 
                      />
                    </div>

                    {/* Numeric Input & Unit */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          id={field.id}
                          type="number"
                          step={field.step}
                          min={field.min}
                          max={field.max}
                          value={val}
                          onFocus={() => onMascotSpeak && onMascotSpeak({ title: field.label, text: field.tooltip })}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-base bg-white border text-forest-950 focus:outline-none focus:ring-2 transition-all ${
                            fieldError 
                              ? 'border-red-400 focus:ring-red-300' 
                              : 'border-slate-200 focus:ring-blue-500/40 focus:border-blue-500'
                          }`}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-2.5 rounded-xl border border-slate-200 whitespace-nowrap min-w-[50px] text-center">
                        {field.unit}
                      </span>
                    </div>

                    {/* Slider Control */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={val || 0}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{field.min}</span>
                        <span>{field.max}</span>
                      </div>
                    </div>

                    {fieldError && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {fieldError}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Bar & Action Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>StandardScaler normalization applied automatically before Keras tensor evaluation</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 ${
                isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-agri-600 via-agri-500 to-agri-600 hover:from-agri-500 hover:to-agri-600 shadow-agri-600/30 hover:shadow-agri-600/50 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t('btn_analyzing', 'Running Neural Network Model...')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t('btn_predict', 'Recommend Crop')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
