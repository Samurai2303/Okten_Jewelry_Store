import {FC} from "react";
import css from './UserBtn.module.css';
import {useNavigate} from "react-router-dom";

let UserBtn: FC = () => {

    let navigate = useNavigate();

    return (
        <div>
            <i className={`fa-solid fa-user ${css.icon}`} onClick={() => navigate('/userLayout/profile')}></i>
        </div>
    );
}

export {UserBtn};
