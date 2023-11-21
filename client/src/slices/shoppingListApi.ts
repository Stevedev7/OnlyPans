import { apiSlice } from './api'

const SHOPPING_LIST_URL = '/api/users/shoppingList'

export const shoppingListApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShoppingList: builder.query({
            query: (token) => ({
                url: SHOPPING_LIST_URL,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
        }),
        addIngredientToList: builder.mutation({
            query: (body) => ({
                url: `${SHOPPING_LIST_URL}/add`,
                headers: {
                    'Authorization': `Bearer ${body.token}`
                },
                body,
                method: 'POST'
            })
        }),
        removeIngredientFromList: builder.mutation({
            query: ({token, id}) => ({
                url: `${SHOPPING_LIST_URL}/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearern ${token}`
                }
            })
        })
    })
})

export const { 
    useLazyGetShoppingListQuery,
    useAddIngredientToListMutation,
    useRemoveIngredientFromListMutation,
    useGetShoppingListQuery
} = shoppingListApiSlice;