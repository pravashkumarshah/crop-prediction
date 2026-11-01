import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info, X, ExternalLink, Sparkles } from 'lucide-react';

/**
 * Standard registry of agronomic and machine learning contextual explanations
 */
export const CONTEXT_HELP_REGISTRY = {
  soil_ph: {
    title: 'Soil pH Value',
    category: 'Soil Chemistry',
    text: 'Enter the soil pH measured from your soil lab test (scale 1-14). Strongly influences micronutrient bioavailability to crop roots.',
    extended: 'pH values between 6.0 and 7.5 unlock the highest availability of Nitrogen, Phosphorus, and Potassium for most cereals and pulses.',
    unit: 'scale 1-14',
    benchmark: 'Neutral range: 6.0 - 7.5'
  },
  nitrogen: {
    title: 'Nitrogen (N) Macronutrient',
    category: 'Soil Macronutrient',
    text: 'Enter the available Nitrogen measured in kg/ha. Essential for vegetative leafy growth and chlorophyll synthesis.',
    extended: 'Excessive nitrogen (>140 kg/ha) can cause weak stems and lodging, while deficiency causes stunted yellowing leaves.',
    unit: 'kg/ha',
    benchmark: 'Dataset range: 0 - 140 kg/ha'
  },
  phosphorus: {
    title: 'Phosphorus (P) Macronutrient',
    category: 'Soil Macronutrient',
    text: 'Enter the available Phosphorus in kg/ha. Promotes root establishment, energy transfer (ATP), and early flowering.',
    extended: 'Critical for leguminous pulses like chickpea and lentil to facilitate root nodulation and nitrogen fixation.',
    unit: 'kg/ha',
    benchmark: 'Dataset range: 5 - 145 kg/ha'
  },
  potassium: {
    title: 'Potassium (K) Macronutrient',
    category: 'Soil Macronutrient',
    text: 'Enter the Potassium level in kg/ha. Regulates cellular water balance, stomatal conductance, and disease immunity.',
    extended: 'Potassium strengthens plant stalks against severe weather and enhances fruit size and sugar content.',
    unit: 'kg/ha',
    benchmark: 'Dataset range: 5 - 205 kg/ha'
  },
  temperature: {
    title: 'Ambient Temperature',
    category: 'Micro-Climate',
    text: 'Enter the prospective vegetative season temperature in Celsius (°C). Affects photosynthetic enzyme efficiency.',
    extended: 'Temperate crops like Apple require cool chilling hours (below 7°C), while tropical crops like Watermelon thrive above 25°C.',
    unit: '°C',
    benchmark: 'Dataset range: 8.8°C - 43.7°C'
  },
  humidity: {
    title: 'Atmospheric Relative Humidity',
    category: 'Micro-Climate',
    text: 'Enter relative humidity percentage (0-100%). Controls plant transpiration rate and disease susceptibility.',
    extended: 'High humidity (>80%) creates ideal conditions for Rice and Jute, but increases foliar fungal blight risks in legumes.',
    unit: '%',
    benchmark: 'Dataset range: 14.3% - 99.8%'
  },
  rainfall: {
    title: 'Precipitation / Rainfall',
    category: 'Precipitation',
    text: 'Enter the rainfall value using the millimeter (mm) unit indicated by the input field.',
    extended: 'High rainfall (>200 mm) supports flood-tolerant crops like Rice and Jute, while Moth Beans and Chickpeas thrive under low moisture (<75 mm).',
    unit: 'mm',
    benchmark: 'Dataset range: 20.2 mm - 298.6 mm'
  },
  crop_recommendation: {
    title: 'Crop Recommendation Inference',
    category: 'AI Pipeline',
    text: 'Analyze your entered soil and environmental parameters using the available trained deep neural network.',
    extended: 'Features are standardized with StandardScaler, passed through Dense ReLU layers with Dropout regularization, and classified across 22 softmax classes.',
    unit: '22 Categories',
    benchmark: 'Multi-layer feed-forward network'
  },
  model_accuracy: {
    title: 'Validated Model Accuracy',
    category: 'Evaluation Benchmark',
    text: 'Shows measured classification accuracy (97.5%) on the 440-sample held-out evaluation test dataset.',
    extended: 'The test split was strictly separated before training. Per-class F1-scores exceed 0.95 across nearly all supported crop varieties.',
    unit: '%',
    benchmark: 'Test Accuracy: 97.5% • Macro F1: 0.97'
  },
  prediction_probability: {
    title: 'Model Prediction Probability',
    category: 'Statistical Metric',
    text: 'Represents the model\'s estimated softmax probability for a supported crop class. It does NOT represent a guaranteed real-world farming success rate or crop yield.',
    extended: 'Softmax probability quantifies statistical feature alignment with historical observations, not actual field yield which depends on on-ground weather and soil health.',
    unit: 'Probability %',
    benchmark: 'Empirical Classification Output'
  },
  dataset: {
    title: 'Canonical Dataset Distribution',
    category: 'Data Science',
    text: 'Explore the 22 crop classes represented in the available dataset and inspect the available data statistics.',
    extended: 'Balanced dataset with exactly 100 observations per crop class (total 2,200 rows). Each class represents 4.55% of the total dataset.',
    unit: '2,200 Samples',
    benchmark: '100% balanced across 22 classes'
  },
  shap_attribution: {
    title: 'SHAP / Gradient Feature Attribution',
    category: 'Explainable AI',
    text: 'Measures how much each input feature swayed the neural network toward or against the recommended crop class.',
    extended: 'Positive bars increase confidence for the target crop. Negative bars indicate that parameter was outside the crop\'s typical historical comfort zone.',
    unit: 'Attribution Score',
    benchmark: 'Game-Theoretic Shapley Attribution'
  }
};

