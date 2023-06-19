import {FC} from "react";
import {Outlet} from "react-router-dom";
import {AdminOppBtn, UserOppBtn} from "../../components";

let SuperAdminLayout: FC = () => {

    return (
        <div>
            <Outlet/>

            <UserOppBtn/>
            <AdminOppBtn/>
        </div>
    );
}

export {SuperAdminLayout};
