import React, { useEffect, useRef, useState } from 'react';
import { sounds } from '../utils/audio';

interface WebImpact {
  id: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  timestamp: number;
  color: string;
}

interface WebCanvasProps {
  webColor?: string;
  className?: string;
}

export const InteractiveWebCanvas: React.FC<WebCanvasProps> = ({
  webColor = '#00e5ff',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [impacts, setImpacts] = useState<WebImpact[]>([]);

  // Add impact
  const triggerWebAt = (clientX: number, clientY: number) => {
    sounds.playWebShoot();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Origin from top right or Spidey hand area
    const originX = rect.width * 0.72;
    const originY = rect.height * 0.22;

    const newImpact: WebImpact = {
      id: Date.now() + Math.random(),
      x,
      y,
      originX,
      originY,
      timestamp: Date.now(),
      color: webColor,
    };

    setImpacts((prev) => [...prev.slice(-6), newImpact]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Filter out impacts older than 4.5 seconds
      const active = impacts.filter((imp) => now - imp.timestamp < 4500);

      active.forEach((imp) => {
        const age = (now - imp.timestamp) / 4500;
        const alpha = Math.max(0, 1 - age);

        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.shadowColor = imp.color;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2.5;

        // Draw web line from shooter origin to target
        ctx.beginPath();
        ctx.moveTo(imp.originX, imp.originY);
        const midX = (imp.originX + imp.x) / 2 + Math.sin(age * 10) * (1 - age) * 15;
        const midY = (imp.originY + imp.y) / 2 + 25 * (1 - age);
        ctx.quadraticCurveTo(midX, midY, imp.x, imp.y);
        ctx.stroke();

        // Draw web splat / radial burst at impact point
        const splatRadius = 26 + (1 - Math.exp(-age * 12)) * 24;
        const rays = 12;

        ctx.lineWidth = 1.6;
        for (let i = 0; i < rays; i++) {
          const angle = (i * Math.PI * 2) / rays;
          const rayLen = splatRadius * (0.7 + (Math.sin(i * 3 + imp.id) * 0.3));
          ctx.beginPath();
          ctx.moveTo(imp.x, imp.y);
          ctx.lineTo(imp.x + Math.cos(angle) * rayLen, imp.y + Math.sin(angle) * rayLen);
          ctx.stroke();
        }

        // Concentric web spirals
        ctx.lineWidth = 1.2;
        for (let r = 8; r <= splatRadius; r += 9) {
          ctx.beginPath();
          ctx.arc(imp.x, imp.y, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [impacts]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => triggerWebAt(e.clientX, e.clientY)}
      className={`absolute inset-0 pointer-events-auto cursor-crosshair z-20 ${className}`}
    />
  );
};
