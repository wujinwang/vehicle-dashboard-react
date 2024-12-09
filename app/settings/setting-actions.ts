"use server"

// Import necessary modules and definitions from local files.
import { api, ApiResponse, handleApiError } from '@/app/lib/fetch-client';
import {
    AppSetting,
    AppSettingFormSchema,
    AppSettingFormState,
    CreateAppSettingReq,
    SettingResponse,
    UpdateAppSettingReq,
} from '@/app/settings/definitions';

//Define base URLs for the API
const BASE_URL = '/v1/setting'; // Base URL for appSetting API

/**
 * Validate appSetting form data using Zod schema.
 *
 * @param formData The form data submitted by the user.
 * @param state The current state of the form, including errors and other UI states.
 * @returns Updated form state with errors if validation fails or success if validation passes.
 */
export const appSettingValidate = async (
    formData: FormData,
    state: AppSettingFormState
): Promise<AppSettingFormState> => {

   // 1. Validate form fields using Zod schema
    const validatedFields = AppSettingFormSchema.safeParse({   
		    code: formData.get("code"),   
		    configValue: formData.get("configValue"),   
		    parentCode: formData.get("parentCode"),   
		    name: formData.get("name"),   
		    memo: formData.get("memo"),   
		    enabled: formData.get("enabled"),     	    		 
    });

    // If any form fields are invalid, return early with errors
    if (!validatedFields.success) {
        return {
            ...state,
            errors: validatedFields.error.flatten().fieldErrors, // Return validation errors
        };
    }

    // 3. Optionally return success state after submission
    return {
        ...state,
        errors: {}, // Clear errors after successful submission
    };
};
	
/**
 * Create a new appSetting.
 *
 * @param req The request object containing appSetting data to create.
 * @returns A Promise that resolves with the created appSetting or an error message.
 */	
export const createAppSettingAction = async (req: CreateAppSettingReq): Promise<{ data: AppSetting | null, error: string | null }> => {
    return await api.post<AppSetting>(`${BASE_URL}`, req).then((res: ApiResponse<AppSetting>) => {
        return { data: res.data, error: null };
    }).catch((error) => {
        const errorMessage = handleApiError(error, 'Failed to create appSetting.');
        return { data: null, error: errorMessage }; // Return error message to the client
    })
};

/**
 * Fetch all setting by a parentCode. 
 *
 * @param parentCode The ID of the appSetting for which to fetch appSetting.
 * @returns A Promise that resolves with an object containing either the data or an error message.
 */
export const fetchSettingsAction = async (parentCode: string): Promise<{ data: SettingResponse | null, error: string | null }> => {
    console.log("--------fetchSettingsAction by parentCode---------",parentCode);
    return await api.get<SettingResponse>(`${BASE_URL}s`).then((res: ApiResponse<SettingResponse>) => {
        //console.log("--------fetchAppSettingAction---------" + JSON.stringify(res));
        return { data: res.data, error: null };
    }).catch((error) => {
        const errorMessage = handleApiError(error, 'Failed to fetch appSetting.');
        return { data: null, error: errorMessage };
    })
};

/**
 * Fetch appSetting for a specific.
 *
 * @param id The ID of the appSetting for which to fetch appSetting.
 * @returns A Promise that resolves with an object containing either the data or an error message.
 */
export const fetchAppSettingAction = async (id: number): Promise<{ data: AppSetting | null, error: string | null }> => {
    return await api.get<AppSetting>(`${BASE_URL}/${id}`).then((res: ApiResponse<AppSetting>) => {
        //console.log("--------fetchAppSettingAction---------" + JSON.stringify(res));
        return { data: res.data, error: null };
    }).catch((error) => {
        const errorMessage = handleApiError(error, 'Failed to fetch appSetting.');
        return { data: null, error: errorMessage };
    })
};

/**
 * Update an existing appSetting's details.
 *
 * @param req The request object containing updated appSetting data.
 * @returns A Promise resolving with the updated appSetting or an error message.
 */
export const updateAppSettingAction = async (req: UpdateAppSettingReq): Promise<{ data: AppSetting | null, error: string | null }> => {
    return await api.put<AppSetting>(`${BASE_URL}`, req).then((res: ApiResponse<AppSetting>) => {
        return { data: res.data, error: null };
    }).catch((error) => {
        const errorMessage = handleApiError(error, 'Failed to update appSetting.');
        return { data: null, error: errorMessage };
    })
};

/**
 * Delete a appSetting by their ID.
 *
 * @param id The ID of the appSetting to delete.
 * @returns A Promise that resolves with the deleted appSetting's ID or an error message.
 */
export const deleteAppSettingAction = async (id: number): Promise<{ id: number | null, error: string | null }> => {
    return await api.delete(`${BASE_URL}/${id}`).then(() => {
        return { id, error: null };
    }).catch((error) => {
        const errorMessage = handleApiError(error, 'Failed to delete appSetting.');
        return { id: null, error: errorMessage };
    })
};
