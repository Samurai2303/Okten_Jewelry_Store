import {FC} from "react";
import css from './BasketPage.module.css';
import {Outlet} from "react-router-dom";

let BasketPage: FC = () => {

    return (
        <div>
            <div>
                <div>UserInfoBtn</div>
                <div>FavoritesBtn</div>
            </div>
            <div>BasketLogo</div>
            <div>
                <div>Product cards in basket</div>
                <div>Delete product</div>
            </div>
            <div>Place an order</div>
            <Outlet/>


        </div>
    );
}

export {BasketPage};
