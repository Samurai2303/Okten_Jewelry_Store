import {IProductPhoto} from "./productPhoto.interface";

export interface IProduct {
    "id": number,
    "created_at": string,
    "category": string,
    "producer": string,
    "material": string,
    "length": number,
    "clasp": string | null,
    "price": number,
    "discounts": number,
    "amount": number,
    "solded": number,
    "photos": IProductPhoto[]
}
