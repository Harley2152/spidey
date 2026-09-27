import React, { useState } from 'react';
import { SuitData, SUITS_DATABASE } from '../data/suits';
import { HolographicBlueprintCircle } from '../components/HolographicBlueprintCircle';
import { SpiderManFigure } from '../components/SpiderManFigure';
import { sounds } from '../utils/audio';
import { Shield, Zap, Sparkles, Cpu, Check, Play, Info } from 'lucide-react';

interface SuitVaultScreenProps {
  currentSuit: SuitData;
  onEquipSuit: (suit: SuitData) => void;
  onViewInHud: (suit: SuitData) => void;
}

export const SuitVaultScreen: React.FC<SuitVaultScreenProps> = ({
  currentSuit,
  onEquipSuit,
  onViewInHud,
}) => {
  const [selectedSuit, setSelectedSuit] = useState<SuitData>(currentSuit);
  const [isActivatingPower, setIsActivatingPower] = useState<boolean>(false);

  const handleSelectSuit = (suit: SuitData) => {
    setSelectedSuit(suit);
    sounds.playClick();
  };

  const handleEquip = () => {
    onEquipSuit(selectedSuit);
    sounds.playPowerUp();
  };

  const handleTriggerPower = () => {
    setIsActivatingPower(true);
    sounds.playPowerUp();
    sounds.playSpiderSense();
    setTimeout(() => {
      setIsActivatingPower(false);
    }, 1800);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-68px)] bg-[#02050b] text-slate-100 p-6 md:p-8 overflow-y-auto">
      {/* Background Cyber Grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${selectedSuit.hudColor} 1px, transparent 1px), linear-gradient(90deg, ${selectedSuit.hudColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header Contract */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>OSCORP / STARK WEAPONS LABS</span>
              <span>·</span>
              <span>SUIT FABRICATION VAULT</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Tactical Suit Architecture & Blueprints
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onViewInHud(selectedSuit)}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 transition-colors"
            >
              LAUNCH IN LIVE HUD
            </button>
            <button
              onClick={handleEquip}
              className={`py-2.5 px-5 rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2 ${
                currentSuit.id === selectedSuit.id
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              }`}
            >
              {currentSuit.id === selectedSuit.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  EQUIPPED ACTIVE
                </>
              ) : (
                'EQUIP SUIT'
              )}
            </button>
          </div>
        </div>

        {/* Suit Selector Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SUITS_DATABASE.map((suit) => {
            const isSelected = suit.id === selectedSuit.id;
            const isEquipped = suit.id === currentSuit.id;

            return (
              <button
                key={suit.id}
                onClick={() => handleSelectSuit(suit)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.3)]'
                    : 'bg-[#050b14]/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                {/* Active indicator bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    backgroundColor: isSelected ? suit.hudColor : 'transparent',
                  }}
                />

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>{suit.schematicCode.split(' ')[0]}</span>
                  {isEquipped && (
                    <span className="text-emerald-400 font-semibold">ACTIVE</span>
                  )}
                </div>
                <div className="font-bold text-sm text-white truncate">{suit.name}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {suit.specialAbility}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Two-Column Blueprint & Telemetry Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Holographic Blueprint Visualizer */}
          <div className="lg:col-span-7 bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[520px]">
            {/* Holographic Circle Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <HolographicBlueprintCircle
                size={460}
                color={selectedSuit.hudColor}
                glowRgba={selectedSuit.hudGlowRgba}
                intensity={1}
                schematicText={selectedSuit.schematicCode.split(' ')[0]}
              />
            </div>

            {/* Suit Figure */}
            <div className="relative z-10 w-full max-w-[380px] h-[440px] flex items-center justify-center pointer-events-none">
              <SpiderManFigure
                suitId={selectedSuit.id}
                glowColor={selectedSuit.hudColor}
                interactive={false}
              />
            </div>

            {/* Power Surge Animation Overlay */}
            {isActivatingPower && (
              <div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm animate-pulse"
                style={{ border: `2px solid ${selectedSuit.hudColor}` }}
              >
                <Sparkles
                  className="w-12 h-12 mb-2 animate-spin"
                  style={{ color: selectedSuit.hudColor }}
                />
                <div
                  className="text-lg font-mono font-bold uppercase tracking-widest"
                  style={{ color: selectedSuit.hudColor }}
                >
                  POWER OVERDRIVE: {selectedSuit.specialAbility}
                </div>
                <div className="text-xs font-mono text-slate-300 mt-1 max-w-sm text-center px-4">
                  {selectedSuit.abilityDesc}
                </div>
              </div>
            )}

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-6 right-6 z-15 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800/80">
              <span className="truncate">
                DESIGNER: <strong className="text-white">{selectedSuit.creator}</strong>
              </span>
              <button
                onClick={handleTriggerPower}
                className="py-1 px-3 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 rounded text-[11px] text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Play className="w-3 h-3 fill-current" />
                SIMULATE POWER
              </button>
            </div>
          </div>

          {/* Right Column: Tactical Lore, Combat Specs & Mods */}
          <div className="lg:col-span-5 space-y-4">
            {/* Lore & Specifications */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>SPECIFICATION & MATERIAL LORE</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{selectedSuit.name}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedSuit.lore}</p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <div className="text-slate-500 text-[10px]">CHEST INSIGNIA</div>
                  <div className="text-white font-medium truncate">
                    {selectedSuit.emblemText}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">SYSTEM CORE</div>
                  <div className="text-cyan-400 font-medium truncate">
                    {selectedSuit.schematicCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Combat Ratings Matrix */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  COMBAT ATTRIBUTES
                </span>
                <span className="text-[10px]">DIAGNOSTIC MATRIX</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>DEFENSE // IMPACT ABSORPTION</span>
                    <span className="text-white font-bold tabular-nums">
                      {selectedSuit.defenseRating}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${selectedSuit.defenseRating}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>AGILITY // REFLEX TRAJECTORY</span>
                    <span className="text-white font-bold tabular-nums">
                      {selectedSuit.agilityRating}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${selectedSuit.agilityRating}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>GADGET EFFICIENCY</span>
                    <span className="text-white font-bold tabular-nums">
                      {selectedSuit.gadgetRating}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${selectedSuit.gadgetRating}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>STEALTH & ACOUSTIC ABSORPTION</span>
                    <span className="text-white font-bold tabular-nums">
                      {selectedSuit.stealthRating}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${selectedSuit.stealthRating}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Suit Power & Sockets */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>INTEGRATED SUIT MOD SOCKETS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {selectedSuit.suitMods.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center"
                  >
                    <div className="text-[10px] font-mono text-cyan-400 mb-0.5">
                      SLOT {idx + 1}
                    </div>
                    <div className="text-xs font-medium text-slate-200 leading-tight">
                      {mod}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
