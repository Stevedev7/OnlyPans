import { apiSlice } from './api'

const ALLERGEN_API = '/api/allergens'

export const allergenApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allAllergen: builder.query({
            query: () => ({
                url: `${ALLERGEN_API}/all`,
            })
        }),
        searchAllergen: builder.query({
            query: (search) => ({
                url: `${ALLERGEN_API}/search?q=${search}`,
            })
        })
    })
})

export const { useLazyAllAllergenQuery, useLazySearchAllergenQuery } = allergenApiSlice;