import {IProductToBuy} from "./productToBuy.interface";

export interface IOrderToCreate{
    "delivery_place":string,
    "comment":string,
    "products":IProductToBuy[]
}