import React from "react";

export function SplashProgress() {
  return (
    <div className="relative w-full max-w-[200px]">
      {/* Background track */}
      <div 
        className="h-[2px] w-full overflow-hidden rounded-full bg-slate-800/80" 
        role="presentation"
      >
        {/* Progress fill */}
        <div className="h-full w-full origin-left bg-gradient-to-r from-teal-700 via-teal-500 to-teal-300 animate-splash-progress" />
      </div>
    </div>
  );
}
