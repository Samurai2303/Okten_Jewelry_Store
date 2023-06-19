import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces";

interface IState{
    basketProducts:IProduct[]
}

let initialState: IState = {
    basketProducts: [],

};

let orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers:builder => builder

})