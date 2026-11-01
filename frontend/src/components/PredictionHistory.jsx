import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  ArrowUpRight, 
  Sprout, 
  Calendar, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { fetchHistory, clearHistory } from '../api';

export default function PredictionHistory({ 
  onLoadParameters, 
  setActiveTab 
}) {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearing, setClearing] = useState(false);

  const loadHistory = () => {
    setLoading(true);
    fetchHistory()
      .then((data) => {
        if (data && data.history) {
          setHistoryList(data.history);
        } else {
          setHistoryList([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Failed to load history:', err);
        setError('Failed to fetch prediction history from server.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClear = async () => {
    if (!window.confirm('Are you sure you want to clear your prediction history?')) {
      return;
    }
    setClearing(true);
    try {
      await clearHistory();
      setHistoryList([]);
    } catch (err) {
      alert('Error clearing history: ' + err.message);
    } finally {
      setClearing(false);
    }
  };

  const handleSelectRecord = (record) => {
    if (record && record.inputs) {
      onLoadParameters(record.inputs);
      setActiveTab('recommend');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-agri-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-600">Retrieving logged predictions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5 text-agri-600" />
            <span>Persisted Log Records</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
            Prediction History
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Review past soil inquiries, tested conditions, and recommended crop outputs.
          </p>
        </div>

        {historyList.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={loadHistory}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Refresh History"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleClear}
              disabled={clearing}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{clearing ? 'Clearing...' : 'Clear History'}</span>
            </button>
          </div>
        )}
      </div>

      {/* History Items or Empty State */}
      {historyList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-agri-100 shadow-sm space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-agri-50 border border-agri-200 flex items-center justify-center text-agri-600 mx-auto">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-forest-950">
            No Historical Predictions Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your generated crop recommendations will be logged here automatically with all 7 input values and top probabilistic matches.
          </p>
          <button
            onClick={() => setActiveTab('recommend')}
            className="px-6 py-3 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Create Your First Prediction
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {historyList.map((record) => {
            const inputs = record.inputs || {};
            const top3 = record.top_3 || [];

            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-agri-300 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center font-black text-sm uppercase">
                      {record.predicted_crop.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-forest-950 capitalize">
                          {record.displayName || record.predicted_crop}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                          {record.confidence}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{record.category || 'Crop Category'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{record.timestamp}</span>
                    </div>

                    <button
                      onClick={() => handleSelectRecord(record)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-agri-200 bg-agri-50 hover:bg-agri-100 text-agri-800 text-xs font-semibold transition-colors"
                      title="Load these exact 7 inputs into the recommendation form"
                    >
                      <span>Load Inputs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 7 Inputs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Nitrogen</span>
                    <span className="font-bold text-slate-800">{inputs.N} kg/ha</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Phosphorus</span>
                    <span className="font-bold text-slate-800">{inputs.P} kg/ha</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Potassium</span>
                    <span className="font-bold text-slate-800">{inputs.K} kg/ha</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Temperature</span>
                    <span className="font-bold text-slate-800">{inputs.temperature} °C</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
                    <span className="font-bold text-slate-800">{inputs.humidity} %</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Soil pH</span>
                    <span className="font-bold text-slate-800">{inputs.ph}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Rainfall</span>
                    <span className="font-bold text-slate-800">{inputs.rainfall} mm</span>
                  </div>
                </div>

                {/* Top 3 snippet */}
                {top3.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                    <span className="font-medium">Rankings:</span>
                    {top3.map((t, idx) => {
                      // top_3 may be stored as strings like "rice (95%)" OR as objects
                      const label = typeof t === 'string' ? t : `#${t.rank} ${t.crop} (${t.confidence}%)`;
                      return (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize font-medium">
                          {label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
