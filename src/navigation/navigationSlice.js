import { createSlice } from '@reduxjs/toolkit'

const initialState = { page: 1, pagination: 10 }

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		paginationChange (state, action) {
			state.pagination = action.payload
		},
		pageChange (state, action) {
			state.page = action.payload
		}
	}
})

export const { paginationChange, pageChange } = navigationSlice.actions

export default navigationSlice.reducer
