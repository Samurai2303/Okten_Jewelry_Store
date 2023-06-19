import {axiosInstance, axiosInstanceFree, AxiosRes} from "./axios.service";
import {IPaginatedData, IProduct} from "../interfaces";
import {urls} from "../configs";

let productsService = {
    getAll: (queryParams:string): AxiosRes<IPaginatedData<IProduct[]>> => axiosInstanceFree.get(`${urls.products}?${queryParams}`),
    create: (product: Partial<IProduct>): AxiosRes<IProduct> => axiosInstance.post(urls.products, product),
    getById: (id: number): AxiosRes<IProduct> => axiosInstanceFree.get(`${urls.products}/${id}`),
    patchById: (id: number, product: Partial<IProduct>) => axiosInstance.patch(`${urls.products}/${id}`, product),
    deleteById: (id: number): AxiosRes<void> => axiosInstance.delete(`${urls.products}/${id}`),
    addPhotos: (id: number, photos:File[]): AxiosRes<IProduct> => axiosInstance.post(`${urls.products}/${id}/photo`, photos),
    deletePhotoById: (id: number): AxiosRes<void> => axiosInstance.delete(`${urls.products}/${id}/delete_photo`),
    getBestSellers: (): AxiosRes<IPaginatedData<IProduct[]>> => axiosInstanceFree.get(`${urls.products}?sort_by=popularity`),
    getDiscounts: (): AxiosRes<IPaginatedData<IProduct[]>> => axiosInstanceFree.get(`${urls.products}?discounts_gte=1&sort_by=discounts`),
    getaddedRecntly: (): AxiosRes<IPaginatedData<IProduct[]>> => axiosInstanceFree.get(`${urls.products}?sort_by=added_recently`),
}

export {productsService};