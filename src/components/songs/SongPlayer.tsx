"use client";

import { useRef, useState } from "react";

type SongPlayerProps = {
  audioUrl: string;
  duration: number;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function SongPlayer({ audioUrl, duration }: SongPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  function handleTogglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      const allAudios = document.querySelectorAll("audio");

      allAudios.forEach((item) => {
        if (item !== audio) {
          item.pause();
          item.currentTime = 0;
        }
      });

      audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleEnded() {
    setIsPlaying(false);
    setCurrentTime(0);
  }

  return (
    <div className="mt-2 flex items-center gap-3">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        type="button"
        onClick={handleTogglePlay}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white transition hover:bg-slate-800"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <div className="flex flex-1 items-center gap-2">
        <span className="w-9 text-xs text-slate-400">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
        />

        <span className="w-9 text-xs text-slate-400">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
