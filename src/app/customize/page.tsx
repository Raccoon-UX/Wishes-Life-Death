'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BirthdayConfig, BirthdayTheme } from '@/types/config.types';
import { DEFAULT_BIRTHDAY_CONFIG } from '@/config/birthday.defaults';
import { ConfigProvider, useConfigController } from '@/context/ConfigContext';
import { LivePreview } from '@/components/customizer/LivePreview';
import { Button } from '@/components/common/Button';
import {
  Sparkles,
  Heart,
  Cake,
  Mail,
  RotateCcw,
  Download,
  Copy,
  Check,
  Upload,
  Play,
  ArrowLeft,
  Palette,
  Sliders,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react';

const PRESET_CONFIGS: { name: string; description: string; config: Partial<BirthdayConfig> }[] = [
  {
    name: 'Romantic Partner (Default)',
    description: 'Deep romantic hues, heartfelt love note, and dreamy pink/gold atmosphere.',
    config: {
      ...DEFAULT_BIRTHDAY_CONFIG,
      theme: 'romantic',
    },
  },
  {
    name: 'Best Friend / Bestie',
    description: 'Vibrant celebratory mood, playful banter, fun balloon secrets, and energetic warmth.',
    config: {
      ...DEFAULT_BIRTHDAY_CONFIG,
      theme: 'celebration',
      recipient: {
        name: 'Jordan',
        nickname: 'Bestie',
        relation: 'Best Friend',
      },
      sender: {
        name: 'Sam',
        relationship: 'Partner in Crime',
      },
      intro: {
        badgeText: 'Party Mode Activated 🎉',
        greeting: 'Happy Birthday Jordan! 🥳',
        subheading: 'Another year of legendary adventures, inside jokes, and unstoppable memories.',
        ctaText: 'Start The Celebration 🎈',
      },
      reveal: {
        headline: 'Cheers To Your Special Day! 🎂',
        subheadline: 'The world got a whole lot brighter and crazier when you entered it.',
        highlightText: 'May this year be packed with spontaneous trips, loud laughter, and massive wins.',
      },
      cake: {
        candleCount: 3,
        flavor: 'Confetti Funfetti Cake with Salted Caramel Drizzle 🍰',
        wishPrompt: 'Make a wild wish and tap the candles to blow them out! ✨',
        blowPrompt: 'Tap each candle to send your wish into the universe!',
      },
      letter: {
        title: 'A Note For My Favorite Human',
        salutation: 'Dearest Jordan,',
        paragraphs: [
          'I don’t know what I would do without our late-night calls, chaotic road trips, and shared obsession with good food. You make ordinary days feel extraordinary.',
          'Watching you chase your dreams and conquer every challenge inspires me constantly. Never lose that bright spark that lights up every room you walk into.',
          'Here is to another year of laughing until our stomachs hurt and creating memories we will talk about when we are eighty.',
        ],
        highlightQuote: 'Friends like you are the true wealth of life.',
        closing: 'Always cheering for you,',
        signature: 'Sam 🚀',
      },
      celebration: {
        title: 'The Party Has Just Begun',
        subtitle: 'Let’s make this year your best chapter yet!',
        confettiColors: ['#EC4899', '#8B5CF6', '#F59E0B', '#3B82F6', '#10B981'],
        replayButtonText: 'Experience Again 🔄',
      },
    },
  },
  {
    name: 'Dreamy & Whimsical',
    description: 'Cosmic celestial blues, ethereal typography, and starry night aesthetic.',
    config: {
      ...DEFAULT_BIRTHDAY_CONFIG,
      theme: 'dreamy',
      intro: {
        badgeText: 'Written In The Stars ✨',
        greeting: 'A Constellation For You 🌙',
        subheading: 'Across time and space, today marks the celestial day you arrived.',
        ctaText: 'Enter The Cosmos 🌌',
      },
    },
  },
  {
    name: 'Elegant Milestone',
    description: 'Sleek dark gold accents, timeless luxury aesthetic, and refined prose.',
    config: {
      ...DEFAULT_BIRTHDAY_CONFIG,
      theme: 'elegant',
      intro: {
        badgeText: 'A Timeless Milestone 🥂',
        greeting: 'Celebrating Excellence ✨',
        subheading: 'Honoring grace, wisdom, and an extraordinary journey of achievements.',
        ctaText: 'Open Commemoration 🍸',
      },
    },
  },
];

const THEME_OPTIONS: { id: BirthdayTheme; label: string; bgPreview: string; borderPreview: string; textPreview: string }[] = [
  {
    id: 'romantic',
    label: 'Romantic Glow',
    bgPreview: 'from-[#2D124D] to-[#1A0B2E]',
    borderPreview: 'border-brand-pink-400',
    textPreview: 'text-brand-pink-300',
  },
  {
    id: 'dreamy',
    label: 'Dreamy Galaxy',
    bgPreview: 'from-[#0B132B] to-[#1C2541]',
    borderPreview: 'border-indigo-400',
    textPreview: 'text-indigo-300',
  },
  {
    id: 'cute',
    label: 'Cute Pastel',
    bgPreview: 'from-[#2E152D] to-[#461B43]',
    borderPreview: 'border-pink-400',
    textPreview: 'text-pink-300',
  },
  {
    id: 'elegant',
    label: 'Elegant Gold',
    bgPreview: 'from-[#121218] to-[#232330]',
    borderPreview: 'border-amber-400',
    textPreview: 'text-amber-300',
  },
  {
    id: 'celebration',
    label: 'Celebration Confetti',
    bgPreview: 'from-[#1A0826] to-[#40105C]',
    borderPreview: 'border-brand-gold-400',
    textPreview: 'text-brand-gold-300',
  },
];

function CustomizerContent() {
  const { config, updateConfig, resetConfig, exportConfigJSON, importConfigJSON, isCustomized } = useConfigController();
  
  const [activeTab, setActiveTab] = useState<'basics' | 'intro' | 'cake' | 'letter' | 'json'>('basics');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const handleFieldChange = <K extends keyof BirthdayConfig>(key: K, value: BirthdayConfig[K]) => {
    updateConfig({
      ...config,
      [key]: value,
    });
  };

  const handleNestedFieldChange = (
    parentKey: keyof BirthdayConfig,
    nestedKey: string,
    value: unknown
  ) => {
    const parentObj =
      config[parentKey] && typeof config[parentKey] === 'object'
        ? (config[parentKey] as unknown as Record<string, unknown>)
        : {};
    updateConfig({
      ...config,
      [parentKey]: {
        ...parentObj,
        [nestedKey]: value,
      },
    });
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(exportConfigJSON());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadJSON = () => {
    const jsonStr = exportConfigJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birthday-config-${config.recipient.name.toLowerCase().replace(/\s+/g, '-') || 'surprise'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) {
      setImportStatus({ type: 'error', message: 'Please paste a JSON configuration string first.' });
      return;
    }
    const res = importConfigJSON(importText);
    if (res.success) {
      setImportStatus({ type: 'success', message: 'Configuration successfully imported and applied!' });
      setTimeout(() => setImportStatus({ type: 'idle', message: '' }), 4000);
    } else {
      setImportStatus({
        type: 'error',
        message: res.errors && res.errors.length > 0 ? res.errors.join('; ') : 'Invalid configuration format.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#3B0D1E] flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F8B4C8]/40 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-[#FCE4EC] hover:bg-[#F8B4C8] text-[#8B2648] hover:text-[#3B0D1E] transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Birthday Experience"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Experience</span>
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold font-display text-gradient-romantic leading-tight flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#E86A92]" />
                Personalization Studio
              </h1>
              <p className="text-[11px] text-[#8B2648] hidden sm:block">
                Customize every detail of your interactive digital birthday gift
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all customizations back to default demo configuration?')) {
                  resetConfig();
                }
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#FFFDF9] hover:bg-red-50 text-[#8B2648] hover:text-red-600 border border-[#F8B4C8] transition-colors text-xs font-medium flex items-center gap-1.5"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
              className="lg:hidden p-2 sm:px-3 sm:py-2 rounded-xl bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8] text-xs font-semibold flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{mobilePreviewOpen ? 'Edit Form' : 'Live Preview'}</span>
            </button>

            <Link
              href="/"
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#E86A92] via-[#E86A92] to-[#D9A441] text-white font-bold text-xs sm:text-sm shadow-romantic hover:shadow-glow-pink hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Experience</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Controls */}
        <div className={`lg:col-span-7 flex flex-col gap-6 ${mobilePreviewOpen ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Preset Quick Loader Banner */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#F8B4C8] p-4 sm:p-5 relative overflow-hidden shadow-romantic">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-[#8B2648] font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Quick Preset Templates</span>
              </div>
              {isCustomized && (
                <span className="text-[10px] font-semibold bg-[#FCE4EC] text-[#8B2648] border border-[#F8B4C8] px-2 py-0.5 rounded-full">
                  Customized & Autosaved
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_CONFIGS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Load "${preset.name}" preset? This will update your current configuration.`)) {
                      updateConfig(preset.config as BirthdayConfig);
                    }
                  }}
                  className="p-2.5 rounded-xl bg-[#FFF9F5] hover:bg-[#FCE4EC] border border-[#F8B4C8]/50 hover:border-[#E86A92] text-left transition-all group"
                >
                  <div className="text-xs font-bold text-[#3B0D1E] group-hover:text-[#E86A92] truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-[#8B2648]/80 line-clamp-2 mt-0.5 leading-snug">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Tabs Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#FFFDF9] rounded-2xl border border-[#F8B4C8] overflow-x-auto text-xs font-semibold shadow-sm">
            {[
              { id: 'basics', label: '1. Recipient & Theme', icon: Heart },
              { id: 'intro', label: '2. Intro & Reveal', icon: Sparkles },
              { id: 'cake', label: '3. Cake & Balloons', icon: Cake },
              { id: 'letter', label: '4. Letter & Celebration', icon: Mail },
              { id: 'json', label: '5. JSON Import / Export', icon: FileCode },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as 'basics' | 'intro' | 'cake' | 'letter' | 'json')}
                  className={`flex items-center gap-1.5 py-2 px-3 rounded-xl whitespace-nowrap transition-all flex-1 justify-center ${
                    isActive
                      ? 'bg-[#E86A92] text-white font-bold shadow-romantic'
                      : 'text-[#8B2648] hover:text-[#3B0D1E] hover:bg-[#FCE4EC]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: RECIPIENT & THEME */}
          {activeTab === 'basics' && (
            <div className="bg-[#FFFDF9] border border-[#F8B4C8] rounded-2xl p-6 shadow-romantic space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-gradient-romantic flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E86A92]" />
                  Recipient & Sender Details
                </h3>
                <p className="text-xs text-[#8B2648] mt-0.5">
                  Set who this gift is celebrating and who is sending it.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E] flex items-center justify-between">
                    <span>Recipient Full Name *</span>
                    <span className="text-[10px] text-[#E86A92]">Used across all scenes</span>
                  </label>
                  <input
                    type="text"
                    value={config.recipient.name}
                    onChange={(e) => handleNestedFieldChange('recipient', 'name', e.target.value)}
                    placeholder="e.g. Meghna"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E] flex items-center justify-between">
                    <span>Pet Name / Nickname</span>
                    <span className="text-[10px] text-[#8B2648]/70">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={config.recipient.nickname || ''}
                    onChange={(e) => handleNestedFieldChange('recipient', 'nickname', e.target.value)}
                    placeholder="e.g. Sunshine, Angel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Relationship</label>
                  <input
                    type="text"
                    value={config.recipient.relation || ''}
                    onChange={(e) => handleNestedFieldChange('recipient', 'relation', e.target.value)}
                    placeholder="e.g. Best Friend, Partner, Sister"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Sender Name *</label>
                  <input
                    type="text"
                    value={config.sender.name}
                    onChange={(e) => handleNestedFieldChange('sender', 'name', e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>
              </div>

              {/* Theme Palette Selection */}
              <div className="space-y-3 pt-2 border-t border-[#F8B4C8]/40">
                <div>
                  <h4 className="text-sm font-bold font-display text-[#3B0D1E] flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#D9A441]" />
                    Color Palette & Atmosphere Theme
                  </h4>
                  <p className="text-xs text-[#8B2648]">
                    Choose the visual styling and color harmonies applied across the entire experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-3">
                  {THEME_OPTIONS.map((theme) => {
                    const isSelected = config.theme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleFieldChange('theme', theme.id)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#E86A92] bg-[#FCE4EC] shadow-romantic ring-1 ring-[#E86A92]'
                            : 'border-[#F8B4C8] bg-[#FFFDF9] hover:bg-[#FCE4EC]/50'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.bgPreview} border border-[#F8B4C8] flex items-center justify-center shrink-0`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-[#8B2648]" />}
                        </div>
                        <div>
                          <div className={`text-xs font-bold text-[#3B0D1E]`}>
                            {theme.label}
                          </div>
                          <div className="text-[10px] text-[#8B2648]/80 capitalize">
                            Theme: {theme.id}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTRO & REVEAL */}
          {activeTab === 'intro' && (
            <div className="bg-[#FFFDF9] border border-[#F8B4C8] rounded-2xl p-6 shadow-romantic space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-gradient-romantic flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  Landing Intro & Reveal Scene Copy
                </h3>
                <p className="text-xs text-[#8B2648] mt-0.5">
                  Set the opening emotional tone and the dramatic birthday reveal announcement.
                </p>
              </div>

              {/* Intro Scene Section */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B2648] border-b border-[#F8B4C8] pb-1 block">
                  Scene 1: Intro / Mysterious Gift Landing
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Intro Badge Text</label>
                    <input
                      type="text"
                      value={config.intro.badgeText}
                      onChange={(e) => handleNestedFieldChange('intro', 'badgeText', e.target.value)}
                      placeholder="e.g. A Special Birthday Surprise ✨"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Intro Greeting Headline</label>
                    <input
                      type="text"
                      value={config.intro.greeting}
                      onChange={(e) => handleNestedFieldChange('intro', 'greeting', e.target.value)}
                      placeholder="e.g. Hey Meghna 🌸"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Intro Subheading Description</label>
                  <textarea
                    rows={2}
                    value={config.intro.subheading}
                    onChange={(e) => handleNestedFieldChange('intro', 'subheading', e.target.value)}
                    placeholder="e.g. Someone created a digital universe just for your special day..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Intro CTA Button Text</label>
                  <input
                    type="text"
                    value={config.intro.ctaText}
                    onChange={(e) => handleNestedFieldChange('intro', 'ctaText', e.target.value)}
                    placeholder="e.g. Open Your Gift ✨"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>
              </div>

              {/* Reveal Scene Section */}
              <div className="space-y-4 pt-4 border-t border-[#F8B4C8]/40">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441] border-b border-[#D9A441]/30 pb-1 block">
                  Scene 2: The Birthday Reveal
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Reveal Headline</label>
                    <input
                      type="text"
                      value={config.reveal.headline}
                      onChange={(e) => handleNestedFieldChange('reveal', 'headline', e.target.value)}
                      placeholder="e.g. Happy Birthday, Meghna! 🎂✨"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Reveal Subheadline</label>
                    <input
                      type="text"
                      value={config.reveal.subheadline}
                      onChange={(e) => handleNestedFieldChange('reveal', 'subheadline', e.target.value)}
                      placeholder="e.g. Today is all about celebrating you."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Reveal Highlight Quote</label>
                  <input
                    type="text"
                    value={config.reveal.highlightText}
                    onChange={(e) => handleNestedFieldChange('reveal', 'highlightText', e.target.value)}
                    placeholder="e.g. May this year bring you endless laughter and joy."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAKE & BALLOONS */}
          {activeTab === 'cake' && (
            <div className="bg-[#FFFDF9] border border-[#F8B4C8] rounded-2xl p-6 shadow-romantic space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-gradient-romantic flex items-center gap-2">
                  <Cake className="w-4 h-4 text-[#E86A92]" />
                  Interactive Cake & Balloon Mini-Games
                </h3>
                <p className="text-xs text-[#8B2648] mt-0.5">
                  Configure candle blowing count, cake flavor, and floating secret balloon messages.
                </p>
              </div>

              {/* Cake Settings */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B2648] border-b border-[#F8B4C8] pb-1 block">
                  Scene 3: Birthday Cake
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E] flex items-center justify-between">
                      <span>Candle Count: {config.cake.candleCount}</span>
                      <span className="text-[10px] text-[#D9A441]">1 to 5 candles</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={config.cake.candleCount}
                      onChange={(e) => handleNestedFieldChange('cake', 'candleCount', parseInt(e.target.value, 10))}
                      className="w-full accent-[#E86A92] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Cake Flavor & Description</label>
                    <input
                      type="text"
                      value={config.cake.flavor}
                      onChange={(e) => handleNestedFieldChange('cake', 'flavor', e.target.value)}
                      placeholder="e.g. Strawberry Shortcake with White Velvet Cream 🍓🍰"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Wish Prompt</label>
                    <input
                      type="text"
                      value={config.cake.wishPrompt}
                      onChange={(e) => handleNestedFieldChange('cake', 'wishPrompt', e.target.value)}
                      placeholder="e.g. Close your eyes, make a wish..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Blow Prompt</label>
                    <input
                      type="text"
                      value={config.cake.blowPrompt}
                      onChange={(e) => handleNestedFieldChange('cake', 'blowPrompt', e.target.value)}
                      placeholder="e.g. Tap the candles to blow them out! 🎂"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>
              </div>

              {/* Balloon Settings */}
              <div className="space-y-4 pt-4 border-t border-[#F8B4C8]/40">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441] border-b border-[#D9A441]/30 pb-1 block">
                  Scene 4: Balloon Secret Messages ({config.balloons.items.length} Balloons)
                </span>

                <div className="space-y-3">
                  {config.balloons.items.map((balloon, index) => (
                    <div
                      key={balloon.id || index}
                      className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="text"
                          value={balloon.emoji}
                          onChange={(e) => {
                            const newItems = [...config.balloons.items];
                            newItems[index] = { ...newItems[index], emoji: e.target.value };
                            handleNestedFieldChange('balloons', 'items', newItems);
                          }}
                          className="w-10 h-10 text-center text-lg rounded-lg bg-[#FFFDF9] border border-[#F8B4C8] focus:outline-none text-[#3B0D1E]"
                          title="Balloon Emoji"
                        />
                        <span className="text-xs font-semibold text-[#8B2648]">
                          Balloon #{index + 1}
                        </span>
                      </div>

                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={balloon.secretMessage}
                          onChange={(e) => {
                            const newItems = [...config.balloons.items];
                            newItems[index] = { ...newItems[index], secretMessage: e.target.value };
                            handleNestedFieldChange('balloons', 'items', newItems);
                          }}
                          placeholder="Secret message revealed when popped..."
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDF9] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-xs text-[#3B0D1E]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LETTER & CELEBRATION */}
          {activeTab === 'letter' && (
            <div className="bg-[#FFFDF9] border border-[#F8B4C8] rounded-2xl p-6 shadow-romantic space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-gradient-romantic flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D9A441]" />
                  Personal Letter & Final Celebration
                </h3>
                <p className="text-xs text-[#8B2648] mt-0.5">
                  Write the heartfelt personal letter and customize the final celebration message.
                </p>
              </div>

              {/* Letter Section */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B2648] border-b border-[#F8B4C8] pb-1 block">
                  Scene 7: Personal Letter Experience
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Letter Title</label>
                    <input
                      type="text"
                      value={config.letter.title}
                      onChange={(e) => handleNestedFieldChange('letter', 'title', e.target.value)}
                      placeholder="e.g. A Letter For You"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Letter Salutation</label>
                    <input
                      type="text"
                      value={config.letter.salutation}
                      onChange={(e) => handleNestedFieldChange('letter', 'salutation', e.target.value)}
                      placeholder="e.g. Dearest Meghna,"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>

                {/* Letter Paragraphs */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-[#3B0D1E] flex items-center justify-between">
                    <span>Letter Paragraphs ({config.letter.paragraphs.length})</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleNestedFieldChange('letter', 'paragraphs', [
                          ...config.letter.paragraphs,
                          'Another heartfelt memory or thought for your special day...',
                        ]);
                      }}
                      className="text-[11px] text-[#E86A92] hover:text-[#8B2648] flex items-center gap-1 font-semibold"
                    >
                      <Plus className="w-3 h-3" /> Add Paragraph
                    </button>
                  </label>

                  {config.letter.paragraphs.map((para, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const newParas = [...config.letter.paragraphs];
                          newParas[index] = e.target.value;
                          handleNestedFieldChange('letter', 'paragraphs', newParas);
                        }}
                        placeholder={`Paragraph ${index + 1}...`}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-xs sm:text-sm text-[#3B0D1E] leading-relaxed"
                      />
                      {config.letter.paragraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newParas = config.letter.paragraphs.filter((_, i) => i !== index);
                            handleNestedFieldChange('letter', 'paragraphs', newParas);
                          }}
                          className="p-2 text-[#8B2648]/40 hover:text-red-500 transition-colors"
                          title="Remove paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Highlight Handwritten Quote</label>
                  <input
                    type="text"
                    value={config.letter.highlightQuote}
                    onChange={(e) => handleNestedFieldChange('letter', 'highlightQuote', e.target.value)}
                    placeholder="e.g. Some people make the world more special just by being in it."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Letter Closing</label>
                    <input
                      type="text"
                      value={config.letter.closing}
                      onChange={(e) => handleNestedFieldChange('letter', 'closing', e.target.value)}
                      placeholder="e.g. Forever and always,"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Letter Signature</label>
                    <input
                      type="text"
                      value={config.letter.signature}
                      onChange={(e) => handleNestedFieldChange('letter', 'signature', e.target.value)}
                      placeholder="e.g. Alex ✨"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>
              </div>

              {/* Celebration Section */}
              <div className="space-y-4 pt-4 border-t border-[#F8B4C8]/40">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441] border-b border-[#D9A441]/30 pb-1 block">
                  Scene 8: Final Celebration Payoff
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Celebration Title</label>
                    <input
                      type="text"
                      value={config.celebration.title}
                      onChange={(e) => handleNestedFieldChange('celebration', 'title', e.target.value)}
                      placeholder="e.g. Forever Cherished"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#3B0D1E]">Celebration Subtitle</label>
                    <input
                      type="text"
                      value={config.celebration.subtitle}
                      onChange={(e) => handleNestedFieldChange('celebration', 'subtitle', e.target.value)}
                      placeholder="e.g. May your year ahead be as bright as your smile."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3B0D1E]">Replay Button Text</label>
                  <input
                    type="text"
                    value={config.celebration.replayButtonText}
                    onChange={(e) => handleNestedFieldChange('celebration', 'replayButtonText', e.target.value)}
                    placeholder="e.g. Experience Again 🔄"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] focus:border-[#E86A92] focus:outline-none text-sm text-[#3B0D1E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: JSON IMPORT / EXPORT */}
          {activeTab === 'json' && (
            <div className="bg-[#FFFDF9] border border-[#F8B4C8] rounded-2xl p-6 shadow-romantic space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-gradient-romantic flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#D9A441]" />
                  JSON Configuration Import & Export
                </h3>
                <p className="text-xs text-[#8B2648] mt-0.5">
                  Export your personalized configuration to share, or import existing JSON data with instant schema validation.
                </p>
              </div>

              {/* Export Panel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B2648]">
                    Export Current Configuration
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyJSON}
                      className="px-2.5 py-1 rounded-lg bg-[#FCE4EC] border border-[#F8B4C8] hover:bg-[#F8B4C8] text-[#8B2648] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#E86A92]" />}
                      <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadJSON}
                      className="px-2.5 py-1 rounded-lg bg-[#FFF5EB] border border-[#D9A441]/40 hover:bg-[#D9A441]/20 text-[#8B2648] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>Download .json</span>
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  rows={8}
                  value={exportConfigJSON()}
                  className="w-full font-mono text-xs p-3 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] text-[#3B0D1E] focus:outline-none selection:bg-[#E86A92] selection:text-white"
                />
              </div>

              {/* Import Panel */}
              <div className="space-y-3 pt-4 border-t border-[#F8B4C8]/40">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441] block">
                  Import Custom JSON Configuration
                </span>

                <textarea
                  rows={6}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your JSON configuration object here..."
                  className="w-full font-mono text-xs p-3 rounded-xl bg-[#FFF9F5] border border-[#F8B4C8] text-[#3B0D1E] focus:border-[#E86A92] focus:outline-none"
                />

                {importStatus.type !== 'idle' && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      importStatus.type === 'success'
                        ? 'bg-emerald-50 border border-emerald-400 text-emerald-800'
                        : 'bg-red-50 border border-red-400 text-red-800'
                    }`}
                  >
                    {importStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{importStatus.message}</span>
                  </div>
                )}

                <Button
                  variant="romantic"
                  size="sm"
                  onClick={handleImportSubmit}
                  className="font-bold flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Validate & Apply Configuration</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Device Preview */}
        <div className={`lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-20 ${mobilePreviewOpen ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#E86A92]" />
              <h2 className="text-sm font-bold font-display text-[#3B0D1E]">
                Live Interactive Preview
              </h2>
            </div>
            <span className="text-[10px] text-[#8B2648] font-semibold uppercase tracking-wider bg-[#FFF5EB] border border-[#D9A441]/40 px-2 py-0.5 rounded-full">
              Real-Time Sync
            </span>
          </div>

          {/* Device Miniature Render */}
          <LivePreview config={config} />

          {/* Quick Launch Card */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F8B4C8] shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-[#3B0D1E]">
                Ready to surprise {config.recipient.name || 'Meghna'}?
              </div>
              <div className="text-[11px] text-[#8B2648]">
                Changes are automatically active at the home experience.
              </div>
            </div>

            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E86A92] to-[#D9A441] text-white font-bold text-xs shadow-romantic hover:shadow-glow-pink transition-all flex items-center gap-1.5 shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <ConfigProvider>
      <CustomizerContent />
    </ConfigProvider>
  );
}
