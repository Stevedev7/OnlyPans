import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { apiSlice } from "./slices/api";
import imageReducer from "./slices/images";
import shoppingListReducer from './slices/shoppingList'
const store = configureStore({
    reducer: {
        auth: authReducer,
        images: imageReducer,
        shoppingList: shoppingListReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true 
});
export type RootState = ReturnType<typeof store.getState>
export default store