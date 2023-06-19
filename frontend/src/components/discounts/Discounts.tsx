import {FC, useEffect} from "react";
import css from './Discounts.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {Loading} from "../loading/Loading";
import {SmthWrong} from "../smthWrong/SmthWrong";
import {ProductCard} from "../productCard/ProductCard";

let Discounts: FC = () => {

    let dispatch = useAppDispatch();
    let {discounts, discountsLoading, discountsError} = useAppSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(productActions.getDiscounts());
    }, [dispatch]);

    return (
        <div className={css.wrap}>
            {discounts.length > 0 ?
                <div>
                    <div className={css.title}>Discounts</div>
                    {discountsLoading && <Loading/>}
                    {discountsError && <SmthWrong/>}
                    <div className={css.products_wrap}>
                        {discounts.map((value) => <ProductCard key={value.id} product={value}/>)}
                    </div>
                </div> : false}
        </div>
    );
}

export {Discounts};
