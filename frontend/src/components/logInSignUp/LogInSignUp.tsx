import {FC} from "react";
import css from './LogInSignUp.module.css';
import {useNavigate} from "react-router-dom";

let LogInSignUp:FC = () => {

    let navigate = useNavigate();

    return (
        <div className={css.wrap}>
            <div className={css.btn} onClick={() => navigate('/userLayout/logIn')}>Log In</div>
            <div className={css.btn} onClick={() => navigate('/userLayout/signUp')}>Sign Up</div>
        </div>
    );
}

export {LogInSignUp};
