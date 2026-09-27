import React, { useState } from 'react';
import { INITIAL_CRIMES, CrimeAlert } from '../data/crimes';
import { sounds } from '../utils/audio';
import { Radio, ShieldAlert, CheckCircle2, Navigation, AlertTriangle, Compass, MapPin } from 'lucide-react';

export const CrimeScannerScreen: React.FC = () => {
  const [crimes, setCrimes] = useState<CrimeAlert[]>(INITIAL_CRIMES);
  const [selectedCrime, setSelectedCrime] = useState<CrimeAlert>(INITIAL_CRIMES[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [radioFreq, setRadioFreq] = useState<string>('NYPD DISPATCH // CH-04 [460.125 MHz]');

  const handleSelectCrime = (crime: CrimeAlert) => {
    setSelectedCrime(crime);
    sounds.playClick();
  };

  const scanDistrict = () => {
    setIsScanning(true);
    sounds.playScan();
    setTimeout(() => {
      setIsScanning(false);
      sounds.playSpiderSense();
    }, 1500);
  };

  const resolveIncident = (crimeId: string) => {
    sounds.playPowerUp();
    setCrimes((prev) =>
      prev.map((c) => (c.id === crimeId ? { ...c, resolved: true } : c))
    );
    if (selectedCrime.id === crimeId) {
      setSelectedCrime((prev) => ({ ...prev, resolved: true }));
    }
  };

  const activeCount = crimes.filter((c) => !c.resolved).length;
  const resolvedCount = crimes.filter((c) => c.resolved).length;

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
        {/* Header Contract */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>NYPD POLICE TELEMETRY TRIANGULATION</span>
              <span>·</span>
              <span>MANHATTAN SECTORS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Crime Scanner & District Patrol Radar
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>ACTIVE THREATS: <strong className="text-white">{activeCount}</strong></span>
              <span>·</span>
              <span>RESOLVED: <strong className="text-emerald-400">{resolvedCount}</strong></span>
            </div>

            <button
              onClick={scanDistrict}
              disabled={isScanning}
              className={`py-2 px-4 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                isScanning
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'SCANNING SECTORS...' : 'SCAN MANHATTAN'}
            </button>
          </div>
        </div>

        {/* Main Grid: Cyber Map on Left, Incident Dispatch on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Holographic Cyber Map of Manhattan */}
          <div className="lg:col-span-8 bg-[#050b14]/85 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
            {/* Map Header Overlay */}
            <div className="absolute top-4 left-6 right-6 z-15 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Radio className="w-3.5 h-3.5" />
                {radioFreq}
              </span>
              <span>RADAR LAT/LONG: 40.7831° N, 73.9712° W</span>
            </div>

            {/* Radar Scanline Animation */}
            {isScanning && (
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="w-[500px] h-[500px] rounded-full border border-cyan-400/40 animate-ping" />
                <div className="w-[300px] h-[300px] rounded-full border border-cyan-400/60 animate-pulse" />
              </div>
            )}

            {/* SVG MANHATTAN ISLAND BLUEPRINT VECTOR */}
            <div className="relative w-full h-[420px] mt-6 flex items-center justify-center">
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full max-h-[420px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Manhattan outline silhouette & district sectors */}
                <path
                  d="M 330 40 L 400 120 L 370 240 L 330 350 L 290 480 L 240 540 L 210 520 L 220 440 L 240 320 L 260 180 L 290 60 Z"
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeOpacity="0.45"
                  fill="#031526"
                  fillOpacity="0.3"
                />

                {/* Internal District Boundaries */}
                <g stroke="#00e5ff" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3">
                  {/* Harlem */}
                  <line x1="280" y1="120" x2="380" y2="150" />
                  {/* Central Park Outline */}
                  <rect x="275" y="170" width="55" height="110" rx="3" stroke="#10b981" strokeOpacity="0.4" fill="#064e3b" fillOpacity="0.1" />
                  {/* Midtown */}
                  <line x1="250" y1="300" x2="350" y2="320" />
                  {/* Hell's Kitchen */}
                  <line x1="230" y1="380" x2="320" y2="400" />
                  {/* Financial District */}
                  <line x1="220" y1="470" x2="280" y2="480" />
                </g>

                {/* District Labels */}
                <text x="340" y="95" fill="#00e5ff" fontSize="9" fontFamily="monospace" fillOpacity="0.5">
                  HARLEM
                </text>
                <text x="300" y="230" fill="#10b981" fontSize="9" fontFamily="monospace" fillOpacity="0.6">
                  CENTRAL PARK
                </text>
                <text x="310" y="340" fill="#00e5ff" fontSize="9" fontFamily="monospace" fillOpacity="0.5">
                  MIDTOWN
                </text>
                <text x="235" y="420" fill="#00e5ff" fontSize="9" fontFamily="monospace" fillOpacity="0.5">
                  HELL'S KITCHEN
                </text>
                <text x="245" y="515" fill="#00e5ff" fontSize="9" fontFamily="monospace" fillOpacity="0.5">
                  FINANCIAL
                </text>

                {/* Concentric Radar Overlay Circles */}
                <circle cx="300" cy="300" r="120" stroke="#00e5ff" strokeOpacity="0.12" />
                <circle cx="300" cy="300" r="220" stroke="#00e5ff" strokeOpacity="0.08" />
                <circle cx="300" cy="300" r="280" stroke="#00e5ff" strokeOpacity="0.05" />

                {/* Render Crime Pin Hotspots */}
                {crimes.map((crime) => {
                  const isSelected = crime.id === selectedCrime.id;
                  const x = (crime.coordinates.x / 100) * 600;
                  const y = (crime.coordinates.y / 100) * 600;

                  return (
                    <g
                      key={crime.id}
                      className="cursor-pointer"
                      onClick={() => handleSelectCrime(crime)}
                    >
                      {/* Pulse ring for active critical crimes */}
                      {!crime.resolved && (
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 18 : 12}
                          stroke={crime.threatLevel === 'Critical' ? '#ef4444' : '#f59e0b'}
                          strokeWidth="1.5"
                          className="animate-ping origin-center opacity-75"
                        />
                      )}

                      {/* Center Pin Icon */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 9 : 6}
                        fill={
                          crime.resolved
                            ? '#10b981'
                            : crime.threatLevel === 'Critical'
                            ? '#ef4444'
                            : '#f59e0b'
                        }
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />

                      {/* Tooltip / Label */}
                      {isSelected && (
                        <g>
                          <rect
                            x={x - 55}
                            y={y - 32}
                            width="110"
                            height="20"
                            rx="4"
                            fill="#0f172a"
                            stroke="#00e5ff"
                            strokeWidth="1"
                          />
                          <text
                            x={x}
                            y={y - 18}
                            fill="#ffffff"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {crime.type.toUpperCase()}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-4 left-6 right-6 z-15 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Critical
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> High / Medium
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolved
                </span>
              </div>
              <span className="text-slate-500 text-[11px]">Click any pin to inspect</span>
            </div>
          </div>

          {/* Right: Selected Crime Details & Dispatch Terminal */}
          <div className="lg:col-span-4 space-y-4">
            {/* Selected Incident Card */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-cyan-400">{selectedCrime.district}</span>
                <span
                  className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    selectedCrime.resolved
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : selectedCrime.threatLevel === 'Critical'
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}
                >
                  {selectedCrime.resolved ? 'RESOLVED' : `${selectedCrime.threatLevel.toUpperCase()} THREAT`}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{selectedCrime.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedCrime.description}
              </p>

              {/* Police Radio Dispatch Box */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-300 mb-4">
                <div className="text-[10px] text-cyan-400 mb-1 flex items-center gap-1">
                  <Radio className="w-3 h-3" />
                  NYPD DISPATCH TRANSCRIPTION:
                </div>
                <div className="italic text-slate-400 leading-snug">
                  "{selectedCrime.dispatchCall}"
                </div>
              </div>

              {/* Rewards & Resolution */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pt-2 border-t border-slate-800">
                <span>REWARDS:</span>
                <span className="text-white font-medium">{selectedCrime.rewards}</span>
              </div>

              <button
                onClick={() => resolveIncident(selectedCrime.id)}
                disabled={selectedCrime.resolved}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 ${
                  selectedCrime.resolved
                    ? 'bg-slate-900 text-emerald-400 border border-emerald-800/60 cursor-default'
                    : 'bg-red-600 hover:bg-red-500 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                }`}
              >
                {selectedCrime.resolved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    PERIMETER SECURED
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    DISPATCH SPIDER-MAN TO SCENE
                  </>
                )}
              </button>
            </div>

            {/* Crime Feed List */}
            <div className="bg-[#050b14]/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 shadow-xl">
              <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
                <span>ALL DISTRICT INCIDENTS</span>
                <span className="text-cyan-400">{crimes.length} SCANNED</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {crimes.map((crime) => (
                  <button
                    key={crime.id}
                    onClick={() => handleSelectCrime(crime)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                      crime.id === selectedCrime.id
                        ? 'bg-slate-900 border-cyan-400 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <div className="font-semibold truncate">{crime.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {crime.district}
                      </div>
                    </div>
                    {crime.resolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
