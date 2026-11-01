import React, { useState } from 'react';
import {
  Brain,
  AlertCircle,
  Info,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Sparkles,
  BarChart3,
  Loader2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { fetchExplanation } from '../api';
import ContextualHelp from './ContextualHelp';

const DEFAULT_FORM = {
  N: 90,
  P: 42,
  K: 43,
  temperature: 20.87,
  humidity: 82.0,
  ph: 6.5,
  rainfall: 202.93
};

const FEATURE_META = {
  N:           { name: 'Nitrogen (N)',           unit: 'kg/ha',   color: 'emerald', icon: '🌿' },
  P:           { name: 'Phosphorus (P)',          unit: 'kg/ha',   color: 'blue',    icon: '🔵' },
  K:           { name: 'Potassium (K)',           unit: 'kg/ha',   color: 'amber',   icon: '🟡' },
  temperature: { name: 'Temperature',             unit: '°C',      color: 'orange',  icon: '🌡️' },
  humidity:    { name: 'Relative Humidity',       unit: '%',       color: 'cyan',    icon: '💧' },
  ph:          { name: 'Soil pH',                 unit: '',        color: 'purple',  icon: '⚗️' },
  rainfall:    { name: 'Rainfall',                unit: 'mm',      color: 'blue',    icon: '🌧️' }
};

const COLOR_MAP = {
  emerald: { bar: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200 text-emerald-800', dot: 'bg-emerald-500' },
  blue:    { bar: 'bg-blue-500',    light: 'bg-blue-50 border-blue-200 text-blue-800',           dot: 'bg-blue-500' },
  amber:   { bar: 'bg-amber-500',   light: 'bg-amber-50 border-amber-200 text-amber-800',        dot: 'bg-amber-500' },
  orange:  { bar: 'bg-orange-500',  light: 'bg-orange-50 border-orange-200 text-orange-800',     dot: 'bg-orange-500' },
  cyan:    { bar: 'bg-cyan-500',    light: 'bg-cyan-50 border-cyan-200 text-cyan-800',            dot: 'bg-cyan-500' },
  purple:  { bar: 'bg-purple-500',  light: 'bg-purple-50 border-purple-200 text-purple-800',     dot: 'bg-purple-500' },
};

export default function ExplainableAI({ currentFormData, setActiveTab }) {
  // Use currentFormData from App if provided, otherwise use defaults
  const initialForm = currentFormData || DEFAULT_FORM;

  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleExplain = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchExplanation(form);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate explanation. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Compute max absolute shap value for bar scaling
  const maxAbs = result
    ? Math.max(...result.feature_contributions.map(f => Math.abs(f.shap_value)), 0.001)
    : 1;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm">
        <div className="pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5 text-purple-600" />
              <span>Explainable AI — Feature Attribution</span>
            </div>
            <ContextualHelp topicId="shap_attribution" size="sm" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            Why did the model predict this crop?
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            This module analyzes <strong>which input features most influenced</strong> the neural network's crop prediction
            using gradient sensitivity analysis. Enter values below (or they will inherit from your last recommendation)
            and generate an explanation.
          </p>
        </div>

        {/* Input Form */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.keys(FEATURE_META).map(field => {
            const meta = FEATURE_META[field];
            return (
              <div key={field} className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500 block">
                  {meta.icon} {meta.name}
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="any"
                    value={form[field]}
                    onChange={e => handleChange(field, parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-forest-950 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                {meta.unit && (
                  <span className="text-[10px] text-slate-400">{meta.unit}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-slate-400" />
            <span>Values above are pre-filled from your last recommendation. Edit freely.</span>
          </div>

          <button
            onClick={handleExplain}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
              loading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 hover:scale-[1.02]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing Explanation...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Generate Explanation</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Explanation Error</p>
              <p className="text-xs text-red-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      {result && (
        <>
          {/* Prediction Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-purple-950 text-white p-6 sm:p-8 shadow-2xl border border-forest-800">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-60 h-60 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prediction Explained</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight capitalize">
                  {result.predicted_crop}
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Confidence: <strong className="text-emerald-400">{result.confidence}%</strong> via softmax output
                </p>
              </div>
              <div className="bg-forest-900/80 border border-forest-700 rounded-2xl p-4 text-center min-w-[140px]">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Method</span>
                <span className="text-sm font-bold text-purple-300 block mt-1">
                  {result.method === 'shap_kernel' ? 'SHAP Kernel' : 'Gradient Sensitivity'}
                </span>
              </div>
            </div>
          </div>

          {/* Feature Attribution Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span>Feature Contribution to Prediction</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {result.method_description}
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                {result.feature_contributions.length} Features Analyzed
              </span>
            </div>

            <div className="space-y-4">
              {result.feature_contributions.map((feat, idx) => {
                const meta = FEATURE_META[feat.feature];
                const colors = COLOR_MAP[meta?.color || 'blue'];
                const absVal = Math.abs(feat.shap_value);
                const barWidth = Math.min((absVal / maxAbs) * 100, 100);
                const isPositive = feat.direction === 'positive';
                const normalizedPct = feat.normalized_importance || ((absVal / maxAbs) * 100).toFixed(1);

                return (
                  <div key={feat.feature} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-base w-6 text-center">{meta?.icon}</span>
                        <span className="font-bold text-forest-950">{feat.feature_name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          isPositive ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {isPositive ? 'Supports' : 'Suppresses'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500">
                          Input: <strong className="text-forest-950">{feat.raw_value} {meta?.unit}</strong>
                        </span>
                        <span className="font-bold text-forest-950 min-w-[48px] text-right">
                          {typeof normalizedPct === 'number' ? normalizedPct.toFixed(1) : normalizedPct}%
                        </span>
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          isPositive ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                      <span className="absolute right-2 top-0 h-full flex items-center text-[10px] font-bold text-slate-600">
                        {feat.shap_value > 0 ? '+' : ''}{feat.shap_value.toFixed(4)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span><strong>Green bars</strong> = feature pushed prediction toward this crop</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span><strong>Red bars</strong> = feature worked against this prediction</span>
              </div>
            </div>
          </div>

          {/* Feature Contribution Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.feature_contributions.slice(0, 6).map((feat, idx) => {
              const meta = FEATURE_META[feat.feature];
              const isPositive = feat.direction === 'positive';
              const normalizedPct = feat.normalized_importance || ((Math.abs(feat.shap_value) / maxAbs) * 100).toFixed(1);

              return (
                <div key={feat.feature} className={`p-4 rounded-2xl border space-y-2 ${
                  idx === 0
                    ? 'bg-agri-50/60 border-agri-300 ring-2 ring-agri-400/20'
                    : 'bg-slate-50/60 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-forest-950 flex items-center gap-2">
                      <span>{meta?.icon}</span>
                      {feat.feature_name}
                    </span>
                    <span className="text-xs font-black text-slate-700">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="text-xl font-black text-forest-950">
                    {feat.raw_value} <span className="text-sm font-medium text-slate-500">{meta?.unit}</span>
                  </div>
                  <div className={`text-xs font-bold flex items-center gap-1 ${isPositive ? 'text-emerald-700' : 'text-red-700'}`}>
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? 'Positive contributor' : 'Negative contributor'}
                    {' · '}{typeof normalizedPct === 'number' ? normalizedPct.toFixed(1) : normalizedPct}% influence
                  </div>
                </div>
              );
            })}
          </div>

          {/* Method & Disclaimer */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 flex items-start gap-3.5">
              <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  Explanation Method: {result.method === 'shap_kernel' ? 'SHAP KernelExplainer' : 'Gradient Sensitivity (Finite Difference)'}
                </h4>
                <p className="text-xs text-purple-800 leading-relaxed">{result.method_description}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">Interpretation Limitation</h4>
                <p className="text-xs text-amber-800 leading-relaxed">{result.disclaimer}</p>
                <p className="text-xs text-amber-700 leading-relaxed mt-1">
                  Feature importance reflects <em>model behavior on this input</em>, not proven agronomic causation.
                  High rainfall importance does not mean rainfall is the most critical agricultural factor — only that it
                  was most influential <em>in this model's decision</em> for this specific input vector.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="bg-white rounded-3xl p-12 text-center border border-agri-100 shadow-sm space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mx-auto">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-forest-950">No Explanation Generated Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Enter your soil and environmental parameters above and click <strong>"Generate Explanation"</strong> to see
            which features most influenced the model's crop prediction.
          </p>
          <button
            onClick={() => setActiveTab('recommend')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>Make a Prediction First</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
