import {FC} from "react";
import {Loading} from "../loading/Loading";
import {SmthWrong} from "../smthWrong/SmthWrong";
import {IUser} from "../../interfaces";
import css from './ProfileWindow.module.css';
import {useNavigate} from "react-router-dom";

interface IProps {
    loggedUser: IUser | null;
    loggedUserLoading: boolean;
    loggedUserError: boolean;
}

let ProfileWindow: FC<IProps> = ({loggedUser, loggedUserLoading, loggedUserError}) => {

    let navigate = useNavigate();

    return (
        <div className={css.wrap}>
            <div className={css.title}>Your Profile</div>
            {loggedUserLoading && <Loading/>}
            {loggedUserError && <SmthWrong/>}
            {loggedUser && <div className={css.info_wrap}>
                <div className={css.img_wrap}>
                    <img
                        src={loggedUser.profile.photo ? `http://localhost/api${loggedUser.profile.photo}` : 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'}
                        alt="user_photo" className={css.img}/>
                </div>
                <div>
                    <div className={css.text}>Id: {loggedUser.id}</div>
                    <div className={css.text}>Email: {loggedUser.email}</div>
                    <div className={css.text}>Name: {loggedUser.profile.name}</div>
                    <div className={css.text}>Surname: {loggedUser.profile.surname}</div>
                    <div className={css.text}>Age: {loggedUser.profile.age}</div>
                    <div className={css.text}>Phone: {loggedUser.profile.phone}</div>
                    <div className={css.text}>Administrator: {loggedUser.is_staff ? 'Yes' : 'No'}</div>
                </div>
            </div>}

            <div className={css.btnsWrap}>
                <button className={css.btn} onClick={() => navigate('/userLayout/editProfile')}>Edit Profile</button>
                <button className={css.btn} onClick={() => navigate('/userLayout/ordersHistory')}>Orders History</button>
            </div>
        </div>
    );
}

export {ProfileWindow};
