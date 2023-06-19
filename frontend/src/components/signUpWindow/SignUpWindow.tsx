import {FC} from "react";
import css from './SignUpWindow.module.css';
import {UserForm} from "../userForm/UserForm";

let SignUpWindow:FC = () => {

    return (
        <div className={css.wrap}>
            <div className={css.title}>Sign Up</div>
            <UserForm userData={null}/>
        </div>
    );
}

export {SignUpWindow};
