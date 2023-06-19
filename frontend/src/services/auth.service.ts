import {axiosInstanceFree, AxiosRes} from "./axios.service";
import {ILogin, ITokens} from "../interfaces";
import {urls} from "../configs";

let _accessToken = 'access';
let _refreshToken = 'refresh';

let authService = {
    login: (login: ILogin): AxiosRes<ITokens> => axiosInstanceFree.post(urls.auth.login, login),
    refresh: (refresh: string): AxiosRes<ITokens> => axiosInstanceFree.post(urls.auth.refresh, {refresh}),

    setTokens: ({access, refresh}: ITokens): void => {
        localStorage.setItem(_accessToken, access);
        localStorage.setItem(_refreshToken, refresh);
    },
    deleteTokens: ():void => {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
    },
    getAccessToken: (): string | null => localStorage.getItem(_accessToken),
    getRefreshToken: (): string | null => localStorage.getItem(_refreshToken),

};

export {authService};