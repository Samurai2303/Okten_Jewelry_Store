import {IUser} from "./user.interface";
import {IProductWrap} from "./productWrap.interface";

export interface IOrder{
    "id": number,
    "status": string,
    "delivery_number": string,
    "delivery_place": string,
    "comment": string,
    "created_at": string,
    "user": IUser,
    "product_wraps": IProductWrap[]
}