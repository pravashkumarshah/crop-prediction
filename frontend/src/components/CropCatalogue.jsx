import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Layers, 
  Sprout, 
  ShieldCheck, 
  Sparkles, 
  X, 
  RotateCcw,
  Droplets,
  Thermometer,
  CloudRain,
  ChevronRight,
  Database,
  BarChart3,
  Calendar
} from 'lucide-react';
import { fetchCrops } from '../api';
import CropDetailModal from './CropDetailModal';
import ContextualHelp from './ContextualHelp';

const CROP_ICONS = {
  apple: '🍎', banana: '🍌', blackgram: '🌱', chickpea: '🧆',
  coconut: '🥥', coffee: '☕', cotton: '☁️', grapes: '🍇',
  jute: '🌾', kidneybeans: '🫘', lentil: '🥣', maize: '🌽',
  mango: '🥭', mothbeans: '🌿', mungbean: '🥗', muskmelon: '🍈',
  orange: '🍊', papaya: '🍈', pigeonpeas: '🌾', pomegranate: '🪴',
  rice: '🌾', watermelon: '🍉'
};

const CATEGORIES = [
  'All Categories',
  'Cereal Grain / Staple',
  'Pulse / Legume',
  'Horticultural / Fruit',
  'Commercial / Fiber',
  'Plantation / Beverage'
];

