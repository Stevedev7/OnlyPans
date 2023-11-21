import { apiSlice } from './api'

const FAVORITES_URL = '/api/users/favorites'

export const favoritesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        isFavorites: builder.query ({
            query: (payload) => ({
                url: `${FAVORITES_URL}/${payload.id}`,
                headers: {
                    'Authorization': `Bearer ${payload.token}`
                }
            })
        }),
        addToFavorites: builder.mutation ({
            query: (payload) => ({
                url: `${FAVORITES_URL}/add`,
                body: {
                    id: Number(payload.id)
                },
                headers: {
                    'Authorization': `Bearer ${payload.token}`
                },
                method: 'POST'
            })
        }),
        removeFromFavorites: builder.mutation ({
            query: (payload) => ({
                url: `${FAVORITES_URL}/remove`,
                body: {
                    id: Number(payload.id)
                },
                headers: {
                    'Authorization': `Bearer ${payload.token}`
                },
                method: 'POST'
            })
        }),
        getFavorites: builder.query ({
            query: (payload) => ({
                url: `${FAVORITES_URL}?page=${payload.page}&limit=${payload.limit}`,
                headers: {
                    'Authorization': `Bearer ${payload.token}`
                },
            })
        })
    })
})

export const { 
    useIsFavoritesQuery,
    useLazyIsFavoritesQuery,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation,
    useLazyGetFavoritesQuery
} = favoritesApiSlice;