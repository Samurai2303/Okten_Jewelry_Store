import {FC} from "react";
import {IUser} from "../../interfaces";
import {UserForm} from "../userForm/UserForm";
import css from './EditProfileWindow.module.css';
import {useNavigate} from "react-router-dom";

interface IProps {
    user: IUser
}

let EditProfileWindow: FC<IProps> = ({user}) => {

    let navigate = useNavigate();

    return (
        <div className={css.wrap}>
            <div className={css.go_back_wrap} onClick={() => navigate('/userLayout/profile')}>
                <i className={`fa-solid fa-angles-left ${css.arrow}`}></i>
                <div className={css.back_text}>go back</div>
            </div>
            <div className={css.title}>Edit Profile</div>
            <UserForm userData={user}/>
        </div>
    );
}

export {EditProfileWindow};
