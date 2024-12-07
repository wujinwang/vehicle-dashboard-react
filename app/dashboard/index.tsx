"use client";

import SpeedGauge from "@/app/components/speed-gauge";
import {
  BatteryIcon,
  EngineIcon,
  EngineRpmIcon,
  GearIcon,
  LowBatteryIcon,
  OthersIcon,
  ParkingIcon,
  PlugInIcon,
  StatusIcon,
  TemperatureIcon,
} from "@/app/components/ui/icons";
import SpeedSetting from "@/app/components/speed-setting";
import { useCallback, useEffect, useState } from "react";
import useDashboardStore from "./dashboard.store";

export default function DashboardPage() {

  const {
    parkingIndicatorToggle,
    engineIndicatorToggle,
    motoStatusIndicatorToggle,
    batteryLowIndicatorToggle,
    rpmSpeed,
    speedSetting,
  } = useDashboardStore();

  const [powerAngle, setPowerAngle] = useState(36);
  const [rpmAngle, setRpmAngle] = useState(144);

  const [powerDataList, setPowerDataList] = useState<number[]>([]);
  const [rpmDataList, setRpmDataList] = useState<number[]>([]);

  // Constants for Gauges
  const gaugeConfig = {
    power: { max: 1000, step: 250 },
    rpm: { max: 800, step: 100 },
  };

  const getPowerDataList = (max: number, step: number) => {
    return Array.from(
      { length: max * 2 / step + 1 },
      (_, i) => -max + i * step
    );
  };

  const getRpmDataList = (max: number, step: number) => {
    return Array.from({ length: max / step + 1 }, (_, i) => i * step);
  };

  // init data and angles
  const initData = useCallback(() => {
    setPowerDataList(getPowerDataList(gaugeConfig.power.max, gaugeConfig.power.step));
    setRpmDataList(getRpmDataList(gaugeConfig.rpm.max, gaugeConfig.rpm.step));
    handleResetAngle();
  }, []);

  const handleResetAngle = () => {
    //8 of 10 slices, 360x8/10
    const rmpAngleTmp: number = 288 * rpmSpeed / gaugeConfig.rpm.max;
    setRpmAngle(rmpAngleTmp);
  };


  useEffect(() => {
    initData();
  }, [initData]);


  useEffect(() => {
    handleResetAngle();
  }, [speedSetting]);

  return (
    <main className="flex flex-col row-start-2 bg-black items-center sm:items-start">
      {/* Top Row of Icons */}
      <div className="flex border-b-2 border-neutral-500 w-full mt-2 pb-2">
        <ParkingIcon className={"w-12 h-12 ms-4 " + (parkingIndicatorToggle ? " text-orange-800 " : "text-neutral-500")} />
        <EngineIcon className={"w-12 h-12 ms-4 " + (engineIndicatorToggle ? " text-orange-800 " : "text-neutral-500")} />
        <StatusIcon className={"w-12 h-12 ms-4 " + (motoStatusIndicatorToggle ? " text-orange-800 " : "text-neutral-500")} />
        <BatteryIcon className={"w-12 h-12 ms-4 " + (batteryLowIndicatorToggle ? " text-orange-800 " : "text-neutral-500")} />
      </div>

      {/* Gauges */}
      <div className="flex bg-neutral-800 w-full border-b-2 border-neutral-500">
        <div className="flex justify-center w-full gap-24 p-4">
          <SpeedGauge title="kW" speed={rpmSpeed + ""} angle={powerAngle} data={powerDataList || []} />
          <SpeedGauge title="RPM" speed={rpmSpeed + ""} angle={rpmAngle} data={rpmDataList || []} />
        </div>
      </div>

      {/* Middle Row with Icons */}
      <div className="flex border-b-2 border-neutral-500 w-full h-24">
        <GearIcon className="w-12 h-12 ms-8 mt-4 text-neutral-500" />
        <LowBatteryIcon className="w-12 h-12 ms-12 mt-4 text-neutral-500" />
        <TemperatureIcon className="w-12 h-12 ms-12 mt-4 text-neutral-500" />
        <EngineRpmIcon className="w-12 h-12 ms-12 mt-4 text-neutral-500" />
        <SpeedSetting />
      </div>

      {/* Bottom Row of Icons */}
      <div className="flex border-b-2 border-neutral-500 w-full h-20 justify-between">
        <div className="flex">
          <GearIcon className="w-12 h-12 ms-4 mt-4 text-neutral-500" />
          <EngineRpmIcon className="w-12 h-12 ms-8 mt-4 text-neutral-500" />
          <TemperatureIcon className="w-12 h-12 ms-8 mt-4 text-neutral-500" />
          <div className="flex bg-neutral-800 w-20 ms-24">
            <div className="w-full rounded border border-zinc-950 m01">
              <OthersIcon className="w-12 h-12 text-neutral-300 m-3" />
            </div>
          </div>
        </div>
        <div className="flex items-center me-4">
          <PlugInIcon className="w-14 h-14 text-neutral-500" />
        </div>
      </div>
    </main>
  );
}


