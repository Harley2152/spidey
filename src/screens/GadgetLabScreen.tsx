import React, { useState } from 'react';
import { GADGETS_DATABASE, GadgetData } from '../data/gadgets';
import { sounds } from '../utils/audio';
import { Wrench, Zap, Gauge, Flame, Sparkles, RefreshCw, Crosshair } from 'lucide-react';

export const GadgetLabScreen: React.FC = () => {
  const [selectedGadget, setSelectedGadget] = useState<GadgetData>(GADGETS_DATABASE[0]);
  const [ammoCount, setAmmoCount] = useState<number>(selectedGadget.capacity);
  const [pressurePsi, setPressurePsi] = useState<number>(300);
  const [targetHits, setTargetHits] = useState<number>(0);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'firing_range'>('blueprint');

  const handleSelectGadget = (gadget: GadgetData) => {
    setSelectedGadget(gadget);
    setAmmoCount(gadget.capacity);
    sounds.playClick();
  };

  const fireGadget = () => {
    if (ammoCount <= 0) {
      sounds.playClick();
      return;
    }
    setIsFiring(true);
    setAmmoCount((prev) => prev - 1);
    setTargetHits((prev) => prev + 1);

    if (selectedGadget.id === 'electric_web') {
      sounds.playSpiderSense();
    } else {
      sounds.playWebShoot();
    }

    setTimeout(() => setIsFiring(false), 250);
  };

  const reloadAmmo = () => {
    sounds.playPowerUp();
    setAmmoCount(selectedGadget.capacity);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-68px)] bg-[#02050b] text-slate-100 p-6 md:p-8 overflow-y-auto">
      {/* Background Cyber Grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>PETER PARKER WORKBENCH</span>
              <span>·</span>
              <span>MICRO-PNEUMATIC FLUID MECHANICS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Web-Shooter & Ballistic Engineering Lab
            </h1>
          </div>

          {/* Segmented Mode Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('blueprint');
                sounds.playClick();
              }}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'blueprint'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BLUEPRINT SCHEMATIC
            </button>
            <button
              onClick={() => {
                setActiveTab('firing_range');
                sounds.playClick();
              }}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'firing_range'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BALLISTIC FIRING TEST
            </button>
          </div>
        </div>

        {/* Gadget Selector Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {GADGETS_DATABASE.map((gadget) => {
            const isSelected = gadget.id === selectedGadget.id;
            return (
              <button
                key={gadget.id}
                onClick={() => handleSelectGadget(gadget)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-[#050b14]/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="text-[10px] font-mono text-cyan-400 mb-1 truncate">
                  {gadget.type}
                </div>
                <div className="font-bold text-sm text-white truncate">{gadget.name}</div>
                <div className="text-xs font-mono text-slate-400 mt-2 flex items-center justify-between">
                  <span>CAPACITY:</span>
                  <span className="text-white font-semibold">{gadget.capacity}x</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visual: SVG Blueprint or Firing Range */}
          <div className="lg:col-span-8 bg-[#050b14]/85 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[480px]">
            {activeTab === 'blueprint' ? (
              /* INTERACTIVE MECHANICAL SCHEMATIC OF PETER'S WEB-SHOOTER */
              <div className="w-full flex flex-col items-center">
                <svg
                  viewBox="0 0 700 400"
                  className="w-full h-auto max-h-[420px] drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="schematicGlow">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Blueprint Grid Lines */}
                  <g stroke="#00e5ff" strokeOpacity="0.1" strokeWidth="0.8">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 50} x2="700" y2={i * 50} />
                    ))}
                  </g>

                  {/* Dimension Guide Lines */}
                  <g stroke="#00e5ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3">
                    <line x1="80" y1="50" x2="620" y2="50" />
                    <line x1="80" y1="40" x2="80" y2="60" />
                    <line x1="620" y1="40" x2="620" y2="60" />
                    <text x="350" y="44" fill="#00e5ff" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      TOTAL CARTRIDGE ASSEMBLY LENGTH: 112.5mm
                    </text>
                  </g>

                  {/* MAIN WRIST HOUSING & WRISTBAND */}
                  <path
                    d="M 120 120 H 580 C 600 120, 610 140, 600 200 C 610 260, 600 280, 580 280 H 120 C 100 280, 90 260, 100 200 C 90 140, 100 120, 120 120 Z"
                    stroke="#00e5ff"
                    strokeWidth="2"
                    fill="#041224"
                    fillOpacity="0.5"
                    filter="url(#schematicGlow)"
                  />

                  {/* HIGH-PRESSURE FLUID CYLINDER (Left chamber) */}
                  <rect
                    x="150"
                    y="150"
                    width="180"
                    height="100"
                    rx="8"
                    stroke="#00e5ff"
                    strokeWidth="1.8"
                    fill="#082b4a"
                    fillOpacity="0.4"
                  />
                  <line x1="190" y1="150" x2="190" y2="250" stroke="#00e5ff" strokeOpacity="0.4" />
                  <line x1="230" y1="150" x2="230" y2="250" stroke="#00e5ff" strokeOpacity="0.4" />
                  <line x1="270" y1="150" x2="270" y2="250" stroke="#00e5ff" strokeOpacity="0.4" />
                  <text x="240" y="205" fill="#00e5ff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    FLUID CHAMBER (300 PSI)
                  </text>

                  {/* SOLENOID VALVE & PIEZO TRIGGER */}
                  <rect
                    x="350"
                    y="160"
                    width="90"
                    height="80"
                    stroke="#00e5ff"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    fill="#0a355c"
                    fillOpacity="0.3"
                  />
                  <circle cx="395" cy="200" r="22" stroke="#00e5ff" strokeWidth="1.5" />
                  <line x1="395" y1="178" x2="395" y2="222" stroke="#00e5ff" />
                  <line x1="373" y1="200" x2="417" y2="200" stroke="#00e5ff" />
                  <text x="395" y="255" fill="#00e5ff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    SOLENOID VALVE
                  </text>

                  {/* ROTARY SPINNERET NOZZLE (Right tip) */}
                  <polygon
                    points="460,170 540,185 550,200 540,215 460,230"
                    stroke="#00e5ff"
                    strokeWidth="2"
                    fill="#0284c7"
                    fillOpacity="0.3"
                  />
                  {/* Web Emitter Aperture */}
                  <circle cx="550" cy="200" r="6" stroke="#00e5ff" strokeWidth="2" fill="#ffffff" />

                  {/* PALM PRESSURE TRIGGER LINKAGE (Lower connection) */}
                  <path
                    d="M 395 240 V 310 H 320"
                    stroke="#00e5ff"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <rect x="260" y="295" width="60" height="30" rx="4" stroke="#00e5ff" strokeWidth="1.5" fill="#0369a1" fillOpacity="0.4" />
                  <text x="290" y="314" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    PALM PAD
                  </text>

                  {/* Callout Annotations */}
                  <g stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.8">
                    {/* Callout 1 */}
                    <line x1="240" y1="130" x2="240" y2="90" />
                    <line x1="240" y1="90" x2="200" y2="90" />
                    <circle cx="240" cy="130" r="3" fill="#00e5ff" />
                    <text x="190" y="93" fill="#00e5ff" fontSize="9" fontFamily="monospace" textAnchor="end">
                      NYLON POLYMER FLUID CARTRIDGE
                    </text>

                    {/* Callout 2 */}
                    <line x1="550" y1="180" x2="580" y2="100" />
                    <line x1="580" y1="100" x2="630" y2="100" />
                    <circle cx="550" cy="180" r="3" fill="#00e5ff" />
                    <text x="635" y="103" fill="#00e5ff" fontSize="9" fontFamily="monospace">
                      ADJUSTABLE NOZZLE SPINNERET
                    </text>

                    {/* Callout 3 */}
                    <line x1="290" y1="330" x2="290" y2="360" />
                    <circle cx="290" cy="330" r="3" fill="#00e5ff" />
                    <text x="290" y="375" fill="#00e5ff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      DOUBLE-TAP PALM SWITCH
                    </text>
                  </g>
                </svg>
              </div>
            ) : (
              /* BALLISTIC FIRING RANGE SIMULATOR */
              <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
                <div className="text-center">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    PNEUMATIC BALLISTIC RANGE
                  </div>
                  <div className="text-xl font-bold text-white mt-1">
                    Target Suppression: {selectedGadget.name}
                  </div>
                </div>

                {/* Target Range Box */}
                <div
                  onClick={fireGadget}
                  className={`w-full max-w-md h-56 bg-slate-950/80 rounded-2xl border relative flex items-center justify-center cursor-crosshair overflow-hidden transition-all ${
                    isFiring
                      ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] scale-[0.99]'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Concentric Bullseye */}
                  <div className="absolute w-44 h-44 rounded-full border border-slate-800 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-slate-700 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-cyan-500/40 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                          <Crosshair className="w-4 h-4 text-cyan-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Web Visual if hit */}
                  {targetHits > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-36 h-36 rounded-full border-2 border-white/80 border-dashed animate-ping opacity-30" />
                      <div className="text-xs font-mono text-cyan-300 font-bold bg-slate-950/80 px-3 py-1 rounded border border-cyan-500/60 shadow">
                        TARGET PINNED ({targetHits} IMPACTS)
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-3 text-xs font-mono text-slate-500">
                    CLICK TO DISCHARGE NOZZLE
                  </div>
                </div>

                {/* Firing Controls & Ammo Bar */}
                <div className="w-full max-w-md flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">MAGAZINE CARTRIDGE</span>
                      <span className="text-white font-bold tabular-nums">
                        {ammoCount} / {selectedGadget.capacity}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-cyan-400 rounded-full transition-all"
                        style={{
                          width: `${(ammoCount / selectedGadget.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={reloadAmmo}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    REFILL
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Technical Specs & Calibration */}
          <div className="lg:col-span-4 space-y-4">
            {/* Description Card */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>GADGET PROFILE</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{selectedGadget.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedGadget.description}
              </p>
            </div>

            {/* Micro-Mechanics Breakdown */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>SCHEMATIC COMPONENTS</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedGadget.schematicDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono mt-0.5">·</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ballistic Telemetry */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span>BALLISTIC TELEMETRY</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">TENSILE STRENGTH</div>
                  <div className="text-white font-bold mt-0.5">
                    {selectedGadget.techSpec.tensileStrength}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">COMPRESSION</div>
                  <div className="text-cyan-400 font-bold mt-0.5">
                    {selectedGadget.techSpec.compressionPsi}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">DISSOLUTION TIME</div>
                  <div className="text-white font-bold mt-0.5">
                    {selectedGadget.techSpec.dissolutionTime}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">EFFECTIVE RANGE</div>
                  <div className="text-emerald-400 font-bold mt-0.5">
                    {selectedGadget.techSpec.effectiveRange}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