export default function CropCatalogue({
  currentFormData,
  predictionResult,
  onApplyCropParameters,
  setActiveTab
}) {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('name_asc'); // 'name_asc', 'name_desc', 'n_desc', 'rain_desc', 'k_desc', 'temp_desc'
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Fetch verified crop list from backend
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCrops()
      .then((data) => {
        if (isMounted) {
          setCrops(data.crops || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Could not fetch crops from backend:', err);
          setError(err.message || 'Failed to load crop catalogue');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  // Filter and Sort crops
  const filteredCrops = useMemo(() => {
    let result = [...crops];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter((item) => {
        const name = (item.crop || '').toLowerCase();
        const display = (item.displayName || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        const season = (item.season || '').toLowerCase();
        return name.includes(term) || display.includes(term) || cat.includes(term) || season.includes(term);
      });
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter((item) => {
        const cat = item.category || '';
        if (selectedCategory === 'Cereal Grain / Staple') return cat.includes('Cereal');
        if (selectedCategory === 'Pulse / Legume') return cat.includes('Pulse') || cat.includes('Legume');
        if (selectedCategory === 'Horticultural / Fruit') return cat.includes('Fruit') || cat.includes('Horticultural') || cat.includes('Cucurbit');
        if (selectedCategory === 'Commercial / Fiber') return cat.includes('Fiber') || cat.includes('Cotton') || cat.includes('Commercial');
        if (selectedCategory === 'Plantation / Beverage') return cat.includes('Plantation') || cat.includes('Beverage');
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name_asc') {
        return (a.displayName || a.crop).localeCompare(b.displayName || b.crop);
      }
      if (sortBy === 'name_desc') {
        return (b.displayName || b.crop).localeCompare(a.displayName || a.crop);
      }
      if (sortBy === 'n_desc') {
        const nA = a.feature_distributions?.N?.mean || 0;
        const nB = b.feature_distributions?.N?.mean || 0;
        return nB - nA;
      }
      if (sortBy === 'rain_desc') {
        const rA = a.feature_distributions?.rainfall?.mean || 0;
        const rB = b.feature_distributions?.rainfall?.mean || 0;
        return rB - rA;
      }
      if (sortBy === 'k_desc') {
        const kA = a.feature_distributions?.K?.mean || 0;
        const kB = b.feature_distributions?.K?.mean || 0;
        return kB - kA;
      }
      if (sortBy === 'temp_desc') {
        const tA = a.feature_distributions?.temperature?.mean || 0;
        const tB = b.feature_distributions?.temperature?.mean || 0;
        return tB - tA;
      }
      return 0;
    });

    return result;
  }, [crops, searchTerm, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSortBy('name_asc');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div id="catalogue-search" data-mascot-section="catalogue-search" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-agri-950 text-white p-6 sm:p-10 shadow-2xl border border-forest-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-500/20 border border-agri-400/30 text-agri-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sprout className="w-3.5 h-3.5 text-agri-400" />
            <span>Complete Crop Repository • 22 Canonical Classes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Explore All 22 Verified Crops
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Every crop in this catalogue is backed by verified training data from our 2,200-sample balanced dataset and supported by our 97.5% accurate Keras neural network. Click any crop to inspect genuine historical statistics, N-P-K distributions, and agronomic guidelines.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-agri-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span><strong>22</strong> Canonical Crops</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>100</strong> Records Per Crop (4.55% Each)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>97.5%</strong> Validated Test Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-agri-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search crops by name, category, or season (e.g. rice, pulse, rabi)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-agri-500/40 focus:border-agri-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <label htmlFor="crop-sort" className="sr-only">Sort Crops</label>
            <select
              id="crop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-agri-500/40 cursor-pointer"
            >
              <option value="name_asc">Alphabetical (A - Z)</option>
              <option value="name_desc">Alphabetical (Z - A)</option>
              <option value="n_desc">Highest Nitrogen (N) Demand</option>
              <option value="rain_desc">Highest Rainfall Requirement</option>
              <option value="k_desc">Highest Potassium (K) Demand</option>
              <option value="temp_desc">Highest Optimal Temperature</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-600 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-agri-600 text-white shadow-sm ring-2 ring-agri-400/40'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-agri-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading verified crop repository...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center space-y-2">
          <p className="text-sm font-bold text-red-800">Failed to load crop catalogue</p>
          <p className="text-xs text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State when no crops match search/filter */}
      {!loading && !error && filteredCrops.length === 0 && (
        <div className="py-16 px-4 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl mx-auto">
            🔍
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">No matching crops found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find any crop matching "{searchTerm}" under "{selectedCategory}". Try adjusting your keywords or clearing the active filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}

      {/* Crop Cards Grid */}
      {!loading && !error && filteredCrops.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>Showing <strong>{filteredCrops.length}</strong> of <strong>{crops.length}</strong> verified crops</span>
            <span>Click any card for full dataset distributions</span>
          </div>

          <div id="catalogue-grid" data-mascot-section="catalogue-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCrops.map((crop) => {
              const icon = CROP_ICONS[crop.crop?.toLowerCase()] || '🌱';
              const dists = crop.feature_distributions || {};

              return (
                <div
                  key={crop.id || crop.crop}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedCrop(crop)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCrop(crop);
                    }
                  }}
                  className="group relative rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-agri-400/80 hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-agri-500 select-none"
                >
                  {/* Card Top: Icon & Category */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {icon}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-agri-50 text-agri-800 border border-agri-200/60 max-w-[140px] truncate">
                        {crop.category || 'Crop'}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mt-4">
                      <h3 className="text-base font-extrabold text-forest-950 group-hover:text-agri-700 transition-colors">
                        {crop.displayName || crop.crop}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {crop.description || 'Verified agricultural cultivar in the AgriSmart repository.'}
                      </p>
                    </div>

                    {/* Typical Key Requirements Pills */}
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                      {dists.N && (
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Avg N:</span>
                          <span className="font-bold text-slate-800">{dists.N.mean} kg/ha</span>
                        </div>
                      )}
                      {dists.rainfall && (
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Avg Rain:</span>
                          <span className="font-bold text-slate-800">{dists.rainfall.mean} mm</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Action CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-agri-700 font-bold group-hover:text-agri-800">
                    <span>Inspect Statistics</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Detail Modal when a crop is selected */}
      {selectedCrop && (
        <CropDetailModal
          crop={selectedCrop}
          onClose={() => setSelectedCrop(null)}
          currentFormData={currentFormData}
          predictionResult={predictionResult}
          onApplyCropParameters={onApplyCropParameters}
        />
      )}

    </div>
  );
}
