import {FC} from "react";
import {Footer, Header} from "../../components";
import {Outlet} from "react-router-dom";

let MainLayout: FC = () => {

    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export {MainLayout};
