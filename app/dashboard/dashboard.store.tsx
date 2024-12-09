// useAppCodeStore.ts
import { create } from 'zustand';
import { AppCode, SearchAppCodeReq } from '@/app/dashboard/definitions';

interface DashboardStore {
    isParking: boolean,
    isBatteryLow: boolean,

    rpm: number;
    speedSetting: number;

    setIsParking: (isParking: boolean) => void;
   
    setRpm: (rpm: number) =>  void;
    setSpeedSetting: (speedSetting: number) =>  void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({

    isParking:false,
    isBatteryLow:false,

    rpm: 0,
    speedSetting: 0,
   
    setIsParking: (isParking: boolean) => set({ isParking }),
    setIsBatteryLow: (isBatteryLow: boolean) => set({ isBatteryLow }),

    setRpm: (rpm: number) => set({ rpm }),
    setSpeedSetting: (speedSetting: number) => set({ speedSetting }),

}));

export default useDashboardStore;