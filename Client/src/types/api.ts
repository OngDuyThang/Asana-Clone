export interface TApiResponse<T = unknown> {
    data: T | null;
    message?: string;
    errCode?: number
}