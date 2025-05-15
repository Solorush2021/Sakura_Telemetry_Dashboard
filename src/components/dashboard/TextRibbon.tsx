// src/components/dashboard/TextRibbon.tsx
"use client";

import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const messages = [
  "SYSTEM ALERT: UNKNOWN ENERGY SIGNATURE DETECTED NEAR SECTOR GAMMA-7.",
  "STATUS UPDATE: ALL SYSTEMS NOMINAL. LONG RANGE SCANNING INITIATED.",
  "WARNING: FUEL RESERVES AT 25%. RECALIBRATING CONSUMPTION MODELS.",
  "TELEMETRY DATA STREAM ENCRYPTED. SECURE LINK ESTABLISHED.",
  "UPCOMING MAINTENANCE: SECTOR DELTA OFFLINE IN T-MINUS 60 MINUTES.",
];

export function TextRibbon() {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [displayMessage, setDisplayMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 19800); // Change message slightly faster than animation cycle to avoid empty ribbon

    return () => clearInterval(intervalId);
  }, []);
  
  // This effect helps ensure the text content updates for the animation
  useEffect(() => {
    setDisplayMessage(currentMessage + " \u00A0 // \u00A0 "); // Add separator for continuous loop illusion
  }, [currentMessage]);

  return (
    <div 
      className="w-full bg-card/70 text-sm overflow-hidden whitespace-nowrap relative border-y-2 border-primary/50"
      style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)', height: '40px' }}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="animate-scroll-text flex items-center pl-4">
            <AlertTriangle size={18} className="text-primary mr-3 shrink-0" />
            <span className="text-glow-pink-white font-mono uppercase tracking-wider">
                {/* Repeat message for smooth scrolling effect, Tailwind doesn't handle this well for marquee text content out of box */}
                {displayMessage} {displayMessage} {displayMessage}
            </span>
        </div>
      </div>
    </div>
  );
}
