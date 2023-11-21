import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
    name: "images" as string,
    initialState: {
        imageUrls: []
    },
    reducers: {
        setImageUrls: (state, action) => {
            state.imageUrls= [ ...state.imageUrls, ...action.payload ]
        },
        resetImages: (state) => {
            state.imageUrls = []
        }
    }
})

export const { setImageUrls, resetImages } = imagesSlice.actions

export default imagesSlice.reducer