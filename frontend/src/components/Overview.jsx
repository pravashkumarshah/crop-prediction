import React from 'react';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Droplets, 
  Sun, 
  Beaker, 
  Compass, 
  BarChart2, 
  CheckCircle2, 
  Layers, 
  Cpu,
  ArrowUpRight,
  Stethoscope
} from 'lucide-react';
import AgroDoctorHero from './AgroDoctorHero';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';
import ContextualHelp from './ContextualHelp';
import { useLanguage } from '../context/LanguageContext';

export default function Overview({ setActiveTab, onSelectSample }) {
  const { t } = useLanguage();
  const steps = [
    {
      step: '01',
      title: 'Enter Conditions',
      desc: 'Input 7 essential parameters: soil macronutrients (N, P, K) and environmental factors (temperature, humidity, soil pH, and rainfall).',
      icon: Beaker,
      accent: 'from-blue-500/10 to-emerald-500/10 text-emerald-700'
    },
    {
      step: '02',
      title: 'AI Neural Analysis',
      desc: 'Inputs are scaled via standard preprocessing and processed through the trained deep neural network to compute class probabilities across 22 crops.',
      icon: Cpu,
      accent: 'from-amber-500/10 to-orange-500/10 text-amber-700'
    },
    {
      step: '03',
      title: 'Crop Recommendation',
      desc: 'Receive the top primary crop recommendation with calibrated confidence %, ranked top-3 alternatives, and actionable farming insights.',
      icon: Sprout,
      accent: 'from-emerald-500/10 to-green-500/10 text-agri-700'
    }
  ];

  const features = [
    {
      title: 'Deep Neural Network Precision',
      desc: 'Powered by a multi-layer Keras neural network trained on thousands of agricultural soil & climate field observations with 97.5% validated test accuracy on a 20% held-out test split.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Complete Soil Nutrient Analysis',
      desc: 'Evaluates Nitrogen, Phosphorus, and Potassium ratios to balance crop nutrient extraction with natural soil fertility preservation.',
      icon: Activity,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Micro-Climate Optimization',
      desc: 'Factors in seasonal temperature variations, relative atmospheric humidity, rainfall levels, and soil pH for optimal vegetative cycles.',
      icon: Sun,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Ranked Probabilistic Predictions',
      desc: 'Delivers full probability rankings for top-3 viable crop choices, giving farmers and agronomists risk mitigation alternatives.',
      icon: BarChart2,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const quickSamples = [
    { name: 'Rice', tag: 'Monsoon Heavy', N: 90, P: 42, K: 43, temp: 20.87, hum: 82, ph: 6.5, rain: 202.9 },
    { name: 'Chickpea', tag: 'Arid Legume', N: 40, P: 55, K: 80, temp: 18.5, hum: 16.5, ph: 7.3, rain: 75.0 },
    { name: 'Coffee', tag: 'Hill Plantation', N: 100, P: 25, K: 30, temp: 24.5, hum: 60.0, ph: 6.8, rain: 160.0 },
    { name: 'Watermelon', tag: 'Summer Cash Crop', N: 100, P: 18, K: 50, temp: 26.0, hum: 85.0, ph: 6.5, rain: 50.0 }
  ];

  return (
    <div className="space-y-20 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section id="overview-hero" data-mascot-section="overview-hero" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-agri-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-forest-800">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-agri-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agri-500/20 border border-agri-400/30 text-agri-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-agri-400" />
              <span>{t('hero_badge', 'Next-Gen Agricultural AI Engine')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              {t('hero_title_1', 'Grow Smarter with')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-300 via-emerald-200 to-green-400">
                {t('hero_title_2', 'AI-Powered Crop Recommendations')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {t('hero_desc', 'Harness deep machine learning trained on verified agricultural datasets. AgriSmart AI evaluates your soil macronutrients (Nitrogen, Phosphorus, Potassium) and environmental conditions to recommend the optimal crop for your farmland.')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => setActiveTab('recommend')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-agri-500 to-agri-600 text-white hover:from-agri-400 hover:to-agri-500 shadow-lg shadow-agri-950/40 hover:shadow-agri-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>{t('btn_recommend', 'Get Crop Recommendation')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('catalogue')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-400/40 backdrop-blur-sm shadow-md transition-all duration-200"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{t('btn_explore', 'Explore 22 Crops')}</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-sm transition-all duration-200"
              >
                <span>{t('btn_how_it_works', 'How It Works')}</span>
              </button>
            </div>

            {/* Quick Badges with 3D Animated Numbers on Scroll */}
            <div id="overview-badges" data-mascot-section="overview-badges" className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-forest-800/80 text-xs">
              <div className="hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center gap-1 text-slate-400">
                  <span>{t('stat_accuracy', 'Model Accuracy')}</span>
                  <ContextualHelp topicId="model_accuracy" size="sm" />
                </div>
                <p className="text-lg font-bold text-agri-300">
                  <AnimatedCounter value={97.5} decimals={1} suffix="%" />
                </p>
              </div>
              <div 
                onClick={() => setActiveTab('catalogue')}
                className="hover:-translate-y-0.5 transition-transform cursor-pointer"
                title="View All 22 Crops"
              >
                <div className="flex items-center gap-1 text-slate-400">
                  <span>{t('stat_crops', 'Supported Crops')}</span>
                  <ContextualHelp topicId="dataset" size="sm" />
                </div>
                <p className="text-lg font-bold text-white group-hover:text-emerald-300">
                  <AnimatedCounter value={22} suffix=" Classes →" />
                </p>
              </div>
              <div className="hover:-translate-y-0.5 transition-transform">
                <p className="text-slate-400">{t('stat_features', 'Input Variables')}</p>
                <p className="text-lg font-bold text-white">
                  <AnimatedCounter value={7} suffix=" Features" />
                </p>
              </div>
              <div className="hover:-translate-y-0.5 transition-transform">
                <p className="text-slate-400">{t('stat_validation', 'Field Observations')}</p>
                <p className="text-lg font-bold text-white">
                  <AnimatedCounter value={2200} suffix=" Rows" />
                </p>
              </div>
            </div>

          </div>

          {/* 3D Agro Doctor Animated Hero Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <AgroDoctorHero onConsultClick={() => setActiveTab('recommend')} />

            {/* Quick Soil Test Profiles (Approved by Agro Specialist Pravaash Kumar Shah) */}
            <div id="overview-presets" data-mascot-section="overview-presets" className="rounded-2xl bg-forest-900/60 border border-forest-800/80 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-forest-800/80">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pravaash Kumar Shah's 1-Click Soil Profiles</span>
                </span>
                <span className="text-[10px] text-agri-400 font-medium">Select to Test</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickSamples.map((sample) => (
                  <button
                    key={sample.name}
                    onClick={() => onSelectSample(sample)}
                    className="text-left p-2.5 rounded-xl bg-forest-950/70 hover:bg-emerald-950/60 border border-forest-800 hover:border-agri-500/50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                        {sample.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sample.tag}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3-Step Process Section with 3D Scroll Reveal */}
      <ScrollReveal>
        <section id="overview-steps" data-mascot-section="overview-steps" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold uppercase tracking-wider">
              <span>Workflow Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              How AgriSmart AI Recommends Crops
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our streamlined three-stage process transforms raw laboratory and weather station inputs into actionable planting decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div 
                  key={st.step}
                  className="relative rounded-2xl bg-white p-7 border border-agri-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-agri-300 transition-colors">
                      {st.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${st.accent} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-forest-950 mb-2">
                    {st.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Core Features Grid with 3D Scroll Reveal */}
      <ScrollReveal>
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold uppercase tracking-wider">
              <span>Key Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Precision Agricultural Intelligence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Engineered with modern machine learning techniques to help agriculturalists make informed, data-driven planting choices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-agri-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-forest-950">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Banner CTA */}
      <ScrollReveal>
        <section className="rounded-3xl bg-gradient-to-r from-agri-700 via-agri-600 to-forest-900 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-agri-900/30 transition-shadow">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to test soil & weather conditions?
            </h3>
            <p className="text-agri-100 text-sm sm:text-base max-w-xl">
              Input custom agricultural parameters or load real test cases to view real-time neural network predictions.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('recommend')}
            className="px-7 py-3.5 rounded-xl font-bold text-sm bg-white text-forest-950 hover:bg-agri-50 shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            Open Recommendation Tool
          </button>
        </section>
      </ScrollReveal>

    </div>
  );
}
