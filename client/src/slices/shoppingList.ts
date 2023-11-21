import { createSlice } from "@reduxjs/toolkit";

const shoppingListSlice = createSlice({
    name: "shoppingList" as string,
    initialState: {
        list: []
    },
    reducers: {
        setShoppingList: (state, action) => {
            state.list = [...action.payload]
        }
    }
})

export const { setShoppingList } = shoppingListSlice.actions
export default shoppingListSlice.reducer