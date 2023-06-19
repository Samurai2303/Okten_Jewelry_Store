import {useAppLocations} from "../../hooks";
import {Navigate} from "react-router-dom";

let IsLoggedUser:({children}: { children: any }) => (JSX.Element) = ({children}) => {

    let locations = useAppLocations();
    // let {loggedUser} = useAppSelector(state => state.userReducer);

    let loggedUser: string|null = localStorage.getItem('loggedUser');

    if (!loggedUser) {
        return (<Navigate to={'/userLayout/logIn'} state={locations}/>)
    }

    return children;
}

export {IsLoggedUser};
