import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		searchChange (state, action) {
			const { value } = action.payload
			state.value = value
		},
	}
})

export const { searchChange } = searchSlice.actions

export default searchSlice.reducer
