import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";



// Token refresh handling
let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];



// Notify all subscribers once token is refreshed
const onRefreshed = (token?: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};



const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

// Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});




// 🧩 Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("access_token");
            if (token && !config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);



// 🧩 Response Interceptor
axiosInstance.interceptors.response.use(

    (response) => response,

    async (error: AxiosError) => {

        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        const requestUrl = originalRequest?.url || "";
        const isAuthEndpoint =
            requestUrl.includes("/auth/check-login") ||
            requestUrl.includes("/auth/login") ||
            requestUrl.includes("/auth/register") ||
            requestUrl.includes("/auth/token/refresh") ||
            requestUrl.includes("/auth/verify-otp") ||
            requestUrl.includes("/auth/resend-otp") ||
            requestUrl.includes("/auth/google-auth");

        const wasLoggedIn =
            typeof window !== "undefined" &&
            (localStorage.getItem("is_logged_in") === "true" || !!localStorage.getItem("access_token"));

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint && wasLoggedIn) {

            originalRequest._retry = true;

            // Prevent multiple parallel refresh calls
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push(() => {
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {

                // 🔄 Try refresh token
                await axios.post(
                    `${API_BASE_URL}/auth/token/refresh/`,
                    {},
                    { withCredentials: true }
                );

                onRefreshed();
                isRefreshing = false;

                // Retry original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {

                isRefreshing = false;
                onRefreshed();

                if (typeof window !== "undefined") {
                    localStorage.removeItem("is_logged_in");
                    localStorage.removeItem("access_token");
                    localStorage.setItem("logout", Date.now().toString());
                }

                toast.error("Session expired", {
                    description: "Please log in again.",
                    duration: 5000,
                });

                return Promise.reject(refreshError);

            }

        }


        // Handle other errors
        const status = error?.response?.status;
        const data = error?.response?.data;
        const message = (data as any)?.message || "Something went wrong, please try again.";

        return Promise.reject({ status, message, data });
        
    }
    
);

export default axiosInstance;
