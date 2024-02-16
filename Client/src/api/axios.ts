import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../utils/constants";
import { TApiResponse } from "types/api";
import { getAccessToken, autoLogout, replaceAccessToken, isSession } from "utils/helpers";
import http from 'http';
import https from 'https';

// AXIOS INSTANCE FOR CLIENT
export const axiosClient = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

axiosClient.interceptors.request.use(
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

axiosClient.interceptors.response.use(
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

            if (statusCode === 401 && !url.includes('refresh')) {
                if (!isSession()) return

                const res = await axiosClient.post('/auth/refresh')
                if (res) {
                    const { data: { data: accessToken } } = res
                    replaceAccessToken(accessToken)
                    return axiosClient(originalConfig as AxiosRequestConfig)
                }
            }

            if (statusCode === 401 && url.includes('refresh')) {
                if (!isSession()) return

                autoLogout()
                return
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

// AXIOS INSTANCE FOR SERVER
export const axiosServer = axios.create({
    baseURL: API_URL,
    timeout: 5 * 60 * 1000, //optional
    httpsAgent: new https.Agent({
        maxSockets: 160,
        maxFreeSockets: 160,
        timeout: 60000,
        keepAliveMsecs: 60000,
    }),
    httpAgent: new http.Agent({
        maxSockets: 160,
        maxFreeSockets: 160,
        timeout: 60000,
        keepAliveMsecs: 60000,
    })
});

axiosServer.interceptors.request.use(
    async function (config: InternalAxiosRequestConfig) {
        return config;
    },
    function (e: AxiosError) {
        console.log(e)
    }
);

axiosServer.interceptors.response.use(
    function (res: AxiosResponse) {
        return res;
    },
    function (e: AxiosError) {
        console.log(e)
    }
);