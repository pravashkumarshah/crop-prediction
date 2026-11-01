import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Tv, 
  Maximize2,
  Film,
  BookOpen
} from 'lucide-react';
import { getCropVideoData } from '../data/cropVideos';
import YT_IDS from '../data/yt_ids.json';

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function CropVideoPlayer({ cropName, displayName }) {
  const videoData = getCropVideoData(cropName);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const cropKey = (cropName || '').toLowerCase().trim();
  const cropIds = YT_IDS[cropKey] || [];
  const activeVideo = videoData.videos[selectedVideoIndex] || videoData.videos[0];
  const currentVideoId = activeVideo.videoId || cropIds[selectedVideoIndex] || cropIds[0] || 'mJF_8OWGTuA';
  
  const embedUrl = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${currentVideoId}`;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-agri-950 border border-agri-500/40 shadow-2xl p-6 sm:p-8 text-white space-y-6 overflow-hidden relative">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-forest-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <YouTubeIcon className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Interactive Video Masterclass</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>{videoData.displayName} Cultivation Video Tutorials</span>
          </h3>
          <p className="text-xs text-slate-300">
            Watch verified agronomic step-by-step video training directly on this website without leaving the portal.
          </p>
        </div>

        {/* External YouTube fallback */}
        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900/90 hover:bg-forest-800 border border-forest-700 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm flex-shrink-0"
        >
          <span>Open in YouTube</span>
          <ExternalLink className="w-3.5 h-3.5 text-red-400" />
        </a>
      </div>

      {/* Video Category Selector Tabs */}
      <div className="relative z-10 flex flex-wrap items-center gap-2">
        {videoData.videos.map((vid, idx) => {
          const isSelected = selectedVideoIndex === idx;
          return (
            <button
              key={vid.id || idx}
              onClick={() => {
                setSelectedVideoIndex(idx);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 scale-105 ring-2 ring-red-400/50'
                  : 'bg-forest-900/80 text-stone-300 hover:bg-forest-800 border border-forest-800 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{vid.category}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-white' : 'bg-forest-950 text-slate-400'}`}>
                {vid.duration}
              </span>
            </button>
          );
        })}
      </div>

      {/* Embedded Video Player Container (Plays Directly on the Website) */}
      <div className="relative z-10 w-full rounded-2xl overflow-hidden bg-black border-2 border-forest-700/80 shadow-2xl aspect-video group">
        
        {!isPlaying ? (
          /* Custom High-Impact Thumbnail & Instant Play Trigger */
          <div 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-cover bg-center transition-all"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.88), rgba(6, 26, 17, 0.65)), url(${thumbnailUrl})`
            }}
          >
            {/* Pulsing Play Button */}
            <div className="w-20 h-20 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 ring-8 ring-red-500/25">
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </div>

            <div className="mt-5 space-y-1.5 max-w-lg bg-black/50 p-3 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-400">
                {activeVideo.channel}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {activeVideo.title}
              </h4>
              <p className="text-xs text-slate-300">
                Click to play video directly inside this webpage • Duration: {activeVideo.duration}
              </p>
            </div>
          </div>
        ) : (
          /* Live Embedded HTML5 YouTube Iframe */
          <iframe
            src={embedUrl}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Video Details & Practical Highlights */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
        
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400">Key Field Highlights from this Tutorial:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeVideo.highlights.map((h, i) => (
              <span 
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-forest-900/90 border border-forest-800 text-xs font-medium text-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{h}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 bg-forest-900/60 border border-forest-800 rounded-2xl p-3.5 text-xs text-slate-300 space-y-1 backdrop-blur-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Verified Source</span>
            <span className="text-emerald-400 font-bold">Agronomist Recommended</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Covers verified sowing techniques and fertilizer timing recommended for <strong>{displayName || cropName}</strong>.
          </p>
        </div>

      </div>

    </div>
  );
}
