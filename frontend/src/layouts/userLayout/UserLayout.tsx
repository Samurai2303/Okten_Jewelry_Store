import {FC} from "react";
import {Outlet} from "react-router-dom";
import {AdminOppBtn, SuperAdminOppBtn} from "../../components";

let UserLayout: FC = () => {

    return (
        <div>
            <Outlet/>

            {/*if user is admin*/}
            <AdminOppBtn/>
            <SuperAdminOppBtn/>
        </div>
    );
}

export {UserLayout};
