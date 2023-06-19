import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import css from './RecentlyViewed.module.css';
import {ProductCard} from "../productCard/ProductCard";

let RecentlyViewed: FC = () => {

    let dispatch = useAppDispatch();
    let {recentlyViewed} = useAppSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(productActions.getRecentlyViewed());
    }, []);

    return (
        <div>
            {recentlyViewed &&
                <div className={css.wrap}>
                    <div className={css.title}>Recently Viewed</div>
                    <div className={css.products_wrap}>
                        {recentlyViewed.map((value) => <ProductCard product={value} key={value.id}/>)}
                    </div>
                </div>
            }
        </div>
    );
}

export {RecentlyViewed};
