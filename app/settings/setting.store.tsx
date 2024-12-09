// useAppCodeStore.ts
import { create } from 'zustand';

interface SettingStore {
    rpm: number;
    power: number;
    battery: number;

    setRpm: (rpm: number) => void;
    setPower: (power: number) => void;
    setBattery: (battery: number) => void;
}

export const useSettingStore = create<SettingStore>((set) => ({
    rpm: 0,
    power: 0,
    battery: 0,

    setRpm: (rpm: number) => set({ rpm }),
    setPower: (power: number) => set({ power }),
    setBattery: (battery: number) => set({ battery }),
}));

export default useSettingStore;