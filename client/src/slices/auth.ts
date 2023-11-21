import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "token" as string,
    initialState: {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        userName: null as string | null,
        userId: null as number | null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = <string> action.payload
            localStorage.setItem("token", <string>action.payload)
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = <boolean>action.payload
        },
        removeToken: (state) => {
            state.token = null;
            localStorage.removeItem("token")
        },
        setUserName: (state, action) => {
            state.userName = action.payload as string
        },
        removeUserName: (state) => {
            state.userName = null;
        },
        setUserId: (state, action) => {
            state.userId = action.payload as number
        },
        removeUserId: (state) => {
            state.userId = null;
        }
    }

})

export const { setToken, removeToken, setAuthenticated, setUserName, removeUserName, setUserId, removeUserId } = authSlice.actions

export default authSlice.reducer