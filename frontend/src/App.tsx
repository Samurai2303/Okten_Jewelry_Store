import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {AdminLayout, MainLayout, SuperAdminLayout, UserLayout} from "./layouts";
import {
    AdminHomePage,
    BasketPage,
    EditProfilePage, FavoritesPage,
    LogInPage,
    NotFoundPage, OrderPage, OrdersActionsPage,
    OrdersHistoryPage, PlaceAnOrderPage, ProductPage, ProductsActionsPage,
    ProfilePage,
    SignUpPage, UserActionsPage,
    UserHomePage
} from "./pages";
import {GeneralProducts, SearchedProducts} from "./components";
import {IsLoggedUser} from "./hoc";

let App: FC = () => {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>

                    <Route index element={<Navigate to={'/userLayout'}/>}/>

                    <Route path={'/userLayout'} element={<UserLayout/>}>
                        <Route index element={<Navigate to={'home'}/>}/>

                        <Route path={'home'} element={<UserHomePage/>}>
                            <Route index element={<Navigate to={'general'}/>}/>
                            <Route path={'general'} element={<GeneralProducts/>}/>
                            <Route path={'search'} element={<SearchedProducts/>}/>
                            <Route path={'product/:id'} element={<ProductPage/>}/>
                        </Route>
                        <Route path={'logIn'} element={<LogInPage/>}/>
                        <Route path={'signUp'} element={<SignUpPage/>}/>


                        {/*Private Route*/}
                        <Route path={'profile'} element={
                            <IsLoggedUser>
                                <ProfilePage/>
                            </IsLoggedUser>
                        }/>
                        <Route path={'editProfile'} element={
                            <IsLoggedUser>
                                <EditProfilePage/>
                            </IsLoggedUser>
                        }/>
                        <Route path={'ordersHistory'} element={
                            <IsLoggedUser>
                                <OrdersHistoryPage/>
                            </IsLoggedUser>
                        }>
                            <Route path={':id'} element={
                                <IsLoggedUser>
                                    <OrderPage forAdmin={false}/>
                                </IsLoggedUser>
                            }/>
                        </Route>
                        <Route path={'favorites'} element={
                            <IsLoggedUser>
                                <FavoritesPage/>
                            </IsLoggedUser>
                        }/>
                        <Route path={'basket'} element={
                            <IsLoggedUser>
                                <BasketPage/>
                            </IsLoggedUser>
                        }>
                            <Route path={'buy'} element={
                                <IsLoggedUser>
                                    <PlaceAnOrderPage/>
                                </IsLoggedUser>
                            }/>
                        </Route>

                    </Route>

                    <Route path={'/adminLayout'} element={<AdminLayout/>}>
                        <Route index element={<Navigate to={'home'}/>}/>

                        <Route path={'home'} element={<AdminHomePage/>}/>
                        <Route path={'ordersActions'} element={<OrdersActionsPage/>}>
                            <Route path={':id'} element={<OrderPage forAdmin={true}/>}/>
                        </Route>
                        <Route path={'productsActions'} element={<ProductsActionsPage/>}/>
                        <Route path={'usersActions'} element={<UserActionsPage/>}/>

                    </Route>

                    <Route path={'/superAdminLayout'} element={<SuperAdminLayout/>}>
                        <Route index element={<Navigate to={'home'}/>}/>

                    </Route>

                    <Route path={'*'} element={<NotFoundPage/>}/>

                </Route>
            </Routes>

        </div>
    );
}

export {App};
