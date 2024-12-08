import { z } from 'zod';

export const AppSettingFormSchema = z.object({

  code: z.string().min(1, { message: 'code required.' }).trim(),
  configValue: z.string().min(1, { message: 'configValue required.' }).trim(),
  parentCode: z.string().min(1, { message: 'parentCode required.' }).trim(),
  name: z.string().min(1, { message: 'name required.' }).trim(),
  memo: z.string().min(1, { message: 'memo required.' }).trim(),
  enabled: z.string().min(1, { message: 'enabled required.' }).trim(),
});

export type AppSettingFormState =
  | {
    errors?: {

      code?: string[];
      configValue?: string[];
      parentCode?: string[];
      name?: string[];
      memo?: string[];
      enabled?: string[];
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
  id: number;
  code: string;
  configValue: string;
  parentCode: string;
  name: string;
  memo: string;
  enabled: string;
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
