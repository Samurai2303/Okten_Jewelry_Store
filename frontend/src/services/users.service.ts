import {axiosInstance, axiosInstanceFree, AxiosRes} from "./axios.service";
import {IPaginatedData, IProduct, IUser} from "../interfaces";
import {urls} from "../configs";

let usersService = {
    getAll: (): AxiosRes<IPaginatedData<IUser[]>> => axiosInstance.get(urls.users),
    createUser: (user: FormData): AxiosRes<IUser> => axiosInstanceFree.post(urls.users, user),
    getById: (id: number): AxiosRes<IUser> => axiosInstance.get(`${urls.users}/${id}`),
    blockById: (id: number): AxiosRes<IUser> => axiosInstance.post(`${urls.users}/${id}/block`),
    activateById: (id: number): AxiosRes<IUser> => axiosInstance.post(`${urls.users}/${id}/activate`),
    getLogged: (): AxiosRes<IUser> => axiosInstance.get(`${urls.users}/retrieveUpdate`),
    getFavorites: (): AxiosRes<IProduct[]> => axiosInstance.get(`${urls.users}/favorites`),
    updateLogged: (user: FormData): AxiosRes<IUser> => axiosInstance.patch(`${urls.users}/retrieveUpdate`, user),
    makeAdminById: (id: number): AxiosRes<IUser> => axiosInstance.post(`${urls.users}/${id}/admin`),
    makeUserById: (id: number): AxiosRes<IUser> => axiosInstance.post(`${urls.users}/${id}/user`),
    addToFavorites: (id: number): AxiosRes<IUser> => axiosInstance.post(`${urls.users}/${id}/favorites`),
    deleteFromFavorites: (id: number): AxiosRes<IUser> => axiosInstance.delete(`${urls.users}/${id}/favorites`),
    forgotPassword: (email: string): AxiosRes<void> => axiosInstanceFree.get(`${urls.users}/forgot_password/${email}`)
};

export {usersService};