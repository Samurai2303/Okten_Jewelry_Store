import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

let ServiceComponent: FC = () => {

    let dispatch = useAppDispatch();
    let {loggedUser} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (!loggedUser) {
            let user = localStorage.getItem('loggedUser');
            if (user) {
                user = JSON.parse(user);
            }
            // @ts-ignore
            dispatch(userActions.setLoggedUser(user));
        }
    }, []);

    return (
        <div>

        </div>
    );
}

export {ServiceComponent};
