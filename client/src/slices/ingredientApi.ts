import { apiSlice } from './api'

const INGREDIENTS_URL = '/api/ingredients'

export const ingredientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allIngredients: builder.mutation({
            query: () => ({
                url: `${INGREDIENTS_URL}/`,
                method: 'GET'
            })
        }),
        searchIngredients: builder.query({
            query: (search) => ({
                url: `${INGREDIENTS_URL}/search?q=${search}`
            })
        })
    })
})

export const { useAllIngredientsMutation, useLazySearchIngredientsQuery } = ingredientsApiSlice;