import {axiosInstance, AxiosRes} from "./axios.service";
import {IOrder, IOrderToCreate, IPaginatedData} from "../interfaces";
import {urls} from "../configs";

let ordersService = {
    getAll: (): AxiosRes<IPaginatedData<IOrder[]>> => axiosInstance.get(urls.orders),
    create: (order: IOrderToCreate): AxiosRes<IOrder> => axiosInstance.post(urls.orders, order),
    getById: (id: number): AxiosRes<IOrder> => axiosInstance.get(`${urls.orders}/${id}`),
    getUserOrders: (): AxiosRes<IOrder[]> => axiosInstance.get(`${urls.orders}/user_orders`),
    cancel: (id: number): AxiosRes<IOrder> => axiosInstance.post(`${urls.orders}/${id}/cancel`),
    confirm: (id: number): AxiosRes<IOrder> => axiosInstance.post(`${urls.orders}/${id}/confirm`),
}


export {ordersService};