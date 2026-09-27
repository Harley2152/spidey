import React from 'react';
import { sounds } from '../utils/audio';

interface SpiderManFigureProps {
  suitId?: string;
  glowColor?: string;
  onWebShoot?: () => void;
  interactive?: boolean;
  className?: string;
}

export const SpiderManFigure: React.FC<SpiderManFigureProps> = ({
  suitId = 'advanced',
  glowColor = '#00e5ff',
  onWebShoot,
  interactive = true,
  className = '',
}) => {
  // Suit color themes
  const isMiles = suitId === 'miles';
  const isIronSpider = suitId === 'iron_spider';
  const is2099 = suitId === 'spiderman_2099';
  const isStealth = suitId === 'stealth';
  const isSymbiote = suitId === 'symbiote';

  // Primary suit color (Red by default)
  let suitRed = '#d92638';
  let suitDarkRed = '#991122';
  let suitBlue = '#0c1a30';
  let suitDarkBlue = '#060d19';
  let spiderEmblemColor = '#ffffff';
  let eyeColor = '#ffffff';
  let rimColor = glowColor;

  if (isMiles) {
    suitRed = '#1a1a1f';
    suitDarkRed = '#0d0d11';
    suitBlue = '#121217';
    suitDarkBlue = '#08080a';
    spiderEmblemColor = '#ef4444';
    eyeColor = '#ffffff';
  } else if (isIronSpider) {
    suitRed = '#b91c1c';
    suitDarkRed = '#7f1d1d';
    suitBlue = '#ca8a04';
    suitDarkBlue = '#854d0e';
    spiderEmblemColor = '#fef08a';
    eyeColor = '#38bdf8';
  } else if (is2099) {
    suitRed = '#0f172a';
    suitDarkRed = '#020617';
    suitBlue = '#1e1b4b';
    suitDarkBlue = '#0f0e26';
    spiderEmblemColor = '#f43f5e';
    eyeColor = '#f43f5e';
  } else if (isStealth) {
    suitRed = '#090d16';
    suitDarkRed = '#030712';
    suitBlue = '#0f172a';
    suitDarkBlue = '#020617';
    spiderEmblemColor = '#10b981';
    eyeColor = '#34d399';
  } else if (isSymbiote) {
    suitRed = '#0a0a0c';
    suitDarkRed = '#030305';
    suitBlue = '#121216';
    suitDarkBlue = '#050507';
    spiderEmblemColor = '#ffffff';
    eyeColor = '#ffffff';
  }

  const handleClick = () => {
    if (!interactive) return;
    sounds.playSpiderSense();
    if (onWebShoot) onWebShoot();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full h-full flex items-center justify-center select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 500 800"
        className="w-full h-full max-h-[82vh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyan / HUD rim lighting reflection on suit */}
          <linearGradient id="cyanRimGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rimColor} stopOpacity="0.8" />
            <stop offset="60%" stopColor={rimColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={rimColor} stopOpacity="0" />
          </linearGradient>

          {/* Web thread glow */}
          <filter id="webGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Eye lens glow */}
          <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shading gradients */}
          <linearGradient id="suitRedGrad" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor={suitRed} />
            <stop offset="100%" stopColor={suitDarkRed} />
          </linearGradient>

          <linearGradient id="suitBlueGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={suitBlue} />
            <stop offset="100%" stopColor={suitDarkBlue} />
          </linearGradient>

          {/* Wall texture shadow */}
          <linearGradient id="wallPillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0b0f19" stopOpacity="0" />
            <stop offset="45%" stopColor="#090d16" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#03050a" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. DARK WALL / PILLAR (Where Spidey is crouching) */}
        <polygon
          points="320,800 240,600 310,240 450,150 490,800"
          fill="url(#wallPillarGrad)"
          stroke="#1e293b"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        {/* Ambient cyan rim reflection on the wall edge */}
        <line
          x1="310"
          y1="240"
          x2="240"
          y2="600"
          stroke={rimColor}
          strokeWidth="2.5"
          strokeOpacity="0.55"
          filter="url(#webGlow)"
        />

        {/* 2. THE EXTENDED WEB THREAD / CHAIN (Shooting from right hand up to top-right corner) */}
        <g filter="url(#webGlow)">
          <path
            d="M 390 125 Q 430 80 445 0"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 390 125 Q 430 80 445 0"
            stroke={rimColor}
            strokeWidth="5"
            strokeOpacity="0.4"
          />
          {/* Web nodes / chain segment rings */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const t = i / 6;
            const x = 390 + (445 - 390) * t + Math.sin(t * Math.PI) * 12;
            const y = 125 + (0 - 125) * t;
            return (
              <circle
                key={`node-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="#ffffff"
                stroke={rimColor}
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* 3. SPIDER-MAN BODY (Crouched on wall pose) */}

        {/* Shadow under body on wall */}
        <ellipse cx="260" cy="520" rx="90" ry="130" fill="#000000" fillOpacity="0.65" />

        {/* A. RIGHT ARM (Raised gripping web line) */}
        {/* Upper Arm */}
        <path
          d="M 315 250 C 335 220, 360 190, 375 160 C 385 165, 395 180, 380 205 C 360 235, 335 270, 315 270 Z"
          fill="url(#suitBlueGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Forearm (Red gauntlet) */}
        <path
          d="M 370 165 C 380 140, 390 130, 395 120 C 405 125, 410 135, 398 155 C 390 165, 382 175, 370 180 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Gauntlet webbing */}
        <path
          d="M 372 175 L 398 135 M 382 170 L 402 142"
          stroke="#000000"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        {/* Right Hand gripping web */}
        <g transform="translate(390, 115)">
          <path
            d="M 0 10 C -5 5, 0 -2, 8 0 C 15 2, 18 10, 12 18 C 8 20, 2 16, 0 10 Z"
            fill="url(#suitRedGrad)"
            stroke="#000000"
            strokeWidth="1.2"
          />
          {/* Knuckles gripping around thread */}
          <circle cx="4" cy="5" r="3.5" fill={suitDarkRed} />
          <circle cx="9" cy="8" r="3.5" fill={suitDarkRed} />
          <circle cx="12" cy="13" r="3.5" fill={suitDarkRed} />
        </g>

        {/* B. LOWER BODY & LEGS */}
        {/* Left Leg (Lower, trailing down wall) */}
        {/* Thigh (Navy) */}
        <path
          d="M 230 460 C 255 490, 270 530, 290 570 C 275 585, 255 570, 235 520 C 215 480, 210 460, 230 460 Z"
          fill="url(#suitBlueGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Calf & Boot (Red) */}
        <path
          d="M 285 565 C 300 610, 305 660, 310 700 C 295 710, 275 700, 270 660 C 265 620, 270 580, 285 565 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Left Foot clinging to wall */}
        <path
          d="M 305 690 C 315 715, 320 740, 312 755 C 300 760, 285 745, 280 720 C 278 705, 290 690, 305 690 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.2"
        />
        {/* Left Boot Webbing */}
        <path
          d="M 275 600 Q 285 610 298 605 M 270 640 Q 285 650 305 640 M 275 680 Q 295 690 310 680"
          stroke="#000000"
          strokeWidth="1"
          strokeOpacity="0.6"
        />

        {/* Right Leg (High dynamic crouch knee) */}
        {/* Thigh (Navy) */}
        <path
          d="M 180 430 C 150 450, 130 480, 150 520 C 170 550, 210 540, 240 500 C 250 470, 230 430, 180 430 Z"
          fill="url(#suitBlueGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Right Knee & Shin (Red boot) */}
        <path
          d="M 140 490 C 115 540, 130 580, 165 610 C 190 630, 220 600, 220 560 C 220 530, 180 500, 140 490 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Right Foot (Tucked in tight) */}
        <path
          d="M 195 600 C 215 620, 240 660, 260 670 C 275 675, 270 655, 250 635 C 235 620, 210 595, 195 600 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.2"
        />
        {/* Right boot webbing */}
        <path
          d="M 135 520 Q 165 540 195 530 M 145 560 Q 180 580 210 565 M 165 595 Q 200 615 235 605"
          stroke="#000000"
          strokeWidth="1"
          strokeOpacity="0.6"
        />

        {/* C. TORSO & CHEST (Red center, navy flanks, muscular contour) */}
        {/* Navy Torso sides */}
        <path
          d="M 175 360 C 160 410, 180 460, 220 480 C 260 485, 300 460, 310 400 C 315 360, 305 320, 280 300 C 240 280, 195 300, 175 360 Z"
          fill="url(#suitBlueGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* Red Chest Plate & Shoulders */}
        <path
          d="M 200 270 C 240 260, 290 270, 320 300 C 325 330, 320 370, 295 410 C 270 435, 235 440, 205 420 C 185 390, 180 330, 200 270 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* Chest Webbing Pattern */}
        <g stroke="#000000" strokeWidth="1.1" strokeOpacity="0.65">
          {/* Radial lines from center spider */}
          <line x1="255" y1="340" x2="215" y2="280" />
          <line x1="255" y1="340" x2="255" y2="265" />
          <line x1="255" y1="340" x2="305" y2="285" />
          <line x1="255" y1="340" x2="315" y2="335" />
          <line x1="255" y1="340" x2="305" y2="395" />
          <line x1="255" y1="340" x2="260" y2="425" />
          <line x1="255" y1="340" x2="215" y2="410" />
          <line x1="255" y1="340" x2="190" y2="350" />
          {/* Concentric curved web scallops */}
          <path d="M 225 295 Q 255 310 290 295" />
          <path d="M 210 325 Q 255 345 305 325" />
          <path d="M 205 365 Q 255 385 300 365" />
          <path d="M 220 395 Q 255 410 280 400" />
        </g>

        {/* D. ICONIC WHITE SPIDER CHEST EMBLEM (Marvel's Spider-Man Advanced Suit) */}
        <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
          {/* Spider Head & Body */}
          <path
            d="M 252 320 C 255 315, 260 315, 263 320 C 266 328, 262 336, 258 340 C 254 336, 250 328, 252 320 Z"
            fill={spiderEmblemColor}
          />
          <path
            d="M 254 340 C 262 344, 264 358, 258 375 C 252 358, 254 344, 254 340 Z"
            fill={spiderEmblemColor}
          />
          {/* Upper Left Legs */}
          <path
            d="M 253 325 Q 230 300 215 285 Q 225 305 248 332 Z"
            fill={spiderEmblemColor}
          />
          <path
            d="M 252 332 Q 220 325 195 320 Q 215 338 249 342 Z"
            fill={spiderEmblemColor}
          />
          {/* Upper Right Legs */}
          <path
            d="M 262 325 Q 285 300 308 288 Q 295 310 267 332 Z"
            fill={spiderEmblemColor}
          />
          <path
            d="M 263 332 Q 295 325 322 322 Q 300 338 266 342 Z"
            fill={spiderEmblemColor}
          />
          {/* Lower Left Legs */}
          <path
            d="M 252 348 Q 225 365 208 395 Q 228 380 252 358 Z"
            fill={spiderEmblemColor}
          />
          <path
            d="M 253 360 Q 235 390 225 430 Q 242 400 256 368 Z"
            fill={spiderEmblemColor}
          />
          {/* Lower Right Legs */}
          <path
            d="M 263 348 Q 290 365 308 395 Q 288 380 263 358 Z"
            fill={spiderEmblemColor}
          />
          <path
            d="M 262 360 Q 280 390 290 430 Q 273 400 259 368 Z"
            fill={spiderEmblemColor}
          />
        </g>

        {/* E. LEFT ARM (Resting down on wall with splayed fingers) */}
        {/* Upper Arm */}
        <path
          d="M 185 330 C 160 350, 140 375, 120 410 C 130 420, 145 425, 160 395 C 175 365, 195 345, 185 330 Z"
          fill="url(#suitBlueGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Forearm (Red gauntlet) */}
        <path
          d="M 130 405 C 105 440, 85 470, 70 510 C 80 520, 95 515, 115 480 C 130 450, 145 425, 130 405 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Left Hand splayed against wall */}
        <g transform="translate(60, 505)">
          <path
            d="M 15 5 C 12 -2, 0 10, -5 20 C -2 24, 8 20, 15 12 Z"
            fill="url(#suitRedGrad)"
            stroke="#000000"
            strokeWidth="1"
          />
          {/* 5 Finger spread gripping wall */}
          <line x1="-4" y1="18" x2="-18" y2="30" stroke={suitRed} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="2" y1="20" x2="-8" y2="40" stroke={suitRed} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="10" y1="20" x2="8" y2="45" stroke={suitRed} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="16" y1="16" x2="22" y2="38" stroke={suitRed} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="20" y1="10" x2="32" y2="24" stroke={suitRed} strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* F. HEAD & MASK */}
        {/* Head outline in dynamic 3/4 tilt */}
        <path
          d="M 235 180 C 265 170, 310 185, 325 220 C 335 255, 320 295, 290 315 C 260 325, 230 310, 215 275 C 205 240, 215 195, 235 180 Z"
          fill="url(#suitRedGrad)"
          stroke="#000000"
          strokeWidth="2"
        />

        {/* Mask Webbing */}
        <g stroke="#000000" strokeWidth="1" strokeOpacity="0.7">
          {/* Radial lines from nose bridge */}
          <line x1="270" y1="250" x2="240" y2="185" />
          <line x1="270" y1="250" x2="275" y2="178" />
          <line x1="270" y1="250" x2="310" y2="195" />
          <line x1="270" y1="250" x2="325" y2="235" />
          <line x1="270" y1="250" x2="315" y2="285" />
          <line x1="270" y1="250" x2="280" y2="315" />
          <line x1="270" y1="250" x2="240" y2="305" />
          <line x1="270" y1="250" x2="215" y2="265" />
          {/* Rings */}
          <path d="M 245 210 Q 275 220 305 215" />
          <path d="M 235 235 Q 275 248 315 240" />
          <path d="M 230 270 Q 275 285 305 275" />
        </g>

        {/* Left Eye Lens (Viewer's left) */}
        <g filter="url(#eyeGlow)">
          {/* Black thick eye frame */}
          <path
            d="M 228 238 C 235 220, 255 215, 264 225 C 265 245, 252 268, 232 268 C 225 264, 224 250, 228 238 Z"
            fill="#05070a"
          />
          {/* White reflective inner lens */}
          <path
            d="M 233 238 C 238 226, 252 222, 258 228 C 259 242, 248 260, 236 261 C 231 258, 230 248, 233 238 Z"
            fill={eyeColor}
          />
        </g>

        {/* Right Eye Lens (Viewer's right - closer) */}
        <g filter="url(#eyeGlow)">
          {/* Black thick eye frame */}
          <path
            d="M 276 226 C 290 220, 318 230, 318 245 C 314 268, 296 280, 282 278 C 274 274, 272 245, 276 226 Z"
            fill="#05070a"
          />
          {/* White reflective inner lens */}
          <path
            d="M 280 230 C 290 225, 310 234, 311 245 C 308 262, 294 272, 285 271 C 278 268, 276 245, 280 230 Z"
            fill={eyeColor}
          />
        </g>

        {/* 4. ELECTRIC CYAN RIM LIGHTING ON SPIDEY'S BACK (The signature halo glow from the circle) */}
        <path
          d="M 325 200 C 338 230, 335 260, 320 290 C 330 330, 325 375, 305 410 C 285 440, 260 480, 285 550 C 300 600, 305 650, 310 700"
          stroke={rimColor}
          strokeWidth="3.5"
          strokeOpacity="0.75"
          fill="none"
          filter="url(#webGlow)"
        />

        {/* Interactive Pulse on Hover (Spider-Sense Waves) */}
        {interactive && (
          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <path
              d="M 270 170 C 280 150, 300 150, 310 165"
              stroke={rimColor}
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />
            <path
              d="M 255 155 C 280 130, 315 130, 330 150"
              stroke={rimColor}
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="5 3"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
