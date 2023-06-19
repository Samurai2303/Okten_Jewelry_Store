import {FC, useEffect} from "react";
import css from './ProfilePage.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {ProfileWindow} from "../../components";

let ProfilePage: FC = () => {

    let dispatch = useAppDispatch();
    let {loggedUser, loggedUserLoading, loggedUserError} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(userActions.getLoggedUser());
    }, []);

    return (
        <div className={css.wrap}>
            <ProfileWindow loggedUser={loggedUser} loggedUserLoading={loggedUserLoading}
                           loggedUserError={loggedUserError}/>
        </div>
    );
}

export {ProfilePage};
