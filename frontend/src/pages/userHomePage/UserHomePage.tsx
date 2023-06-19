import {FC} from "react";
import {Filters} from "../../components";
import {Outlet} from "react-router-dom";
import css from './UserHomePage.module.css';

let UserHomePage:FC = () => {

    return (
        <div className={css.wrap}>
            <Filters/>
            <Outlet/>
        </div>
    );
}

export {UserHomePage};
