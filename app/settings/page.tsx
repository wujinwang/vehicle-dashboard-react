"use client";

import { useFormStatus } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useSettingStore } from "./setting.store";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSettingFormState, UpdateAppSettingReq } from "./definitions";
import { Input } from "../components/ui/input";
import { BatteryIcon, EngineIcon, EngineStatusIcon, ParkingIcon, PlugInIcon, TemperatureIcon } from "../components/ui/icons";
import { Switch } from '@headlessui/react';
import { showErrorMessage, showSuccessMessage } from "../components/Toast";
import { fetchSettingsAction, updateAppSettingAction } from "./setting-actions";

export default function SettingPage() {

  const [state, setState] = useState<AppSettingFormState>({ errors: {} });

  const [isParking, setIsParking] = useState(false);
  const [parking, setParking] = useState("Parking");

  const [isCharging, setIsCharging] = useState(false);

  const [rpm, setRpm] = useState("100");
  const [battery, setBattery] = useState("100");
  const [temperature, setTemperature] = useState("100");

  const settingCode = "APP_SETTING";

  useEffect(() => {
    handleFetchSettingAction();

    // Set up an interval to call the handleFetchSettingAction function every 5 seconds
    const intervalId = setInterval(() => {
      handleFetchSettingAction();
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, []);

  useEffect(() => {
    const inputValue = parseFloat(rpm);
    setParking(inputValue > 0 ? "Running" : "Parking");
  }, [rpm]);

  const handleFetchSettingAction = async () => {
    fetchSettingsAction(settingCode).then((res) => {
      if (res.error) {
        showErrorMessage(res.error); // Show error on the client
      } else if (res.data) {
        console.log("---------res-----", res.data);
        setRpm(res.data.rpm + "");
        setBattery(res.data.battery);
        setIsCharging(res.data.isCharging);
        setTemperature(res.data.temperature);

        // Check if the parsed value is a valid number
        const inputValue = parseFloat(res.data.rpm);
        if (!isNaN(inputValue)) {
          if (inputValue == 0) {
            setIsParking(true);
          }
        }

      }
    })
  };

  const handleBatteryLevelChange = async (val: string) => {
    setBattery(val);
    handleAppSettingUpdateSubmit("APP_SETTING_BATTERY", val);
  };

  const handleRpmSpeedChange = async (val: string) => {
    setRpm(val);
    const inputValue = parseFloat(val);
    setIsParking(false);
    // Check if the parsed value is a valid number
    if (!isNaN(inputValue)) {
      if (inputValue == 0) {
        setIsParking(true);
      }
    }
    handleAppSettingUpdateSubmit("APP_SETTING_RPM", val);
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
    <div className="h-full">

      <div className="w-full">
        <form method="post" >

          <div className="lg:flex">
            <div className="lg:w-1/2 lg:me-24 lg:mb-24">
              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <BatteryIcon className="w-12 h-12 text-neutral-500 me-4" />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Battery</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will display battery level.</p>
                  </div>
                </div>
                <div className="my-4">
                  <div className="mb-1">{battery}%</div>
                  <input type="range" min={0} max="100" value={battery} onChange={(e) => handleBatteryLevelChange(e.target.value)} className="range range-lgaccent-white w-full h-3 bg-blue-500 rounded-lg appearance-none cursor-pointer" step="1" />
                </div>
              </section>
              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <EngineStatusIcon className="w-12 h-12 text-neutral-500 me-4" />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Motor RPM</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will display RPM of motor.</p>
                  </div>
                </div>
                <div className="my-4">
                  <Input type="number" min={0} max={800} value={rpm}
                    onChange={(e) => handleRpmSpeedChange(e.target.value)}
                  ></Input>
                  {state?.errors?.configValue && (
                    <p className="text-sm text-red-500">{state.errors.configValue}</p>
                  )}
                </div>
              </section>
            </div>



            <div className="lg:w-1/2 mb-12 lg:me-12">

              <section className="grid sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <ParkingIcon className={"w-12 h-12 me-4" + (isParking ? " text-blue-500" : " text-neutral-500")} />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Parking</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Parking indicator.</p>
                  </div>
                </div>
                <div className="mt-8 text-lg">
                  {parking}
                </div>
              </section>
              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <PlugInIcon className={"w-12 h-12 me-4" + (isCharging ? " text-blue-500" : " text-neutral-500")} />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Charging status</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Motor charging indicator</p>
                  </div>
                </div>
                <div className="mt-8 text-lg">
                  {isCharging ? "Charging" : "Not Charging"}
                </div>
              </section>
              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <TemperatureIcon className="w-12 h-12 me-4 text-neutral-500" />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Temperature</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Motor temperature indicator</p>
                  </div>
                </div>
                <div className="mt-8 text-lg">
                  {temperature} <span className="wob_t" aria-label="°Celsius" aria-disabled="true" role="button">°C</span>
                </div>
              </section>
            </div>

          </div>


        </form>

      </div>
    </div>
  );
}
