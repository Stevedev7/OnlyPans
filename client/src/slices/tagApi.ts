import { apiSlice } from './api'

const TAGS_URL = '/api/tags'

export const tagsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allTags: builder.query({
            query: () => ({
                url: `${TAGS_URL}/all`,
                method: 'GET'
            })
        }),
        addTag: builder.mutation({
            query: (body) => ({
                url: `${TAGS_URL}/new`,
                method: 'POST',
                headers: {'Authorization': 'Bearer '+body.token},
                body
            })
        }),
    })
})

export const { useLazyAllTagsQuery, useAddTagMutation } = tagsApiSlice;