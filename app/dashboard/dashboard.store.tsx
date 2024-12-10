// useAppCodeStore.ts
import { create } from 'zustand';

interface DashboardStore {
    isParking: boolean,
    isBatteryLow: boolean,
    isCharging: boolean,

    isMotorStatusIndicator:boolean,

    rpm: number;
    power: number;
    battery:number;
    speedSetting: number;
    temperature: number;

    setParking: (isParking: boolean) => void;
    setBatteryLow: (isBatteryLow: boolean) => void,
    setCharging: (isCharging: boolean) => void,

    setMotorStatusIndicator: (isMotorStatusIndicator: boolean) => void,

    setRpm: (rpm: number) => void;
    setPower: (power: number) => void;
    setBattery: (battery: number) => void;
    setSpeedSetting: (speedSetting: number) => void;
    setTemperature: (temperature: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({

    isParking: false,
    isBatteryLow: false,
    isCharging: false,

    isMotorStatusIndicator:false,

    rpm: 0,
    power:0,
    battery:0,
    speedSetting: 0,
    temperature: 0,

    setParking: (isParking: boolean) => set({ isParking }),
    setBatteryLow: (isBatteryLow: boolean) => set({ isBatteryLow }),
    setCharging: (isCharging: boolean) => set({ isCharging }),

    setMotorStatusIndicator: (isMotorStatusIndicator: boolean) => set({ isMotorStatusIndicator }),

    setRpm: (rpm: number) => set({ rpm }),
    setPower: (power: number) => set({ power }),
    setBattery: (battery: number) => set({ battery }),
    setSpeedSetting: (speedSetting: number) => set({ speedSetting }),
    setTemperature: (temperature: number) => set({ temperature }),

}));

export default useDashboardStore;