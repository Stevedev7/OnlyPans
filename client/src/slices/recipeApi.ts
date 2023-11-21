import { apiSlice } from './api'

const RECIPE_URL = '/api/recipes'

export const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allRecipe: builder.query({
            query: ({page, limit, searchValue, filters}) => ({
                url: `${RECIPE_URL}?page=${page}&limit=${limit}&searchValue=${searchValue}&${filters}`,
            })
        }),
        addRecipe: builder.mutation({
            query: (body) => ({
                url: `${RECIPE_URL}/new`,
                method: 'POST',
                headers: {'Authorization': 'Bearer '+body.token},
                body
            })
        }),
        deleteRecipe: builder.mutation({
            query: (body) => ({
                url: `${RECIPE_URL}/${body.id}/`,
                method: 'DELETE',
                headers: {'Authorization': 'Bearer '+body.token}
            })
        }),
        addReview: builder.mutation({
            query: (body) => ({
                url: `${RECIPE_URL}/${body.id}/reviews/new`,
                method: 'POST',
                headers: {'Authorization': 'Bearer '+body.token},
                body
            })
        }),
        deleteReview: builder.mutation({
            query: (payload) => ({
                url: `${RECIPE_URL}/${payload.id}/reviews/${payload.reviewId}`,
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${payload.token}`}
            })
        }),
        getReviews: builder.query({
            query: ({id, page, limit}: { id: number, page: number, limit: number}) => ({
                url: `${RECIPE_URL}/${id}/reviews?page=${page}&limit=${limit}`
            })
        }),
        getRecipe: builder.query({
            query: (id: number) => ({
                url: `${RECIPE_URL}/${id}`
            })
        }),
        allCuisineRecipes: builder.query({
            query: ({id, page, limit}) =>  ({
                url: `${RECIPE_URL}/cuisine/${id}?page=${page}&limit=${limit}`
            })
        }),
        allDietRecipes: builder.query({
            query: ({id, page, limit}) =>  ({
                url: `${RECIPE_URL}/diet/${id}?page=${page}&limit=${limit}`
            })
        }),
        editRecipe: builder.mutation({
            query: (body) => ({
                url: `${RECIPE_URL}/${body.id}`,
                method: "PATCH",
                headers: {'Authorization': 'Bearer '+body.token},
                body,
            })
        }),
        getAverageRatings: builder.query({
            query: (id) => ({
                url: `${RECIPE_URL}/${id}/ratings`
            })
        })
    })
})

export const { 
    useLazyAllRecipeQuery, 
    useAddRecipeMutation, 
    useAddReviewMutation, 
    useLazyGetRecipeQuery, 
    useDeleteRecipeMutation, 
    useLazyAllCuisineRecipesQuery, 
    useLazyAllDietRecipesQuery, 
    useEditRecipeMutation,
    useLazyGetReviewsQuery,
    useDeleteReviewMutation,
    useLazyGetAverageRatingsQuery
} = recipeApiSlice;