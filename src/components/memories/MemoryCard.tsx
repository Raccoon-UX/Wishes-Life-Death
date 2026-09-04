'use client';

import React, { useState } from 'react';
import { MemoryItem } from '@/types/config.types';
import { Camera, Calendar, Sparkles, ExternalLink, Music } from 'lucide-react';

export interface MemoryCardProps {
  item: MemoryItem;
  index: number;
  totalCount: number;
}

export function MemoryCard({ item, index, totalCount }: MemoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = item.imageUrl || item.imagePlaceholder;

  // Artistic dreamy romantic themes for memory photo card fallback
  const photoThemes = [
    'from-[#E86A92] via-[#F8B4C8] to-[#E8DDF5]',
    'from-[#D9A441] via-[#E86A92] to-[#FCE4EC]',
    'from-[#B83B68] via-[#E86A92] to-[#D9A441]',
  ][index % 3];

  const renderPhotoContent = () => {
    if (imageSrc && !imageError) {
      return (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={item.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
          {/* Soft romantic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Top-right sparkle */}
          <div className="absolute top-2.5 right-2.5 text-[#D9A441] drop-shadow-md pointer-events-none">
            <Sparkles className="w-4 h-4" />
          </div>

          {/* If there is a linkUrl (e.g. Spotify playlist), show an interactive badge */}
          {item.linkUrl && (
            <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DB954]/95 text-white text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/30 group-hover:scale-105 group-hover:bg-[#1ed760] transition-all duration-300">
              <Music className="w-3.5 h-3.5 animate-pulse" />
              <span>{item.linkText || 'Open Playlist'}</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-90" />
            </div>
          )}
        </>
      );
    }

    // Fallback when no image is supplied or error occurred
    return (
      <>
        <div className={`absolute inset-0 bg-gradient-to-tr ${photoThemes} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center text-white p-2">
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-md">
            <Camera className="w-6 h-6 text-white drop-shadow" />
          </div>
          <span className="text-base font-display font-bold text-white tracking-wide drop-shadow-md">
            {item.title}
          </span>
        </div>
        <div className="absolute top-3 right-3 text-[#D9A441] drop-shadow">
          <Sparkles className="w-4 h-4" />
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#FFFDF9] text-[#3B0D1E] rounded-2xl p-4 sm:p-5 shadow-romantic border border-[#F8B4C8]/40 relative select-none transform-gpu rotate-[-1deg] transition-all duration-300 hover:rotate-0">
      {/* Washi Tape Decor on Top */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#F8B4C8]/85 border border-[#E86A92]/40 rounded-sm rotate-[-2deg] shadow-sm backdrop-blur-[1px] pointer-events-none"
      />

      {/* POLAROID PHOTO FRAME */}
      {item.linkUrl ? (
        <a
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Click to open Spotify Playlist"
          className="group block w-full h-52 sm:h-60 rounded-xl overflow-hidden relative mb-4 border border-[#F8B4C8]/40 flex items-center justify-center shadow-inner bg-[#FFF5EB] cursor-pointer hover:shadow-glow-pink transition-all duration-300"
        >
          {renderPhotoContent()}
        </a>
      ) : (
        <div className="group block w-full h-52 sm:h-60 rounded-xl overflow-hidden relative mb-4 border border-[#F8B4C8]/40 flex items-center justify-center shadow-inner bg-[#FFF5EB]">
          {renderPhotoContent()}
        </div>
      )}

      {/* POLAROID HANDWRITTEN CAPTION */}
      <div className="space-y-2 text-left px-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8]">
            <Calendar className="w-3 h-3 text-[#E86A92]" />
            <span>{item.yearOrTag}</span>
          </span>

          <span className="text-xs font-handwriting text-[#8B2648] font-bold">
            Chapter {index + 1} of {totalCount}
          </span>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-[#3B0D1E] leading-snug pt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
}
