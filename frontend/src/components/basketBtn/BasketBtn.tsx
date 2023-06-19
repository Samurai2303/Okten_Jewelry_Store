import {FC} from "react";
import css from './BasketBtn.module.css';
import {useNavigate} from "react-router-dom";

let BasketBtn: FC = () => {

    let navigate = useNavigate();

    return (
        <div>
            <i className={`fa-solid fa-cart-shopping ${css.icon}`} onClick={() => navigate('/userLayout/basket')}></i>
        </div>
    );
}

export {BasketBtn};
