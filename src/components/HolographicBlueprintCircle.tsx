import React from 'react';

interface BlueprintCircleProps {
  size?: number;
  color?: string; // hex or rgb
  glowRgba?: string;
  intensity?: number; // 0.2 to 2
  showSchematics?: boolean;
  showRadarSweep?: boolean;
  showTargetLocks?: boolean;
  schematicText?: string;
  className?: string;
}

export const HolographicBlueprintCircle: React.FC<BlueprintCircleProps> = ({
  size = 540,
  color = '#00e5ff',
  glowRgba = 'rgba(0, 229, 255, 0.45)',
  intensity = 1,
  showSchematics = true,
  showRadarSweep = true,
  showTargetLocks = true,
  schematicText = 'X00',
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: `drop-shadow(0 0 ${20 * intensity}px ${glowRgba}) drop-shadow(0 0 ${40 * intensity}px ${glowRgba})`,
      }}
    >
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient for blueprint glow */}
          <radialGradient id="blueprintRadial" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor={color} stopOpacity="0.04" />
            <stop offset="85%" stopColor={color} stopOpacity="0.12" />
            <stop offset="98%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </radialGradient>

          {/* Radar sweep gradient */}
          <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="neonHalo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle holographic interior fill */}
        <circle cx="300" cy="300" r="275" fill="url(#blueprintRadial)" />

        {/* 1. PRIMARY OUTER GLOWING RING (The iconic neon border) */}
        <circle
          cx="300"
          cy="300"
          r="275"
          stroke={color}
          strokeWidth="3.5"
          strokeOpacity={0.95 * intensity}
          filter="url(#neonHalo)"
        />

        {/* Thin secondary outer offset rings */}
        <circle
          cx="300"
          cy="300"
          r="282"
          stroke={color}
          strokeWidth="1"
          strokeOpacity={0.45 * intensity}
          strokeDasharray="4 6 12 6"
        />
        <circle
          cx="300"
          cy="300"
          r="268"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity={0.5 * intensity}
        />

        {/* 2. ROTATING TICK DIAL (Clockwise) */}
        <g className="animate-spin-slow origin-center">
          {/* Compass / Degree notches around circumference */}
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 360) / 72;
            const isMajor = i % 6 === 0;
            const isCardinal = i % 18 === 0;
            const r1 = 268;
            const r2 = isCardinal ? 252 : isMajor ? 257 : 263;
            const rad = (angle * Math.PI) / 180;
            const x1 = 300 + r1 * Math.cos(rad);
            const y1 = 300 + r1 * Math.sin(rad);
            const x2 = 300 + r2 * Math.cos(rad);
            const y2 = 300 + r2 * Math.sin(rad);

            return (
              <line
                key={`tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={isCardinal ? 2 : isMajor ? 1.5 : 0.8}
                strokeOpacity={(isCardinal ? 0.9 : isMajor ? 0.7 : 0.4) * intensity}
              />
            );
          })}

          {/* Segmented Arc segments on outer track */}
          <path
            d="M 300 32 A 268 268 0 0 1 532 165"
            stroke={color}
            strokeWidth="3"
            strokeOpacity={0.7 * intensity}
            strokeDasharray="16 8 4 8"
          />
          <path
            d="M 300 568 A 268 268 0 0 1 68 435"
            stroke={color}
            strokeWidth="3"
            strokeOpacity={0.7 * intensity}
            strokeDasharray="16 8 4 8"
          />
        </g>

        {/* 3. ROTATING REVERSE RING (Counter-Clockwise) */}
        <g className="animate-spin-reverse origin-center">
          <circle
            cx="300"
            cy="300"
            r="235"
            stroke={color}
            strokeWidth="1"
            strokeOpacity={0.35 * intensity}
            strokeDasharray="3 8 20 8"
          />
          <circle
            cx="300"
            cy="300"
            r="190"
            stroke={color}
            strokeWidth="1"
            strokeOpacity={0.4 * intensity}
            strokeDasharray="30 10 10 10"
          />

          {/* Angular quadrant markers */}
          <path
            d="M 290 110 L 310 110 M 300 100 L 300 120"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity={0.8}
          />
          <path
            d="M 290 490 L 310 490 M 300 480 L 300 500"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity={0.8}
          />
        </g>

        {/* 4. RADIAL & CARTESIAN GRID LINES */}
        <g stroke={color} strokeOpacity={0.25 * intensity} strokeWidth="0.9">
          {/* Main Crosshairs */}
          <line x1="300" y1="28" x2="300" y2="572" strokeDasharray="5 3" />
          <line x1="28" y1="300" x2="572" y2="300" strokeDasharray="5 3" />

          {/* 45-degree diagonal diagonals */}
          <line x1="105" y1="105" x2="495" y2="495" strokeDasharray="2 6" />
          <line x1="105" y1="495" x2="495" y2="105" strokeDasharray="2 6" />

          {/* Inner concentric technical reference circles */}
          <circle cx="300" cy="300" r="140" strokeDasharray="6 4" strokeOpacity={0.3 * intensity} />
          <circle cx="300" cy="300" r="95" strokeDasharray="4 4" strokeOpacity={0.35 * intensity} />
          <circle cx="300" cy="300" r="45" strokeOpacity={0.4 * intensity} />
          <circle cx="300" cy="300" r="12" strokeOpacity={0.7 * intensity} />
        </g>

        {/* 5. BLUEPRINT SCHEMATIC DRAWINGS (Like the uploaded image's technical floorplan/circuits) */}
        {showSchematics && (
          <g stroke={color} strokeOpacity={0.38 * intensity} strokeWidth="1">
            {/* Upper Schematic block with "X00" */}
            <rect x="260" y="88" width="80" height="42" strokeWidth="1.2" strokeOpacity={0.6 * intensity} />
            <line x1="260" y1="102" x2="340" y2="102" strokeOpacity={0.4} />
            <line x1="280" y1="88" x2="280" y2="130" strokeOpacity={0.3} />
            <line x1="320" y1="88" x2="320" y2="130" strokeOpacity={0.3} />
            <text
              x="300"
              y="122"
              fill={color}
              fontSize="18"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="2"
              textAnchor="middle"
              fillOpacity={0.9 * intensity}
            >
              {schematicText}
            </text>

            {/* Technical mechanical circuit pathways inside the upper-left sector */}
            <g strokeOpacity={0.35 * intensity}>
              <path d="M 170 140 H 220 V 180 H 245 V 230 H 200 Z" />
              <path d="M 150 180 H 190 V 210" />
              <path d="M 180 230 V 270 H 210" />
              <circle cx="220" cy="180" r="3" fill={color} fillOpacity={0.5} />
              <circle cx="245" cy="230" r="3" fill={color} fillOpacity={0.5} />
              <line x1="130" y1="210" x2="165" y2="210" strokeDasharray="2 3" />
              <rect x="140" y="240" width="35" height="24" strokeDasharray="3 2" />
              <text x="142" y="256" fill={color} fontSize="8" fontFamily="monospace" fillOpacity={0.6}>
                SEC-01
              </text>
            </g>

            {/* Technical mechanical circuit pathways in the upper-right sector */}
            <g strokeOpacity={0.35 * intensity}>
              <path d="M 430 140 H 380 V 180 H 355 V 230 H 400 Z" />
              <path d="M 450 180 H 410 V 210" />
              <circle cx="380" cy="180" r="3" fill={color} fillOpacity={0.5} />
              <circle cx="355" cy="230" r="3" fill={color} fillOpacity={0.5} />
              <rect x="425" y="240" width="35" height="24" strokeDasharray="3 2" />
              <text x="430" y="256" fill={color} fontSize="8" fontFamily="monospace" fillOpacity={0.6}>
                MOD-04
              </text>
            </g>

            {/* Lower sector blueprint circuit blocks */}
            <g strokeOpacity={0.3 * intensity}>
              <path d="M 180 340 H 220 V 390 H 170 Z" />
              <path d="M 380 340 H 420 V 390 H 430 Z" />
              <line x1="200" y1="390" x2="200" y2="430" />
              <line x1="400" y1="390" x2="400" y2="430" />
              <circle cx="200" cy="430" r="4" />
              <circle cx="400" cy="430" r="4" />
            </g>

            {/* Micro annotations and technical readouts */}
            <text x="110" y="325" fill={color} fontSize="9" fontFamily="monospace" fillOpacity={0.7 * intensity}>
              AZ: 284.5° // SYS-OK
            </text>
            <text x="410" y="325" fill={color} fontSize="9" fontFamily="monospace" fillOpacity={0.7 * intensity}>
              TENS: 99.4% // CAP
            </text>
            <text x="210" y="520" fill={color} fontSize="9" fontFamily="monospace" fillOpacity={0.6 * intensity}>
              REF. MK-IV / BLUEPRINT
            </text>
            <text x="340" y="520" fill={color} fontSize="9" fontFamily="monospace" fillOpacity={0.6 * intensity}>
              FREQ: 433.92 MHz
            </text>
          </g>
        )}

        {/* 6. TARGET LOCKS & HUD BRACKETS */}
        {showTargetLocks && (
          <g stroke={color} strokeWidth="1.5">
            {/* Top right target reticle */}
            <g transform="translate(420, 110)">
              <circle cx="0" cy="0" r="14" strokeOpacity={0.7} strokeDasharray="2 3" />
              <line x1="-18" y1="0" x2="18" y2="0" strokeOpacity={0.8} />
              <line x1="0" y1="-18" x2="0" y2="18" strokeOpacity={0.8} />
              <circle cx="0" cy="0" r="3" fill={color} />
            </g>

            {/* Bottom left telemetry bracket */}
            <g transform="translate(140, 440)">
              <path d="M -15 -10 H -25 V 15 H 10" strokeOpacity={0.7} fill="none" />
              <circle cx="-5" cy="5" r="2.5" fill={color} />
            </g>

            {/* Center target cursor */}
            <g transform="translate(300, 300)">
              <path d="M -24 -24 L -16 -24 V -16" strokeOpacity={0.8} />
              <path d="M 24 -24 L 16 -24 V -16" strokeOpacity={0.8} />
              <path d="M -24 24 L -16 24 V 16" strokeOpacity={0.8} />
              <path d="M 24 24 L 16 24 V 16" strokeOpacity={0.8} />
            </g>
          </g>
        )}

        {/* 7. ANIMATED RADAR SWEEP CONE */}
        {showRadarSweep && (
          <g className="animate-radar-sweep origin-center" opacity={0.6 * intensity}>
            <path
              d="M 300 300 L 494 106 A 275 275 0 0 1 575 300 Z"
              fill="url(#radarSweepGrad)"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
