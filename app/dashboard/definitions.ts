import { z } from 'zod';

export const AppCodeFormSchema = z.object({
	code: z.string().min(1, { message: 'code required.' }).trim(),
	enabled: z.string().min(1, { message: 'enabled required.' }).trim(),
	groupCode: z.string().min(1, { message: 'groupCode required.' }).trim(),
	groupName: z.string().min(1, { message: 'groupName required.' }).trim(),
	memo: z.string().min(1, { message: 'memo required.' }).trim(),
	name: z.string().min(1, { message: 'name required.' }).trim(),
	parentCode: z.string().min(1, { message: 'parentCode required.' }).trim(),
	priority: z.number().gte(0, { message: "priority must be greater than or equal to 0" }),
});

export type AppCodeFormState =
	| {
		errors?: {
			code?: string[];
			enabled?: string[];
			groupCode?: string[];
			groupName?: string[];
			memo?: string[];
			name?: string[];
			parentCode?: string[];
			priority?: string[];
		};
		message?: string;
	}
	| undefined;


export interface CreateAppCodeReq {
	code: string;
	enabled: string;
	groupCode: string;
	groupName: string;
	memo: string;
	name: string;
	parentCode: string;
	priority: number;
}

export interface UpdateAppCodeReq {
	id: number;
	code: string;
	enabled: string;
	groupCode: string;
	groupName: string;
	memo: string;
	name: string;
	parentCode: string;
	priority: number;
}

export interface SearchAppCodeReq {
	name: string;
}

export interface AppCode {
	id: number;
	code: string;
	enabled: string;
	groupCode: string;
	groupName: string;
	memo: string;
	name: string;
	parentCode: string;
	priority: number;
}
