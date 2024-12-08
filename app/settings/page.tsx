"use client";

import { useFormStatus } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import useDashboardStore from "./setting.store";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const {
    parkingIndicatorToggle,
    engineIndicatorToggle,
    motorStatusIndicatorToggle,
    batteryLowIndicatorToggle,
    rpmSpeed,
    speedSetting,
  } = useDashboardStore();

  return (
    <div className="h-full">
      <div className="">
        <div className="mx-auto max-w-6xl">
          <form method="post" className="mx-auto max-w-4xl">

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 m-12 border-b">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Parking</h2>
                <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p></div>
              <div className="mb-12">
                <span data-slot="control" className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"><input aria-label="Organization Name" className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%] dark:[color-scheme:dark]" id="headlessui-input-:r0:" data-headlessui-state="" value="Catalyst" name="name" /></span>
              </div>
            </section>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 m-12 border-b">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Motor RPM</h2>
                <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p></div>
              <div className="mb-12">
                <span data-slot="control" className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"><input aria-label="Organization Name" className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%] dark:[color-scheme:dark]" id="headlessui-input-:r0:" data-headlessui-state="" value="Catalyst" name="name" /></span>
              </div>
            </section>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 m-12 border-b">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Battery Percentage</h2>
                <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p></div>
              <div className="mb-12">
                <span data-slot="control" className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"><input aria-label="Organization Name" className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%] dark:[color-scheme:dark]" id="headlessui-input-:r0:" data-headlessui-state="" value="Catalyst" name="name" /></span>
              </div>
            </section>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 m-12 border-b">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Power Status</h2>
                <p data-slot="text" className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">This will be displayed on your public profile.</p></div>
              <div className="mb-12">
                <span data-slot="control" className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"><input aria-label="Organization Name" className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%] dark:[color-scheme:dark]" id="headlessui-input-:r0:" data-headlessui-state="" value="Catalyst" name="name" /></span>
              </div>
            </section>

            <section className="me-12 mb-12">
              <div className="flex items-end justify-end my-8">
                <CancelButton></CancelButton>
                <SubmitButton></SubmitButton>
              </div>
            </section>

          </form>

        </div>
      </div>
    </div>
  );
}

export function CancelButton() {
  const router = useRouter();
  const { pending } = useFormStatus();

  const newBooking = () => {
    const callbackUrl = "/checkout";
    router.push(callbackUrl);
  }

  return (
    <Button aria-disabled={pending} type="button" onClick={newBooking} className="mt-2 px-6 me-4 bg-gray-400">
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


