import {IProfile} from "./profile.interface";
import {IProduct} from "./product.interface";

export interface IUserToUpdate {
    "id": number,
    "email": string,
    "is_active": boolean,
    "is_staff": boolean,
    "is_superuser": boolean,
    "created_at": string,
    "updated_at": string,
    "last_login": string,
    "profile": IProfile,
    "favorites": IProduct[]
}