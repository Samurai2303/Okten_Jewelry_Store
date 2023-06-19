import React, {FC, useEffect, useState} from "react";
import css from './ProductPage.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useParams} from "react-router-dom";
import {productActions} from "../../redux";
import {Loading, SmthWrong} from "../../components";

let ProductPage: FC = () => {

    let {id} = useParams();
    let dispatch = useAppDispatch();
    let {currentProduct, currentProductLoading, currentProductError} = useAppSelector(state => state.productReducer);

    let [photoIndex, setPhotoIndex] = useState<number>(0);
    let [photoUrl, setPhotoUrl] = useState<string>('https://fundatia.moldcell.md/wp-content/themes/consultix/images/no-image-found-360x250.png');
    let [showLength, setShowLength] = useState<boolean>(false);

    let [price, setPrice] = useState<number>(0);

    useEffect(() => {
        if (!currentProduct) {
            dispatch(productActions.getCurrentProduct(Number(id)));
        } else {
            if (currentProduct.photos.length) {
                setPhotoUrl(`http://localhost/api${currentProduct.photos[photoIndex].photo}`);
            }
            if (currentProduct.category === 'Bracelets' || currentProduct.category === 'Chains' || currentProduct.category === 'Necklaces') {
                setShowLength(true);
            } else {
                setShowLength(false);
            }
            setPrice(Math.round(currentProduct.price * (100 - currentProduct.discounts) / 100))
        }
    }, [currentProduct]);

    let photo_click = (rl: string) => {
        if (currentProduct?.photos.length) {
            if (rl === 'r') {
                if (currentProduct.photos.length - 1 > photoIndex) {
                    setPhotoIndex(++photoIndex);
                    setPhotoUrl(`http://localhost/api${currentProduct.photos[photoIndex].photo}`);
                }
            } else if (rl === 'l') {
                if (photoIndex > 0) {
                    setPhotoIndex(--photoIndex);
                    setPhotoUrl(`http://localhost/api${currentProduct.photos[photoIndex].photo}`)
                }
            }
        }
    };

    return (
        <div>
            {currentProductLoading && <Loading/>}
            {currentProductError && <SmthWrong/>}
            {currentProduct &&
                <div className={css.wrap}>
                    <div className={css.photos_wrap}>
                        <button onClick={() => photo_click('l')}
                                disabled={currentProduct ? photoIndex < 1 : true}
                                className={`${css.btn_wrap} ${css.l}`}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className={css.img_wrap}>
                            <img className={css.img} src={photoUrl} alt="product_photo"/>
                        </div>
                        <button onClick={() => photo_click('r')}
                                disabled={currentProduct ? currentProduct.photos.length - 1 <= photoIndex : true}
                                className={`${css.btn_wrap} ${css.r}`}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className={css.info_wrap}>
                        <div className={css.text}>Id: {currentProduct.id}</div>
                        <div className={css.text}>Category: {currentProduct.category}</div>
                        <div className={css.text}>Producer: {currentProduct.producer}</div>
                        <div className={css.text}>Material: {currentProduct.material}</div>
                        {currentProduct.category === 'Rings' &&
                            <div className={css.text}>Size: {currentProduct.length}</div>}
                        {currentProduct.category === 'Earrings' &&
                            <div className={css.text}>Clasp: {currentProduct.clasp}</div>}
                        {showLength && <div className={css.text}>Length: {currentProduct.length}</div>}
                        <div className={css.text}>Amount
                            Left: {currentProduct.amount > 0 ? currentProduct.amount : 0}</div>
                        <div className={css.price_wrap}>
                            <div className={css.text_price}>Price:</div>
                            {currentProduct.discounts <= 0 ?
                                <div className={css.price}>{currentProduct.price} UAH</div> :
                                <div>
                                    <div className={css.discounts_wrap}>
                                        <div className={css.old_price}>{currentProduct.price}</div>
                                        <div className={css.discounts}>-{currentProduct.discounts}%</div>
                                    </div>
                                    <div className={css.new_price}>{price} UAH</div>
                                </div>
                            }
                        </div>
                        {currentProduct.amount > 0 ?
                            <div className={css.buy}>Buy</div> :
                            <div className={css.not_available}>Not Available</div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export {ProductPage};
