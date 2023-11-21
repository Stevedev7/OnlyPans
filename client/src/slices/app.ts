import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app" as string,
    initialState: {
        isLoading: true
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = <boolean>action.payload
        },
    }

})

export const { setIsLoading } = appSlice.actions

export default appSlice.reducer