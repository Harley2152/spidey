import React, { useState } from 'react';
import { SUITS_DATABASE, SuitData } from './data/suits';
import { SuitHudScreen } from './screens/SuitHudScreen';
import { SuitVaultScreen } from './screens/SuitVaultScreen';
import { GadgetLabScreen } from './screens/GadgetLabScreen';
import { CrimeScannerScreen } from './screens/CrimeScannerScreen';
import { WallpaperStudioScreen } from './screens/WallpaperStudioScreen';
import { HolographicBlueprintCircle } from './components/HolographicBlueprintCircle';
import { SpiderManFigure } from './components/SpiderManFigure';
import { InteractiveWebCanvas } from './components/InteractiveWebCanvas';
import { sounds } from './utils/audio';
import { Maximize, Minimize, Zap, Volume2, VolumeX, Radio } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'hud' | 'vault' | 'gadgets' | 'crimes' | 'wallpaper'
  >('hud');
  const [currentSuit, setCurrentSuit] = useState<SuitData>(SUITS_DATABASE[0]);
  const [immersiveMode, setImmersiveMode] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const handleTabChange = (
    tab: 'hud' | 'vault' | 'gadgets' | 'crimes' | 'wallpaper'
  ) => {
    setActiveTab(tab);
    sounds.playClick();
  };

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  const triggerInstantThwip = () => {
    sounds.playWebShoot();
  };

  return (
    <div className="min-h-screen bg-[#02050b] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* IMMERSIVE FULLSCREEN WALLPAPER MODE (Exact replica of user's wallpaper screen) */}
      {immersiveMode && (
        <div className="fixed inset-0 z-50 bg-[#020408] flex items-center justify-center select-none overflow-hidden">
          {/* Subtle Cyber Grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${currentSuit.hudColor} 1px, transparent 1px), linear-gradient(90deg, ${currentSuit.hudColor} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Interactive Web Canvas */}
          <InteractiveWebCanvas webColor={currentSuit.hudColor} />

          {/* Holographic Circle */}
          <div className="absolute z-10 flex items-center justify-center pointer-events-none">
            <HolographicBlueprintCircle
              size={620}
              color={currentSuit.hudColor}
              glowRgba={currentSuit.hudGlowRgba}
              intensity={1.2}
              schematicText={currentSuit.schematicCode.split(' ')[0]}
            />
          </div>

          {/* Spidey Figure in Foreground */}
          <div className="relative z-15 w-full h-full max-w-[560px] flex items-center justify-center pointer-events-none">
            <SpiderManFigure
              suitId={currentSuit.id}
              glowColor={currentSuit.hudColor}
              interactive={true}
            />
          </div>

          {/* Exit Immersion Floating Button */}
          <button
            onClick={() => {
              setImmersiveMode(false);
              sounds.playClick();
            }}
            className="absolute top-6 right-6 z-30 py-2 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-200 backdrop-blur-md flex items-center gap-2 transition-all shadow-2xl"
          >
            <Minimize className="w-4 h-4 text-cyan-400" />
            EXIT FULLSCREEN
          </button>

          {/* Bottom Hint */}
          <div className="absolute bottom-6 z-25 text-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-slate-950/70 border border-slate-800/80 text-xs font-mono text-slate-400 backdrop-blur-md">
              Tap screen to fire webs · Press Escape or Exit to return
            </div>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR: STRICT 3-ZONE CONTRACT */}
      <header className="h-[68px] border-b border-slate-800/80 bg-[#040813]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => handleTabChange('hud')}
          className="font-display text-xl font-bold tracking-wider text-white hover:text-cyan-400 transition-colors shrink-0 flex items-center gap-2"
        >
          <span
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: currentSuit.hudColor,
              boxShadow: `0 0 10px ${currentSuit.hudColor}`,
            }}
          />
          SPIDER-OS
        </button>

        {/* Zone 2: 4-6 clean text navigation links (single line, no pills) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-400 whitespace-nowrap">
          <button
            onClick={() => handleTabChange('hud')}
            className={`transition-colors hover:text-white py-1 relative ${
              activeTab === 'hud' ? 'text-white font-bold' : ''
            }`}
          >
            Suit HUD
            {activeTab === 'hud' && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-0.5"
                style={{ backgroundColor: currentSuit.hudColor }}
              />
            )}
          </button>

          <button
            onClick={() => handleTabChange('vault')}
            className={`transition-colors hover:text-white py-1 relative ${
              activeTab === 'vault' ? 'text-white font-bold' : ''
            }`}
          >
            Suit Vault
            {activeTab === 'vault' && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-0.5"
                style={{ backgroundColor: currentSuit.hudColor }}
              />
            )}
          </button>

          <button
            onClick={() => handleTabChange('gadgets')}
            className={`transition-colors hover:text-white py-1 relative ${
              activeTab === 'gadgets' ? 'text-white font-bold' : ''
            }`}
          >
            Gadget Lab
            {activeTab === 'gadgets' && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-0.5"
                style={{ backgroundColor: currentSuit.hudColor }}
              />
            )}
          </button>

          <button
            onClick={() => handleTabChange('crimes')}
            className={`transition-colors hover:text-white py-1 relative ${
              activeTab === 'crimes' ? 'text-white font-bold' : ''
            }`}
          >
            Crime Radar
            {activeTab === 'crimes' && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-0.5"
                style={{ backgroundColor: currentSuit.hudColor }}
              />
            )}
          </button>

          <button
            onClick={() => handleTabChange('wallpaper')}
            className={`transition-colors hover:text-white py-1 relative ${
              activeTab === 'wallpaper' ? 'text-white font-bold' : ''
            }`}
          >
            Wallpaper Studio
            {activeTab === 'wallpaper' && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-0.5"
                style={{ backgroundColor: currentSuit.hudColor }}
              />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleAudio}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={audioEnabled ? 'Audio SFX Enabled' : 'Audio SFX Muted'}
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <button
            onClick={() => {
              setImmersiveMode(true);
              sounds.playClick();
            }}
            className="hidden sm:flex items-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-200 transition-colors whitespace-nowrap"
          >
            <Maximize className="w-3.5 h-3.5 text-cyan-400" />
            FULLSCREEN HUD
          </button>

          <button
            onClick={triggerInstantThwip}
            className="py-2 px-4 text-xs font-bold rounded-lg text-slate-950 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            style={{ backgroundColor: currentSuit.hudColor }}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            THWIP!
          </button>
        </div>
      </header>

      {/* MOBILE SECONDARY TAB STRIP (For screens < 768px) */}
      <div className="md:hidden flex items-center justify-around border-b border-slate-800/80 bg-slate-950 px-2 py-2 text-[11px] font-mono uppercase tracking-wider shrink-0 overflow-x-auto">
        <button
          onClick={() => handleTabChange('hud')}
          className={`px-2.5 py-1 rounded ${
            activeTab === 'hud' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          HUD
        </button>
        <button
          onClick={() => handleTabChange('vault')}
          className={`px-2.5 py-1 rounded ${
            activeTab === 'vault' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          Vault
        </button>
        <button
          onClick={() => handleTabChange('gadgets')}
          className={`px-2.5 py-1 rounded ${
            activeTab === 'gadgets' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          Gadgets
        </button>
        <button
          onClick={() => handleTabChange('crimes')}
          className={`px-2.5 py-1 rounded ${
            activeTab === 'crimes' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          Radar
        </button>
        <button
          onClick={() => handleTabChange('wallpaper')}
          className={`px-2.5 py-1 rounded ${
            activeTab === 'wallpaper' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
          }`}
        >
          Wallpaper
        </button>
      </div>

      {/* MAIN SCREEN ROUTING */}
      <main className="flex-1 flex flex-col relative">
        {activeTab === 'hud' && (
          <SuitHudScreen
            currentSuit={currentSuit}
            onSelectSuit={(suit) => setCurrentSuit(suit)}
            onOpenWallpaperStudio={() => handleTabChange('wallpaper')}
          />
        )}

        {activeTab === 'vault' && (
          <SuitVaultScreen
            currentSuit={currentSuit}
            onEquipSuit={(suit) => setCurrentSuit(suit)}
            onViewInHud={(suit) => {
              setCurrentSuit(suit);
              setActiveTab('hud');
            }}
          />
        )}

        {activeTab === 'gadgets' && <GadgetLabScreen />}

        {activeTab === 'crimes' && <CrimeScannerScreen />}

        {activeTab === 'wallpaper' && (
          <WallpaperStudioScreen
            currentSuit={currentSuit}
            onSelectSuit={(suit) => setCurrentSuit(suit)}
          />
        )}
      </main>
    </div>
  );
}
