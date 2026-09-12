import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Volume2, Music } from 'lucide-react';
import { ContentItem } from '../types';

interface AudioContextType {
  currentTrack: ContentItem | null;
  isPlaying: boolean;
  playTrack: (track: ContentItem) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  closePlayer: () => void;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
  seek: (seconds: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<ContentItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playTrack = (track: ContentItem) => {
    if (!track.audioUrl) return;
    setCurrentTrack(track);

    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio playback error', err);
        setIsPlaying(true);
      });
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        resumeTrack,
        closePlayer,
        progress,
        currentTime,
        duration,
        seek
      }}
    >
      {children}
      {currentTrack && <StickyAudioBar />}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider');
  return ctx;
};

const formatTime = (secs: number) => {
  if (isNaN(secs)) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const StickyAudioBar: React.FC = () => {
  const { currentTrack, isPlaying, pauseTrack, resumeTrack, closePlayer, progress, currentTime, duration, seek } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 max-w-md mx-auto px-3">
      <div className="bg-[#121e1c]/95 border border-[#2d6a4f]/50 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex flex-col gap-2">
        {/* Progress Bar */}
        <div
          className="w-full bg-emerald-950 h-1.5 rounded-full cursor-pointer overflow-hidden relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            seek(pos * (duration || 1));
          }}
        >
          <div className="bg-gradient-to-r from-[#2d6a4f] to-[#d4af37] h-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-emerald-800/40"
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-emerald-100 truncate">{currentTrack.title}</h5>
              <p className="text-[10px] text-emerald-300/70 truncate">{currentTrack.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-emerald-400/80">
              {formatTime(currentTime)} / {formatTime(duration || (currentTrack.audioDurationMinutes ? currentTrack.audioDurationMinutes * 60 : 0))}
            </span>

            <button
              onClick={() => (isPlaying ? pauseTrack() : resumeTrack())}
              className="w-9 h-9 rounded-full bg-[#2d6a4f] text-[#d4af37] flex items-center justify-center hover:bg-[#1b4332] transition-colors shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button onClick={closePlayer} className="p-1.5 text-emerald-400 hover:text-emerald-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
