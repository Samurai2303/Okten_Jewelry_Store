import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer, productReducer} from "./slices";

let rootReducer = combineReducers({
    userReducer,
    productReducer
});

let setupStore = () => configureStore({reducer: rootReducer});

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type{
    RootState,
    AppStore,
    AppDispatch
};

export {setupStore};