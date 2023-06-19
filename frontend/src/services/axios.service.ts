import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {baseURL} from "../configs";
import {authService} from "./auth.service";
import {createBrowserHistory} from "history";

export type AxiosRes<T> = Promise<AxiosResponse<T>>

let axiosInstanceFree = axios.create({baseURL});
let axiosInstance = axios.create({baseURL});
let history = createBrowserHistory();

let isRefreshing = false;

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    let access = authService.getAccessToken()

    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

axiosInstance.interceptors.response.use((config: AxiosResponse): AxiosResponse => config,
    async (error: any) => {
        let refresh = authService.getRefreshToken()

        if (error.response?.status == 401 && refresh && !isRefreshing) {
            isRefreshing = true;
            try {
                let {data} = await authService.refresh(refresh);
                authService.setTokens(data);

            } catch (error) {
                authService.deleteTokens();
                localStorage.removeItem('loggedUser');
                history.replace('/userLayout/logIn?expSession=true');
            }
            isRefreshing = false;
            return axiosInstance(error.config);
        } else if (error.response?.status == 401 && !refresh && !isRefreshing) {   ////
            authService.deleteTokens();
            localStorage.removeItem('loggedUser');
            history.replace('/userLayout/logIn');
            // return axiosInstance(error.config);
        }                                                                          ////

        return Promise.reject(error);

    });


export {axiosInstance, axiosInstanceFree, history};
