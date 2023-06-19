import React, {FC} from "react";
import css from './ProductCard.module.css';
import {IProduct} from "../../interfaces";
import {FavoritesProduct} from "../favoritesProduct/FavoritesProduct";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";

interface IProps {
    product: IProduct;
}

let ProductCard: FC<IProps> = ({product}) => {

    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let {loggedUser} = useAppSelector(state => state.userReducer);

    let price: number = Math.round(product.price * (100 - product.discounts) / 100);

    let product_details = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        let box_coords = e.currentTarget.children[5].children[0].getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (clientX > box_coords.x && clientX < box_coords.x + box_coords.width && clientY > box_coords.y && clientY < box_coords.y + box_coords.height) {

            if (loggedUser) {


            } else {
                navigate('/userLayout/logIn')
            }

        } else {

            let recently_viewed: string | null = localStorage.getItem('recently_viewed');
            if (recently_viewed) {
                let recently_view = JSON.parse(recently_viewed) as IProduct[];
                if (recently_view.length >= 6) {
                    if (recently_view.some((value) => value.id === product.id)) {
                        recently_view = recently_view.filter((value) => value.id !== product.id);
                        recently_view.unshift(product);
                    } else {
                        recently_view.unshift(product);
                        recently_view.pop();
                    }
                } else {
                    if (recently_view.some((value) => value.id === product.id)) {
                        recently_view = recently_view.filter((value) => value.id !== product.id);
                        recently_view.unshift(product);
                    } else {
                        recently_view.unshift(product);
                    }
                }
                recently_viewed = JSON.stringify(recently_view);
            } else {
                recently_viewed = JSON.stringify([product]);
            }
            localStorage.setItem('recently_viewed', recently_viewed);

            dispatch(productActions.setCurrentProduct(product));
            navigate(`/userLayout/home/product/${product.id}`, {state: {...product}});
        }
    };

    return (
        <div>
            <div className={css.wrap} onClick={(e) => product_details(e)}>
                <div className={css.id}>Id: {product.id}</div>
                {product.photos.length > 0 ?
                    <div className={css.photo_wrap}>
                        <img className={css.img} src={`http://localhost/api${product.photos[0].photo}`}
                             alt="Product Photo"/>
                    </div> : <div className={css.no_photo}>no photo</div>}
                <div className={css.text}>{product.producer} - {product.category}</div>
                <div className={css.text}>{product.material}</div>
                {product.discounts === 0 ?
                    <div className={css.price}>{product.price} UAH</div> :
                    <div>
                        <div className={css.discounts_wrap}>
                            <div className={css.old_price}>{product.price}</div>
                            <div className={css.discounts}>-{product.discounts}%</div>
                        </div>
                        <div className={css.new_price}>{price} UAH</div>
                    </div>
                }
                <div className={css.buy_wrap}>
                    {product.amount > 0 ?
                        <div className={css.buy}>Buy</div> :
                        <div></div>
                    }
                    {product.amount <= 0 ?
                        <div className={css.not_available}>Not Available</div> :
                        <div></div>
                    }
                </div>
            </div>
            <div className={css.favorites}>
                <FavoritesProduct product={product}/>
            </div>

        </div>
    );
}

export {ProductCard};
