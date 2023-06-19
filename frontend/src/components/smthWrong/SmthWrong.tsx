import {FC} from "react";
import css from './SmthWrong.module.css';

let SmthWrong:FC = () => {
    
    return (
        <div className={css.wrap}>
            Ooops... Something went wrong
        </div>
    );
}

export {SmthWrong};
