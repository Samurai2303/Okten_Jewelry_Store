import {FC} from "react";
import css from './GeneralProducts.module.css';
import {Categories} from "../categories/Categories";
import {BestSellers} from "../bestSellers/BestSellers";
import {Discounts} from "../discounts/Discounts";
import {AddedRecently} from "../addedRecently/AddedRecently";
import {RecentlyViewed} from "../recentlyViewed/RecentlyViewed";

let GeneralProducts:FC = () => {

    return (
        <div className={css.wrap}>
            <Categories/>
            <BestSellers/>
            <Discounts/>
            <AddedRecently/>
            <RecentlyViewed/>
        </div>
    );
}

export {GeneralProducts};
