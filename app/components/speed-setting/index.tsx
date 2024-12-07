"use client"
import useDashboardStore from "@/app/dashboard/dashboard.store";
import { useState } from "react";

const SpeedSetting = () => {

  //Get value from store
  const {
    parkingIndicatorToggle,
    engineIndicatorToggle,
    motoStatusIndicatorToggle,
    batteryLowIndicatorToggle,
    rpmSpeed,
    speedSetting,

    setParkingIndicatorToggle,
    setEngineIndicatorToggle,
    setMotoStatusIndicatorToggle,
    setBatteryLowIndicatorToggle,

    setRpmSpeed,
    setSpeedSetting

  } = useDashboardStore();

  const speedStep: number = 200;

  const handleSpeedSetting = async (val: string) => {
    const inputValue = parseFloat(val);
    // Check if the parsed value is a valid number
    if (!isNaN(inputValue)) {
      setSpeedSetting(inputValue);
      setRpmSpeed(inputValue * speedStep);
      setMotoStatusIndicatorToggle(inputValue >= 3 ? true : false);
    }
  };

  return (
    <div className="ms-12 mt-2">
      <div className="ms-10 text-xs text-white mb-1">MOTOR SPEED SETTING</div>
      <input type="range" min={0} max="4" value={speedSetting} onChange={(e) => handleSpeedSetting(e.target.value)} className="range range-lgaccent-white w-64 h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer" step="1" />

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
