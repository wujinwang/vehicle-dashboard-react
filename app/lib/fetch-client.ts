const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure this is set in environment variables

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    cookie?: string;
    params?: Record<string, string | number | boolean | undefined | null>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
};

function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
    if (!params) return url;

    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
    );

    const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
    return queryString ? `${url}?${queryString}` : url;
}



async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const {
        method = 'GET',
        headers = {},
        body,
        cookie,
        params,
        cache = 'no-store',
        next,
    } = options;

    const accessToken = "111111111111111111111111111";
    const fullUrl = buildUrlWithParams(BASE_URL + url, params);

    const fetchOptions: RequestInit = {
        method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            ...headers,
            ...(cookie ? { Cookie: cookie } : {}),
        },
        credentials: 'include',
        cache,
        next,
    };

    // Add body only for methods that support it
    if (body && method !== 'GET' && method !== 'HEAD') {
        fetchOptions.body =
            body instanceof FormData ? (body as BodyInit) : JSON.stringify(body);

        // Ensure Content-Type is set correctly
        if (!(body instanceof FormData)) {
            fetchOptions.headers = {
                ...fetchOptions.headers,
                'Content-Type': 'application/json',
            };
        }
    }

    try {
        const response = await fetch(fullUrl, fetchOptions);

        if (!response.ok) {
            return await handleResponseError<T>(response, url, options);
        }

        return await parseResponse<T>(response);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function uploadApi<T>(url: string, body: FormData, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return fetchApi<T>(url, {
        ...options,
        method: 'POST',
        body,
        headers: {
            ...options?.headers, // Let the browser set the Content-Type for FormData
        },
    });
}

async function handleResponseError<T>(
    response: Response,
    url: string,
    options: RequestOptions,
): Promise<ApiResponse<T>> {

    if (response.status === 401) {
        console.log('Token expired, attempting refresh...',url,options);
    }

    const errorResponse = await response.json();
    return {
        data: errorResponse as T,
        status: response.status,
        message: errorResponse.message || response.statusText,
    };
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
        const data = await response.json();
        return { data: data as T, status: response.status };
    }

    console.error('Unexpected response type:', contentType);
    return { data: null as T, status: response.status };
}

export const api = {
    get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return fetchApi<T>(url, { ...options, method: 'GET' });
    },
    post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return fetchApi<T>(url, { ...options, method: 'POST', body });
    },
    put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return fetchApi<T>(url, { ...options, method: 'PUT', body });
    },
    patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return fetchApi<T>(url, { ...options, method: 'PATCH', body });
    },
    delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return fetchApi<T>(url, { ...options, method: 'DELETE' });
    },
    upload<T>(url: string, body: FormData, options?: RequestOptions): Promise<ApiResponse<T>> {
        return uploadApi<T>(url, body, options);
    },
};

export const handleApiError = (error: unknown, defaultMessage: string): string => {
    return error instanceof Error ? error.message || defaultMessage : defaultMessage;
};
