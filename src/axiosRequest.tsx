/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:4010",
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    },
});

export class HttpClient {
    static async get<T>(url: string, params?: unknown) {
        try {
            const response = await axiosInstance.get<T>(url, { params });
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error: error }
        }
    }

    static async put<T>(url: string, data: unknown, options?: any) {
        try {
            const response = await axiosInstance.put<T>(url, data, options);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error: error }
        }
    }
}