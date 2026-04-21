"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

interface CinematicVideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
}

export default function CinematicVideoPlayer({
  src,
  autoPlay = false,
  onPlayStateChange,
}: CinematicVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) {
      video.play().catch(() => {
        // Autoplay blocked
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full aspect-[2.35/1] overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
        onPlay={() => {
          setIsPlaying(true);
          onPlayStateChange?.(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setProgress((v.currentTime / v.duration) * 100);
          setCurrentTime(formatTime(v.currentTime));
        }}
        onLoadedMetadata={(e) => {
          setDuration(formatTime(e.currentTarget.duration));
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[280px] flex items-center gap-3 glass-panel px-4 py-2 rounded-full">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full border border-rouge-100 flex items-center justify-center text-rouge-100 hover:bg-rouge-100/10 transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-rouge-100 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs text-rouge-100 whitespace-nowrap">
          {currentTime} / {duration}
        </span>
      </div>
    </div>
  );
}
