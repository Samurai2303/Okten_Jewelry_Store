import {FC} from "react";
import css from './Loading.module.css';

let Loading:FC = () => {

    return (
        <div className={css.wrap}>
            <div className={`${css.dot} ${css.dot1}`}></div>
            <div className={`${css.dot} ${css.dot2}`}></div>
            <div className={`${css.dot} ${css.dot3}`}></div>
            <div className={`${css.dot} ${css.dot4}`}></div>
            <div className={`${css.dot} ${css.dot5}`}></div>
            <div className={`${css.dot} ${css.dot6}`}></div>
            <div className={`${css.dot} ${css.dot7}`}></div>
        </div>
    );
}

export {Loading};
