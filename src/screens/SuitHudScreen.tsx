import React, { useState } from 'react';
import { HolographicBlueprintCircle } from '../components/HolographicBlueprintCircle';
import { SpiderManFigure } from '../components/SpiderManFigure';
import { InteractiveWebCanvas } from '../components/InteractiveWebCanvas';
import { SuitData, SUITS_DATABASE } from '../data/suits';
import { sounds } from '../utils/audio';
import {
  Crosshair,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Radio,
  Sliders
} from 'lucide-react';

interface SuitHudScreenProps {
  currentSuit: SuitData;
  onSelectSuit: (suit: SuitData) => void;
  onOpenWallpaperStudio: () => void;
}

export const SuitHudScreen: React.FC<SuitHudScreenProps> = ({
  currentSuit,
  onSelectSuit,
  onOpenWallpaperStudio,
}) => {
  const [glowIntensity, setGlowIntensity] = useState<number>(1.1);
  const [showSchematics, setShowSchematics] = useState<boolean>(true);
  const [showRadar, setShowRadar] = useState<boolean>(true);
  const [showTargetLocks, setShowTargetLocks] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [webShotsRemaining, setWebShotsRemaining] = useState<number>(18);
  const [isFiringWeb, setIsFiringWeb] = useState<boolean>(false);
  const [spiderSenseAlert, setSpiderSenseAlert] = useState<boolean>(false);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  const handleManualShoot = () => {
    if (webShotsRemaining <= 0) {
      sounds.playClick();
      return;
    }
    setIsFiringWeb(true);
    sounds.playWebShoot();
    setWebShotsRemaining((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsFiringWeb(false), 300);
  };

  const triggerSpiderSense = () => {
    setSpiderSenseAlert(true);
    sounds.playSpiderSense();
    setTimeout(() => setSpiderSenseAlert(false), 1400);
  };

  const reloadWebFluid = () => {
    sounds.playPowerUp();
    setWebShotsRemaining(20);
  };

  return (
    <div className="relative w-full h-[calc(100vh-68px)] overflow-hidden bg-[#03060d] flex items-center justify-center select-none">
      {/* Background radial gradient mesh and cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#09152a] via-[#030712] to-[#010204] opacity-80" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${currentSuit.hudColor} 1px, transparent 1px), linear-gradient(90deg, ${currentSuit.hudColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Spider-Sense Tingle Pulse Effect across viewport */}
      {spiderSenseAlert && (
        <div
          className="absolute inset-0 pointer-events-none z-30 animate-pulse"
          style={{
            boxShadow: `inset 0 0 100px ${currentSuit.hudColor}`,
            border: `2px solid ${currentSuit.hudColor}`,
          }}
        />
      )}

      {/* Interactive Web Fire Canvas overlay (Click anywhere to shoot webs!) */}
      <InteractiveWebCanvas webColor={currentSuit.hudColor} />

      {/* CENTER VIEWPORT: THE RE-CREATED USER IMAGE COMPOSITION */}
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        {/* 1. HOLOGRAPHIC BLUEPRINT CIRCLE (Positioned behind Spider-Man) */}
        <div className="absolute z-10 flex items-center justify-center transition-all duration-700 pointer-events-none">
          <HolographicBlueprintCircle
            size={580}
            color={currentSuit.hudColor}
            glowRgba={currentSuit.hudGlowRgba}
            intensity={glowIntensity}
            showSchematics={showSchematics}
            showRadarSweep={showRadar}
            showTargetLocks={showTargetLocks}
            schematicText={currentSuit.schematicCode.split(' ')[0]}
          />
        </div>

        {/* 2. SPIDER-MAN FIGURE (In foreground crouching against wall with web) */}
        <div className="relative z-15 w-full h-full max-w-[520px] flex items-center justify-center pointer-events-none">
          <SpiderManFigure
            suitId={currentSuit.id}
            glowColor={currentSuit.hudColor}
            onWebShoot={handleManualShoot}
            interactive={true}
          />
        </div>
      </div>

      {/* LEFT HUD OVERLAY: SUIT TELEMETRY & DIAGNOSTICS */}
      <div className="absolute top-6 left-6 z-25 flex flex-col gap-4 max-w-xs pointer-events-auto">
        {/* Suit Status Card */}
        <div className="bg-[#050b14]/85 backdrop-blur-md border border-slate-800/90 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: currentSuit.hudColor }}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                SUIT STATUS
              </span>
            </div>
            <span
              className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-700/60"
              style={{ color: currentSuit.hudColor }}
            >
              ONLINE
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            <div>
              <div className="text-base font-bold tracking-tight text-white">
                {currentSuit.name}
              </div>
              <div className="text-xs font-mono text-slate-400 truncate">
                {currentSuit.codename}
              </div>
            </div>

            {/* Web Fluid Meter */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-mono mb-1 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  WEB CARTRIDGE
                </span>
                <span className="font-bold text-white tabular-nums">
                  {webShotsRemaining} / 20
                </span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${(webShotsRemaining / 20) * 100}%`,
                    backgroundColor: currentSuit.hudColor,
                    boxShadow: `0 0 8px ${currentSuit.hudColor}`,
                  }}
                />
              </div>
            </div>

            {/* Biometrics */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <div className="text-slate-500 text-[10px]">HEART RATE</div>
                <div className="text-sm font-bold text-emerald-400 tabular-nums">74 BPM</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <div className="text-slate-500 text-[10px]">INTEGRITY</div>
                <div className="text-sm font-bold text-cyan-400 tabular-nums">100%</div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
            <button
              onClick={handleManualShoot}
              disabled={webShotsRemaining <= 0}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                webShotsRemaining > 0
                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              THWIP! (FIRE)
            </button>
            <button
              onClick={reloadWebFluid}
              title="Reload Cartridge"
              className="py-2 px-2.5 text-xs font-mono bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60"
            >
              RELOAD
            </button>
          </div>
        </div>

        {/* Quick Trigger: Spider-Sense Simulator */}
        <button
          onClick={triggerSpiderSense}
          className="w-full py-2.5 px-3 bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 rounded-xl text-xs font-mono text-red-300 flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-red-400" />
          TEST SPIDER-SENSE TINGLE
        </button>
      </div>

      {/* RIGHT HUD OVERLAY: BLUEPRINT CONTROLS & SUIT SWITCHER */}
      <div className="absolute top-6 right-6 z-25 flex flex-col gap-4 max-w-xs pointer-events-auto">
        {/* Hologram Display Controls */}
        <div className="bg-[#050b14]/85 backdrop-blur-md border border-slate-800/90 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              HUD BLUEPRINT CONTROLS
            </span>
            <button
              onClick={toggleAudio}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title={audioEnabled ? 'Mute SFX' : 'Enable SFX'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>

          {/* Layer Switches */}
          <div className="mt-3 space-y-2 text-xs font-mono">
            <label className="flex items-center justify-between text-slate-300 cursor-pointer hover:text-white">
              <span>Schematic Circuit Grid</span>
              <input
                type="checkbox"
                checked={showSchematics}
                onChange={(e) => {
                  setShowSchematics(e.target.checked);
                  sounds.playClick();
                }}
                className="accent-cyan-500 w-4 h-4 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 cursor-pointer hover:text-white">
              <span>Radar Sweep Cone</span>
              <input
                type="checkbox"
                checked={showRadar}
                onChange={(e) => {
                  setShowRadar(e.target.checked);
                  sounds.playClick();
                }}
                className="accent-cyan-500 w-4 h-4 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 cursor-pointer hover:text-white">
              <span>Targeting Reticles</span>
              <input
                type="checkbox"
                checked={showTargetLocks}
                onChange={(e) => {
                  setShowTargetLocks(e.target.checked);
                  sounds.playClick();
                }}
                className="accent-cyan-500 w-4 h-4 rounded cursor-pointer"
              />
            </label>

            {/* Glow Intensity Slider */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-cyan-400" />
                  HALO INTENSITY
                </span>
                <span className="tabular-nums">{Math.round(glowIntensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Quick Suit Selector Drawer */}
        <div className="bg-[#050b14]/85 backdrop-blur-md border border-slate-800/90 rounded-xl p-3 shadow-2xl">
          <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>QUICK SUIT PRESET</span>
            <span className="text-[10px] text-cyan-400">6 AVAILABLE</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SUITS_DATABASE.map((suit) => {
              const active = suit.id === currentSuit.id;
              return (
                <button
                  key={suit.id}
                  onClick={() => {
                    sounds.playPowerUp();
                    onSelectSuit(suit);
                  }}
                  className={`py-1.5 px-2 text-[10px] font-mono rounded border transition-all text-center truncate ${
                    active
                      ? 'border-cyan-400 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 bg-slate-900/60'
                  }`}
                  style={{
                    backgroundColor: active ? `${suit.hudColor}20` : undefined,
                  }}
                >
                  {suit.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wallpaper Exporter Shortcut */}
        <button
          onClick={onOpenWallpaperStudio}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/40 hover:to-blue-600/40 border border-cyan-500/40 rounded-xl text-xs font-mono text-cyan-200 flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <Maximize2 className="w-4 h-4 text-cyan-400" />
          EXPORT 9:16 WALLPAPER SCREEN
        </button>
      </div>

      {/* BOTTOM CENTER: INTERACTION HINT */}
      <div className="absolute bottom-4 z-20 pointer-events-none text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 backdrop-blur-md">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click anywhere to shoot dynamic web strands or tap Spidey to tingle</span>
        </div>
      </div>
    </div>
  );
};
