import {FC} from "react";
import css from './ProductCardInBasket.module.css';
import {IProduct} from "../../interfaces";

interface IProps{
    product:IProduct
}

let ProductCardInBasket:FC<IProps> = ({product}) => {

    return (
        <div>
            <div>ProductInfo</div>
            <div>Change amount</div>

        </div>
    );
}

export {ProductCardInBasket};
