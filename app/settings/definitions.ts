import { z } from 'zod';

export const AppSettingFormRpmSchema = z.object({
  rpm: z
    .number()
    .min(0, { message: 'Motor RPM must be 0 or more' })
    .max(800, { message: 'Motor RPM must not exceed 800' }),
});

export type AppSettingFormRpmState =
  | {
    errors?: {
      rpm?: string[];
    };
    message?: string;
  }
  | undefined;


export const AppSettingFormPowerSchema = z.object({
  power: z
    .number()
    .min(0, { message: 'Power consumption must be 0 or more' })
    .max(1000, { message: 'Power consumption must not exceed 1000' }), // Corrected the message to reflect the actual limit
});

export type AppSettingFormPowerState =
  | {
    errors?: {
      power?: string[];
    };
    message?: string;
  }
  | undefined;


export interface CreateAppSettingReq {
  code: string;
  configValue: string;
  parentCode: string;
  name: string;
  memo: string;
  enabled: string;
}

export interface UpdateAppSettingReq {
  parentCode: string;
  code: string;
  configValue: string;
}

export interface SearchAppSettingReq {
  name: string;
}

export interface AppSetting {
  id: number;
  code: string;
  configValue: string;
  parentCode: string;
  name: string;
  memo: string;
  enabled: string;
}


export interface SettingResponse {
  rpm: string;
  battery: string;
  power: string;
  temperature: string;
  gearRatio: string;
  isCharging: boolean
}
