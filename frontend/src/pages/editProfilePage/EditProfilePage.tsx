import {FC} from "react";
import {EditProfileWindow, SmthWrong} from "../../components";
import {useAppSelector} from "../../hooks";
import css from './EditProfilePage.module.css';

let EditProfilePage: FC = () => {

    let {loggedUser} = useAppSelector(state => state.userReducer);

    return (
        <div className={css.wrap}>
            {loggedUser ?
                <EditProfileWindow user={loggedUser}/> :
                <SmthWrong/>
            }
        </div>
    );
}

export {EditProfilePage};
