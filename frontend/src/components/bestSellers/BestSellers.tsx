import {FC, useEffect} from "react";
import css from './BestSellers.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {ProductCard} from "../productCard/ProductCard";
import {SmthWrong} from "../smthWrong/SmthWrong";
import {Loading} from "../loading/Loading";


let BestSellers: FC = () => {

    let dispatch = useAppDispatch();
    let {bestSellers, bestSellersLoading, bestSellersError} = useAppSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(productActions.getBestSellers());
    }, [dispatch]);

    return (
        <div className={css.wrap}>
            <div className={css.title}>Best Sellers</div>
            {bestSellersLoading && <Loading/>}
            {bestSellersError && <SmthWrong/>}
            {bestSellers.length > 0 ? <div className={css.products_wrap}>
                {bestSellers.map((value) => <ProductCard key={value.id} product={value}/>)}
            </div> : false}
        </div>
    );
}

export {BestSellers};
