// useAppCodeStore.ts
import { create } from 'zustand';
import { AppCode, SearchAppCodeReq } from '@/app/dashboard/definitions';

interface DashboardStore {
    parkingIndicatorToggle: boolean,
    engineIndicatorToggle: boolean,
    motorStatusIndicatorToggle: boolean,
    batteryLowIndicatorToggle: boolean,

    rpmSpeed: number;
    speedSetting: number;

    setParkingIndicatorToggle: (parkingIndicatorToggle: boolean) => void;
    setEngineIndicatorToggle: (engineIndicatorToggle: boolean) => void;
    setMotorStatusIndicatorToggle: (motorStatusIndicatorToggle: boolean) => void;
    setBatteryLowIndicatorToggle: (batteryLowIndicatorToggle: boolean) => void;

    setRpmSpeed: (rpmSpeed: number) =>  void;
    setSpeedSetting: (speedSetting: number) =>  void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
    parkingIndicatorToggle: false,
    engineIndicatorToggle: false,
    motorStatusIndicatorToggle: false,
    batteryLowIndicatorToggle: false,
    rpmSpeed: 0,
    speedSetting: 0,
    setParkingIndicatorToggle: (parkingIndicatorToggle: boolean) => set({ parkingIndicatorToggle }),
    setEngineIndicatorToggle: (engineIndicatorToggle: boolean) => set({ engineIndicatorToggle }),
    setMotorStatusIndicatorToggle: (motorStatusIndicatorToggle: boolean) => set({ motorStatusIndicatorToggle }),
    setBatteryLowIndicatorToggle: (batteryLowIndicatorToggle: boolean) => set({ batteryLowIndicatorToggle }),

    setRpmSpeed: (rpmSpeed: number) => set({ rpmSpeed }),
    setSpeedSetting: (speedSetting: number) => set({ speedSetting }),

}));

export default useDashboardStore;