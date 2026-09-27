import React, { useState, useRef } from 'react';
import { HolographicBlueprintCircle } from '../components/HolographicBlueprintCircle';
import { SpiderManFigure } from '../components/SpiderManFigure';
import { SuitData, SUITS_DATABASE } from '../data/suits';
import { sounds } from '../utils/audio';
import { Download, Sliders, Smartphone, Quote, Sparkles, Check, Wifi, Battery } from 'lucide-react';

interface WallpaperStudioScreenProps {
  currentSuit: SuitData;
  onSelectSuit: (suit: SuitData) => void;
}

export const WallpaperStudioScreen: React.FC<WallpaperStudioScreenProps> = ({
  currentSuit,
  onSelectSuit,
}) => {
  const [selectedSuit, setSelectedSuit] = useState<SuitData>(currentSuit);
  const [showClockOverlay, setShowClockOverlay] = useState<boolean>(true);
  const [showQuote, setShowQuote] = useState<boolean>(true);
  const [selectedQuote, setSelectedQuote] = useState<string>(
    'With great power comes great responsibility.'
  );
  const [hologramColor, setHologramColor] = useState<string>(currentSuit.hudColor);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const phoneFrameRef = useRef<HTMLDivElement | null>(null);

  const QUOTES = [
    'With great power comes great responsibility.',
    'Anyone can wear the mask. Be Greater.',
    'Just a kid from Queens.',
    'In the dark, we are the light.',
    'Be yourself, Miles. Always.',
  ];

  const COLOR_PALETTES = [
    { name: 'Blueprint Cyan', hex: '#00e5ff', glow: 'rgba(0,229,255,0.45)' },
    { name: 'Venom Yellow', hex: '#facc15', glow: 'rgba(250,204,21,0.45)' },
    { name: 'Stark Azure', hex: '#38bdf8', glow: 'rgba(56,189,248,0.45)' },
    { name: 'Alchemax Pink', hex: '#ec4899', glow: 'rgba(236,72,153,0.45)' },
    { name: 'Stealth Emerald', hex: '#10b981', glow: 'rgba(16,185,129,0.45)' },
    { name: 'Symbiote Violet', hex: '#a855f7', glow: 'rgba(168,85,247,0.45)' },
    { name: 'Crimson Fury', hex: '#ef4444', glow: 'rgba(239,68,68,0.45)' },
  ];

  const handleSuitChange = (suit: SuitData) => {
    setSelectedSuit(suit);
    setHologramColor(suit.hudColor);
    setSelectedQuote(suit.quote);
    onSelectSuit(suit);
    sounds.playClick();
  };

  const downloadWallpaper = () => {
    setIsExporting(true);
    sounds.playPowerUp();

    // Render onto an offscreen canvas at high 1080x1920 phone resolution
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Deep OLED Black background
    ctx.fillStyle = '#020409';
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle radial gradient in center
    const radial = ctx.createRadialGradient(540, 850, 50, 540, 850, 750);
    radial.addColorStop(0, '#09152b');
    radial.addColorStop(0.6, '#030814');
    radial.addColorStop(1, '#000000');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Draw Blueprint Circle
    ctx.save();
    ctx.translate(540, 850);
    ctx.strokeStyle = hologramColor;
    ctx.shadowColor = hologramColor;
    ctx.shadowBlur = 30;
    ctx.lineWidth = 5;

    // Outer circle
    ctx.beginPath();
    ctx.arc(0, 0, 480, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary ring
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 460, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshairs
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-480, 0);
    ctx.lineTo(480, 0);
    ctx.moveTo(0, -480);
    ctx.lineTo(0, 480);
    ctx.stroke();

    // Concentric inner circles
    ctx.beginPath();
    ctx.arc(0, 0, 320, 0, Math.PI * 2);
    ctx.arc(0, 0, 180, 0, Math.PI * 2);
    ctx.stroke();

    // "X00" Blueprint header
    ctx.fillStyle = hologramColor;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(selectedSuit.schematicCode.split(' ')[0], 0, -320);

    ctx.restore();

    // 3. Draw wall angle in background
    ctx.fillStyle = '#0a0f1c';
    ctx.beginPath();
    ctx.moveTo(560, 1920);
    ctx.lineTo(400, 1400);
    ctx.lineTo(540, 500);
    ctx.lineTo(800, 300);
    ctx.lineTo(950, 1920);
    ctx.closePath();
    ctx.fill();

    // Wall rim light
    ctx.strokeStyle = hologramColor;
    ctx.lineWidth = 4;
    ctx.shadowColor = hologramColor;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(540, 500);
    ctx.lineTo(400, 1400);
    ctx.stroke();

    // Web strand
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.shadowColor = hologramColor;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(680, 320);
    ctx.quadraticCurveTo(760, 200, 800, 0);
    ctx.stroke();

    // 4. Spider-Man silhouette and chest emblem
    ctx.fillStyle = selectedSuit.primaryColor;
    ctx.beginPath();
    // Torso / body representation
    ctx.arc(460, 820, 110, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(480, 660, 80, 0, Math.PI * 2);
    ctx.fill();

    // Eye lenses
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.ellipse(455, 665, 24, 14, Math.PI / 8, 0, Math.PI * 2);
    ctx.ellipse(505, 660, 28, 15, -Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();

    // Spider emblem
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🕷', 460, 840);

    // 5. Quote banner if enabled
    if (showQuote) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(80, 1720, 920, 100);
      ctx.strokeStyle = hologramColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 1720, 920, 100);

      ctx.fillStyle = '#ffffff';
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`"${selectedQuote}"`, 540, 1780);
    }

    // Convert canvas to image and trigger download
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `SpiderMan_HUD_Wallpaper_${selectedSuit.id}.png`;
      link.href = dataUrl;
      link.click();
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-68px)] bg-[#02050b] text-slate-100 p-6 md:p-8 overflow-y-auto">
      {/* Background Cyber Grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${hologramColor} 1px, transparent 1px), linear-gradient(90deg, ${hologramColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header Contract */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>9:16 ULTRA HD MOBILE LOCKSCREEN GENERATOR</span>
              <span>·</span>
              <span>CANVAS EXPORTER</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Spider-Man Wallpaper & Screen Studio
            </h1>
          </div>

          <button
            onClick={downloadWallpaper}
            disabled={isExporting}
            className={`py-2.5 px-5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              isExporting
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'RENDERING 4K PNG...' : 'DOWNLOAD 9:16 WALLPAPER'}
          </button>
        </div>

        {/* Studio Workspace: Phone Mockup on Left, Customizer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Authentic 9:16 Phone Device Screen Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Phone Bezel */}
            <div
              ref={phoneFrameRef}
              className="relative w-full max-w-[340px] aspect-[9/19.5] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-800 select-none overflow-hidden"
              style={{
                boxShadow: `0 0 50px ${hologramColor}25, 0 25px 60px -15px rgba(0,0,0,0.9)`,
              }}
            >
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-950/80 border border-blue-900/60" />
              </div>

              {/* Wallpaper Screen Surface */}
              <div className="relative w-full h-full bg-[#03060f] rounded-[40px] overflow-hidden flex flex-col items-center justify-center">
                {/* Background Blueprint Halo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <HolographicBlueprintCircle
                    size={380}
                    color={hologramColor}
                    glowRgba={`${hologramColor}50`}
                    intensity={1.15}
                    schematicText={selectedSuit.schematicCode.split(' ')[0]}
                  />
                </div>

                {/* Foreground Spidey Figure */}
                <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none scale-105">
                  <SpiderManFigure
                    suitId={selectedSuit.id}
                    glowColor={hologramColor}
                    interactive={false}
                  />
                </div>

                {/* Optional Phone Lockscreen Clock Overlay */}
                {showClockOverlay && (
                  <div className="absolute top-14 left-0 right-0 z-30 flex flex-col items-center text-white pointer-events-none">
                    {/* Status Icons */}
                    <div className="w-full px-6 flex items-center justify-between text-[11px] font-mono text-slate-300 opacity-80 mb-2">
                      <span className="font-semibold">WEBNET 5G</span>
                      <div className="flex items-center gap-1.5">
                        <Wifi className="w-3 h-3" />
                        <Battery className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="text-5xl font-light tracking-tight mt-1">09:41</div>
                    <div className="text-xs font-medium text-slate-300 tracking-wide mt-1">
                      Wednesday, September 27
                    </div>
                  </div>
                )}

                {/* Optional Hero Quote Banner */}
                {showQuote && (
                  <div className="absolute bottom-10 left-4 right-4 z-30 pointer-events-none text-center">
                    <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl px-3 py-2 text-[11px] text-slate-200 shadow-xl">
                      "{selectedQuote}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 mt-4 text-center">
              Real-time 9:16 OLED Mobile Wallpaper Render (1080 × 1920)
            </div>
          </div>

          {/* Right: Studio Customizer Controls */}
          <div className="lg:col-span-6 space-y-5">
            {/* Suit Template Selection */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <Smartphone className="w-4 h-4" />
                <span>CHOOSE SUIT TEMPLATE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                {SUITS_DATABASE.map((suit) => {
                  const active = suit.id === selectedSuit.id;
                  return (
                    <button
                      key={suit.id}
                      onClick={() => handleSuitChange(suit)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        active
                          ? 'border-cyan-400 bg-slate-900 text-white shadow'
                          : 'border-slate-800 text-slate-400 hover:text-white bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold truncate">{suit.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">
                        {suit.schematicCode.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hologram Blueprint Color Swatches */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>HOLOGRAPHIC BLUEPRINT COLOR</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                {COLOR_PALETTES.map((palette) => {
                  const active = hologramColor.toLowerCase() === palette.hex.toLowerCase();
                  return (
                    <button
                      key={palette.name}
                      onClick={() => {
                        setHologramColor(palette.hex);
                        sounds.playClick();
                      }}
                      className={`p-2 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                        active
                          ? 'border-white text-white bg-slate-900 shadow'
                          : 'border-slate-800 text-slate-400 hover:text-white bg-slate-950/60'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: palette.hex,
                          boxShadow: `0 0 8px ${palette.hex}`,
                        }}
                      />
                      <span className="truncate text-[11px] font-medium">{palette.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lockscreen Elements & Quote */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Sliders className="w-4 h-4" />
                <span>LOCKSCREEN OVERLAYS</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <label className="flex items-center justify-between text-slate-300 cursor-pointer hover:text-white">
                  <span>Display Phone Lock Clock & Carrier</span>
                  <input
                    type="checkbox"
                    checked={showClockOverlay}
                    onChange={(e) => {
                      setShowClockOverlay(e.target.checked);
                      sounds.playClick();
                    }}
                    className="accent-cyan-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-slate-300 cursor-pointer hover:text-white">
                  <span>Display Hero Quote Pill</span>
                  <input
                    type="checkbox"
                    checked={showQuote}
                    onChange={(e) => {
                      setShowQuote(e.target.checked);
                      sounds.playClick();
                    }}
                    className="accent-cyan-500 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
              </div>

              {showQuote && (
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                    <Quote className="w-3 h-3 text-cyan-400" />
                    SELECT HERO QUOTE
                  </div>
                  <div className="space-y-1.5">
                    {QUOTES.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setSelectedQuote(q);
                          sounds.playClick();
                        }}
                        className={`w-full p-2 text-left text-xs rounded-lg border transition-colors ${
                          selectedQuote === q
                            ? 'bg-slate-900 border-cyan-400 text-white font-medium'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        "{q}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Download Button */}
            <button
              onClick={downloadWallpaper}
              disabled={isExporting}
              className="w-full py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm font-mono transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'EXPORTING...' : 'EXPORT HI-RES WALLPAPER IMAGE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
