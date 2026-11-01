import React from 'react';
import { 
  Info, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Database, 
  Workflow, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  GitBranch,
  Terminal,
  CheckCircle2
} from 'lucide-react';
import ContextualHelp from './ContextualHelp';

export default function AboutProject({ setActiveTab }) {
  const pipelineSteps = [
    {
      num: '01',
      title: '7 Agricultural Inputs',
      desc: 'Raw soil chemistry (Nitrogen, Phosphorus, Potassium) and local micro-climate variables (temperature, relative humidity, soil pH, and rainfall) are collected.',
      tag: 'Vector: R^7'
    },
    {
      num: '02',
      title: 'StandardScaler Normalization',
      desc: 'Features are standardized to zero mean and unit variance using the fitted StandardScaler artifact to prevent scale-dominated feature bias.',
      tag: 'z = (x - μ) / σ'
    },
    {
      num: '03',
      title: 'Keras Neural Inference',
      desc: 'Dense feed-forward layers with ReLU activation and Dropout regularization compute logits and propagate activations to the final Softmax layer.',
      tag: 'Dense + Dropout + Softmax'
    },
    {
      num: '04',
      title: 'LabelEncoder Decoding',
      desc: 'The argmax classification index is mapped back to the botanical crop name via the fitted LabelEncoder mapping 22 target categories.',
      tag: 'Inverse Mapping: {0..21}'
    },
    {
      num: '05',
      title: 'Agronomic Intelligence',
      desc: 'Probabilities are ranked to isolate top-3 candidates, matched with irrigation, season, soil recommendations, and delivered to the farmer.',
      tag: 'Top-3 + Farm Advisory'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Info className="w-3.5 h-3.5 text-agri-600" />
          <span>System Architecture & Methodology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
          How AgriSmart AI Works
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          AgriSmart AI combines real machine learning inference with agronomic domain intelligence. Learn how laboratory soil samples and climate metrics flow through our neural network pipeline.
        </p>
      </div>

      {/* SVG Pipeline Architecture Diagram */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-agri-600" />
              <span>End-to-End Machine Learning Pipeline</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual dataflow from raw field measurement to classified crop recommendation.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-agri-50 text-agri-700 font-semibold border border-agri-200">
            Pipeline Architecture
          </span>
        </div>

        {/* Responsive Interactive SVG Diagram */}
        <div className="w-full overflow-x-auto py-4">
          <div className="min-w-[720px] p-6 rounded-2xl bg-forest-950 text-white border border-forest-800">
            <div className="grid grid-cols-5 gap-3 relative items-stretch">
              
              {/* Box 1 */}
              <div className="bg-forest-900 border border-forest-700 rounded-xl p-4 flex flex-col justify-between space-y-2">
                <span className="text-[10px] uppercase font-bold text-agri-400">Step 1 • Input</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Field Data</h4>
                  <p className="text-[11px] text-slate-300 mt-1">N, P, K, Temp, Humidity, pH, Rainfall</p>
                </div>
                <div className="text-[10px] bg-forest-950 px-2 py-1 rounded text-agri-300 font-mono text-center">
                  Vector (1, 7)
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-forest-900 border border-forest-700 rounded-xl p-4 flex flex-col justify-between space-y-2">
                <span className="text-[10px] uppercase font-bold text-blue-400">Step 2 • Preprocess</span>
                <div>
                  <h4 className="font-bold text-sm text-white">StandardScaler</h4>
                  <p className="text-[11px] text-slate-300 mt-1">scaler.pkl transforms raw inputs to z-scores</p>
                </div>
                <div className="text-[10px] bg-forest-950 px-2 py-1 rounded text-blue-300 font-mono text-center">
                  Normalized (1, 7)
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-forest-900 border border-forest-700 rounded-xl p-4 flex flex-col justify-between space-y-2 ring-1 ring-emerald-500/50">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Step 3 • Inference</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Neural Net</h4>
                  <p className="text-[11px] text-slate-300 mt-1">Sequential Keras model evaluates logits</p>
                </div>
                <div className="text-[10px] bg-forest-950 px-2 py-1 rounded text-emerald-300 font-mono text-center">
                  Softmax (1, 22)
                </div>
              </div>

              {/* Box 4 */}
              <div className="bg-forest-900 border border-forest-700 rounded-xl p-4 flex flex-col justify-between space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400">Step 4 • Decode</span>
                <div>
                  <h4 className="font-bold text-sm text-white">LabelEncoder</h4>
                  <p className="text-[11px] text-slate-300 mt-1">label_encoder.pkl maps index to crop</p>
                </div>
                <div className="text-[10px] bg-forest-950 px-2 py-1 rounded text-amber-300 font-mono text-center">
                  Class String
                </div>
              </div>

              {/* Box 5 */}
              <div className="bg-forest-900 border border-forest-700 rounded-xl p-4 flex flex-col justify-between space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-400">Step 5 • Output</span>
                <div>
                  <h4 className="font-bold text-sm text-white">Agronomic UI</h4>
                  <p className="text-[11px] text-slate-300 mt-1">Confidence %, top-3 ranking & advisory</p>
                </div>
                <div className="text-[10px] bg-forest-950 px-2 py-1 rounded text-purple-300 font-mono text-center">
                  Actionable Guide
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Step by step details */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-forest-950">
          Detailed Pipeline Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pipelineSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-agri-300 shadow-sm transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-300">
                  {step.num}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {step.tag}
                </span>
              </div>
              <h4 className="text-base font-bold text-forest-950">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Model Specifications Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-forest-950 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-agri-600" />
            <span>Trained Model Technical Specifications</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Exact hyperparameters, training configuration, and evaluation results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Model Architecture</span>
            <p className="font-bold text-forest-950">TensorFlow / Keras Sequential</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Test Accuracy</span>
            <p className="font-bold text-emerald-700">97.50% (Validated)</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Test Loss</span>
            <p className="font-bold text-forest-950">0.0563 (Sparse Categorical)</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Feature Dimensions</span>
            <p className="font-bold text-forest-950">7 Inputs → 22 Crop Targets</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-forest-950 text-slate-300 font-mono text-xs space-y-1 overflow-x-auto">
          <div className="text-agri-400 font-bold mb-1">// Model Serialization Files</div>
          <div>• Model Weights: models/crop_recommendation_model.keras</div>
          <div>• Feature Scaler: models/scaler.pkl (StandardScaler)</div>
          <div>• Label Mapping: models/label_encoder.pkl (22 classes)</div>
          <div>• Evaluation Report: results/model_metrics.txt</div>
        </div>
      </div>

      {/* Demonstration / Research Notice */}
      <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-3">
        <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>University Demonstration & Academic Integrity</span>
        </h4>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          This system was engineered to deliver authentic machine learning predictions rather than static lookup tables. The frontend connects asynchronously to the Python Flask backend, invoking the serialized neural network for genuine real-time inference on every user submission.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setActiveTab('recommend')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>Launch Recommendation Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
