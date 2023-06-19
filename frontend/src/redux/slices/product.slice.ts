import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPaginatedData, IProduct} from "../../interfaces";
import {productsService} from "../../services";
import {AxiosError} from "axios";

let emptyPaginatedData: IPaginatedData<IProduct[]> = {
    data: [],
    next: null,
    previous: null,
    total_items: 0,
    total_pages: 0
};

interface IState {
    bestSellers: IProduct[];
    bestSellersLoading: boolean;
    bestSellersError: boolean;
    discounts: IProduct[];
    discountsLoading: boolean;
    discountsError: boolean;
    addedRecently: IProduct[];
    addedRecentlyLoading: boolean;
    addedRecentlyError: boolean;
    recentlyViewed: IProduct[] | null;
    searchedProducts: IPaginatedData<IProduct[]>;
    searchedProductsLoading: boolean;
    searchedProductsError: boolean;
    currentProduct: IProduct | null;
    currentProductLoading: boolean;
    currentProductError: boolean;
}

let initialState: IState = {
    bestSellers: [],
    bestSellersLoading: false,
    bestSellersError: false,
    discounts: [],
    discountsLoading: false,
    discountsError: false,
    addedRecently: [],
    addedRecentlyLoading: false,
    addedRecentlyError: false,
    recentlyViewed: null,
    searchedProducts: emptyPaginatedData,
    searchedProductsLoading: false,
    searchedProductsError: false,
    currentProduct: null,
    currentProductLoading: false,
    currentProductError: false
};

let getBestSellers = createAsyncThunk<IProduct[], void>(
    'productSlice/getBestSellers',
    async (_, {rejectWithValue}) => {
        try {
            let {data} = await productsService.getBestSellers();
            return data.data;
        } catch (e) {
            let err = e as AxiosError
            return rejectWithValue(err.response?.data);
        }
    });

let getDiscounts = createAsyncThunk<IProduct[], void>(
    'productSlice/getDiscounts',
    async (_, {rejectWithValue}) => {
        try {
            let {data} = await productsService.getDiscounts();
            return data.data;
        } catch (e) {
            let err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

let getAddedRecently = createAsyncThunk<IProduct[], void>(
    'productSlice/getAddedRecently',
    async (_, {rejectWithValue}) => {
        try {
            let {data} = await productsService.getaddedRecntly();
            return data.data;
        } catch (e) {
            let err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

let getSearchedProducts = createAsyncThunk<IPaginatedData<IProduct[]>, { queryParams: string }>(
    'productSlice/getSearchedProducts',
    async ({queryParams}, {rejectWithValue}) => {
        try {
            let {data} = await productsService.getAll(queryParams);
            return data;
        } catch (e) {
            let err = e as AxiosError;
            return rejectWithValue(err.response?.data)
        }
    }
);

let getCurrentProduct = createAsyncThunk<IProduct, number>(
    'productSlice/getCurrentProduct',
    async (id, {rejectWithValue}) => {
        try {
            let {data} = await productsService.getById(id);
            return data;
        } catch (e) {
            let err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    });

let productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        getRecentlyViewed: (state) => {
            // @ts-ignore
            state.recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed'));
        },
        setCurrentProduct: (state, action: PayloadAction<IProduct>) => {
            state.currentProduct = action.payload;
            state.currentProductLoading = false;
            state.currentProductError = false;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getBestSellers.fulfilled, (state, action) => {
                state.bestSellers = action.payload;
                state.bestSellersLoading = false;
                state.bestSellersError = false;
            })
            .addCase(getBestSellers.pending, (state) => {
                state.bestSellersLoading = true;
            })
            .addCase(getBestSellers.rejected, (state) => {
                state.bestSellersError = true;
                state.bestSellersLoading = false;
            })
            .addCase(getDiscounts.fulfilled, (state, action) => {
                state.discounts = action.payload;
                state.discountsLoading = false;
                state.discountsError = false;
            })
            .addCase(getDiscounts.pending, (state) => {
                state.discountsLoading = true;
            })
            .addCase(getDiscounts.rejected, (state) => {
                state.discountsLoading = false;
                state.discountsError = true;
            })
            .addCase(getAddedRecently.fulfilled, (state, action) => {
                state.addedRecently = action.payload;
                state.addedRecentlyLoading = false;
                state.addedRecentlyError = false;
            })
            .addCase(getAddedRecently.pending, (state) => {
                state.addedRecentlyLoading = true;
            })
            .addCase(getAddedRecently.rejected, (state) => {
                state.addedRecentlyError = true;
                state.addedRecentlyLoading = false;
            })
            .addCase(getSearchedProducts.fulfilled, (state, action) => {
                state.searchedProducts = action.payload;
                state.searchedProductsLoading = false;
                state.searchedProductsError = false;
            })
            .addCase(getSearchedProducts.pending, (state) => {
                state.searchedProductsLoading = true;
            })
            .addCase(getSearchedProducts.rejected, (state) => {
                state.searchedProductsLoading = false;
                state.searchedProductsError = true;
            })
            .addCase(getCurrentProduct.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
                state.currentProductLoading = false;
                state.currentProductError = false;
            })
            .addCase(getCurrentProduct.pending, (state) => {
                state.currentProductLoading = true;
            })
            .addCase(getCurrentProduct.rejected, (state, action) => {
                state.currentProduct = null;
                state.currentProductLoading = false;
                state.currentProductError = true;
            })
});

let {reducer: productReducer, actions: {getRecentlyViewed, setCurrentProduct}} = productSlice;

let productActions = {
    getBestSellers,
    getDiscounts,
    getRecentlyViewed,
    getAddedRecently,
    getSearchedProducts,
    getCurrentProduct,
    setCurrentProduct,

};

export {productReducer, productActions};
