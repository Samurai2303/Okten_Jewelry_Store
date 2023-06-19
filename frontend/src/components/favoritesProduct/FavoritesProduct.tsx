import {FC, useEffect, useState} from "react";
import css from './FavoritesProduct.module.css';
import {IProduct} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

interface IProps {
    product: IProduct
}

let FavoritesProduct: FC<IProps> = ({product}) => {

    let dispatch = useAppDispatch();
    let {loggedUser} = useAppSelector(state => state.userReducer);

    let [inFavorites, setInFavorites] = useState<boolean>(false);


    useEffect(() => {
        loggedUser?.favorites.find(value => value.id === product.id) ? setInFavorites(true) : setInFavorites(false);
    }, [loggedUser]);

    let click = async () => {
        if (inFavorites) {
            dispatch(userActions.deleteFromFavorites(product.id));
        } else {
            dispatch(userActions.addToFavorites(product.id));
        }
    };

    return (
        <div className={css.wrap} onClick={() => click()}>
            {inFavorites ?
                <i className={`fa-solid fa-heart ${css.icon}`}></i> :
                <i className={`fa-regular fa-heart ${css.icon}`}></i>
            }
        </div>
    );
}

export {FavoritesProduct};
