import {FC} from "react";
import {LogInWindow} from "../../components";
import css from './LogInPage.module.css';

let LogInPage:FC = () => {

    return (
        <div className={css.wrap}>
            <LogInWindow/>
        </div>
    );
}

export {LogInPage};
