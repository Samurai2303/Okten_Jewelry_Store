import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {Loading} from "../loading/Loading";
import {SmthWrong} from "../smthWrong/SmthWrong";
import {ProductCard} from "../productCard/ProductCard";
import css from './AddedRecently.module.css';

let AddedRecently: FC = () => {

    let dispatch = useAppDispatch();
    let {addedRecently, addedRecentlyLoading, addedRecentlyError} = useAppSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(productActions.getAddedRecently());
    }, [dispatch]);

    return (
        <div className={css.wrap}>
            <div className={css.title}>Added Recently</div>
            {addedRecentlyLoading && <Loading/>}
            {addedRecentlyError && <SmthWrong/>}
            {addedRecently.length > 0 ? <div className={css.products_wrap}>
                {addedRecently.map((value) => <ProductCard product={value} key={value.id}/>)}
            </div> : false}
        </div>
    );
}

export {AddedRecently};