/**
 * ContextualHelp: Interactive popup tooltip / trigger with desktop hover, mobile tap,
 * edge-clamping, keyboard support, and mascot integration.
 */
export default function ContextualHelp({
  topicId,
  customTitle,
  customText,
  customExtended,
  onMascotSpeak, // Callback to let Sprout mascot mirror the explanation
  size = 'md',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, placement: 'bottom' });
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const topic = CONTEXT_HELP_REGISTRY[topicId] || {
    title: customTitle || 'Contextual Information',
    category: 'Field Advisory',
    text: customText || 'Explore details and guidelines for this field or metric.',
    extended: customExtended || null
  };

  const title = customTitle || topic.title;
  const text = customText || topic.text;
  const extended = customExtended || topic.extended;

  // Calculate intelligent viewport-bounded position
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = 320;
    const popoverHeight = 160;

    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    // Boundary checks for horizontal screen edges
    if (left < 12) left = 12;
    if (left + popoverWidth > window.innerWidth - 12) {
      left = window.innerWidth - popoverWidth - 12;
    }

    // Vertical placement: prefer bottom, flip to top if insufficient space below
    let top = rect.bottom + 8;
    let placement = 'bottom';
    if (rect.bottom + popoverHeight > window.innerHeight - 16 && rect.top > popoverHeight + 16) {
      top = rect.top - popoverHeight - 8;
      placement = 'top';
    }

    setCoords({ top, left, placement });
  };

  const handleOpen = () => {
    updatePosition();
    setIsOpen(true);
    if (onMascotSpeak) {
      onMascotSpeak({
        title,
        text
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    if (isOpen) handleClose();
    else handleOpen();
  };

  // Close on Outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    const handleClickOutside = (e) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(e.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`inline-flex items-center align-middle ${className}`}>
      {/* Accessible Interactive Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onMouseEnter={handleOpen}
        onFocus={handleOpen}
        aria-label={`Help: ${title}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="p-1 rounded-full text-slate-400 hover:text-agri-600 hover:bg-agri-50 focus:outline-none focus:ring-2 focus:ring-agri-400/50 transition-colors cursor-help"
      >
        <HelpCircle className={iconSizes[size] || iconSizes.md} />
      </button>

      {/* Floating Popover Portal */}
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={title}
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: '320px',
            zIndex: 9999
          }}
          className="rounded-2xl bg-forest-950/95 border border-agri-400/50 p-4 text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 select-text"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-forest-800 pb-2">
            <div>
              {topic.category && (
                <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-1">
                  {topic.category}
                </span>
              )}
              <h4 className="text-xs font-black text-white">{title}</h4>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="Close help"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Core concise description */}
          <p className="text-xs text-slate-200 mt-2 leading-relaxed">
            {text}
          </p>

          {/* Optional Extended Information / Benchmark */}
          {extended && (
            <div className="mt-2.5 p-2 rounded-xl bg-forest-900/80 border border-forest-700/60 text-[11px] text-agri-200 leading-snug">
              <span className="font-bold text-white block mb-0.5">Agronomic Note:</span>
              {extended}
            </div>
          )}

          {/* Benchmark or Unit Footer */}
          {topic.benchmark && (
            <div className="mt-2 pt-2 border-t border-forest-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>{topic.benchmark}</span>
              <span className="text-emerald-400 font-semibold">AgriSmart AI</span>
            </div>
          )}
        </div>
      )}
    </span>
  );
}
