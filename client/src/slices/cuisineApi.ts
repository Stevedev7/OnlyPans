import { apiSlice } from './api'

const CUISINE_URL = '/api/cuisines'

export const useCuisineApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allCuisine: builder.query({
            query: () => ({
                url: `${CUISINE_URL}/all`,
                method: 'GET'
            })
        }),
        getCuisine: builder.query({
            query: (id) => ({
                url: `${CUISINE_URL}/${id}`,
                method: 'GET'
            })
        }),
    })
})

export const { useLazyAllCuisineQuery, useGetCuisineQuery } = useCuisineApi;