import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces";
import {usersService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    users: IUser[];
    currentUser: IUser | null;
    currentUserLoading: boolean;
    currentUserError: boolean;
    loggedUser: IUser | null;
    loggedUserLoading: boolean;
    loggedUserError: boolean;

}

let initialState: IState = {
    users: [],
    currentUser: null,
    currentUserLoading: false,
    currentUserError: false,
    loggedUser: null,
    loggedUserLoading: false,
    loggedUserError: false

};

let getLoggedUser = createAsyncThunk<IUser, void>(
    'userSlice/getLoggedUser',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            let {data} = await usersService.getLogged()
            dispatch(userActions.setLoggedUserInStorage(data));
            return data;
        } catch (e) {
            let error = e as AxiosError;
            dispatch(userActions.deleteLoggedUserFromStorage());
            return rejectWithValue(error.response?.data);
        }
    });

let addToFavorites = createAsyncThunk<IUser, number>(
    'userSlice/addToFavorites',
    async (id, {rejectWithValue}) => {
        try {
            let {data} = await usersService.addToFavorites(id);
            return data;
        } catch (e) {
            let err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    });

let deleteFromFavorites = createAsyncThunk<IUser, number>(
    'userSlice/deleteFromFavorites',
    async (id, {rejectWithValue}) => {
        try {
            let {data} = await usersService.deleteFromFavorites(id);
            return data;
        } catch (e) {
            let err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    });

let userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setLoggedUserInStorage: (state, action: PayloadAction<IUser>) => {
            localStorage.setItem('loggedUser', JSON.stringify(action.payload));
        },
        deleteLoggedUserFromStorage: () => {
            localStorage.removeItem('loggedUser');
        },
        setLoggedUser: (state, action: PayloadAction<IUser | null>) => {
            state.loggedUser = action.payload;
            state.loggedUserLoading = false;
        },

    },
    extraReducers: builder =>
        builder
            .addCase(getLoggedUser.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.loggedUserLoading = false;
                state.loggedUserError = false;
            })
            .addCase(getLoggedUser.pending, (state) => {
                state.loggedUserLoading = true;
            })
            .addCase(getLoggedUser.rejected, (state) => {
                state.loggedUserError = true;
                state.loggedUserLoading = false;
                state.loggedUser = null;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.loggedUserLoading = false;
                state.loggedUserError = false;
            })
            .addCase(addToFavorites.pending, (state) => {
                state.loggedUserLoading = true;
            })
            .addCase(addToFavorites.rejected, (state) => {
                state.loggedUserError = true;
                state.loggedUserLoading = false;
                state.loggedUser = null;
            })
            .addCase(deleteFromFavorites.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.loggedUserLoading = false;
                state.loggedUserError = false;
            })
            .addCase(deleteFromFavorites.pending, (state) => {
                state.loggedUserLoading = true;
            })
            .addCase(deleteFromFavorites.rejected, (state) => {
                state.loggedUserError = true;
                state.loggedUserLoading = false;
                state.loggedUser = null;
            })

});

let {reducer: userReducer, actions: {setLoggedUserInStorage, deleteLoggedUserFromStorage, setLoggedUser}} = userSlice;

let userActions = {
    getLoggedUser,
    setLoggedUserInStorage,
    deleteLoggedUserFromStorage,
    setLoggedUser,
    addToFavorites,
    deleteFromFavorites,

};

export {userReducer, userActions};