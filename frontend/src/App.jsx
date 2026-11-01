import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import RecommendationForm from './components/RecommendationForm';
import PredictionResult from './components/PredictionResult';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PredictionHistory from './components/PredictionHistory';
import AboutProject from './components/AboutProject';
import ExplainableAI from './components/ExplainableAI';
import AgroDoctorConsultant from './components/AgroDoctorConsultant';
import CropCatalogue from './components/CropCatalogue';
import AgriMascot from './components/AgriMascot';
import Footer from './components/Footer';
import { predictCrop, fetchHealth } from './api';

const DEFAULT_FORM = {
  N: 90,
  P: 42,
  K: 43,
  temperature: 20.87,
  humidity: 82.0,
  ph: 6.5,
  rainfall: 202.93
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem('agrismart-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [backendStatus, setBackendStatus] = useState({ connected: false, metadata: null });
  const [mascotExplanation, setMascotExplanation] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    try {
      window.localStorage.setItem('agrismart-theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // The theme still applies for this session if storage is unavailable.
    }
  }, [isDarkMode]);

  // Initial backend health check with polling
  useEffect(() => {
    let isMounted = true;
    const checkBackend = () => {
      fetchHealth()
        .then((data) => {
          if (isMounted) {
            setBackendStatus({ connected: true, metadata: data });
          }
        })
        .catch(() => {
          if (isMounted) {
            setBackendStatus({ connected: false, metadata: null });
          }
        });
    };

    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Handle prediction submission
  const handlePredict = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await predictCrop(formData);
      setPredictionResult(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Prediction request failed:', err);
      setErrorMessage(err.message || 'Failed to generate recommendation. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sample selection from hero or overview
  // Handles both {temp, hum, rain} keys (from hardcoded overview) and {temperature, humidity, rainfall} from API
  const handleSelectSample = (sample) => {
    setFormData({
      N: sample.N,
      P: sample.P,
      K: sample.K,
      temperature: sample.temperature ?? sample.temp,
      humidity: sample.humidity ?? sample.hum,
      ph: sample.ph,
      rainfall: sample.rainfall ?? sample.rain
    });
    setPredictionResult(null);
    setActiveTab('recommend');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply crop typical parameters from catalogue modal
  const handleApplyCropParameters = (params) => {
    setFormData({
      N: params.N,
      P: params.P,
      K: params.K,
      temperature: params.temperature,
      humidity: params.humidity,
      ph: params.ph,
      rainfall: params.rainfall
    });
    setPredictionResult(null);
    setActiveTab('recommend');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load previous history inputs into form
  const handleLoadParameters = (inputs) => {
    setFormData({
      N: inputs.N,
      P: inputs.P,
      K: inputs.K,
      temperature: inputs.temperature,
      humidity: inputs.humidity,
      ph: inputs.ph,
      rainfall: inputs.rainfall
    });
    setPredictionResult(null);
    setActiveTab('recommend');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to XAI with current form data
  const handleGoToXAI = () => {
    setPredictionResult(null);
    setActiveTab('explain');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Try again / Reset
  const handleTryAgain = () => {
    setPredictionResult(null);
    setFormData(DEFAULT_FORM);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modify current inputs without resetting
  const handleModifyInputs = () => {
    setPredictionResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app-shell min-h-screen flex flex-col font-sans selection:bg-agri-500 selection:text-white ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      
      {/* Top Sticky Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={navigateTo}
        backendStatus={backendStatus} 
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((current) => !current)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {activeTab === 'overview' && (
          <Overview 
            setActiveTab={navigateTo}
            onSelectSample={handleSelectSample} 
          />
        )}

        {activeTab === 'catalogue' && (
          <CropCatalogue 
            currentFormData={formData}
            predictionResult={predictionResult}
            onApplyCropParameters={handleApplyCropParameters}
            setActiveTab={navigateTo}
          />
        )}

        {activeTab === 'recommend' && (
          predictionResult ? (
            <PredictionResult 
              result={predictionResult}
              onTryAgain={handleTryAgain}
              onModifyInputs={handleModifyInputs}
              onExplain={handleGoToXAI}
              setActiveTab={navigateTo}
            />
          ) : (
            <RecommendationForm 
              formData={formData}
              setFormData={setFormData}
              onSubmit={handlePredict}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onMascotSpeak={setMascotExplanation}
            />
          )
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            setActiveTab={navigateTo} 
          />
        )}

        {activeTab === 'explain' && (
          <ExplainableAI
            currentFormData={formData}
            setActiveTab={navigateTo}
          />
        )}

        {activeTab === 'history' && (
          <PredictionHistory 
            onLoadParameters={handleLoadParameters}
            setActiveTab={navigateTo}
          />
        )}

        {activeTab === 'about' && (
          <AboutProject 
            setActiveTab={navigateTo} 
          />
        )}

      </main>

      {/* Interactive AI Mascot Companion Sprout */}
      <AgriMascot 
        activeTab={activeTab}
        setActiveTab={navigateTo}
        predictionResult={predictionResult}
        isLoading={isLoading}
        errorMessage={errorMessage}
        externalExplanation={mascotExplanation}
        onClearExplanation={() => setMascotExplanation(null)}
      />

      {/* Floating 3D Agro Doctor Clinical Consultation Assistant */}
      <AgroDoctorConsultant 
        currentFormData={formData} 
        onApplyPreset={handleSelectSample}
      />

      {/* Footer */}
      <Footer setActiveTab={navigateTo} />

    </div>
  );
}
