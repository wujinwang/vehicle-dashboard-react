"use client"
import { useState } from "react";

const SpeedSetting = () => {
  
  const [speed, setSpeed] = useState(25);

  return (
    <div className="ms-12 mt-2">
            <div className="ms-10 text-xs text-white mb-1">MOTOR SPEED SETTING</div>
            <input type="range" min={0} max="100" value={speed} onChange={(e) => {
              const inputValue = parseFloat(e.target.value);
              if (!isNaN(inputValue)) {
                setSpeed(inputValue);
              }
            }} className="range range-lgaccent-white w-64 h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer" step="25" />

            <div className="flex w-full justify-between text-xs text-white">
              <span className="ms-0">OFF</span>
              <span className="ms-0">1</span>
              <span className="ms-4">2</span>
              <span className="ms-4">3</span>
              <span className="ms-4">4</span>
            </div>
          </div>
  );
};

export default SpeedSetting;
