import {IProduct} from "./product.interface";

export interface IProductWrap {
    "id": number,
    "amount": number,
    "product": IProduct
}