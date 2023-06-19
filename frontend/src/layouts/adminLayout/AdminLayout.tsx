import {FC} from "react";
import {Outlet} from "react-router-dom";
import {SuperAdminOppBtn, UserOppBtn} from "../../components";

let AdminLayout: FC = () => {

    return (
        <div>
            <Outlet/>

            <UserOppBtn/>
            <SuperAdminOppBtn/>
        </div>
    );
}

export {AdminLayout};
