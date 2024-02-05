import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../utils/constants";
import { TApiResponse } from "types/api";
import { getAccessToken, autoLogout, replaceAccessToken } from "utils/helpers";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        const accessToken = getAccessToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    function (e: AxiosError) {
        console.log(e)
    }
)

axiosInstance.interceptors.response.use(
    function (res: AxiosResponse<TApiResponse>) {
        const { data, statusText, status } = res

        res.data = {
            data,
            message: statusText,
            statusCode: status
        }
        return res
    },
    async function (e: AxiosError<TApiResponse>) {
        const {
            response,
            request: { responseURL: url },
            config: originalConfig
        } = e

        if (response) {
            const { data: { message, statusCode } } = response
            if (statusCode === 401) {
                // CHECK IF 401 ERROR FROM /auth/refresh OR NOT BASE ON RT AND COOKIE EXISTENCE
                // IF TRUE, CLEAR STORAGE AND RELOAD PAGE
                if (url.includes('refresh')) {
                    autoLogout()
                    return
                }

                // IF FALSE, FETCH NEW ACCESS TOKEN
                // REPLACE CURRENT ACCESS TOKEN IN STORAGE
                // RE-FETCH PREVIOUS CALL
                const res = await axiosInstance.post('/auth/refresh')
                if (res) {
                    const { data: { data: accessToken } } = res
                    replaceAccessToken(accessToken)
                    return axiosInstance(originalConfig as AxiosRequestConfig)
                }
            }
            return {
                data: {
                    data: null,
                    message,
                    statusCode
                }
            }
        }
        return {
            data: {
                data: null,
                message: 'Internal Server Error',
                statusCode: 500
            }
        }
    },
);