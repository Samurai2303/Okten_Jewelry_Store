import {FC, useEffect} from "react";
import css from './FavoritesPage.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {Loading, ProductCard, SmthWrong} from "../../components";
import {useNavigate} from "react-router-dom";

let FavoritesPage: FC = () => {

    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let {loggedUser, loggedUserLoading, loggedUserError} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(userActions.getLoggedUser());
    }, []);

    return (
        <div className={css.wrap}>
            <div className={css.title}>Your Favorite Products</div>
            {loggedUserLoading && <Loading/>}
            {loggedUserError && <SmthWrong/>}
            {loggedUser?.favorites.length ?
                <div className={css.products_wrap}>
                    {loggedUser.favorites.map((value) => <ProductCard product={value}/>)}
                </div> :
                <div className={css.no_products}>No Products...</div>
            }
            <div className={css.btns_wrap}>
                <button className={css.btn} onClick={() => navigate('/userLayout/profile')}>Profile</button>
                <button className={css.btn} onClick={() => navigate('/userLayout/basket')}>Basket</button>
            </div>
        </div>
    );
}

export {FavoritesPage};
