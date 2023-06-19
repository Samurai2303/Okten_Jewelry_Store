import {FC} from "react";
import {UserBtn} from "../userBtn/UserBtn";
import {BasketBtn} from "../basketBtn/BasketBtn";
import {FavoritesBtn} from "../favoritesBtn/FavoritesBtn";
import css from './Header.module.css';
import {useNavigate} from "react-router-dom";
import {LogInSignUp} from "../logInSignUp/LogInSignUp";
import {useAppSelector} from "../../hooks";
import {ServiceComponent} from "../serviceComponent/ServiceComponent";

let Header: FC = () => {

    let navigate = useNavigate();

    let {loggedUser} = useAppSelector(state => state.userReducer);

    return (
        <div>
            <div className={css.wrap}>
                <div className={css.title} onClick={() => navigate('/userLayout')}>Jewelry Store</div>

                {loggedUser ?
                    <div className={css.toolsWrap}>
                        <UserBtn/>
                        <FavoritesBtn/>
                        <BasketBtn/>
                    </div> :
                    <LogInSignUp/>
                }
            </div>
            <ServiceComponent/>
        </div>
    );
}

export {Header};
