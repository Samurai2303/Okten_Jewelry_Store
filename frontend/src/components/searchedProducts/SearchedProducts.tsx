import {ChangeEvent, FC, useEffect, useState} from "react";
import css from './SearchedProducts.module.css';
import {useAppDispatch, useAppLocations, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {productActions} from "../../redux";
import {ProductCard} from "../productCard/ProductCard";
import {Loading} from "../loading/Loading";
import {SmthWrong} from "../smthWrong/SmthWrong";

let SearchedProducts: FC = () => {

    let location = useAppLocations<null>();
    let dispatch = useAppDispatch();
    let {
        searchedProducts,
        searchedProductsLoading,
        searchedProductsError
    } = useAppSelector(state => state.productReducer);


    let [query, setQuery] = useSearchParams({page: '1'});

    let btn_click = (ascOrDesc: string): void => {
        let queryArray = location.search.split('&');
        let pageStr = queryArray.find((value) => value.includes('page'));
        let index = queryArray.findIndex((value) => value.includes('page'));
        let pageStrArr = pageStr!.split('=');
        if (ascOrDesc === '+') {
            pageStrArr[1] = String(+pageStrArr[1] + 1);
        } else if (ascOrDesc === '-') {
            pageStrArr[1] = String(+pageStrArr[1] - 1);
        }
        pageStr = pageStrArr.join('=');
        queryArray[index] = pageStr;
        location.search = queryArray.join('&')
        setQuery(() => location.search)
    };

    let [sort, setSort] = useState<string>('popularity');

    let change = (e: ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value)
    };

    useEffect(() => {
        if (location.search.includes('sort_by')) {
            let queryArray = location.search.split('&');
            let sortStr = queryArray.find((value) => value.includes('sort_by'));
            let index = queryArray.findIndex((value) => value.includes('sort_by'));
            let sortStrArr = sortStr!.split('=');
            sortStrArr[1] = sort;
            sortStr = sortStrArr.join('=');
            queryArray[index] = sortStr;
            location.search = queryArray.join('&')
        } else {
            location.search = location.search.concat(`&sort_by=${sort}`)
        }
        setQuery(() => location.search)

        dispatch(productActions.getSearchedProducts({queryParams: location.search.replace('?', '')}));
    }, [query, sort]);


    return (
        <div className={css.wrap}>
            <div className={css.title}>Searched Products</div>
            <div className={css.sort_wrap}>
                <div className={css.sort_title}>Sort by</div>
                <select onChange={(e) => change(e)} className={css.select}>
                    <option selected value={'popularity'}>Popularity</option>
                    <option value={'added_recently'}>New Arrivals</option>
                    <option value={'price_asc'}>Price: Low to High</option>
                    <option value={'price_desc'}>Price: High to Low</option>
                </select>
            </div>
            {searchedProductsLoading && <Loading/>}
            {searchedProductsError && <SmthWrong/>}
            {searchedProducts.data.length ?
                <div className={css.products_wrap}>
                    {searchedProducts.data.map(value => <ProductCard product={value} key={value.id}/>)}
                </div> :
                <div className={css.nothing_found}>Nothing Found...</div>
            }
            <div className={css.btns_wrap}>
                <button className={css.btn} disabled={!searchedProducts.previous} onClick={() => btn_click('-')}>
                    <i className={`fa-solid fa-arrow-left-long ${css.arrow}`}></i>
                    <div className={css.shadow}></div>
                </button>
                {query.get('page') ? <div className={css.page}>{query.get('page')}</div> :
                    <div className={css.page}>0</div>}
                <button className={css.btn} disabled={!searchedProducts.next} onClick={() => btn_click('+')}>
                    <i className={`fa-solid fa-arrow-right-long ${css.arrow}`}></i>
                    <div className={css.shadow}></div>
                </button>
            </div>
        </div>
    );
}

export {SearchedProducts};
