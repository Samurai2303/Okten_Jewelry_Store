import {FC} from "react";
import css from './SignUpPage.module.css';
import {SignUpWindow} from "../../components";

let SignUpPage:FC = () => {

    return (
        <div className={css.wrap}>
            <SignUpWindow/>

        </div>
    );
}

export {SignUpPage};
