import {FC} from "react";
import css from './FavoritesBtn.module.css';
import {useNavigate} from "react-router-dom";

let FavoritesBtn: FC = () => {

    let navigate = useNavigate();

    return (
        <div>
            <i className={`fa-sharp fa-solid fa-heart ${css.icon}`}
               onClick={() => navigate('/userLayout/favorites')}></i>
        </div>
    );
}

export {FavoritesBtn};
