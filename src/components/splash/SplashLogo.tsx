import React from "react";

export function SplashLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer privacy ring radial accent glow */}
      <div 
        aria-hidden="true" 
        className="absolute h-40 w-40 rounded-full bg-teal-500/10 blur-2xl animate-logo-glow" 
      />
      
      <svg
        aria-hidden="true"
        className="relative z-10 h-28 w-28 text-white sm:h-32 sm:w-32"
        fill="none"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Privacy Shield / Ring */}
        <path
          className="animate-draw-shield"
          d="M60 14 L98 27 V58 C98 83 82 101 60 108 C38 101 22 83 22 58 V27 Z"
          stroke="#0F766E"
          strokeDasharray="400"
          strokeDashoffset="400"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        
        {/* Inner Hub Circle */}
        <circle
          className="animate-draw-circle"
          cx="60"
          cy="62"
          r="30"
          stroke="#CCFBF1"
          strokeDasharray="200"
          strokeDashoffset="200"
          strokeLinecap="round"
          strokeWidth="1.5"
        />

        {/* Branded Text DIS */}
        <text
          className="animate-fade-text fill-[#fafaf7] font-sans font-black select-none text-[21px] tracking-[0.05em]"
          opacity="0"
          textAnchor="middle"
          x="60"
          y="69"
        >
          DIS
        </text>
      </svg>
    </div>
  );
}
