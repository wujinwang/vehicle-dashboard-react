"use client";

import { useFormStatus } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useSettingStore } from "./setting.store";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppSettingFormState } from "./definitions";
import { Input } from "../components/ui/input";
import { BatteryIcon, EngineIcon, EngineStatusIcon, ParkingIcon, PlugInIcon, TemperatureIcon } from "../components/ui/icons";
import { Switch } from '@headlessui/react';

export default function SettingPage() {

  const [state, setState] = useState<AppSettingFormState>({ errors: {} });
  const { rpm, power, battery } = useSettingStore();

  const [isParking, setIsParking] = useState(false);
  const [rpmSpeed, setRpmSpeed] = useState("100");
  const [batteryLevel, setBatteryLevel] = useState("100");

  return (
    <div className="h-full">

      <div className="w-full">
        <form method="post" >

          <div className="lg:flex">
            <div className="lg:w-1/2 lg:me-24 lg:mb-24">
              <section className="grid sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <ParkingIcon className={"w-12 h-12 me-4" + (isParking ? " text-blue-500" : " text-neutral-500")} />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Parking</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p>
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex mt-2 ">
                    <Switch id="enabled" checked={isParking} onChange={setIsParking} className={`${isParking ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-5 w-11 items-center rounded-full`}									>
                      <span className={`${isParking ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                    </Switch>
                    <label htmlFor="iconClazz" className="block text-sm font-medium px-2 leading-6 text-gray-900">{isParking ? 'Parking' : 'No'}</label>
                  </div>
                </div>
              </section>

              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <BatteryIcon className="w-12 h-12 text-neutral-500 me-4" />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Battery</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p>
                  </div>
                </div>
                <div className="my-4">
                  <div className="mb-1">{batteryLevel}%</div>
                  <input type="range" min={0} max="100" value={batteryLevel} onChange={(e) => setBatteryLevel(e.target.value)} className="range range-lgaccent-white w-full h-3 bg-blue-500 rounded-lg appearance-none cursor-pointer" step="1" />
                </div>
              </section>

              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <EngineStatusIcon className="w-12 h-12 text-neutral-500 me-4" />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Motor RPM</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p>
                  </div>
                </div>
                <div className="my-4">
                  <Input type="number" min={0} max={800} value={rpmSpeed}
                    onChange={(e) => setRpmSpeed(e.target.value)}
                  ></Input>
                  {state?.errors?.configValue && (
                    <p className="text-sm text-red-500">{state.errors.configValue}</p>
                  )}
                </div>
              </section>



            </div>
            <div className="lg:w-1/2 mb-12 lg:me-12">
              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <PlugInIcon className={"w-12 h-12 me-4" + (isParking ? " text-blue-500" : " text-neutral-500")} />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Charging status</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Motor charging indicator</p>
                  </div>
                </div>
                <div className="mt-8 text-lg">
                  Charging
                </div>
              </section>

              <section className="grid  sm:grid-cols-2 border-b">
                <div className="flex my-4">
                  <TemperatureIcon className={"w-12 h-12 me-4" + (isParking ? " text-blue-500" : " text-neutral-500")} />
                  <div className="">
                    <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Temperature</h2>
                    <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">Motor temperature indicator</p>
                  </div>
                </div>
                <div className="mt-8 text-lg">
                  30
                </div>
              </section>

            </div>

          </div>







        </form>

      </div>
    </div>
  );
}

export function CancelButton() {
  const router = useRouter();
  const { pending } = useFormStatus();

  const newBooking = () => {
    const callbackUrl = "/home";
    router.push(callbackUrl);
  }

  return (
    <Button aria-disabled={pending} type="button" onClick={newBooking} className="mt-2 px-6 me-4 bg-gray-400" variant={"outline"}>
      {pending ? 'Submitting...' : 'Cancel'}
    </Button>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} type="submit" className="mt-2 px-8">
      {pending ? 'Submitting...' : 'Save'}
    </Button>
  );
}


