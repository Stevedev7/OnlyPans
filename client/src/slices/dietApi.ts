import { apiSlice } from './api'

const DIET_URL = '/api/diets'

export const dietApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allDiet: builder.query({
            query: () => ({
                url: `${DIET_URL}/all`,
            })
        }),
        getDiet: builder.query({
            query: (id) => ({
                url: `${DIET_URL}/${id}`,
            })
        })
    })
})

export const { useLazyAllDietQuery, useGetDietQuery } = dietApiSlice;