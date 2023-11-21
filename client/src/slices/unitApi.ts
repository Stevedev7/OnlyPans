import { apiSlice } from './api'

const UNITS_URL = '/api/units'

export const unitsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allUnits: builder.query({
            query: () => ({
                url: `${UNITS_URL}/all`,
                method: 'GET'
            })
        }),
        searchUnit: builder.query({
            query: (search) => {
                url: `${UNITS_URL}/search?q=${search}`
            }
        })
    })
})

export const { useLazyAllUnitsQuery, useLazySearchUnitQuery } = unitsApiSlice;