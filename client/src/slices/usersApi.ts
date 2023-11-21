import { apiSlice } from './api'

const USERS_URL = '/api/users'

interface IAuth {
    email: string;
    password: string
}

interface IRegister extends IAuth{
    firstName: string;
    lastName: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: IAuth) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data: IRegister) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            })
        }),
        profile: builder.query({
            query: (id: number) => ({
                url: `${USERS_URL}/${id}/profile`,
                method: 'GET'
            })
        }),
        verify: builder.query({
            query: (token: string | null) => ({
                url: `${USERS_URL}/verify`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token || ""}`},
            })
        }),
        userRecipes: builder.query({
            query: (body) => ({
                url: `${USERS_URL}/${body.id}/recipes`
            })
        })
    })
})

export const { 
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
    useLazyVerifyQuery,
    useVerifyQuery,
    useLazyUserRecipesQuery
} = usersApiSlice;