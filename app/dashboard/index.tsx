"use client";

import SpeedGauge from "@/app/components/speed-gauge";
import {
  BatteryIcon,
  EngineIcon,
  GearIcon,
  OthersIcon,
  ParkingIcon,
  PlugInIcon,
  MotorStatusIcon,
  TemperatureIcon,
} from "@/app/components/ui/icons";
import SpeedSetting from "@/app/components/speed-setting";
import { useCallback, useEffect, useState } from "react";
import useDashboardStore from "./dashboard.store";
import { UpdateAppSettingReq } from "../settings/definitions";
import { fetchSettingsAction, updateAppSettingAction } from "../settings/setting-actions";
import { showErrorMessage, showSuccessMessage } from "../components/Toast";

export default function DashboardPage() {

  const {
    isParking,
    isBatteryLow,
    isCharging,
    isMotorStatusIndicator,
    rpm,
    power,
    temperature,
    speedSetting,
    setCharging,
    setRpm,
    setPower,
    setTemperature,
    setMotorStatusIndicator,
    setBatteryLow
  } = useDashboardStore();

  const settingCode = "APP_SETTING";

  const [battery, setBattery] = useState(0);
  const [gearRatio, setGearRatio] = useState("4/10");

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
    const rmpAngleTmp = 288 * rpm / gaugeConfig.rpm.max;
    const powerAngleTmp = 288 * power / gaugeConfig.power.max;
    setRpmAngle(rmpAngleTmp);
    setPowerAngle(powerAngleTmp);
  };

  const handlePluginClick = () => {
    const newIsCharging = !isCharging;
    console.log("----handlePluginClick------", isCharging);
    handleAppSettingUpdateSubmit("APP_SETTING_IS_CHARGING", newIsCharging ? "1" : "0");
    setCharging(newIsCharging);

    //the motor should be disabled,and battery percentage should increase over time
    setRpm(0);
    handleAppSettingUpdateSubmit("APP_SETTING_RPM", "0");
  }

  useEffect(() => {
    initData();

    handleFetchSettingAction();
    // Set up an interval to call the handleFetchSettingAction function every 5 seconds
    const intervalId = setInterval(() => {
      handleFetchSettingAction();
    }, 1000);
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, []);


  useEffect(() => {
    handleResetAngle();
  }, [speedSetting]);


  const handleFetchSettingAction = async () => {
    fetchSettingsAction(settingCode).then((res) => {
      if (res.error) {
        showErrorMessage(res.error); // Show error on the client
      } else if (res.data) {
        console.log("---------res-----", res.data);
        const inputValueRpm = parseFloat(res.data.rpm);
        const inputValuePower = parseFloat(res.data.power);
        const inputValueTemp = parseFloat(res.data.temperature);
        const inputValueBattery = parseFloat(res.data.battery);

        setRpm(inputValueRpm);
        setPower(inputValuePower);
        setTemperature(inputValueTemp);
        setGearRatio(res.data.gearRatio);

        //if RPM > 599 show indicator
        setMotorStatusIndicator(false);
        if (inputValueRpm > 599) {
          setMotorStatusIndicator(true);
        }

        //if temperature > 60 show indicator
        if (inputValueTemp > 60) {
          //setMotorStatusIndicator(true);
        }

        //if battery < 20 show indicator
        setBattery(inputValueBattery);
        setBatteryLow(false);
        if (inputValueBattery < 20) {
          setBatteryLow(true);
        }

        //handleResetAngle();
      }
    })
  };


  // Handler to update readOnly state after submission
  const handleAppSettingUpdateSubmit = (code: string, val: string) => {
    const req: UpdateAppSettingReq = {
      parentCode: settingCode,//constant value for this function.
      code: code,
      configValue: val,
    };

    updateAppSettingAction(req).then((res) => {
      console.log("---------updateAppSettingAction-----", res);
      if (res.error) {
        showErrorMessage(res.error); // Show error on the client
      } else if (res.data) {
        showSuccessMessage("updated successfully.");
      }
    });

  };

  return (
    <main className="flex flex-col row-start-2 bg-black items-center sm:items-start">
      {/* Top Row of Icons */}
      <div className="flex border-b-2 border-neutral-500 w-full mt-2 pb-2">
        <ParkingIcon className={"w-12 h-12 ms-4 " + (isParking ? " text-red-600 " : "text-neutral-500")} />
        <EngineIcon className={"w-12 h-12 ms-4 text-neutral-500"} />
        <MotorStatusIcon className={"w-12 h-12 ms-4 " + (isMotorStatusIndicator ? " text-red-600 " : "text-neutral-500")} />
        <BatteryIcon className={"w-12 h-12 ms-4 " + (isBatteryLow ? " text-red-600 " : "text-neutral-500")} />
      </div>

      {/* Gauges */}
      <div className="flex bg-neutral-800 w-full border-b-2 border-neutral-500">
        <div className="flex justify-center w-full gap-24 p-4">
          <SpeedGauge title="kW" speed={power + ""} angle={powerAngle} data={powerDataList || []} />
          <SpeedGauge title="RPM" speed={rpm + ""} angle={rpmAngle} data={rpmDataList || []} />
        </div>
      </div>

      {/* Middle Row with Icons */}
      <div className="flex border-b-2 border-neutral-500 w-full h-24">
        <div className="border-r border-neutral-900 ">
          <GearIcon className="w-12 h-12 ms-6 me-6 mt-2 text-neutral-500" />
          <div className="w-full flex justify-center mt-1 text-xs text-neutral-500">{gearRatio}</div>
        </div>

        <div className="border-r border-neutral-900 ">
          <BatteryIcon className={"w-12 h-12 ms-6 me-6 mt-2 justify-center " + (isBatteryLow ? " text-red-600 " : "text-neutral-500")} />
          <div className="w-full">
            <div className={"w-full  flex justify-center text-2xs " + (isBatteryLow ? " text-red-600 " : "text-neutral-500")} >{battery}</div>
            <div className={"w-full  flex justify-center text-2xs " + (isBatteryLow ? " text-red-600 " : "text-neutral-500")} >%</div>
          </div>
        </div>

        <div className="border-r border-neutral-900 ">
          <TemperatureIcon className="w-12 h-10 ms-6 me-6 mt-3 text-neutral-500" />
          <div className="w-full mt-1">
            <div className="w-full  flex justify-center text-2xs text-neutral-500">{temperature}</div>
            <div className="w-full  flex justify-center text-2xs text-neutral-500"><span className="wob_t" aria-label="°Celsius" aria-disabled="true" role="button">°C</span></div>
          </div>
        </div>

        <div className="border-r border-neutral-900 ">
          <MotorStatusIcon className={"w-12 h-10 ms-6 me-6 mt-3 " + (isMotorStatusIndicator ? " text-red-600 " : "text-neutral-500")} />
          <div className="w-full mt-1">
            <div className={"w-full  flex justify-center text-2xs " + (isMotorStatusIndicator ? " text-red-600 " : "text-neutral-500")} >{rpm}</div>
            <div className={"w-full  flex justify-center text-2xs " + (isMotorStatusIndicator ? " text-red-600 " : "text-neutral-500")} >RPM</div>
          </div>
        </div>
        <SpeedSetting />
      </div>

      {/* Bottom Row of Icons */}
      <div className="flex border-b-2 border-neutral-500 w-full h-20 justify-between">
        <div className="flex">
          <div className="border-r border-neutral-900 ">
            <GearIcon className="w-12 h-12 ms-4 me-4 mt-4 text-neutral-500" />
          </div>
          <div className="border-r border-neutral-900 ">
            <MotorStatusIcon className="w-12 h-12 ms-4 me-4 mt-4  text-neutral-500" />
          </div>
          <div className="border-r border-neutral-900 ">
            <TemperatureIcon className="w-12 h-12 ms-4 me-4 mt-4 text-neutral-500" />
          </div>
          <div className="flex bg-neutral-800 w-20 ms-24">
            <div className="w-full rounded border border-zinc-950 m01">
              <OthersIcon className="w-12 h-12 text-neutral-300 m-3" />
            </div>
          </div>
        </div>
        <div className="flex items-center me-4">
          <PlugInIcon className={"w-14 h-14 " + (isCharging ? " text-red-600 " : "text-neutral-500")} onClick={(e) => handlePluginClick()} />
        </div>
      </div>
    </main>
  );
}


